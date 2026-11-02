(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-ar/controller.js",
      window.location.href,
    ).href;
  const LANGUAGE = document.documentElement.lang.toLowerCase();
  const LOCALE = LANGUAGE.startsWith("ko")
    ? "ko"
    : LANGUAGE.startsWith("ja")
      ? "ja"
      : "ar";
  const MANIFEST_URL = new URL(
    "manifest.json",
    CONTROLLER_URL,
  ).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    `beat-breeze-narration-invitation-seen-${LOCALE}`;
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-ar","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-ar.html","officialDeckSha256":"f7da50f3a923c01a1cf8ab024b1a32260c356de27b7faae26380607d2a826cc5","scriptPath":"public/presentations/narration/beat-breeze-ar/script.json","scriptSha256":"8930e38bb895dbea19adbe90083fff9f39416ad0999c41aca9c7354a72d9bc03","copyPath":"public/presentations/narration/beat-breeze-ar/copy.json","copySha256":"40361f79aa8ec0cfb904e02de9a91bb8fb8f10cb6f7c828a1ecff7baae839c20"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"خبيرة منتجات في Beat Breeze، دافئة ومهنية وتفهم تشغيل المواقع","scene":"جلسة تعريف طبيعية ومريحة مع مدير موقع، تتنقل فيها بين الشرائح المعروضة كما في عرض مباشر","style":"ودودة وواثقة وعملية. تشرح كيف يساعد Beat Breeze العميل فعليا، من دون تلاوة الشريحة أو استخدام نبرة إعلانية.","pacing":"إيقاع هادئ وطبيعي مع وقفات قصيرة بين الأفكار الرئيسية. تُنطق أسماء المنتجات بوضوح ومن دون مبالغة."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":934.5200000000001,"slides":[{"index":1,"id":"01-title","label":"الغلاف","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/01-title.mp3","text":"مرحبا، وشكرا لتخصيص هذا الوقت للتعرف إلى Beat Breeze. بدأت المنصة بوعد بسيط جدا: أن تعمل الموسيقى المناسبة دائما في كل مساحة داخل الموقع. لكن ما ستشاهدونه اليوم أصبح أوسع بكثير. فالمنصة نفسها تربط الآن الموسيقى والشاشات والإعلانات الصوتية وكل المحتوى المحيط بها عبر جميع المساحات التي تديرونها. لذلك، لا نقدم هنا مجرد مشغّل موسيقى. سنرى معا كيف يمكن لنظام واحد أن يساعد في إنشاء التجربة الإعلامية الكاملة داخل الموقع وتشغيلها.","visualCoverage":["منصة متكاملة لتجربة المكان","الموسيقى والشاشات والإعلانات والمحتوى","منصة واحدة لكل المساحات"],"transcriptSha256":"470a08dbf4412c5aa3ff813e64ae9122019f533a4aa47d086cd0f0202c320372","audioSha256":"ddb7b6353c7ae6d93f709643ad717c378b40dd9fe3deca019da27f918d67ae4a","durationSeconds":41.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.4,"loudnessRangeLu":2.4,"thresholdLufs":-28.85,"targetOffsetLu":0.06,"cached":true},{"id":"02-one-platform-many-jobs","label":"منصة واحدة، مهام متعددة","text":"يمكن اعتبار هذه الشريحة خريطة للمنصة كاملة، وهي مقسمة إلى ثلاثة أجزاء. على اليسار نجد الموسيقى والأتمتة: موسيقى مرخّصة لكل منطقة، وجدولا يعمل تلقائيا خلال اليوم، واقتراحات من Music Director بالذكاء الاصطناعي، واستمرارا في التشغيل عند انقطاع الإنترنت. في الوسط يأتي إنشاء المحتوى: ينشئ Compose موسيقى أصلية، ويصنع Content Studio الصور والفيديو، وتنقل TV Channels هذا المحتوى إلى الشاشات، بينما توصل الإعلانات متعددة اللغات رسائل الموقع بصوت واضح. تخدم الإعلانات الرسائل الفردية، بينما يقدم Radio محطة مستمرة بمقدّم خاص بنشاطكم. وعلى اليمين نجد التشغيل: جميع المواقع والمناطق وأعضاء الفريق والمشغّلات في لوحة تحكم واحدة، مع Brand Lock للحفاظ على معايير العلامة التجارية. يمكنكم الإدارة بأنفسكم أو إسناد تصميم الموسيقى والتشغيل إلى BMAsia. ولنبدأ الآن من الأساس: الموسيقى.","index":2,"src":"audio/20261102-radio-da973a20e948e818/02-one-platform-many-jobs.mp3","transcriptSha256":"2b7124ba57300d950b0870593687ccfe8e467592f55063f083565a014691909d","audioSha256":"1536b85b762d556f6e252d17e4435221fe068afa15e4b1cbf8392dc1766c2bd8","durationSeconds":74.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.32},{"index":3,"id":"03-music-that-runs-itself","label":"موسيقى تدير نفسها","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/03-music-that-runs-itself.mp3","text":"في قلب Beat Breeze نظام موسيقي يواكب إيقاع التشغيل طوال اليوم من دون حاجة الموظفين إلى التدخل المستمر. يمكن للردهة والبار والسبا والمطعم أن يحمل كل منها طابعا موسيقيا خاصا، بينما يراقب المكتب الرئيسي جميع المواقع من لوحة تحكم واحدة. تحددون التدفق مرة واحدة، مثل أجواء هادئة في الصباح وطاقة أعلى وقت الغداء ودفء أكبر في المساء، ثم تنتقل الموسيقى تلقائيا بين فترات اليوم. تشمل المكتبة حقوق الاستخدام التجاري وتستمر في النمو، ويمكنكم وصف الأجواء المطلوبة بجملة ليجمع المساعد قائمة التشغيل المناسبة. والأهم أن المشغّل الموجود في الموقع مصمم ليستمر في تشغيل الموسيقى حتى عند تعطل الاتصال بالإنترنت.","visualCoverage":["موسيقى لكل منطقة","الجداول وفترات اليوم","التشغيل من دون اتصال","مكتبة مرخّصة وقوائم تشغيل بمساعدة الذكاء الاصطناعي"],"transcriptSha256":"fd63618f716d645a3482dbbb16a3632dc046bd1e03107dd0ac712051fc33a42d","audioSha256":"deaf2f86a3dda32f00b3c2c11e7a191a1b453cf651d3b07dd76a3a07502404e5","durationSeconds":54.32,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.4,"loudnessRangeLu":3.3,"thresholdLufs":-29.01,"targetOffsetLu":0.31,"cached":true},{"index":4,"id":"04-automations","label":"الأتمتة","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/04-automations.mp3","text":"يغير الجدول الموسيقى وفقا للوقت، أما الأتمتة فتجعل الموقع يستجيب لما يحدث فعليا. يمكن خفض مستوى الصوت تلقائيا في وقت متأخر، وتحويل الطاقة من صباح هادئ إلى غداء أكثر حيوية ثم مساء مريح. عند هطول المطر أو ارتفاع الحرارة، يمكن الانتقال إلى موسيقى أكثر دفئا أو انتعاشا. وإذا تم ربط عداد الزوار أو بيانات نقاط البيع، تزداد الطاقة تلقائيا عندما يصبح المكان أكثر ازدحاما. كما يمكن إدارة مواقيت الصلاة وفترات اليوم والمواسم الاحتفالية والتواريخ الخاصة في النظام نفسه. تختارون قاعدة جاهزة أو تنشئون قاعدتكم الخاصة، وتستمر الأتمتة المهمة، بما فيها التوقف الهادئ أثناء الصلاة، حتى عند انقطاع الإنترنت.","visualCoverage":["مستوى الصوت ومنحنى الطاقة اليومي","الاستجابة للطقس ودرجة الحرارة","التشغيل حسب الازدحام أو بيانات نقاط البيع","مواقيت الصلاة والمواسم","أتمتة تعمل من دون اتصال"],"transcriptSha256":"bf9665dfed8201b4c6299880d36f353561be65849891cf3e340a46e3111ae313","audioSha256":"faa9bf33ebdea1827429490b210e2ace20d733206877f061a5c9836a294b6ee5","durationSeconds":48.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.42,"loudnessRangeLu":2.3,"thresholdLufs":-28.84,"targetOffsetLu":0.25,"cached":true},{"index":5,"id":"05-your-music-director","label":"Music Director الخاص بكم","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/05-your-music-director.mp3","text":"Music Director هو منسق موسيقي استباقي بالذكاء الاصطناعي داخل Beat Breeze. يراجع كل منطقة ليلا، ولا يقترح تغييرا إلا عندما يجد فرصة حقيقية للتحسين، وبحد أقصى ثلاثة اقتراحات في الأسبوع. أهم ما يوضحه المثال على الشاشة أنه لا يعرض الاقتراح فقط، بل يبين البيانات والسبب الذي يقف وراءه. أنتم تقررون القبول، ويمكن التراجع عن كل تغيير. ومع الوقت يتعلم النظام من السلوك الفعلي، مثل المقاطع التي يتم تجاوزها وتعديلات مستوى الصوت والاختيارات التي يقرر الفريق الاحتفاظ بها. ويستعد أيضا للمناسبات الموسمية مسبقا. وإذا ربطتم بيانات المبيعات أو عدد الزوار، يمكنكم مقارنة النتائج قبل تغيير الموسيقى وبعده بدلا من الاعتماد على الانطباع وحده.","visualCoverage":["مراجعة كل منطقة كل ليلة","اقتراحات محدودة مع أسباب واضحة","التعلم من السلوك الفعلي","الاستعداد المبكر للمواسم","تقارير قبل التغيير وبعده"],"transcriptSha256":"21636e0d49a31d664d7405ad81aebf53055e0e64d5e4744596dcb25d9537e3fb","audioSha256":"d0b0e8bd170e02871dc9741c8fd85eab405a59f5f6286f239f58bed5ba8262c7","durationSeconds":56.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.42,"loudnessRangeLu":2.6,"thresholdLufs":-29.01,"targetOffsetLu":0.24,"cached":true},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/06-compose.mp3","text":"ينقلكم Compose من اختيار الموسيقى إلى إنشائها. تصفون المشهد بلغة طبيعية، مثل مثال العشاء على ضوء الشموع الظاهر على الشاشة، فينشئ Beat Breeze مقاطع أصلية صممت خصيصا لتلك اللحظة. ولا يجب أن تكون النتيجة الأولى هي النسخة النهائية. يمكنكم إضافة جملة أخرى لتعديل الإحساس أو الإيقاع أو الآلات أو الغناء. القيمة بالنسبة إلى الموقع ليست فقط في قدرة الذكاء الاصطناعي على إنشاء مقطع موسيقي، بل في إمكانية تطوير هوية صوتية خاصة بحملة أو مساحة أو وقت خدمة، بدلا من الاعتماد دائما على قوائم تشغيل عامة يستخدمها الجميع.","visualCoverage":["إنشاء موسيقى أصلية من جملة","وصف إبداعي خاص بالموقع","تحسين النتيجة من خلال الحوار"],"transcriptSha256":"348c028f17261ecb5d97f7540af57321cfaa626cb28d0677ce93bc0c2d2b9454","audioSha256":"d3b8e159239077012bd99ca6c15bccdecd85ff1f1447216d4bf71587526d56aa","durationSeconds":43.76,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.31,"loudnessRangeLu":2.4,"thresholdLufs":-28.85,"targetOffsetLu":0.37,"cached":true},{"index":7,"id":"07-studio-and-screens","label":"الاستوديو والشاشات","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/07-studio-and-screens.mp3","text":"يمتد الأسلوب نفسه إلى المحتوى المرئي. يساعد Content Studio الفريق على إنشاء ما يحتاجه الموقع باستمرار، مثل منشورات التواصل الاجتماعي والملصقات الترويجية والفيديو القصير واللافتات الرقمية والمشاهد المتكررة، وكل ذلك باستخدام الشعار وألوان العلامة التجارية. ثم تنقل TV Channels المحتوى مباشرة من أداة التحرير إلى الشاشات التي تملكونها. يمكن لشاشة الردهة عرض عرض الليلة مع موسيقى المنطقة المناسبة، ويمكن للسبا تشغيل فيديو هادئ للعلامة، ويمكن للفندق توسيع القنوات نفسها إلى أجهزة التلفزيون داخل الغرف. وهكذا تجتمع أداة الإنشاء ونظام التوزيع في مكان واحد، بدلا من تحويل الشاشات الرقمية إلى مشروع منفصل.","visualCoverage":["صيغ Content Studio","تصميم متوافق مع العلامة التجارية","التوزيع عبر TV Channels","محتوى تلفزيونات غرف الفنادق"],"transcriptSha256":"589af577233f06bda8c1a8ee56edc1c6f51999583f2aee22cb835c0e33024193","audioSha256":"9a8e65628d763521382f8606ee670f8f8068e36e03075b63403eaedde6c20c7c","durationSeconds":50.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.42,"loudnessRangeLu":2,"thresholdLufs":-28.7,"targetOffsetLu":0.04,"cached":true},{"index":8,"id":"08-announcements","label":"الإعلانات الصوتية","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/08-announcements.mp3","text":"هذا هو الجزء الذي يضيف الصوت البشري إلى تجربة الموقع. تكتبون الرسالة، وتختارون اللغة والصوت والوقت، ثم يعمل الإعلان فوق الموسيقى. قد يكون إعلانا عن الساعة السعيدة، أو تنبيها لآخر طلب، أو رسالة ترحيب، أو معلومة تشغيلية. توضح الأمثلة الثلاثة على الشاشة كيف يمكن للموقع التواصل بلغات متعددة من دون حجز استوديو أو الاستعانة بمؤد صوتي لكل تسجيل. ويمكن للأداة نفسها إنتاج محتوى احترافي للانتظار على الهاتف يجمع الصوت والموسيقى. وبعبارة أخرى، تتم إدارة الموسيقى والرسائل المحيطة بها في مكان واحد.","visualCoverage":["إعلانات داخل الموقع بلغات متعددة","تشغيل مجدول فوق الموسيقى","محتوى صوتي للانتظار على الهاتف"],"transcriptSha256":"cfcb613b2a76f2e4f085e9a400a3dfd88b2a637b77488f074596226c66fb62fe","audioSha256":"cca70ba258a29bf65d41c7d69e9073cefee7d0ba45657a41911a76474b17e4b3","durationSeconds":45.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.59,"truePeakDbtp":-3.24,"loudnessRangeLu":2.8,"thresholdLufs":-28.92,"targetOffsetLu":0.36,"cached":true},{"id":"radio-your-station","label":"AI Radio","text":"تفيد الإعلانات عندما تريدون تشغيل رسالة محددة. أما Radio فيقدم برنامجا مستمرا بمقدّم خاص بنشاطكم. تابعوا التسلسل في الشريحة: تبدأ الموسيقى، ثم يدخل المقدّم بترحيب أو عرض قصير، وبعد ذلك تعود الموسيقى. في المقهى قد تكون الرسالة تذكيرا بمعجنات خرجت للتو من الفرن. وفي سلسلة متاجر قد تكون عرضا حاليا أو قصة عن العلامة التجارية. تختارون صوت المقدّم وشخصيته ولغاته، وتحددون عدد مرات حديثه. يمكنكم الاحتفاظ بالموسيقى التي تشغّلها مواقعكم حاليا، أو اختيار مزيج للمحطة، أو طلب خطة أسبوعية من الذكاء الاصطناعي. ويمكنكم الاستماع إلى نموذج مدته ساعة قبل بدء بث المحطة.","index":9,"src":"audio/20261102-radio-7370004e5bf24513/radio-your-station.mp3","transcriptSha256":"d08bf619e07156408ee058ccb6f2332d3e0734a5467861a849318b0e9792a85f","audioSha256":"7bc0248ff06308634af535ceb45db92c4ff391b48f34b1205bcc41a3390489a3","durationSeconds":51.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.41},{"id":"radio-across-locations","label":"Radio عبر مواقعكم","text":"عندما تديرون مجموعة مواقع، يحدد المقر الرئيسي المحطة، بينما تجعل النسخ الإقليمية المحتوى مناسبا لكل منطقة. توضح فروع هذا الرسم كيف يمكن لعلامة واحدة استخدام لغات مختلفة للمقدّم وعروض مختلفة في كل إقليم. وتُضاف معلومات الطقس عندما تكون ذات صلة بالمتاجر التي تستقبل تلك النسخة. يزوّد فريقكم النظام بحقائق العرض، مثل السعر والتواريخ. ويمكن لـ Radio تنويع الصياغة حول هذه الحقائق، مع مراجعة النص والتسجيل الصوتي قبل بث كل فقرة. يُجهّز البرنامج مسبقا، ولا يُرتجل مباشرة على الهواء. يستطيع المقر الرئيسي الاستماع إلى الفقرات القادمة، وإيقاف المحطة مؤقتا، وتخطي فقرة، ومنع استخدام مصدر مرة أخرى، والاطلاع على ما بُثّ بالفعل. يستخدم Radio أرصدة الذكاء الاصطناعي ويتطلب خطة Beat Breeze مدفوعة، لذلك يمكن تخطيط استخدامه إلى جانب أدوات الذكاء الاصطناعي الأخرى.","index":10,"src":"audio/20261102-radio-90c4f407f360710f/radio-across-locations.mp3","transcriptSha256":"476702330eeb0ba0dade9dee1e5e255d2875ad7136758c2ccc742b25d4b198a0","audioSha256":"e328c639f5d91e38aaa956eb70644985af29fe57d47c7a6c87e442e69773ee34","durationSeconds":71.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.43},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"يعمل مع Claude وChatGPT","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/09-works-with-claude-and-chatgpt.mp3","text":"إذا كان الفريق يستخدم Claude أو ChatGPT بالفعل، فيمكن أن يظهر Beat Breeze داخل نافذة المحادثة المألوفة نفسها. توضح الأمثلة استخدامات عملية: السؤال عما سيعمل مساء الجمعة، أو خفض مستوى صوت الردهة قليلا، أو إعداد جدول موسيقي جديد للسبا غدا. تظل الإجراءات الفورية خاضعة لصلاحيات المستخدم، أما تغييرات الجدول فتعرض للتأكيد قبل حفظها. يستخدم الاتصال مفاتيح آمنة يمكن إلغاؤها في أي وقت، لذلك يسهل إنهاء وصول أي شخص أو تكامل عندما لا يعود مطلوبا. الفائدة واضحة: يتعامل الفريق مع مهام الموسيقى اليومية بلغة طبيعية، مع بقاء التحكم النهائي لدى فريق التشغيل.","visualCoverage":["التحكم بلغة طبيعية","الاستفسار عن الجدول الحالي","التأكيد قبل تغيير الجداول","وصول آمن يمكن إلغاؤه"],"transcriptSha256":"c038e93f8b71d8846492eec718418dec5e720860e608ade59dd815abab3e0e9c","audioSha256":"75187c2a308d94494178ea3e594b614677ffe0db7a059c395fa95d10b5cd7a6d","durationSeconds":45.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.36,"loudnessRangeLu":3.2,"thresholdLufs":-28.9,"targetOffsetLu":-0.03,"cached":true},{"index":12,"id":"10-built-for-operators","label":"مصمم لفرق التشغيل","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/10-built-for-operators.mp3","text":"تعرض هذه الشريحة طريقتين للتشغيل. في الجزء العلوي تديرون Beat Breeze بأنفسكم: يغطي حساب واحد عدة مواقع ومناطق، ويحصل كل عضو في الفريق على الصلاحيات التي يحتاجها فقط، بينما يحافظ Brand Lock على الموسيقى المعتمدة في المناطق التي يجب أن تلتزم بمعيار العلامة التجارية. يعمل المشغّل على أجهزة الهاتف أو Windows أو المتصفح المدعوم الذي تملكونه بالفعل. ومع بطاقة صوت متعددة القنوات، يستطيع جهاز Windows واحد تشغيل عدة مناطق. وفي الجزء السفلي يظهر نموذج الإدارة بواسطة BMAsia. تظل المنصة نفسها، لكن فريقنا يضيف تصميم الموسيقى الخاص والدعم التقني على مدار الساعة وإدارة الحساب ومراقبة النظام. ويمكنكم اختيار مستوى الخدمة الأنسب لطريقة عمل مؤسستكم.","visualCoverage":["إدارة ذاتية لعدة مواقع","صلاحيات الفريق وBrand Lock","خيارات المشغّل ومناطق متعددة على Windows","خدمة تديرها BMAsia"],"transcriptSha256":"19d3b6d338b3adc8cb9cc0ad9a3cf829b28d43e96969dc1bffcbb19ef86b02a5","audioSha256":"184233a0099a911f0b2a0b0751ad5208ce9847c1893b14ab1b76c4bce225eb0b","durationSeconds":57.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.44,"loudnessRangeLu":2.7,"thresholdLufs":-28.88,"targetOffsetLu":0.37,"cached":true},{"index":13,"id":"11-never-go-silent","label":"الموسيقى لا تتوقف","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/11-never-go-silent.mp3","text":"لا تكون الميزات الإبداعية ذات قيمة حقيقية إلا عندما يعمل النظام بثبات داخل موقع مفتوح للعمل. ولهذا تظهر على الشاشة أربع طبقات من الحماية. يتم حفظ الجدول الأسبوعي والأتمتة والتوقفات الخاصة بمواقيت الصلاة محليا، فتستمر عند انقطاع الإنترنت، ثم تتم مزامنة سجل التشغيل عند عودة الاتصال. تراقب المنصة كل مشغّل وتعيد تشغيل أي جهاز يتوقف تلقائيا. ويرسل كل إعلان تقريرا يوضح الأجهزة التي شغلته بنجاح، حتى تعرفوا أنه وصل إلى كل مساحة مطلوبة. كما تتضمن شهادة الترخيص رمز استجابة سريعة للتحقق الفوري عند الحاجة. الهدف التقني كله نتيجة واحدة: ألا يشعر ضيوف الموقع بوجود مشكلة من الأساس.","visualCoverage":["تشغيل مستمر من دون اتصال","استعادة المشغّلات تلقائيا","تأكيد وصول الإعلانات","إثبات ترخيص فوري"],"transcriptSha256":"90c79b035ee1a99a52345aa37358e08943148bec084cc8f0a57853a3d45e728f","audioSha256":"bf36f90bea2c45e4a9705581e5a81494ab36bf5fc640ca3c70c3451b64340ed6","durationSeconds":55.32,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-3.44,"loudnessRangeLu":2.7,"thresholdLufs":-28.87,"targetOffsetLu":0.16,"cached":true},{"id":"12-why-beat-breeze","label":"لماذا Beat Breeze","text":"يجمع جدول المقارنة القصة كاملة. تمثل الموسيقى لكل منطقة والجداول التلقائية الأساس الذي تبدأ منه حلول كثيرة. لكن Beat Breeze يتجاوز هذا الأساس، فيضيف العمل من دون اتصال، والموسيقى الأصلية عبر Compose، وإنشاء الصور والفيديو، والإعلانات متعددة اللغات، ومحتوى الانتظار على الهاتف، وTV Channels التي تحمل هوية العلامة التجارية. ويضيف Radio محطة مستمرة بمقدّم يجمع قصص العلامة وعروضها مع الموسيقى. الفرق الحقيقي ليس علامة واحدة في الجدول. بل إن الموقع لا يحتاج إلى جمع نظام موسيقى وأداة إبداع ورسائل وشاشات من حلول منفصلة. يدير Beat Breeze التجربة داخل الموقع، ويساعد أيضا في إنشاء المحتوى الذي تتكون منه تلك التجربة.","index":14,"src":"audio/20261102-radio-ff51d2b7e564080c/12-why-beat-breeze.mp3","transcriptSha256":"62f7e3009584ee9842055b6bdd7f2aad9199837ff52f77e59a020b62f147b375","audioSha256":"66408240ada7fbc383b8b7ab73a3c73f9cc8ee661c22601927ab6df39b12f273","durationSeconds":58.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.24},{"id":"13-pricing","label":"الأسعار","text":"يمكنكم إدارة الموسيقى بأنفسكم، أو ترك المهمة لفريق BMAsia. تبلغ تكلفة الخدمة الذاتية 15 دولارا أمريكيا لكل منطقة شهريا. وإذا اخترتم الدفع السنوي، فالتكلفة 150 دولارا أمريكيا لكل منطقة سنويا. تشمل خطتا الخدمة الذاتية ميزات التطبيق، وتتولون فيهما إدارة قوائم التشغيل والجداول بأنفسكم. أما خدمة BMAsia المدارة فتبلغ 260 دولارا أمريكيا لكل منطقة سنويا، وهي متاحة ضمن خطط سنوية فقط. وتشمل هذه الخطة إدارة الموسيقى ومحطة Radio من قبل BMAsia. يختار فريقنا لتصميم الموسيقى قوائم التشغيل والجداول المخصصة لكل منطقة ويجددها، بما يناسب المواسم والمناسبات. وتشمل الخدمة أيضا دعما تقنيا على مدار الساعة طوال أيام الأسبوع ومدير حساب مخصصا. تُحتسب أرصدة توليد المحتوى الإضافية بالذكاء الاصطناعي برسوم منفصلة. جميع العملاء يحصلون على تحديثات التطبيق المستمرة أيا كانت خطتهم. الفرق هو من يتولى العناية بالموسيقى اليومية في المكان. ويمكن تجربة الخدمة الذاتية مجانا لمدة 14 يوما لمنطقة واحدة، وتتطلب بطاقة من دون أي رسوم عند البدء. وإذا رتبت BMAsia التجربة لكم، فلا حاجة إلى بطاقة. وللمؤسسات الكبيرة عقود وطرق فوترة مخصصة، ولا يلزم شراء صندوق تشغيل خاص.","index":15,"src":"audio/20261102-radio-87ee05a71c925633/13-pricing.mp3","transcriptSha256":"dd5136c8956c6897f042b153e95de3fd0b4a23bf38ef6af6a2e701ec513c6ad0","audioSha256":"81d162355329cc15acec3224cbe647698df2c3bad1a13549b0645862b467a683","durationSeconds":93.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.63,"truePeakDbtp":-3.39},{"index":16,"id":"14-whos-behind-it","label":"الفريق وراء Beat Breeze","src":"../beat-breeze-ar/audio/20260903-5cfd5c50ab12/14-whos-behind-it.mp3","text":"تقف وراء Beat Breeze شركة BMAsia، وهي فريق يصمم الموسيقى للفنادق والمطاعم ومتاجر التجزئة ومرافق العافية منذ عام 2002. وتهم هذه الخبرة لأن المنصة لم تتشكل بالتقنية وحدها. يشارك مصممو موسيقى محترفون يعملون في المجال في تحديد أسلوب تنسيق المحتوى وكيف يفهم الذكاء الاصطناعي طبيعة كل نوع من المساحات. كما يتوفر فريق الخبراء لدينا للمساعدة على مدار الساعة، وتتطور خريطة طريق المنتج انطلاقا من الاحتياجات الفعلية التي تشاركها فرق التشغيل معنا. لذلك، عندما تختارون Beat Breeze، تحصلون على تقنية حديثة يدعمها فعليا فريق موسيقي وفريق خدمة يتمتعان بخبرة طويلة.","visualCoverage":["خبرة BMAsia منذ عام 2002","مصممو موسيقى محترفون يوجهون التنسيق","فريق خبراء على مدار الساعة وخريطة طريق تقودها احتياجات التشغيل"],"transcriptSha256":"7d7520fc36d80612e1ceeae679e1fc0b711aa219e62a553f7f768fe488451337","audioSha256":"b405d9776349c697af0082afdaf38c465a9b78449f9705521dc6843aa7cf27c0","durationSeconds":52.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.1,"loudnessRangeLu":3.3,"thresholdLufs":-28.81,"targetOffsetLu":0.71,"cached":false},{"id":"15-close","label":"ابدأ الآن","text":"هذا هو Beat Breeze اليوم: الموسيقى في قلبه، وحولها الشاشات والمحتوى والإعلانات، والآن Radio أيضا. إذا كنتم تستخدمون Beat Breeze بالفعل، فاستكشفوا الأدوات في حسابكم واستمعوا إلى نموذج لمحطتكم الخاصة. يتطلب Radio خطة مدفوعة ويستخدم أرصدة الذكاء الاصطناعي. وإذا كنتم في بداية الطريق، فزوروا beatbreeze.io أو تواصلوا مع Norbert في BMAsia. سنساعدكم في اختيار نقطة البداية المناسبة لمواقعكم.","index":17,"src":"audio/20261102-radio-79a90a70951ad098/15-close.mp3","transcriptSha256":"f528a3d85c6c59411da8f07fc57a7111e4e4ce7d9346de206c793df7c92a5728","audioSha256":"c86bfaffdef210f99bc275f525b3ec1020a972b3c272514580d4d4b194c7e8ff","durationSeconds":34.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.44}],"qualityAssurance":{"record":"docs/beat-breeze-radio-ar-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};
  const COPY = {
    ko: {
      loading: ["내레이션 불러오는 중", "불러오는 중", "내레이션을 불러오는 중입니다"],
      pending: ["음성 준비 중", "준비 중", "내레이션 음성을 준비하고 있습니다"],
      idle: ["내레이션 시작", "시작", "내레이션 시작"],
      playing: ["내레이션 켜짐", "음성 켜짐", "내레이션 음소거"],
      muted: ["내레이션 계속", "계속", "내레이션 계속 재생"],
      replay: ["다시 재생", "다시", "내레이션 프레젠테이션 다시 재생"],
      error: ["오디오 다시 시도", "다시 시도", "내레이션 오디오 다시 시도"],
      unavailable: ["음성 없음", "없음", "이 슬라이드에는 내레이션이 없습니다"],
      preparing: "내레이션 음성을 준비하고 있습니다.",
      unavailableSentence: "이 슬라이드에는 내레이션이 없습니다.",
      playingSentence: (slide) => `${slide}번 슬라이드 내레이션을 재생합니다.`,
      failed: "내레이션을 재생할 수 없습니다. 다시 시도해 주세요.",
      off: "내레이션을 껐습니다.",
      complete: "내레이션 프레젠테이션이 끝났습니다.",
      audioFailed: "내레이션 오디오를 불러올 수 없습니다.",
      toolbar: "프레젠테이션 제어",
      narration: "내레이션",
      voice: "음성",
      invitationLabel: "내레이션 시작 안내",
      invitation: "설명과 함께 보시겠어요?",
      invitationStart: "내레이션 시작",
      invitationDismiss: "내레이션 안내 닫기",
      ready: "내레이션을 재생할 수 있습니다.",
      manifestFailed: "Beat Breeze 내레이션 파일을 불러오지 못했습니다",
      retry: "내레이션을 불러올 수 없습니다. 다시 시도해 주세요.",
    },
    ja: {
      loading: ["ナレーション読込中", "読込中", "ナレーションを読み込んでいます"],
      pending: ["音声準備中", "準備中", "ナレーション音声を準備しています"],
      idle: ["ナレーション開始", "開始", "ナレーションを開始"],
      playing: ["ナレーション再生中", "音声オン", "ナレーションをミュート"],
      muted: ["ナレーション再開", "再開", "ナレーションを再開"],
      replay: ["もう一度再生", "再生", "ナレーション付きプレゼンテーションをもう一度再生"],
      error: ["音声を再試行", "再試行", "ナレーション音声を再試行"],
      unavailable: ["音声なし", "利用不可", "このスライドにはナレーションがありません"],
      preparing: "ナレーション音声を準備しています。",
      unavailableSentence: "このスライドにはナレーションがありません。",
      playingSentence: (slide) => `${slide}枚目のナレーションを再生しています。`,
      failed: "ナレーションを再生できませんでした。もう一度お試しください。",
      off: "ナレーションを停止しました。",
      complete: "ナレーション付きプレゼンテーションが終了しました。",
      audioFailed: "ナレーション音声を読み込めませんでした。",
      toolbar: "プレゼンテーション操作",
      narration: "ナレーション",
      voice: "音声",
      invitationLabel: "ナレーション開始の案内",
      invitation: "解説付きでご覧になりますか？",
      invitationStart: "ナレーション開始",
      invitationDismiss: "ナレーションの案内を閉じる",
      ready: "ナレーションを再生できます。",
      manifestFailed: "Beat Breezeのナレーションファイルを読み込めませんでした",
      retry: "ナレーションを読み込めません。もう一度お試しください。",
    },
    ar: {
      loading: ["جارٍ تحميل السرد", "جارٍ التحميل", "جارٍ تحميل السرد الصوتي"],
      pending: ["الصوت قيد الإعداد", "قيد الإعداد", "جارٍ إعداد السرد الصوتي"],
      idle: ["ابدأ السرد", "ابدأ", "بدء السرد الصوتي"],
      playing: ["السرد يعمل", "الصوت يعمل", "كتم السرد الصوتي"],
      muted: ["استئناف السرد", "استئناف", "استئناف السرد الصوتي"],
      replay: ["إعادة التشغيل", "إعادة", "إعادة العرض التقديمي مع السرد"],
      error: ["إعادة محاولة الصوت", "إعادة المحاولة", "إعادة محاولة تحميل السرد"],
      unavailable: ["الصوت غير متاح", "غير متاح", "لا يتوفر سرد لهذه الشريحة"],
      preparing: "جارٍ إعداد السرد الصوتي.",
      unavailableSentence: "لا يتوفر سرد لهذه الشريحة.",
      playingSentence: (slide) => `يعمل الآن سرد الشريحة ${slide}.`,
      failed: "تعذر تشغيل السرد. يرجى المحاولة مرة أخرى.",
      off: "تم إيقاف السرد.",
      complete: "اكتمل العرض التقديمي المصحوب بالسرد.",
      audioFailed: "تعذر تحميل ملف السرد الصوتي.",
      toolbar: "عناصر التحكم في العرض",
      narration: "السرد",
      voice: "الصوت",
      invitationLabel: "دعوة لبدء السرد",
      invitation: "هل تفضلون النسخة المصحوبة بالشرح؟",
      invitationStart: "ابدأ السرد",
      invitationDismiss: "إغلاق دعوة السرد",
      ready: "السرد جاهز للتشغيل.",
      manifestFailed: "تعذر تحميل ملفات سرد Beat Breeze",
      retry: "تعذر تحميل السرد. حاولوا مرة أخرى.",
    },
  }[LOCALE];

  const ICONS = {
    idle: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3.5 8h3l3.6-3v10l-3.6-3h-3z" fill="currentColor"></path>
        <path d="M13 7.1a4 4 0 0 1 0 5.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="m14.3 4.5 3.2 2-3.2 2z" fill="#EFA634"></path>
      </svg>`,
    playing: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="M12.7 7.2a4 4 0 0 1 0 5.6M15 5a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
      </svg>`,
    muted: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M3 8h3l3.8-3.1v10.2L6 12H3z" fill="currentColor"></path>
        <path d="m13.1 7.2 4.1 4.1m0-4.1-4.1 4.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>`,
    loading: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="25 13"></circle>
      </svg>`,
    replay: `
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.1 6.7A6 6 0 1 1 4 11.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
        <path d="M2.7 4.6v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
  };

  const audio = new Audio();
  audio.preload = "metadata";
  audio.setAttribute("playsinline", "");

  let stage;
  let toolbar;
  let button;
  let icon;
  let label;
  let shortLabel;
  let liveRegion;
  let invitation;
  let invitationTimer;
  let manifest;
  let manifestPromise;
  let currentIndex = 0;
  let narrationEnabled = false;
  let narrationStarted = false;
  let completed = false;
  let advanceTimer;
  let pausedForVisibility = false;
  let playbackRequest = 0;

  const clearAdvanceTimer = () => {
    window.clearTimeout(advanceTimer);
    advanceTimer = undefined;
  };

  const dismissInvitation = ({ remember = true } = {}) => {
    window.clearTimeout(invitationTimer);
    invitationTimer = undefined;
    if (invitation) invitation.hidden = true;
    if (remember) {
      try {
        window.sessionStorage.setItem(INVITATION_SESSION_KEY, "1");
      } catch {
        // The invitation still works when browser storage is unavailable.
      }
    }
  };

  const showInvitation = () => {
    if (!invitation) return;
    try {
      if (window.sessionStorage.getItem(INVITATION_SESSION_KEY) === "1") return;
    } catch {
      // Show once for this page load when browser storage is unavailable.
    }
    invitation.hidden = false;
    toolbar.classList.add("narration-discovery");
    invitationTimer = window.setTimeout(
      () => dismissInvitation(),
      INVITATION_MS,
    );
  };

  const activeSlideIndex = () => {
    const slides = [...stage.querySelectorAll(":scope > section")];
    const index = slides.findIndex((slide) =>
      slide.hasAttribute("data-deck-active"),
    );
    return Math.max(0, index);
  };

  const announce = (message) => {
    if (liveRegion) liveRegion.textContent = message;
  };

  const setProgress = (value) => {
    if (!button) return;
    const clamped = Math.min(1, Math.max(0, Number(value) || 0));
    button.style.setProperty(
      "--narration-progress",
      `${(clamped * 100).toFixed(2)}%`,
    );
  };

  const setButtonState = (stateName) => {
    if (!button) return;

    const states = {
      loading: {
        icon: ICONS.loading,
        visible: COPY.loading[0],
        short: COPY.loading[1],
        pressed: "false",
        label: COPY.loading[2],
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: COPY.pending[0],
        short: COPY.pending[1],
        pressed: "false",
        label: COPY.pending[2],
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: COPY.idle[0],
        short: COPY.idle[1],
        pressed: "false",
        label: COPY.idle[2],
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: COPY.playing[0],
        short: COPY.playing[1],
        pressed: "true",
        label: COPY.playing[2],
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: COPY.muted[0],
        short: COPY.muted[1],
        pressed: "false",
        label: COPY.muted[2],
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: COPY.replay[0],
        short: COPY.replay[1],
        pressed: "false",
        label: COPY.replay[2],
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: COPY.error[0],
        short: COPY.error[1],
        pressed: "false",
        label: COPY.error[2],
        disabled: false,
      },
    };

    const state = states[stateName];
    button.dataset.state = stateName;
    button.disabled = state.disabled;
    button.setAttribute("aria-pressed", state.pressed);
    button.setAttribute("aria-label", state.label);
    button.setAttribute(
      "aria-busy",
      stateName === "loading" ? "true" : "false",
    );
    button.title = state.label;
    icon.innerHTML = state.icon;
    label.textContent = state.visible;
    shortLabel.textContent = state.short;
  };

  const loadManifest = async () => {
    if (manifest) return manifest;
    if (window.location.protocol === "file:") {
      manifest = LOCAL_FALLBACK_MANIFEST;
      return manifest;
    }
    if (!manifestPromise) {
      manifestPromise = fetch(MANIFEST_URL, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Narration manifest returned ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Narration manifest does not match this deck");
          }
          manifest = value;
          return value;
        })
        .catch((error) => {
          manifestPromise = undefined;
          throw error;
        });
    }
    return manifestPromise;
  };

  const slideAudio = (index) =>
    manifest?.slides?.find((slide) => slide.index === index + 1);

  const isFinalNarratedSlide = (index) => {
    const indexes = manifest?.slides
      ?.map((slide) => Number(slide.index) - 1)
      .filter(Number.isInteger);
    return indexes?.length ? index === Math.max(...indexes) : true;
  };

  const setNarrationUnavailable = () => {
    setButtonState("unavailable");
    label.textContent = COPY.unavailable[0];
    shortLabel.textContent = COPY.unavailable[1];
    button.setAttribute(
      "aria-label",
      COPY.unavailable[2],
    );
    button.title = COPY.unavailable[2];
  };

  const failPlayback = (message) => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("error");
    announce(message);
  };

  const playCurrentSlide = async ({ restart = false } = {}) => {
    clearAdvanceTimer();
    const request = ++playbackRequest;
    const requestedIndex = currentIndex;

    try {
      const data = await loadManifest();
      if (request !== playbackRequest || requestedIndex !== currentIndex) return;
      if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
        narrationEnabled = false;
        setButtonState("unavailable");
        announce(COPY.preparing);
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
        return;
      }

      const nextSource = new URL(slide.src, MANIFEST_URL).href;
      const sourceChanged = audio.src !== nextSource;
      if (sourceChanged) {
        audio.src = nextSource;
        audio.load();
      } else if (restart) {
        audio.currentTime = 0;
      }

      narrationEnabled = true;
      narrationStarted = true;
      completed = false;
      setButtonState("playing");
      announce(COPY.playingSentence(currentIndex + 1));
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Beat Breeze narration playback failed", error);
      failPlayback(COPY.failed);
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce(COPY.off);
  };

  const handleToggle = async () => {
    dismissInvitation();
    toolbar.classList.remove("narration-discovery");

    if (completed) {
      narrationEnabled = true;
      completed = false;
      setButtonState("playing");
      if (currentIndex === 0) {
        await playCurrentSlide({ restart: true });
      } else {
        stage.goTo(0);
      }
      return;
    }

    if (narrationEnabled) {
      turnNarrationOff();
      return;
    }

    await playCurrentSlide({ restart: true });
  };

  const handleSlideChange = (event) => {
    clearAdvanceTimer();
    currentIndex = Number.isInteger(event.detail?.index)
      ? event.detail.index
      : activeSlideIndex();
    completed = false;
    setProgress(0);

    const hasNarration = Boolean(slideAudio(currentIndex)?.src);

    if (narrationEnabled && hasNarration) {
      void playCurrentSlide({ restart: true });
    } else {
      if (narrationEnabled) {
        playbackRequest += 1;
        narrationEnabled = false;
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      if (!hasNarration) {
        setNarrationUnavailable();
        announce(COPY.unavailableSentence);
      } else {
        setButtonState(narrationStarted ? "muted" : "idle");
      }
    }
  };

  const addStyles = (root) => {
    if (root.querySelector("#beat-breeze-narration-styles")) return;
    const style = document.createElement("style");
    style.id = "beat-breeze-narration-styles";
    style.textContent = `
      .overlay.narration-discovery {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .overlay:focus-within {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0) scale(1);
        filter: blur(0);
      }

      .narration-toggle {
        --narration-progress: 0%;
        position: relative;
        width: 140px;
        min-width: 140px;
        padding: 0 10px !important;
        gap: 7px;
        overflow: hidden;
        cursor: pointer !important;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: rgba(255,255,255,0.82) !important;
      }

      .narration-toggle::after {
        content: "";
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 2px;
        height: 1px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          #EFA634 0 var(--narration-progress),
          rgba(255,255,255,0.12) var(--narration-progress) 100%
        );
        opacity: 0;
        transition: opacity 160ms ease;
      }

      .narration-toggle[data-state="idle"] {
        background: rgba(239,166,52,0.16);
        color: #fff !important;
      }

      .narration-toggle[data-state="playing"] {
        background: rgba(239,166,52,0.2);
        color: #EFA634 !important;
        box-shadow: inset 0 0 0 1px rgba(239,166,52,0.28);
      }

      .narration-toggle[data-state="playing"]::after {
        opacity: 1;
      }

      .narration-toggle[data-state="loading"] .narration-icon svg {
        animation: narration-spin 900ms linear infinite;
      }

      .narration-toggle[data-state="unavailable"] {
        cursor: default !important;
        opacity: 0.56;
      }

      .narration-toggle[data-state="error"] {
        background: rgba(255,255,255,0.1);
      }

      .narration-toggle:focus-visible {
        outline: 2px solid #EFA634 !important;
        outline-offset: 2px !important;
      }

      .narration-icon {
        position: relative;
        width: 18px;
        min-width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .narration-icon svg {
        width: 18px !important;
        height: 18px !important;
      }

      .narration-toggle[data-state="playing"] .narration-icon::after {
        content: "";
        position: absolute;
        top: -1px;
        right: -1px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #EFA634;
        box-shadow: 0 0 0 3px rgba(239,166,52,0.12);
      }

      .narration-label {
        white-space: nowrap;
      }

      .narration-label-short { display: none; }

      .narration-invitation[hidden] { display: none !important; }

      .narration-invitation {
        position: fixed;
        left: 50%;
        bottom: 84px;
        z-index: 120;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: min(430px, calc(100vw - 28px));
        padding: 12px 14px 12px 18px;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 14px;
        background: rgba(20,20,20,0.96);
        box-shadow: 0 18px 44px rgba(0,0,0,0.38);
        color: rgba(255,255,255,0.82);
        font: 500 13px/1.35 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        animation: narration-invitation-in 240ms ease-out both;
      }

      .narration-invitation::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 10px;
        height: 10px;
        transform: translateX(-50%) rotate(45deg);
        border-right: 1px solid rgba(255,255,255,0.14);
        border-bottom: 1px solid rgba(255,255,255,0.14);
        background: rgba(20,20,20,0.96);
      }

      .narration-invitation-copy { white-space: nowrap; }

      .narration-invitation-start {
        appearance: none;
        border: 0;
        border-radius: 999px;
        padding: 8px 12px;
        background: #EFA634;
        color: #111;
        cursor: pointer;
        font: 700 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        white-space: nowrap;
      }

      .narration-invitation-start:focus-visible,
      .narration-invitation-dismiss:focus-visible {
        outline: 2px solid #EFA634;
        outline-offset: 2px;
      }

      .narration-invitation-dismiss {
        appearance: none;
        width: 28px;
        min-width: 28px;
        height: 28px;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: rgba(255,255,255,0.58);
        cursor: pointer;
        font: 400 18px/1 sans-serif;
      }

      .narration-sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      @keyframes narration-spin {
        to { transform: rotate(360deg); }
      }

      @keyframes narration-invitation-in {
        from { opacity: 0; transform: translate(-50%, 8px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }

      @media (max-width: 520px) {
        .btn.reset,
        .reset-divider { display: none !important; }
        .narration-invitation {
          width: calc(100vw - 28px);
          bottom: 88px;
          gap: 8px;
          padding-left: 14px;
          box-sizing: border-box;
        }
        .narration-invitation-copy { white-space: nowrap; }
      }

      @media (max-width: 360px) {
        .narration-toggle {
          width: 96px;
          min-width: 96px;
        }
        .narration-label { display: none; }
        .narration-label-short { display: inline; white-space: nowrap; }
        .narration-invitation {
          gap: 6px;
          padding: 10px 12px;
        }
        .narration-invitation-copy { font-size: 12px; }
        .narration-invitation-start { padding: 7px 10px; }
      }

      @media (pointer: coarse) {
        .overlay {
          bottom: max(22px, env(safe-area-inset-bottom));
        }
        .narration-toggle {
          height: 44px;
          width: 140px;
          min-width: 140px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .narration-toggle[data-state="loading"] .narration-icon svg {
          animation: none;
        }
        .narration-invitation { animation: none; }
      }
    `;
    root.append(style);
  };

  const install = () => {
    stage = document.querySelector("deck-stage");
    const root = stage?.shadowRoot;
    toolbar = root?.querySelector('[role="toolbar"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-narration-toggle")) return true;

    addStyles(root);
    toolbar.setAttribute("aria-label", COPY.toolbar);

    const divider = document.createElement("span");
    divider.className = "divider narration-divider";
    divider.setAttribute("aria-hidden", "true");

    button = document.createElement("button");
    button.id = "beat-breeze-narration-toggle";
    button.className = "btn narration-toggle";
    button.type = "button";
    button.setAttribute("aria-keyshortcuts", "M");
    button.innerHTML = `
      <span class="narration-icon" aria-hidden="true"></span>
      <span class="narration-label">${COPY.narration}</span>
      <span class="narration-label-short">${COPY.voice}</span>
    `;
    icon = button.querySelector(".narration-icon");
    label = button.querySelector(".narration-label");
    shortLabel = button.querySelector(".narration-label-short");

    const resetButton = toolbar.querySelector(".btn.reset");
    if (resetButton?.previousElementSibling?.classList.contains("divider")) {
      resetButton.previousElementSibling.classList.add("reset-divider");
    }

    liveRegion = document.createElement("span");
    liveRegion.className = "narration-sr-only";
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", "polite");

    toolbar.append(divider, button, liveRegion);

    invitation = document.createElement("div");
    invitation.className = "narration-invitation";
    invitation.hidden = true;
    invitation.setAttribute("role", "group");
    invitation.setAttribute("aria-label", COPY.invitationLabel);
    invitation.innerHTML = `
      <span class="narration-invitation-copy">${COPY.invitation}</span>
      <button class="narration-invitation-start" type="button">${COPY.invitationStart}</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="${COPY.invitationDismiss}">×</button>
    `;
    root.append(invitation);
    setButtonState("loading");
    currentIndex = activeSlideIndex();

    button.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-start")
      ?.addEventListener("click", () => void handleToggle());
    invitation
      .querySelector(".narration-invitation-dismiss")
      ?.addEventListener("click", () => dismissInvitation());
    stage.addEventListener("slidechange", handleSlideChange);
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if (!isTyping && event.key.toLowerCase() === "m" && !button.disabled) {
        event.preventDefault();
        void handleToggle();
      } else if (!isTyping && event.key === "Escape" && !invitation.hidden) {
        event.preventDefault();
        dismissInvitation();
      }
    });

    audio.addEventListener("timeupdate", () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    });
    audio.addEventListener("ended", () => {
      setProgress(1);
      if (!narrationEnabled) return;
      const nextSlideHasNarration = Boolean(slideAudio(currentIndex + 1)?.src);
      if (!isFinalNarratedSlide(currentIndex) && nextSlideHasNarration) {
        advanceTimer = window.setTimeout(() => stage.next(), ADVANCE_DELAY_MS);
      } else {
        narrationEnabled = false;
        completed = true;
        setButtonState("replay");
        announce(COPY.complete);
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback(COPY.audioFailed);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && narrationEnabled && !audio.paused) {
        pausedForVisibility = true;
        audio.pause();
      } else if (!document.hidden && pausedForVisibility && narrationEnabled) {
        pausedForVisibility = false;
        void audio.play().catch(() => turnNarrationOff());
      }
    });

    void loadManifest()
      .then((data) => {
        if (!data.ready || !Array.isArray(data.slides) || !data.slides.length) {
          setButtonState("unavailable");
          return;
        }
        if (slideAudio(currentIndex)?.src) {
          setButtonState("idle");
          announce(COPY.ready);
        } else {
          setNarrationUnavailable();
          announce(COPY.unavailableSentence);
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error(COPY.manifestFailed, error);
        setButtonState("error");
        announce(COPY.retry);
      });

    return true;
  };

  if (install()) return;

  const observer = new MutationObserver(() => {
    if (install()) {
      observer.disconnect();
      window.clearInterval(installPoll);
    }
  });
  const installPoll = window.setInterval(() => {
    if (install()) {
      window.clearInterval(installPoll);
      observer.disconnect();
    }
  }, 100);
  observer.observe(document, { childList: true, subtree: true });
  window.setTimeout(() => {
    observer.disconnect();
    window.clearInterval(installPoll);
  }, 10000);
})();
