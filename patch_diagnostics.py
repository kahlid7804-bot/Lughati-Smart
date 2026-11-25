"""Apply diagnostics to the existing extracted project, without changing lessons."""
from pathlib import Path
import sys, py_compile

root=Path(sys.argv[1] if len(sys.argv)>1 else ".")
def edit(path, replacements):
    p=root/path
    s=p.read_text(encoding="utf-8")
    for old,new in replacements:
        if old not in s:
            raise RuntimeError("Expected source not found: "+str(path)+": "+old[:75])
        s=s.replace(old,new,1)
    p.write_text(s,encoding="utf-8")

server=Path("server/server.py")
edit(server,[
("import os,json,urllib.request,hmac,time,threading,re","import os,json,urllib.request,urllib.error,hmac,time,threading,re"),
(" def send(self,status,body):",''' def do_GET(self):
  if self.path in ('/','/health'):
   return self.send(200,{'status':'ok','service':'Lughati-Smart'})
  return self.send(404,{'error':'not found'})
 def send(self,status,body):
  print("HTTP",status,"method",self.command,"route",self.path.split('?')[0] if self.path in ('/','/health','/tutor') else 'other',flush=True)'''),
("  if not KEY or os.getenv('CHILD_PRIVACY_READY')!='yes': return self.send(503,{'error':'not configured'})",""),
("   if data.get('consent') is not True: return self.send(403,{'error':'consent required'})",'''   if data.get('mode')=='diagnostic':
    # Only fixed synthetic material may be sent by this endpoint, never user input.
    if not KEY: return self.send(503,{'error':'missing_api_key'})
    with lock:
     day=time.strftime('%Y-%m-%d',time.gmtime()); count=usage.get(day,0)
     if count>=LIMIT: return self.send(429,{'error':'daily limit'})
     usage.clear(); usage[day]=count+1
    evaluate({'mode':'question','context':'Synthetic connection test','answer':'Explain the Arabic noun in one sentence.','image':''})
    ready=os.getenv('CHILD_PRIVACY_READY')=='yes'
    return self.send(200,{'ar':'نجح الاتصال بالخادم وOpenAI. '+('إعداد الخصوصية مفعّل.' if ready else 'تدريبات الطالب محجوبة حتى اكتمال إعداد الخصوصية.'),'en':'Server and OpenAI connection successful. '+('Privacy setting enabled.' if ready else 'Student exercises remain blocked pending privacy setup.')})
   if not KEY: return self.send(503,{'error':'missing_api_key'})
   if os.getenv('CHILD_PRIVACY_READY')!='yes': return self.send(503,{'error':'privacy_not_ready'})
   if data.get('consent') is not True: return self.send(403,{'error':'consent required'})'''),
("  except Exception: self.send(502,{'error':'tutor unavailable'})",'''  except urllib.error.HTTPError as e:
   print("OpenAI HTTP status",e.code,flush=True)
   self.send(502,{'error':'upstream_'+str(e.code)})
  except (TimeoutError,urllib.error.URLError) as e:
   print("Upstream connection failure",type(e).__name__,flush=True)
   self.send(504,{'error':'upstream_timeout'})
  except Exception as e:
   print("Tutor failure",type(e).__name__,flush=True)
   self.send(502,{'error':'tutor unavailable'})'''),
("('127.0.0.1',int(os.getenv('PORT','8080')))","('0.0.0.0',int(os.getenv('PORT','8080')))")
])
py_compile.compile(str(root/server),doraise=True)
if '--server-only' in sys.argv:
    sys.exit(0)

java=Path("app/src/main/java/iq/lughati/MainActivity.java")
edit(java,[
("c.setConnectTimeout(12000);c.setReadTimeout(65000);","c.setConnectTimeout(25000);c.setReadTimeout(130000);"),
('result=feedback("خطأ الخادم: "+status+". راجعي إعدادات ولي الأمر.","Server error: "+status+". Check parent settings.");', '''String code="";try(java.io.InputStream err=c.getErrorStream()){if(err!=null){byte[] buf=new byte[4096];int n=err.read(buf);if(n>0)code=new org.json.JSONObject(new String(buf,0,n,java.nio.charset.StandardCharsets.UTF_8)).optString("error","");}}catch(Exception ignored){}if(!code.matches("[a-zA-Z0-9_ ]{0,80}"))code="";result=feedback("خطأ الخادم: "+status+" "+code,"Server error: "+status+" "+code);'''),
('c.disconnect();}catch(Exception e){}final String response=result;','c.disconnect();}catch(java.net.SocketTimeoutException e){result=feedback("انتهت مهلة الاتصال بالخادم.","Server connection timed out.");}catch(Exception e){result=feedback("تعذر الاتصال: "+e.getClass().getSimpleName(),"Connection failed: "+e.getClass().getSimpleName());}final String response=result;')
])
js=Path("app/src/main/assets/tutor.js")
edit(js,[
("if(id!==aiSeq)return;let test=", "if(id!==aiSeq)return;clearTimeout(window.aiDeadline);let test="),
("test.innerHTML=B(r)","test.textContent=(r.ar||'')+' / '+(r.en||'')"),
("Native.askTutor(++aiSeq,JSON.stringify({mode:'question',context:'Synthetic connection test',answer:'Explain the Arabic noun in one sentence.',consent:true}));","""let id=++aiSeq;clearTimeout(window.aiDeadline);window.aiDeadline=setTimeout(()=>{if(id!==aiSeq)return;aiSeq++;let box=document.getElementById('connectionResult');if(box)box.textContent='انتهت مهلة الاختبار. / Connection test timed out.'},160000);try{Native.askTutor(id,JSON.stringify({mode:'diagnostic',consent:true}));}catch(err){clearTimeout(window.aiDeadline);e.textContent='تعذر بدء الاختبار. / Could not start connection test.';}"""),
("Native.askTutor(++aiSeq,JSON.stringify({mode:aiMode,context:aiContext.ar+'\\n'+aiContext.en,answer:a,image:window.aiImage||'',consent:true}));","""let id=++aiSeq;clearTimeout(window.aiDeadline);window.aiDeadline=setTimeout(()=>{if(id!==aiSeq)return;aiSeq++;let box=document.getElementById('aiResult'),btn=document.getElementById('aiSend');if(box)box.textContent='انتهت مهلة التصحيح. / Review timed out.';if(btn)btn.disabled=false;},160000);try{Native.askTutor(id,JSON.stringify({mode:aiMode,context:aiContext.ar+'\\n'+aiContext.en,answer:a,image:window.aiImage||'',consent:true}));}catch(err){clearTimeout(window.aiDeadline);out.textContent='تعذر بدء التصحيح. / Could not start review.';document.getElementById('aiSend').disabled=false;}""")
])
print("Diagnostics applied successfully")
