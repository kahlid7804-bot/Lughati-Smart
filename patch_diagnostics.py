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
  if self.path.split('?')[0].rstrip('/') in ('','/health'):
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
edit(js,[
("e.innerHTML=L('جارٍ اختبار الخادم بنص تجريبي فقط…','Testing the server using synthetic text only…');", """let url=document.getElementById('aiUrl').value.trim(),token=document.getElementById('aiToken').value.trim();if(!url.startsWith('https://')||token.length<16){e.textContent='تحقق من الرابط الكامل ورمز الوصول (16 حرفاً على الأقل). / Check full HTTPS URL and token (at least 16 characters).';return;}try{if(!Native.configureTutor(url,token)){e.textContent='تعذر حفظ الإعدادات. / Invalid connection settings.';return;}}catch(err){e.textContent='تعذر الاتصال بواجهة أندرويد. / Android bridge unavailable.';return;}e.textContent='تم حفظ الإعدادات؛ جار اختبار الاتصال (نسخة التشخيص 2). / Settings saved; testing connection (diagnostics 2).';"""),
("if(!window.Native){e.innerHTML=L('يتطلب تطبيق أندرويد','Requires Android app');return}", "if(!window.Native){e.textContent='يتطلب تطبيق أندرويد. / Requires Android app.';return}")
])
# Native diagnostic dialog bypasses WebView callback and JavaScript timers.
p=root/java
s=p.read_text(encoding="utf-8")
anchor=" @JavascriptInterface public void clearTutor()"
if anchor not in s: raise RuntimeError("Missing bridge anchor")
s=s.replace(anchor,''' @JavascriptInterface public void testTutorNative(){
 runOnUiThread(()->{
  android.app.AlertDialog dialog=new android.app.AlertDialog.Builder(MainActivity.this).setTitle("اختبار الاتصال / Connection test").setMessage("Starting HTTPS health check…").setPositiveButton("Close",null).create();
  dialog.show();
  android.os.Handler handler=new android.os.Handler(android.os.Looper.getMainLooper());
  java.util.concurrent.atomic.AtomicBoolean done=new java.util.concurrent.atomic.AtomicBoolean(false);
  handler.postDelayed(()->{if(done.compareAndSet(false,true))dialog.setMessage("انتهت المهلة / Diagnostic timed out");},160000);
  new Thread(()->{
   String msg;
   javax.net.ssl.HttpsURLConnection conn=null;
   try{
    android.content.SharedPreferences pref=getSharedPreferences("tutor",0);
    String base=pref.getString("url","");
    if(!base.startsWith("https://"))throw new IllegalArgumentException("HTTPS configuration missing");
    handler.post(()->dialog.setMessage("1/2: Checking HTTPS server…"));
    conn=(javax.net.ssl.HttpsURLConnection)new java.net.URL(base+"/health").openConnection();
    conn.setConnectTimeout(25000);conn.setReadTimeout(75000);conn.setInstanceFollowRedirects(false);
    int health=conn.getResponseCode();conn.disconnect();conn=null;
    if(health!=200)throw new java.io.IOException("Health HTTP "+health);
    handler.post(()->dialog.setMessage("2/2: HTTPS OK. Testing OpenAI with synthetic text…"));
    conn=(javax.net.ssl.HttpsURLConnection)new java.net.URL(base+"/tutor").openConnection();
    conn.setConnectTimeout(25000);conn.setReadTimeout(75000);conn.setInstanceFollowRedirects(false);
    conn.setRequestMethod("POST");conn.setDoOutput(true);
    conn.setRequestProperty("Content-Type","application/json");
    conn.setRequestProperty("Authorization","Bearer "+pref.getString("token",""));
    byte[] payload=new org.json.JSONObject().put("mode","diagnostic").put("consent",true).toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
    conn.setFixedLengthStreamingMode(payload.length);
    try(java.io.OutputStream output=conn.getOutputStream()){output.write(payload);}
    int status=conn.getResponseCode();
    java.io.InputStream stream=status==200?conn.getInputStream():conn.getErrorStream();
    String raw="";
    if(stream!=null){try(java.io.InputStream in=stream;java.io.ByteArrayOutputStream out=new java.io.ByteArrayOutputStream()){byte[] buf=new byte[2048];int n;while((n=in.read(buf))!=-1){out.write(buf,0,n);if(out.size()>100000)throw new java.io.IOException("Response too large");}raw=out.toString("UTF-8");}}
    if(status==200){org.json.JSONObject data=new org.json.JSONObject(raw);msg=data.optString("ar")+" / "+data.optString("en");}
    else{String code="";try{code=new org.json.JSONObject(raw).optString("error","");}catch(Exception ignored){}if(!code.matches("[a-zA-Z0-9_ ]{0,80}"))code="";msg="HTTPS OK; Tutor HTTP "+status+" "+code;}
   }catch(Exception ex){msg="Connection failed / فشل الاتصال: "+ex.getClass().getSimpleName();if(ex instanceof java.io.IOException && ex.getMessage()!=null && ex.getMessage().matches("Health HTTP [0-9]+"))msg+=" "+ex.getMessage();}
   finally{if(conn!=null)conn.disconnect();}
   final String result=msg;handler.post(()->{if(done.compareAndSet(false,true))dialog.setMessage(result);});
  }).start();
 });
 }
'''+anchor,1)
s=s.replace(" class Bridge {"," public class Bridge {",1)
p.write_text(s,encoding="utf-8")
p=root/js
s=p.read_text(encoding="utf-8")
old="try{Native.askTutor(id,JSON.stringify({mode:'diagnostic',consent:true}));}"
new="try{clearTimeout(window.aiDeadline);e.textContent='اختبار أندرويد المباشر (3) / Native diagnostic 3';Native.testTutorNative();}"
if old not in s: raise RuntimeError("Missing diagnostic call")
s=s.replace(old,new,1)
p.write_text(s,encoding="utf-8")
print("Diagnostics applied successfully")
