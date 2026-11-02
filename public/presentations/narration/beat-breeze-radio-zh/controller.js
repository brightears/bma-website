(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-zh/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-narration-invitation-seen-zh";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-zh","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-zh.html","officialDeckSha256":"9281d6eec33b24bcdd4342f03f6c45a5a23589c418c35d4731b9c5b06d98bfd6","scriptPath":"public/presentations/narration/beat-breeze-zh/script.json","scriptSha256":"68c4f9eed50548fa9945a5c91d6b3470634903d8413042dd779fb3c241d8d111","copyPath":"public/presentations/narration/beat-breeze-zh/copy.json","copySha256":"48fdc773f0a721ca35c11f94ca8555320bac14f8c72dc7573dee60636d57dd1c"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"一位温暖、专业、理解场所运营的 Beat Breeze 产品专家","scene":"面向一位场所管理者进行自然的一对一演示，讲解屏幕上正在展示的内容","style":"亲切、自信、自然，像在帮助客户理解 Beat Breeze 如何支持场所运营，而不是照读幻灯片或配广告旁白","pacing":"语速从容，不急促；重要概念之间有短暂停顿；产品名称发音清晰，但不过度强调"}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":746.8,"slides":[{"index":1,"id":"01-title","label":"封面","src":"../beat-breeze-zh/audio/20260902-59014dd083de/01-title.mp3","text":"您好，欢迎了解 Beat Breeze。它最初有一个很简单的承诺：让合适的音乐在场所的每个区域稳定播放。今天您看到的，已经远不止一个音乐播放器。同一个平台现在把音乐、屏幕、语音通知，以及这些媒体所需要的内容整合在一起，覆盖您运营的每一个空间。所以接下来我们看的，不只是如何播放音乐，而是一个系统如何帮助您打造并管理完整的场所媒体体验。","visualCoverage":["一体化场所体验平台","音乐、屏幕、通知与内容","一个平台覆盖所有空间"],"transcriptSha256":"92f7387d9810d7fc20a73442e5ec2adcb2c7ea9074903ddbf35853fc718c79a1","audioSha256":"237597af7188598c43c9767a0f316d4ef4a995260567ac8d41dd57d6ea8d2e72","durationSeconds":32.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.61,"truePeakDbtp":-3.41,"loudnessRangeLu":2.5,"thresholdLufs":-28.84,"targetOffsetLu":0.39,"cached":false},{"id":"02-one-platform-many-jobs","label":"一个平台，多种任务","text":"这一页可以看作整个平台的地图，分为三个部分。左边是音乐与自动化：每个分区都有商业授权音乐，排期自动运行全天，Music Director 提供 AI 建议，即使断网也能继续播放。中间是内容创作：Compose 生成原创音乐，Content Studio 制作图片和视频，TV Channels 把内容送上屏幕，语音通知则让场所可以用多种语言沟通。语音通知用于单次消息，而 Radio 为您的业务提供持续运行、带主持人的电台。右边是运营管理：所有场所、分区、团队成员和播放器都在一个控制台中，需要保持一致时还可以锁定品牌设置。您可以自行管理，也可以加入 BMAsia 的音乐设计与支持服务。下面我们先从平台的核心，也就是音乐开始。","index":2,"src":"audio/20261102-radio-4f38d0df2b04853d/02-one-platform-many-jobs.mp3","transcriptSha256":"40ea48cf429eaf06c5f206243f7703a8f99b37c99cccf7476aed01f83e93a461","audioSha256":"e3f088d052aff8009e8068ca4424d8f5a11f6e517960eb6eb0942571ba0aad98","durationSeconds":55.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.42},{"index":3,"id":"03-music-that-runs-itself","label":"自动运行的音乐","src":"../beat-breeze-zh/audio/20260902-59014dd083de/03-music-that-runs-itself.mp3","text":"Beat Breeze 的核心，是让音乐在无需持续人工干预的情况下，照顾场所一整天的节奏。大堂、酒吧、水疗中心和餐厅都可以拥有各自的声音，总部则能从一个控制台查看所有物业。您只需设定一天的走向，例如早晨平静、午餐时段更有活力、晚上更温暖，系统就会按时段自动切换。曲库具备商业使用授权并持续扩充；您也可以描述想要的氛围，让助手组合合适的播放列表。更重要的是，如果互联网中断，本地播放器仍会继续播放，让场所保持正常运作。","visualCoverage":["每个分区使用不同音乐","智能排期与时段管理","离线播放","授权曲库与 AI 播放列表"],"transcriptSha256":"40e76940407686c0889a11fdc8e63b67f9397e77f8bd74fd7f9f576e0d30111d","audioSha256":"544a913a092d23d28f221eb5eab9ec0039f39aa4e0cb7f9b7d6a235d481d723a","durationSeconds":43.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.37,"loudnessRangeLu":2.5,"thresholdLufs":-28.87,"targetOffsetLu":0.11,"cached":false},{"index":4,"id":"04-automations","label":"自动化","src":"../beat-breeze-zh/audio/20260902-59014dd083de/04-automations.mp3","text":"排期会按时间切换音乐，而自动化可以让场所根据真实发生的情况作出反应。夜间安静时段可以自动降低音量；一天的能量曲线可以从平静逐渐变得活跃，再回到放松状态。天气或温度变化时，系统可以切换到更温暖或更清凉的音乐。如果接入客流计数器或 POS 数据，客人增多时也能自动提升能量。每日礼拜时间、不同时段、季节日期和节日，都可以纳入同一个系统。您可以从现成方案开始，也可以建立自己的规则；包括礼拜暂停在内的关键自动化，在场所离线时仍会继续运行。","visualCoverage":["时间与音量规则","天气和温度响应","客流或 POS 触发","礼拜时间、时段与节日安排","离线自动化"],"transcriptSha256":"a756870ee8d243543688ed48f885edadb801b192091bdb1c42d3fda9db9e2679","audioSha256":"0c1750bf7802d0e85c57e4c80af8310231a09d0b51100dc1722011cf7109626c","durationSeconds":43.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.36,"loudnessRangeLu":2.5,"thresholdLufs":-28.85,"targetOffsetLu":0.16,"cached":false},{"index":5,"id":"05-your-music-director","label":"您的 Music Director","src":"../beat-breeze-zh/audio/20260902-59014dd083de/05-your-music-director.mp3","text":"Music Director 是 Beat Breeze 内置的主动式 AI 音乐策划助手。它会在夜间检查每个分区，只有发现值得改善的地方才提出建议，而且每周最多三条。屏幕上的例子展示了最重要的一点：系统会说明建议背后的证据和理由，再由您决定是否接受；任何变更都可以撤销。随着使用时间增加，它会从真实行为中学习，例如哪些歌曲被跳过、音量如何调整，以及团队愿意继续播放哪些内容。它也能在节日到来前提前准备。如果接入销售额或客流数据，您还可以比较音乐调整前后的结果，而不是只凭感觉判断。","visualCoverage":["每晚检查分区","数量有限且理由清楚的建议","从场所实际行为中学习","提前准备季节内容","变更前后效果报告"],"transcriptSha256":"2a069fbcf93ba2b484cebd298e0d7a78c992bd9594ff11839140b7e2a58efa4a","audioSha256":"d2e23b04c8f8d51c804777880c968c6a42f677b00effb1e9324f299c2463fecc","durationSeconds":45.76,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.38,"loudnessRangeLu":2.2,"thresholdLufs":-28.9,"targetOffsetLu":0.17,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-zh/audio/20260902-59014dd083de/06-compose.mp3","text":"Compose 让您从选择音乐进一步走向创作音乐。您只需要用自然语言描述场景，就像屏幕上这段烛光晚餐的需求，Beat Breeze 就会为那个时刻生成原创曲目。第一次结果不必是最终版本；您可以再用一句话调整氛围、速度、乐器或人声。对场所来说，重点不只是 AI 能生成一首歌，而是您可以为一个活动、一个空间或某个服务时刻，发展出专属的品牌声音，而不必总是使用大家都能听到的共享播放列表。","visualCoverage":["通过提示词创作原创音乐","针对场所的创意需求","持续迭代与调整"],"transcriptSha256":"88780a76723a177b2814e64d64efc2413b55d05b27f02f4a3305574ec6f9c2f5","audioSha256":"3279b8dd2fba9f62fe556e4b1209dc627f70023ef9472b4f098987d170106e14","durationSeconds":35.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.93,"loudnessRangeLu":1.7,"thresholdLufs":-28.66,"targetOffsetLu":0.35,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studio 与屏幕","src":"../beat-breeze-zh/audio/20260902-59014dd083de/07-studio-and-screens.mp3","text":"同样的思路也延伸到视觉内容。Content Studio 帮助团队制作场所经常需要的素材，例如社交媒体帖子、推广海报、短视频、数字标牌或氛围循环画面，并围绕您的标志和品牌色进行设计。接着，TV Channels 会把这些内容从编辑工具直接送到您已有的屏幕上。大堂屏幕可以展示今晚的优惠，同时播放该分区的音乐；水疗屏幕可以播放平静的品牌循环画面；酒店也可以把频道延伸到客房电视。这样，创作工具和分发系统就在同一个平台中，不必再启动另一套独立的数字标牌项目。","visualCoverage":["Content Studio 内容格式","品牌视觉设置","TV Channels 内容分发","酒店客房电视应用"],"transcriptSha256":"4a96e9cf24051d6d13f739e1de203c15eaec78c5457e02c69f5bf018939c8a90","audioSha256":"8c699243a25fd16ab37a8cb29506dda26bfca06bf4f1561a70560fdd02d1c530","durationSeconds":41.36,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.46,"truePeakDbtp":-3.4,"loudnessRangeLu":1.4,"thresholdLufs":-28.73,"targetOffsetLu":0.01,"cached":false},{"index":8,"id":"08-announcements","label":"语音通知","src":"../beat-breeze-zh/audio/20260902-59014dd083de/08-announcements.mp3","text":"这一页是场所体验中的语音部分。您可以输入通知内容，选择语言和声音，设定播放时间，然后让它在音乐上方播出。无论是欢乐时光、最后点单提醒、欢迎语，还是运营信息，都不需要每次预约录音棚。屏幕上的三个例子说明，同一个场所可以用不同语言沟通。相同的工具还可以制作专业的电话等待音频，把语音和音乐组合后发送到电话系统。也就是说，背景音乐以及围绕它出现的信息，都可以在同一个地方管理。","visualCoverage":["多语言场所语音通知","按计划在音乐上方播放","电话等待语音与音乐"],"transcriptSha256":"c51b5a0d0db644d5128b883b83625761d66edbedd04284c67fa7b494d67638c3","audioSha256":"a2b2df67558250c85354dffac705b502de2a56c1865a9d44a4604c2e153c6b23","durationSeconds":39.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.43,"loudnessRangeLu":2.8,"thresholdLufs":-28.98,"targetOffsetLu":0.34,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"语音通知适合在特定时刻传达一条消息。Radio 则更进一步，为您的业务提供持续运行、带主持人的节目。可以顺着这张图来看：音乐正在播放，主持人插入一段简短的问候或促销信息，然后回到音乐。对咖啡馆来说，可能是提醒顾客刚出炉的点心；对零售集团来说，可以是当前的促销活动或品牌故事。您可以选择主持人的声音、风格和语言，也可以决定播报频率。音乐方面，可以沿用各门店正在播放的歌单，选择电台组合，或让 AI 安排一周的节目。正式开播前，还能预听一个小时的样例。","index":9,"src":"audio/20261102-radio-d8b7ddb79fd53312/radio-your-station.mp3","transcriptSha256":"f9706f152fbee11553c9a36b0fc299b4cb2767c2fe428dd9244e22cabbffaebd","audioSha256":"8fec1f66a747cafe0194d02c42018bcb32822c6624c76a802984160fdce282c2","durationSeconds":42.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.24},{"id":"radio-across-locations","label":"覆盖各地场所的 Radio","text":"对于多个场所，总部设定电台，区域版本则让内容更贴合当地。这张分支图展示的是，同一个品牌如何在不同地区使用不同的主持语言和促销内容。天气信息只在适合接收这一版本的门店时加入。促销的事实由您的团队提供，例如价格和日期。Radio 可以围绕这些事实调整表达方式，每段内容播出前都会检查脚本和录制语音。节目是提前准备的，不是临场即兴生成。总部可以预听即将播出的片段、暂停电台、跳过片段、停止再次使用某个信息来源，并查看播出记录。Radio 需要付费的 Beat Breeze 方案，并消耗 AI 额度，因此可以和其他 AI 工具一起规划使用量。","index":10,"src":"audio/20261102-radio-5b4d943f6352cbb1/radio-across-locations.mp3","transcriptSha256":"ccde3a0b7b11f070889a293f1a87193b376cecc17786ea4e5fba3a3ed2c5a695","audioSha256":"689d44a44b96c488347285ead95c49088bb60dfda27c418c6f256baa41dcd710","durationSeconds":48.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.37},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"连接 Claude 与 ChatGPT","src":"../beat-breeze-zh/audio/20260902-59014dd083de/09-works-with-claude-and-chatgpt.mp3","text":"如果您的团队已经在使用 Claude 或 ChatGPT，Beat Breeze 也可以直接出现在熟悉的聊天窗口里。屏幕上的例子展示了不同用途：询问周五晚上会播放什么，把大堂音量稍微调低，或者为明天准备新的水疗排期。即时控制仍然遵循用户权限；计划中的排期变更，会在真正写入系统之前显示出来并要求确认。访问使用安全、可撤销的密钥，因此当某个人或某项集成不再需要时，可以随时移除。好处很直接：团队可以用自然语言处理日常音乐运营，同时保留管理者的最终控制权。","visualCoverage":["自然语言控制","查询当前排期","排期变更前确认","安全且可撤销的访问权限"],"transcriptSha256":"8ad19168ca4154b2332b7b12ebc8cda272aca332b427b9ef10783f93053c4364","audioSha256":"23d4d630bf851c1d69d535b3c0cc0fd58de28619dbecd07d46e95c9d75d186c1","durationSeconds":42.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.44,"loudnessRangeLu":2.6,"thresholdLufs":-28.93,"targetOffsetLu":0.11,"cached":false},{"index":12,"id":"10-built-for-operators","label":"为运营团队而设计","src":"../beat-breeze-zh/audio/20260902-59014dd083de/10-built-for-operators.mp3","text":"这一页展示两种运营模式。上方是由您直接管理 Beat Breeze：一个账号可以覆盖多个场所和分区，团队成员获得各自需要的权限，而品牌锁定可以保护不应被本地修改的音乐方案。播放器可运行在您已有的受支持手机、Windows 或网页设备上；配合合适的多声道声卡，一台 Windows 电脑还可以服务多个分区。下方是由 BMAsia 托管的模式。平台本身不变，但我们的团队会加入专属音乐设计、全天候技术支持、客户经理以及集团层面的整体监督。您可以根据自己的运营方式，选择最合适的参与程度。","visualCoverage":["自行管理多个物业","团队权限与品牌锁定","播放器选择与 Windows 多分区","BMAsia 托管服务"],"transcriptSha256":"10723a651a1edbff43d370a1e93917014753a5adfe631b12bd7d4dcb45bc0bda","audioSha256":"4b6c828dc2d47f29a24b06e28e77db2cf0d1022fa8b849ec6a1db00c3c9e7415","durationSeconds":43.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.35,"loudnessRangeLu":2,"thresholdLufs":-28.85,"targetOffsetLu":0.27,"cached":false},{"index":13,"id":"11-never-go-silent","label":"让音乐持续播放","src":"../beat-breeze-zh/audio/20260902-59014dd083de/11-never-go-silent.mp3","text":"所有创意功能，只有在真实场所中足够可靠才有价值。这就是屏幕上四项保障的目的。每周排期、自动化和礼拜暂停都会保存在本地，断网时仍能继续运行，播放记录则会在网络恢复后同步。监控程序会检查播放器，并在设备卡住时自动恢复。每条语音通知都会报告哪些设备真正收到内容，让运营人员知道信息是否到达所有目标区域。实时许可证明还提供可通过二维码验证的文件，检查人员询问时可以立即出示。所有工程设计都指向一个结果：房间里的人不应该察觉到技术问题。","visualCoverage":["完整离线连续运行","播放器自动恢复","通知送达回执","实时音乐许可证明"],"transcriptSha256":"fc53259f87d0d4d0c0cd7e27c43e8e5995c712eee5104ac68a2ae1c08fab41c2","audioSha256":"3e601f862e0d26c2211ffda273621be31dd2803a6e1dcdddaa4afa81e260ccd2","durationSeconds":40.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.19,"loudnessRangeLu":2.8,"thresholdLufs":-29.04,"targetOffsetLu":0.11,"cached":false},{"id":"12-why-beat-breeze","label":"为什么选择 Beat Breeze","text":"这张对比表把前面的内容重新组合在一起。分区音乐和自动排期是基础，也是许多平台的起点。Beat Breeze 则从这个基础继续向前：它加入离线运行、通过 Compose 创作原创音乐、制作视觉内容、多语言语音通知、电话等待音频，以及品牌 TV Channels。Radio 又加入了持续运行的主持电台，让品牌故事和促销信息与音乐相伴。真正的差异并不在表格里的某一个勾选项，而在于场所不需要把音乐、创作工具、信息和屏幕拼接成几套互不相连的系统。Beat Breeze 既能管理场所体验，也能帮助团队创作其中使用的内容。","index":14,"src":"audio/20261102-radio-3d5bca22c42ad547/12-why-beat-breeze.mp3","transcriptSha256":"4f09e14638585323f852158da14f01418fc17bf27a8e6bf002eca6ad388b45cc","audioSha256":"d38b0259d525da0d46a5dbdb72d5a689a1cedd6057a1bbca8a18fd85bafa5fe7","durationSeconds":49.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.31},{"id":"13-pricing","label":"价格","text":"您可以选择自己管理音乐，也可以交给 BMAsia。自助方案每个分区每月 15 美元。如果按年付费，则为每个分区每年 150 美元。这两种自助方案都包含应用功能，由您自行管理播放列表和播放排程。如果希望交给专业团队打理，BMAsia 托管方案每个分区每年 260 美元，仅提供年度方案。这个方案包含由 BMAsia 管理音乐和 Radio 电台。我们的音乐设计团队会为各分区选择并调整播放列表和排程，包括季节与节庆安排，同时提供全天候技术支持和专属客户经理。额外的 AI 生成额度需另行付费。无论选择哪种方案，所有客户都会持续获得应用更新。区别在于谁来照顾您的日常音乐安排。自助方案可在一个分区免费试用 14 天，需要绑定信用卡，但开始时不收费。如由 BMAsia 为您安排试用，则无需信用卡。大型集团还可以采用定制合同和本地开票安排，也不需要购买专用播放器盒子。","index":15,"src":"audio/20261102-radio-ec41e1559c8c42c6/13-pricing.mp3","transcriptSha256":"2e263ec041cdbebc5140bcd45113c7b6064749bad700ed35876e56dcb024e387","audioSha256":"56363c6d7548dc99a9268e100a385e7c145b286b2bb7cf9dabb1d53bffa260b9","durationSeconds":73.48,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-3.38},{"index":16,"id":"14-whos-behind-it","label":"背后的团队","src":"../beat-breeze-zh/audio/20260902-59014dd083de/14-whos-behind-it.mp3","text":"Beat Breeze 背后是 BMAsia。自 2002 年以来，我们一直为酒店、餐厅、零售和康体场所设计音乐。这段经验很重要，因为平台并不只是由软件工程决定。真正从事场所音乐工作的设计师，会指导内容策划，也会帮助 AI 理解不同空间。专业团队提供全天候支持，而产品路线则来自运营人员带给我们的实际需求。所以当您选择 Beat Breeze 时，背后同时站着一支经验丰富的音乐团队和服务团队。","visualCoverage":["BMAsia 始于 2002 年","真实音乐设计师参与策划","专家团队全天候支持与运营者驱动的产品路线"],"transcriptSha256":"8446bc51e0a331e40d0eaa2c251f520c7d1fd2fe9b4fa559faef86a31b110b2e","audioSha256":"6601eb913ee5919bc373a8e085f8e55688481c16f7a95ecd62f84072e0409e81","durationSeconds":37.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.58,"truePeakDbtp":-3.28,"loudnessRangeLu":1.8,"thresholdLufs":-28.84,"targetOffsetLu":0.31,"cached":false},{"id":"15-close","label":"开始使用","text":"这就是今天的 Beat Breeze：以音乐为核心，连接屏幕、内容创作、语音通知，以及新增的 Radio。如果您已经在使用 Beat Breeze，可以在账户中探索这些工具，听听自己的电台会是什么样子。Radio 需要付费方案，并消耗 AI 额度。如果您刚开始了解，请访问 beatbreeze.io，或联系 BMAsia 的 Norbert，我们会帮助您为场所选择合适的起点。","index":17,"src":"audio/20261102-radio-5f6bc4c33cf1b99c/15-close.mp3","transcriptSha256":"b8b776dd27bd3fcaa78f2a47e335989d3d3afe11c163dc11752d27e4ca655aa0","audioSha256":"de895bdb4ab0d8ff9e91ae31ed568f2e1a93f0822f9e6d2f3941c028f8944d35","durationSeconds":30.76,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.28}],"qualityAssurance":{"record":"docs/beat-breeze-radio-zh-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};

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
        visible: "正在加载",
        short: "加载中",
        pressed: "false",
        label: "正在加载讲解",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "正在准备语音",
        short: "准备中",
        pressed: "false",
        label: "正在准备讲解",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "开始讲解",
        short: "开始",
        pressed: "false",
        label: "开始讲解",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "正在讲解",
        short: "讲解中",
        pressed: "true",
        label: "暂停讲解",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "继续讲解",
        short: "继续",
        pressed: "false",
        label: "继续讲解",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "重新播放",
        short: "重播",
        pressed: "false",
        label: "重新播放带讲解的演示",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "重试讲解",
        short: "重试",
        pressed: "false",
        label: "重新加载讲解",
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
            throw new Error(`讲解清单返回状态 ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("讲解清单与此演示不匹配");
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
    label.textContent = "本页无讲解";
    shortLabel.textContent = "无讲解";
    button.setAttribute(
      "aria-label",
      "本页没有讲解音频",
    );
    button.title = "本页没有讲解音频";
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
        announce("正在准备讲解");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("本页没有讲解音频");
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
      announce(`正在播放第 ${currentIndex + 1} 页讲解`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("无法播放 Beat Breeze 讲解", error);
      failPlayback("无法播放讲解，请重试");
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce("讲解已暂停");
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
        announce("本页没有讲解音频");
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
        width: 154px;
        min-width: 154px;
        padding: 0 10px !important;
        gap: 7px;
        overflow: hidden;
        cursor: pointer !important;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: rgba(255,255,255,0.82) !important;
        font-family: "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        font: 500 13px/1.35 "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        font: 700 12px/1 "Noto Sans Thai", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
          width: 154px;
          min-width: 154px;
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
    toolbar = root?.querySelector('[role="toolbar"][aria-label="Deck controls"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-narration-toggle")) return true;

    addStyles(root);

    toolbar.setAttribute("aria-label", "演示控制栏");
    const previousButton = toolbar.querySelector(".btn.prev");
    const nextButton = toolbar.querySelector(".btn.next");
    const resetControl = toolbar.querySelector(".btn.reset");
    if (previousButton) {
      previousButton.setAttribute("aria-label", "上一页");
      previousButton.title = "上一页";
    }
    if (nextButton) {
      nextButton.setAttribute("aria-label", "下一页");
      nextButton.title = "下一页";
    }
    if (resetControl) {
      resetControl.setAttribute("aria-label", "重新开始演示");
      resetControl.title = "重新开始演示";
    }

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
      <span class="narration-label">讲解</span>
      <span class="narration-label-short">声音</span>
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
    invitation.setAttribute("aria-label", "开始讲解邀请");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">想听讲解版吗？</span>
      <button class="narration-invitation-start" type="button">开始讲解</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="关闭讲解邀请">×</button>
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
        announce("带讲解的演示已播放完毕");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("无法加载讲解音频");
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
          announce("讲解已准备就绪");
        } else {
          setNarrationUnavailable();
          announce("本页没有讲解音频");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("无法加载 Beat Breeze 讲解清单", error);
        setButtonState("error");
        announce("无法加载讲解，请重试");
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
