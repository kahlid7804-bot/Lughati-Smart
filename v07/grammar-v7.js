// V7 original grammar practice. No textbook transcription.
(function(){
const p=(ar,en)=>({ar,en});
const add=(i,q,a,b,c,e)=>grammar[i][3].push([q,a,b,c,e]);
const pair=(ar,en)=>p(ar,en);
const N=[['الطالب','the student','الدرس','the lesson'],['المعلم','the teacher','الكتاب','the book'],['الطفل','the child','القصة','the story'],['الأخ','the brother','الرسالة','the letter'],['الصديق','the friend','المقال','the article']];
const V=[['كتب','write'],['درس','study'],['حفظ','memorise'],['شرح','explain'],['فحص','examine']];
const names=[['عليّ','Ali'],['مريم','Maryam'],['سارة','Sara'],['حسن','Hasan'],['زينب','Zaynab']];
const places=[['البصرة','Basra'],['بغداد','Baghdad'],['الموصل','Mosul'],['النجف','Najaf'],['كربلاء','Karbala']];
const words=[['كتاب','book'],['قلم','pen'],['دفتر','notebook'],['باب','door'],['بيت','house']];
const fem=[['طالبة','student'],['معلمة','teacher'],['مهندسة','engineer'],['طبيبة','doctor'],['كاتبة','writer']];
const verbs=[['يكتب','write'],['يدرس','study'],['يحفظ','memorise'],['يشرح','explain'],['يفحص','examine']];
const pred=[['مجتهد','hard-working'],['نشيط','active'],['حاضر','present'],['مستعد','ready'],['سعيد','happy']];
const parse=(role,mark,ren,men)=>p(role+'، وعلامة '+(mark==='الضمة'?'رفعه':mark==='الفتحة'?'نصبه':mark==='الكسرة'?'جره':'جزمه')+' '+mark+' الظاهرة',ren+'; marked by the visible '+men);
const nom=parse('فاعل مرفوع','الضمة','Nominative subject','damma'),obj=parse('مفعول به منصوب','الفتحة','Accusative object','fatha'),gen=parse('اسم مجرور','الكسرة','Genitive noun','kasra');
const subj=parse('مبتدأ مرفوع','الضمة','Nominative topic','damma'),khab=parse('خبر مرفوع','الضمة','Nominative predicate','damma');
const noun=p('اسم','Noun'),verb=p('فعل','Verb'),part=p('حرف','Particle');
const inf=p('معرب','Inflected'),fixed=p('مبني','Fixed ending');
const mar=p('مرفوع بالضمة','Nominative with damma'),man=p('منصوب بالفتحة','Accusative with fatha'),maj=p('مجزوم بالسكون','Jussive with sukun');
const present=p('فعل مضارع','Present verb'),past=p('فعل ماضٍ','Past verb'),imp=p('فعل أمر','Imperative');
const dam=p('الضمة','Damma'),fat=p('الفتحة','Fatha'),kas=p('الكسرة','Kasra');
const why=(a,e)=>p(a,e);
const Q=(i,ar,en,a,b,c,whyAr,whyEn)=>add(i,p(ar,en),a,b,c,p(whyAr,whyEn));
const ir=(i,s,t,ar,en,a,b,c)=>add(i,p('أعرب «'+t+'» في: '+s,'Parse “'+t+'” in: '+en),a,b,c,p(ar,en+' — '+a.en+'.'));
for(let j=0;j<5;j++){
let [n,ne,o,oe]=N[j], [v,ve]=V[j], [w,we]=words[j], [f,fe]=fem[j], [name,nae]=names[j], [place,ple]=places[j], [pr,pre]=verbs[j], [h,he]=pred[j];
let s=v+'َ '+n+'ُ '+o+'َ.', se=ne+' performed the action '+ve+' on '+oe+'.';
const x=(ar,en)=>p(ar,en);
// 0: parts of speech
Q(0,'استخرج الاسم الذي قام بالفعل من: '+s,se+' Extract the noun that performs the action.',x(n,ne),x(v,ve),x('في','in'),'الاسم يدل على شخص أو شيء.','A noun names a person or thing.');
Q(0,'ما نوع «'+v+'» في: '+s,'What part of speech is “'+v+'” in: '+se,verb,noun,part,'يدل على حدث في الزمن الماضي.','It expresses a past action.');
Q(0,'استخرج حرف الجر من: وضعتُ '+w+'اً في الحقيبة.','Extract the preposition: I put a '+we+' in the bag.',x('في','in'),x(w,we),x('وضعتُ','I put'),'في حرف جر.','Fi is a preposition.');
Q(0,'أكمل بفعل مناسب: ___ '+n+'ُ '+o+'َ.','Complete with a verb: ___ '+ne+' '+oe+'.',x(v+'َ',ve),x('إلى','to'),x(w,we),'الجملة الفعلية تبدأ بفعل.','A verbal sentence begins with a verb.');
// 1: inflection and building
Q(1,'صنّف «'+n+'» في: جاء '+n+'ُ.','Classify “'+n+'” in: '+ne+' came.',inf,fixed,part,'يتغير آخر الاسم بحسب موقعه.','Its ending changes with grammatical role.');
ir(1,'رأيتُ '+n+'َ.',n,'مفعول به منصوب وعلامة نصبه الفتحة.','I saw '+ne+'.',obj,nom,gen);
ir(1,'مررتُ بـ'+n+'ِ.',n,'اسم مجرور بالباء وعلامة جره الكسرة.','I passed by '+ne+'.',gen,obj,nom);
Q(1,'ما نوع «هذا» في: هذا '+w+'ٌ؟','Classify “hadha” in: This is a '+we+'.',fixed,inf,verb,'هذا اسم إشارة مبني.','Hadha is a fixed-ending demonstrative.');
// 2: proper names
Q(2,'استخرج العلم من: زار '+name+' '+place+'.','Extract the personal proper name: '+nae+' visited '+ple+'.',x(name,nae),x(w,we),x('زار','visited'),'العلم هنا اسم شخص معين.','The proper name identifies a particular person.');
Q(2,'أي الكلمات علم لمكان من المجموعة التي تضم '+w+' و'+f+'؟','Which word is a place name in the group with '+we+' and '+fe+'?',x(place,ple),x(w,we),x(f,fe),'اسم المدينة علم.','The city name is a proper noun.');
Q(2,'استبدل «'+f+'» بعلم مؤنث مناسب.','Replace the feminine common noun '+fe+' with a feminine proper name.',x(['مريم','سارة','زينب','هند','نور'][j],['Maryam','Sara','Zaynab','Hind','Noor'][j]),x(w,we),x('إلى','to'),'العلم يعين شخصاً بذاته.','A proper name identifies a specific person.');
Q(2,'ما نوع «'+place+'» من حيث التعريف؟','What kind of definite noun is '+ple+'?',x('علم','Proper noun'),x('ضمير','Pronoun'),x('اسم إشارة','Demonstrative'),'اسم المدينة علم معرفة.','A city name is a definite proper noun.');
// 3: definite article
Q(3,'عرّف «'+w+'» بأل.','Make '+we+' definite with al-.',x('ال'+w,'the '+we),x(w,'a '+we),x('في '+w,'in a '+we),'أل تدخل على الاسم النكرة فتعرفه.','Al- makes an indefinite noun definite.');
Q(3,'استخرج المعرف بأل: وجدتُ '+w+'اً قرب '+o+'ِ.','Extract the noun with al-: I found a '+we+' near '+oe+'.',x(o,oe),x(w,we),x('قرب','near'),'الاسم يبدأ بأل.','The noun begins with al-.');
Q(3,'حوّل «ال'+w+'» إلى نكرة.','Make the '+we+' indefinite.',x(w,'a '+we),x('ال'+w,'the '+we),x(w+'ي','my '+we),'نحذف أل دون إضافة ضمير.','Remove al- without adding a pronoun.');
Q(3,'اختر الضبط الصحيح: قرأتُ '+o+' __.','Choose the accusative ending: I read '+oe+'.',x(o+'َ',oe+' (accusative)'),x(o+'ُ',oe+' (nominative)'),x(o+'ِ',oe+' (genitive)'),'مفعول به منصوب بالفتحة.','The object takes fatha.');
// 4 pronouns
let pron=[['أنا','I','هو','he'],['نحن','we','هي','she'],['أنتَ','you (m.)','هم','they'],['أنتِ','you (f.)','هو','he'],['هم','they','أنا','I']][j];
Q(4,'اختر الضمير الذي يعني: '+pron[1]+'.','Choose the Arabic pronoun for '+pron[1]+'.',x(pron[0],pron[1]),x(pron[2],pron[3]),x(w,we),'هذا هو الضمير الموافق للمعنى.','This pronoun matches the indicated person.');
Q(4,'استخرج الضمير المتصل من «'+w+'هُ».','Extract the attached pronoun from “his '+we+'”.',x('الهاء','Ha (his)'),x('الكاف','Kaf (your)'),x('الياء','Ya (my)'),'الهاء ضمير متصل في محل جر بالإضافة.','Ha is an attached pronoun in the genitive as possessor.');
Q(4,'حوّل «'+w+'» إلى ما يدل على ملكية المتكلم.','Express “my '+we+'”.',x(w+'ي','my '+we),x(w+'ه','his '+we),x(w+'ك','your '+we),'ياء المتكلم تدل على ملكية المتكلم.','Ya marks first-person possession.');
Q(4,'أعرب «هو» في: هو '+h+'ٌ.','Parse “he” in: He is '+he+'.',x('ضمير منفصل مبني في محل رفع مبتدأ','Independent fixed pronoun in nominative topic position'),obj,gen,'الضمير المنفصل هنا مبتدأ.','The independent pronoun is the topic.');
// 5 demonstratives
Q(5,'أكمل: ___ '+w+'ٌ (قريب).','Complete: ___ is a '+we+' (near).',x('هذا','this (m.)'),x('هذه','this (f.)'),x('تلك','that (f.)'),'هذا للمفرد المذكر القريب.','Hadha is near masculine singular.');
Q(5,'أكمل: ___ '+f+'ٌ (قريبة).','Complete: ___ is a '+fe+' (near).',x('هذه','this (f.)'),x('هذا','this (m.)'),x('ذلك','that (m.)'),'هذه للمفرد المؤنث القريب.','Hadhihi is near feminine singular.');
Q(5,'حوّل إلى الإشارة للبعيد: هذا '+w+'ٌ.','Change to a distant demonstrative: This is a '+we+'.',x('ذلك '+w+'ٌ','That is a '+we),x('تلك '+w+'ٌ','That (f.) is a '+we),x('هؤلاء '+w+'ٌ','These are a '+we),'ذلك للمفرد المذكر البعيد.','Dhalika is distant masculine singular.');
Q(5,'أعرب «هذا» في: هذا '+w+'ٌ.','Parse “hadha” in: This is a '+we+'.',x('اسم إشارة مبني في محل رفع مبتدأ','Fixed demonstrative in nominative topic position'),obj,gen,'اسم الإشارة هنا مبتدأ.','The demonstrative functions as the topic.');
// 6 relative pronouns
Q(6,'أكمل: جاء '+n+'ُ ___ '+v+'َ '+o+'َ.','Complete: '+ne+' came, who did '+ve+' '+oe+'.',x('الذي','who (m.)'),x('التي','who (f.)'),x('الذين','who (plural)'),'الذي للمفرد المذكر.','Alladhi refers to masculine singular.');
Q(6,'أكمل: جاءت ال'+f+'ُ ___ نجحتْ.','Complete: The '+fe+' who succeeded came.',x('التي','who (f.)'),x('الذي','who (m.)'),x('الذين','who (plural)'),'التي للمفرد المؤنث.','Allati refers to feminine singular.');
Q(6,'حدد صلة الموصول: حضر '+n+'ُ الذي '+v+'َ '+o+'َ.','Identify the relative clause: '+ne+' who did '+ve+' '+oe+' arrived.',x(v+'َ '+o+'َ','did '+ve+' '+oe),x(n,ne),x('الذي','who'),'صلة الموصول جملة توضح معناه ولا محل لها من الإعراب.','The relative clause completes its meaning and has no syntactic case position.');
Q(6,'استخرج الاسم الموصول: رأيتُ ال'+f+'َ التي نجحتْ.','Extract the relative pronoun: I saw the '+fe+' who succeeded.',x('التي','who (f.)'),x('نجحتْ','succeeded'),x(f,fe),'التي اسم موصول للمؤنث المفرد.','Allati is a feminine singular relative pronoun.');
// 7 idafa
Q(7,'استخرج المضاف من: '+w+'ُ '+n+'ِ جديدٌ.','Extract the possessed noun: The '+we+' of '+ne+' is new.',x(w,we),x(n,ne),x('جديد','new'),'المضاف هو الاسم الأول في التركيب.','The first noun is the mudaf.');
ir(7,w+'ُ '+n+'ِ جديدٌ.',n,'مضاف إليه مجرور بالكسرة.','The '+we+' of '+ne+' is new.',x('مضاف إليه مجرور بالكسرة','Genitive possessor with kasra'),nom,obj);
Q(7,'اختر تركيب الإضافة الصحيح باستعمال '+w+' و'+n+'.','Choose the correct construct phrase using '+we+' and '+ne+'.',x(w+'ُ '+n+'ِ',ne+'’s '+we),x('ال'+w+'ُ '+n+'ِ','incorrect: article on mudaf'),x(w+'ٌ '+n+'ِ','incorrect: tanwin on mudaf'),'المضاف لا ينون ولا يقترن بأل في الإضافة المعنوية هنا.','In this ordinary construct the mudaf has neither tanwin nor al-.');
Q(7,'هل «'+w+'ُ '+n+'ِ» معرفة؟','Is the construct '+ne+'’s '+we+' definite?',x('نعم، بالإضافة إلى معرفة','Yes, by addition to a definite noun'),x('لا، نكرة','No, indefinite'),x('فعل','Verb'),'المضاف إلى معرفة يكتسب التعريف.','A noun added to a definite possessor becomes definite.');
// 8 past
Q(8,'استخرج الفعل الماضي من: '+s,'Extract the past verb: '+se,x(v+'َ',ve+' (past)'),x(n,ne),x(o,oe),'الفعل يدل على زمن ماضٍ.','It indicates past time.');
Q(8,'أعرب الفعل «'+v+'َ» في: '+s,'Parse the past verb in: '+se,x('فعل ماضٍ مبني على الفتح','Past verb built on fatha'),x('فعل مضارع مرفوع','Nominative present verb'),x('فعل أمر مبني على السكون','Imperative built on sukun'),'الماضي هنا لم يتصل به ما يغير بناءه.','No suffix changes its default construction.');
Q(8,'أعرب الفعل في «'+v+'ْتُ».','Parse the verb with first-person suffix: I did '+ve+'.',x('فعل ماضٍ مبني على السكون لاتصاله بتاء الفاعل','Past verb built on sukun with subject ta'),x('مبني على الفتح','Built on fatha'),x('مبني على الضم','Built on damma'),'تاء الفاعل تقتضي بناء الماضي على السكون.','Subject ta causes the past verb to be built on sukun.');
Q(8,'أعرب الفعل في «'+v+'ُوا».','Parse the past verb with plural waw: They did '+ve+'.',x('فعل ماضٍ مبني على الضم لاتصاله بواو الجماعة','Past verb built on damma with plural waw'),x('مبني على الفتح','Built on fatha'),x('مبني على السكون','Built on sukun'),'واو الجماعة تقتضي بناء الماضي على الضم.','Plural waw causes the past verb to be built on damma.');
// 9 nominative present
Q(9,'اضبط آخر المضارع: '+pr+' '+n+'ُ.','Choose the ending: '+ne+' does '+ve+'.',x(pr+'ُ',ve+' (damma)'),x(pr+'َ',ve+' (fatha)'),x(pr+'ْ',ve+' (sukun)'),'لم يسبقه ناصب أو جازم.','No accusative or jussive particle precedes it.');
Q(9,'أعرب «'+pr+'ُ» في: '+pr+'ُ '+n+'ُ.','Parse the present verb: '+ne+' does '+ve+'.',x('فعل مضارع مرفوع بالضمة الظاهرة','Present verb raised by visible damma'),man,maj,'المضارع الصحيح الآخر يرفع بالضمة إذا تجرد من الناصب والجازم.','A sound-ending present verb takes damma without a governing particle.');
Q(9,'استخرج الفعل المضارع المرفوع: '+pr+'ُ '+n+'ُ ولم يهملْ.','Extract the nominative present verb: '+ne+' does '+ve+' and did not neglect.',x(pr+'ُ',ve),x('يهملْ','neglect'),x(n,ne),'لم تجزم يهمل، أما الأول فمرفوع.','Lam makes the second verb jussive; the first is nominative.');
Q(9,'صحح: '+pr+'َ '+n+'ُ (دون ناصب).','Correct the verb ending without a governing particle.',x(pr+'ُ',ve+' (damma)'),x(pr+'َ',ve+' (fatha)'),x(pr+'ْ',ve+' (sukun)'),'الأصل في المضارع الرفع.','The default present mood is nominative.');
// 10 subjunctive
Q(10,'أكمل: لن '+pr+' __ '+n+'ُ.','Choose the ending after lan: '+ne+' will not '+ve+'.',x(pr+'َ',ve+' (fatha)'),x(pr+'ُ',ve+' (damma)'),x(pr+'ْ',ve+' (sukun)'),'لن تنصب المضارع.','Lan governs the subjunctive.');
Q(10,'أعرب «'+pr+'َ» بعد لن.','Parse '+pr+' after lan.',x('فعل مضارع منصوب بالفتحة الظاهرة','Subjunctive present with visible fatha'),mar,maj,'لن حرف نصب والمضارع صحيح الآخر.','Lan governs the subjunctive of the sound-ending verb.');
Q(10,'اختر الناصب: أريدُ ___ '+pr+'َ '+n+'ُ.','Choose the subjunctive particle: I want '+ne+' to '+ve+'.',x('أنْ','to'),x('لم','did not'),x('هل','question particle'),'أنْ تنصب المضارع.','An governs the subjunctive.');
Q(10,'صحح: لن '+pr+'ُ '+n+'ُ.','Correct '+pr+' after lan.',x('لن '+pr+'َ','lan + subjunctive'),x('لن '+pr+'ُ','lan + indicative'),x('لن '+pr+'ْ','lan + jussive'),'علامة النصب الفتحة هنا.','Fatha is the required subjunctive ending.');
// 11 jussive
Q(11,'أكمل: لم '+pr+' __ '+n+'ُ.','Choose the ending after lam: '+ne+' did not '+ve+'.',x(pr+'ْ',ve+' (sukun)'),x(pr+'ُ',ve+' (damma)'),x(pr+'َ',ve+' (fatha)'),'لم تجزم المضارع.','Lam governs the jussive.');
Q(11,'أعرب «'+pr+'ْ» بعد لم.','Parse '+pr+' after lam.',x('فعل مضارع مجزوم بالسكون الظاهر','Jussive present with visible sukun'),mar,man,'المضارع صحيح الآخر يجزم بالسكون.','A sound-ending present verb takes sukun in the jussive.');
Q(11,'اختر الجازم: ___ '+pr+'ْ '+n+'ُ.','Choose a jussive particle.',x('لم','did not'),x('لن','will not'),x('أنْ','to'),'لم جازمة، ولن وأن ناصبتان.','Lam is jussive; lan and an are subjunctive.');
Q(11,'صحح: لم '+pr+'ُ '+n+'ُ.','Correct '+pr+' after lam.',x('لم '+pr+'ْ','lam + jussive'),x('لم '+pr+'ُ','lam + indicative'),x('لم '+pr+'َ','lam + subjunctive'),'علامة الجزم السكون هنا.','Sukun is the required jussive ending.');
// 12 five verbs
let stem=pr.slice(1);
Q(12,'أكمل: الطالبان ي'+stem+' __.','Complete: The two students '+ve+'.',x('ي'+stem+'ان','dual indicative'),x('ي'+stem+'ا','dual without nun'),x('ي'+stem+'ون','plural indicative'),'الأفعال الخمسة ترفع بثبوت النون.','The five verbs retain nun in the indicative.');
Q(12,'صحح: لن ي'+stem+'ون.','Correct the plural verb after lan.',x('لن ي'+stem+'وا','plural subjunctive'),x('لن ي'+stem+'ون','plural with nun'),x('لن ي'+stem+'ان','dual with nun'),'تنصب الأفعال الخمسة بحذف النون.','The five verbs drop nun in the subjunctive.');
Q(12,'أعرب «ي'+stem+'وا» في: لم ي'+stem+'وا.','Parse the plural verb after lam.',x('مضارع مجزوم بحذف النون والواو فاعل','Jussive present with nun omitted; waw is subject'),x('مرفوع بثبوت النون','Indicative retaining nun'),x('مجزوم بالسكون','Jussive with sukun'),'واو الجماعة ضمير في محل رفع فاعل.','Plural waw is a pronoun in subject position.');
Q(12,'أعرب «ت'+stem+'ين» في: أنتِ ت'+stem+'ين.','Parse the feminine second-person present verb.',x('مضارع مرفوع بثبوت النون والياء فاعل','Indicative retaining nun; ya is subject'),x('منصوب بحذف النون','Subjunctive dropping nun'),x('مرفوع بالضمة','Indicative with damma'),'من الأفعال الخمسة لاتصاله بياء المخاطبة.','It is one of the five verbs with addressee ya.');
// 13 imperative
let command=['اكتب','ادرس','احفظ','اشرح','افحص'][j];
Q(13,'حوّل إلى الأمر: '+pr+'ُ.','Convert the present verb to a singular imperative.',x(command+'ْ',ve+'!'),x(pr+'ُ',ve+' (present)'),x(v+'َ',ve+' (past)'),'الأمر طلب وقوع الفعل من المخاطب.','The imperative requests an action from the addressee.');
Q(13,'أعرب «'+command+'ْ» في: '+command+'ْ '+o+'َ.','Parse the imperative in: '+ve+' '+oe+'!',x('فعل أمر مبني على السكون','Imperative built on sukun'),x('مضارع مجزوم','Jussive present'),x('ماضٍ مبني على الفتح','Past built on fatha'),'صحيح الآخر ولم يتصل به شيء.','It has a sound ending without a suffix.');
Q(13,'استخرج فعل الأمر: '+command+'ْ '+o+'َ ثم استرحْ. (الفعل الأول)','Extract the first imperative: '+ve+' '+oe+', then rest.',x(command+'ْ',ve+'!'),x(o,oe),x('ثم','then'),'الفعل الأول طلب مباشر.','The first verb is a direct command.');
Q(13,'ما الفاعل في: '+command+'ْ '+o+'َ؟','What is the subject of the singular command?',x('ضمير مستتر وجوباً تقديره أنت','Implicit obligatory subject: you'),x('ضمير ظاهر هو','Explicit pronoun he'),x(o,oe),'المخاطب المفرد هو الفاعل المستتر.','The singular addressee is the implicit subject.');
// 14 subject
Q(14,'استخرج الفاعل من: '+s,'Extract the subject: '+se,x(n,ne),x(o,oe),x(v,ve),'الفاعل هو من قام بالفعل.','The subject performs the action.');
ir(14,s,n,'فاعل مرفوع وعلامة رفعه الضمة الظاهرة. ',se,nom,obj,gen);
Q(14,'اضبط الفاعل: '+v+'َ '+n+' __ '+o+'َ.','Choose the subject ending: '+se,x(n+'ُ',ne+' (damma)'),x(n+'َ',ne+' (fatha)'),x(n+'ِ',ne+' (kasra)'),'الفاعل مرفوع.','The subject is nominative.');
Q(14,'صحح خطأ الفاعل: '+v+'َ '+n+'َ '+o+'َ.','Correct the subject case: '+se,x(n+'ُ',ne+' (nominative)'),x(n+'َ',ne+' (accusative)'),x(n+'ِ',ne+' (genitive)'),'علامة رفع الفاعل المفرد الضمة.','A singular subject takes damma.');
// 15 subject forms
Q(15,'حدد صورة الفاعل في: '+s,'Identify the subject form: '+se,x('اسم ظاهر','Explicit noun'),x('ضمير مستتر','Implicit pronoun'),x('ضمير متصل','Attached pronoun'),'الفاعل اسم ظاهر مذكور.','The subject is explicitly named.');
Q(15,'أعرب التاء في: '+v+'ْتُ '+o+'َ.','Parse the ta in: I did '+ve+' '+oe+'.',x('ضمير متصل مبني في محل رفع فاعل','Attached fixed pronoun in nominative subject position'),x('مفعول به','Direct object'),x('حرف جر','Preposition'),'تاء الفاعل تدل على المتكلم.','Subject ta marks the speaker.');
Q(15,'ما صورة الفاعل في: '+pr+'ُ '+o+'َ (هو)؟','What is the subject form: He does '+ve+' '+oe+'?',x('ضمير مستتر تقديره هو','Implicit pronoun he'),x('اسم ظاهر','Explicit noun'),x('ضمير متصل','Attached pronoun'),'الفاعل غير مذكور لفظاً وتقديره هو.','The subject is implicit, understood as he.');
Q(15,'أعرب واو الجماعة في: '+v+'ُوا '+o+'َ.','Parse the plural waw: They did '+ve+' '+oe+'.',x('ضمير متصل في محل رفع فاعل','Attached pronoun in nominative subject position'),x('حرف عطف','Conjunction'),x('مفعول به','Direct object'),'واو الجماعة هي الفاعل.','The plural waw is the subject.');
// 16 object
Q(16,'استخرج المفعول به من: '+s,'Extract the direct object: '+se,x(o,oe),x(n,ne),x(v,ve),'المفعول به ما وقع عليه الفعل.','The object receives the action.');
ir(16,s,o,'مفعول به منصوب بالفتحة الظاهرة.',se,obj,nom,gen);
Q(16,'أكمل بمفعول به مضبوط: '+v+'َ '+n+'ُ ___.','Complete with a correctly marked direct object.',x(o+'َ',oe+' (fatha)'),x(o+'ُ',oe+' (damma)'),x(o+'ِ',oe+' (kasra)'),'المفعول به المفرد منصوب بالفتحة.','A singular object takes fatha.');
Q(16,'أعرب الهاء في «'+v+'َهُ '+n+'ُ».','Parse Ha in: '+ne+' did it.',x('ضمير متصل في محل نصب مفعول به','Attached pronoun in accusative object position'),x('ضمير في محل رفع فاعل','Pronoun in subject position'),x('مضاف إليه','Genitive possessor'),'الهاء اتصلت بالفعل ووقع عليها الفعل.','Ha is attached to the verb and receives the action.');
// 17 nominal sentence
Q(17,'استخرج المبتدأ: '+n+'ُ '+h+'ٌ.','Extract the topic: '+ne+' is '+he+'.',x(n,ne),x(h,he),x('في','in'),'المبتدأ اسم مرفوع نخبر عنه.','The topic is the nominative noun described.');
ir(17,n+'ُ '+h+'ٌ.',n,'مبتدأ مرفوع بالضمة.',ne+' is '+he+'.',subj,obj,gen);
ir(17,n+'ُ '+h+'ٌ.',h,'خبر مرفوع بالضمة.',ne+' is '+he+'.',khab,obj,gen);
Q(17,'أكمل بخبر مرفوع: '+n+'ُ ___.','Complete with a nominative predicate.',x(h+'ٌ',he+' (nominative)'),x(h+'اً',he+' (accusative)'),x(h+'ٍ',he+' (genitive)'),'الخبر يتم معنى المبتدأ ويرفع هنا.','The predicate completes the meaning and is nominative here.');
// 18 kana
let kana=['كان','أصبح','أمسى','ظلّ','بات'][j];
Q(18,'أكمل: '+kana+' '+n+'ُ ___.','Complete the predicate after '+kana+' (a kana-family verb).',x(h+'اً',he+' (accusative)'),x(h+'ٌ',he+' (nominative)'),x(h+'ٍ',he+' (genitive)'),'كان وأخواتها ترفع الاسم وتنصب الخبر.','Kana and its sisters raise the noun and make the predicate accusative.');
ir(18,kana+' '+n+'ُ '+h+'اً.',n,'اسم الناسخ مرفوع بالضمة.',ne+' was '+he+'.',x('اسم '+kana+' مرفوع بالضمة','Nominative noun of '+kana+' with damma'),obj,gen);
ir(18,kana+' '+n+'ُ '+h+'اً.',h,'خبر الناسخ منصوب بالفتحة.',ne+' was '+he+'.',x('خبر '+kana+' منصوب بالفتحة','Accusative predicate of '+kana+' with fatha'),khab,gen);
Q(18,'احذف الناسخ واضبط الجملة: '+kana+' '+n+'ُ '+h+'اً.','Remove the governing verb and restore the nominal sentence.',x(n+'ُ '+h+'ٌ',ne+' is '+he),x(n+'َ '+h+'ٌ','incorrect: accusative topic'),x(n+'ُ '+h+'اً','incorrect: accusative predicate'),'بعد حذف الناسخ يعود المبتدأ والخبر مرفوعين.','Both topic and predicate return to nominative.');
// 19 inna
let inna=['إنّ','كأنّ','لكنّ','لعلّ','ليت'][j];
Q(19,'أكمل: '+inna+' ___ '+h+'ٌ.','Complete the noun after '+inna+' (an inna-family particle).',x(n+'َ',ne+' (accusative)'),x(n+'ُ',ne+' (nominative)'),x(n+'ِ',ne+' (genitive)'),'إن وأخواتها تنصب الاسم وترفع الخبر.','Inna and its sisters make the noun accusative and raise the predicate.');
ir(19,inna+' '+n+'َ '+h+'ٌ.',n,'اسم الحرف الناسخ منصوب بالفتحة.','Sentence with '+inna+'.',x('اسم '+inna+' منصوب بالفتحة','Accusative noun of '+inna+' with fatha'),nom,gen);
ir(19,inna+' '+n+'َ '+h+'ٌ.',h,'خبر الحرف الناسخ مرفوع بالضمة.','Sentence with '+inna+'.',x('خبر '+inna+' مرفوع بالضمة','Nominative predicate of '+inna+' with damma'),obj,gen);
Q(19,'احذف الناسخ واضبط: '+inna+' '+n+'َ '+h+'ٌ.','Remove the particle and restore the nominal sentence.',x(n+'ُ '+h+'ٌ',ne+' is '+he),x(n+'َ '+h+'ٌ','incorrect: accusative topic'),x(n+'ُ '+h+'اً','incorrect: accusative predicate'),'المبتدأ والخبر مرفوعان دون ناسخ.','Without a governing word both are nominative.');
// 20 comparison
Q(20,'أدخل كان على: '+n+'ُ '+h+'ٌ.','Insert kana into: '+ne+' is '+he+'.',x('كان '+n+'ُ '+h+'اً',ne+' was '+he),x('كان '+n+'َ '+h+'ٌ','incorrect: accusative noun'),x('كان '+n+'ُ '+h+'ٌ','incorrect: nominative predicate'),'كان ترفع الاسم وتنصب الخبر.','Kana raises its noun and makes its predicate accusative.');
Q(20,'أدخل إنّ على: '+n+'ُ '+h+'ٌ.','Insert inna into: '+ne+' is '+he+'.',x('إنّ '+n+'َ '+h+'ٌ','Indeed '+ne+' is '+he),x('إنّ '+n+'ُ '+h+'اً','incorrect: reversed cases'),x('إنّ '+n+'ُ '+h+'ٌ','incorrect: nominative noun'),'إنّ تنصب الاسم وترفع الخبر.','Inna makes its noun accusative and raises its predicate.');
Q(20,'قارن ضبط «'+h+'» في: كان '+n+'ُ '+h+'اً / إنّ '+n+'َ '+h+'ٌ.','Compare predicate endings after kana and inna.',x('منصوب ثم مرفوع','Accusative then nominative'),x('مرفوع ثم منصوب','Nominative then accusative'),x('مجرور في الجملتين','Genitive in both'),'خبر كان منصوب وخبر إن مرفوع.','Kana predicate is accusative; inna predicate is nominative.');
Q(20,'صحح: إنّ '+n+'ُ '+h+'اً.','Correct the cases after inna.',x('إنّ '+n+'َ '+h+'ٌ','Correct accusative noun and nominative predicate'),x('إنّ '+n+'ُ '+h+'اً','Incorrect original'),x('إنّ '+n+'ِ '+h+'ٌ','Incorrect genitive noun'),'يجب نصب الاسم ورفع الخبر.','The noun must be accusative and predicate nominative.');
}
})();