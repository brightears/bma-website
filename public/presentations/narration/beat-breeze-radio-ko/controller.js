(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-ko/controller.js",
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
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-ko","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-ko.html","officialDeckSha256":"5673d689eeed6250a6c0a0d7a09e8750bcc8fdf862f881f65a46dd267234f932","scriptPath":"public/presentations/narration/beat-breeze-ko/script.json","scriptSha256":"fd0e0680c72c6bf58e418d7a203193d0bec70c1f082ef68e57e6a6352479d918","copyPath":"public/presentations/narration/beat-breeze-ko/copy.json","copySha256":"1fc05c5d5fafdba2a0a5032437bd55d867d6cd8990ce4ecb3de457d49cee7674"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"따뜻하고 전문적이며 매장 운영을 잘 이해하는 Beat Breeze 제품 전문가","scene":"매장 책임자와 편안하게 대화하며 현재 슬라이드를 자연스럽게 안내하는 실제 제품 소개 자리","style":"친근하고 자신감 있으며 현실적입니다. 고객이 Beat Breeze가 운영에 어떤 도움을 주는지 이해하도록 설명하고, 슬라이드를 낭독하거나 광고처럼 말하지 않습니다.","pacing":"핵심 사이에 짧게 쉬는 자연스럽고 여유 있는 속도. 제품명은 분명하게 발음하되 과장하지 않습니다."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":862.6,"slides":[{"index":1,"id":"01-title","label":"표지","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/01-title.mp3","text":"안녕하세요. Beat Breeze를 살펴볼 시간을 내주셔서 감사합니다. 이 플랫폼은 아주 단순한 약속에서 시작했습니다. 매장의 각 공간에 언제나 알맞은 음악이 흐르게 하는 것입니다. 하지만 오늘 보실 Beat Breeze는 그보다 훨씬 넓습니다. 이제 하나의 플랫폼에서 음악과 스크린, 음성 안내, 그리고 이를 둘러싼 콘텐츠까지 연결해 여러 공간을 함께 운영할 수 있습니다. 따라서 이번 소개는 음악 플레이어 하나에 관한 이야기가 아닙니다. 매장에서 고객이 경험하는 미디어 전체를 만들고 운영하는 방법을 함께 보겠습니다.","visualCoverage":["올인원 매장 경험 플랫폼","음악, 스크린, 안내와 콘텐츠","모든 공간을 하나의 플랫폼으로 연결"],"transcriptSha256":"fecd112922996d32141f447fe3212a9ca93e5b722c87b7efa6c363e660bdd2d1","audioSha256":"efdd9145764d42ad68a065b7ea61ee430af434b17205bf5a85b56099c60e7c64","durationSeconds":42.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.13,"loudnessRangeLu":2.6,"thresholdLufs":-29.08,"targetOffsetLu":0.1,"cached":false},{"id":"02-one-platform-many-jobs","label":"하나의 플랫폼, 다양한 기능","text":"이 슬라이드는 전체 플랫폼의 지도로 보시면 됩니다. 왼쪽은 음악과 자동화입니다. 공간별 라이선스 음악, 하루 흐름에 맞춘 자동 스케줄, AI Music Director의 제안, 그리고 인터넷이 끊겨도 이어지는 재생이 여기에 포함됩니다. 가운데는 콘텐츠 제작입니다. Compose는 오리지널 음악을 만들고, Content Studio는 이미지와 영상을 제작하며, TV Channels는 그 콘텐츠를 스크린으로 보내고, 다국어 음성 안내는 매장의 메시지를 전달합니다. 음성 안내가 개별 메시지를 전달한다면, Radio는 진행자가 있는 매장 방송을 지속적으로 운영합니다. 오른쪽은 운영입니다. 모든 지점과 존, 사용자와 플레이어를 하나의 대시보드에서 관리하고, Brand Lock으로 브랜드 기준을 지킬 수 있습니다. 직접 운영할 수도 있고 BMAsia에 음악 설계와 관리를 맡길 수도 있습니다. 이제 그 중심인 음악부터 보겠습니다.","index":2,"src":"audio/20261102-radio-8cbe2e01499fad52/02-one-platform-many-jobs.mp3","transcriptSha256":"b805e3f64d5b40da239f853167f9a1639f2fefbd7055f7b6a0e13a57ca3ea75b","audioSha256":"7b4339be4798bdf9fc84900e08d451d44f10f67d0cdad34bf76777ede311106a","durationSeconds":63.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.41},{"index":3,"id":"03-music-that-runs-itself","label":"스스로 운영되는 음악","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/03-music-that-runs-itself.mp3","text":"Beat Breeze의 중심은 직원이 계속 손대지 않아도 하루의 운영 흐름을 따라가는 음악 시스템입니다. 로비, 바, 스파, 레스토랑마다 서로 다른 음악 성격을 줄 수 있고, 본사는 한 대시보드에서 모든 지점을 확인할 수 있습니다. 아침에는 차분하게, 점심에는 활기차게, 저녁에는 따뜻하게처럼 하루의 흐름을 한 번 정하면 각 시간대에 맞춰 자동으로 전환됩니다. 비즈니스 사용 권리가 포함된 음악 카탈로그는 계속 늘어나며, 원하는 분위기를 문장으로 설명하면 어시스턴트가 알맞은 플레이리스트를 구성할 수도 있습니다. 인터넷 연결이 불안정해져도 현장 플레이어는 음악을 계속 재생하도록 설계되어 있습니다.","visualCoverage":["존별 음악","스케줄과 시간대","오프라인 재생","라이선스 카탈로그와 AI 지원 플레이리스트"],"transcriptSha256":"cbed8cd7a72c619fc3de542f69b5a1b3e43659b11618cf7fbe46fbd117a4fae0","audioSha256":"4a9cf775eb9d1b4ae7aced733856e3703c4d977440d6fbf58773bad7236f0ef9","durationSeconds":47.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.41,"loudnessRangeLu":3.1,"thresholdLufs":-29.11,"targetOffsetLu":0.28,"cached":false},{"index":4,"id":"04-automations","label":"자동화","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/04-automations.mp3","text":"스케줄이 시간에 따라 음악을 바꾼다면, 자동화는 매장에서 실제로 일어나는 상황에 반응하게 합니다. 늦은 밤에는 음량을 자동으로 낮추고, 아침의 부드러운 분위기에서 점심의 높은 에너지, 저녁의 편안함으로 흐름을 바꿀 수 있습니다. 비가 오거나 기온이 올라가면 더 따뜻하거나 시원한 느낌의 음악으로 전환할 수 있고, 방문객 수 센서나 POS 데이터를 연결하면 매장이 붐빌 때 에너지를 높일 수 있습니다. 기도 시간, 시간대, 축제 시즌과 특별한 날짜도 같은 시스템에서 다룹니다. 준비된 규칙을 선택하거나 직접 만들 수 있으며, 기도 시간 일시정지 같은 중요한 자동화는 인터넷이 끊겨도 계속 작동합니다.","visualCoverage":["자동 음량과 시간대별 에너지 흐름","날씨와 기온 반응","혼잡도 또는 POS 트리거","기도 시간과 시즌 일정","오프라인 자동화"],"transcriptSha256":"54fb888b7cd1cc8376e01968b6d8e2c4cd006ef7f34ded3484432e1943bfc170","audioSha256":"a9a3bd69147c821152e6ec157df69810e3268f8a2dada6c5384fd20d7caa7aa5","durationSeconds":50.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.21,"loudnessRangeLu":3.1,"thresholdLufs":-29,"targetOffsetLu":-0.11,"cached":false},{"index":5,"id":"05-your-music-director","label":"Music Director","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/05-your-music-director.mp3","text":"Music Director는 Beat Breeze 안에서 먼저 움직이는 AI 큐레이터입니다. 매일 밤 각 존을 검토하고 개선할 만한 이유가 있을 때만, 일주일에 최대 세 번까지 제안합니다. 화면의 예시에서 중요한 점은 제안만 보여주는 것이 아니라 그 근거가 된 데이터와 이유도 함께 설명한다는 것입니다. 적용 여부는 운영자가 결정하고 모든 변경은 되돌릴 수 있습니다. 시간이 지나면 자주 건너뛴 곡, 음량 조정, 팀이 유지한 선택 같은 실제 행동을 바탕으로 각 존을 더 잘 이해합니다. 시즌 이벤트도 미리 준비할 수 있습니다. 매출이나 방문객 데이터를 연결하면 음악 변경 전후의 결과까지 비교해 감이 아니라 증거로 판단할 수 있습니다.","visualCoverage":["매일 밤 모든 존 검토","제한된 수의 근거 있는 제안","실제 운영 행동에서 학습","시즌 사전 준비","변경 전후 보고"],"transcriptSha256":"525cb75a6fdfb36ba2c75a5e28cdd7e7a8fddc9b4c27db5906668dca5a25e4ff","audioSha256":"4e53d135afcd8064c64ce09fbbca8def923a3889c4bdcd7ad89ce4fd384051c6","durationSeconds":48.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.42,"truePeakDbtp":-3.37,"loudnessRangeLu":1.9,"thresholdLufs":-28.93,"targetOffsetLu":-0.03,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/06-compose.mp3","text":"Compose를 사용하면 기존 음악을 고르는 데서 한 걸음 더 나아가 직접 음악을 만들 수 있습니다. 화면의 촛불 저녁 식사 예시처럼 원하는 장면을 자연어로 설명하면, Beat Breeze가 바로 그 순간을 위한 오리지널 트랙을 생성합니다. 첫 결과가 최종본일 필요도 없습니다. 한 문장을 더 입력해 분위기, 템포, 악기나 보컬을 조정할 수 있습니다. 매장에 중요한 가치는 단순히 AI가 노래 한 곡을 만든다는 데 있지 않습니다. 누구나 쓰는 일반적인 플레이리스트 대신 캠페인, 공간, 서비스 시간에 맞는 고유한 사운드 아이덴티티를 발전시킬 수 있다는 점입니다.","visualCoverage":["문장으로 만드는 오리지널 음악","매장만의 크리에이티브 브리프","대화형 수정"],"transcriptSha256":"9a65bea9f44396d9543f7eb3c98e58d7634f92cbbecbd0dd5707b19bff634918","audioSha256":"a7c1a99f075d0a4d011892d9c9e995be1584da5557ad951bfae10005a2dd447b","durationSeconds":42.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.47,"truePeakDbtp":-3.44,"loudnessRangeLu":3,"thresholdLufs":-29,"targetOffsetLu":0.06,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studio와 스크린","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/07-studio-and-screens.mp3","text":"같은 방식은 시각 콘텐츠로도 이어집니다. Content Studio에서는 매장이 자주 필요로 하는 소셜 게시물, 프로모션 포스터, 짧은 영상, 디지털 사이니지, 반복 재생용 배경 영상을 로고와 브랜드 컬러에 맞춰 만들 수 있습니다. TV Channels는 편집 도구에서 지금 보유한 스크린으로 콘텐츠를 바로 보냅니다. 로비 화면에는 오늘 저녁 프로모션과 해당 존의 음악을 함께 보여주고, 스파에서는 차분한 브랜드 영상을 재생하며, 호텔은 같은 채널을 객실 TV까지 확장할 수 있습니다. 제작 도구와 배포 시스템이 한곳에 있으므로 별도의 디지털 사이니지 프로젝트를 운영할 필요가 없습니다.","visualCoverage":["Content Studio 제작 형식","브랜드에 맞춘 디자인","TV Channels 배포","호텔 객실 TV 콘텐츠"],"transcriptSha256":"280e1097014669c2792597d6b858831bd6696d93f902f6af48c941c7df1730a3","audioSha256":"3fc8f3039b51bd760b5990787ddaa93e523a7d5d3190584c417ff344f58e908f","durationSeconds":43.04,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.46,"truePeakDbtp":-3.42,"loudnessRangeLu":2.5,"thresholdLufs":-28.82,"targetOffsetLu":0.14,"cached":false},{"index":8,"id":"08-announcements","label":"음성 안내","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/08-announcements.mp3","text":"이 부분은 매장 경험에 목소리를 더합니다. 문구를 작성하고 언어와 음성을 선택한 뒤 시간을 정하면, 안내가 음악 위로 자연스럽게 재생됩니다. 해피아워 안내, 마지막 주문, 환영 인사나 운영 공지가 될 수 있습니다. 화면의 세 가지 예시는 녹음실이나 언어별 성우를 따로 섭외하지 않고도 한 매장이 여러 언어로 소통할 수 있음을 보여줍니다. 같은 도구로 음성과 음악을 결합한 전문적인 전화 대기 음원도 만들 수 있습니다. 즉, 음악과 그 주변의 메시지까지 한곳에서 관리합니다.","visualCoverage":["다국어 매장 안내","음악 위 예약 재생","전화 대기 음원"],"transcriptSha256":"f2e8d075c9ef563dc5ee429fcb1997ada9e2f9133405926984be21fb705aefbf","audioSha256":"59acfe28f113cb82748c375288d5773cc1a1285f301159cacd0d252cfa7f0435","durationSeconds":39.88,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.43,"loudnessRangeLu":3,"thresholdLufs":-28.96,"targetOffsetLu":0.22,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"음성 안내는 특정 메시지를 전달할 때 유용합니다. Radio는 여기서 더 나아가, 매장을 위한 진행자 있는 방송을 지속적으로 운영합니다. 화면의 흐름을 따라가 보겠습니다. 음악이 재생되다가 진행자가 짧은 인사나 혜택을 안내하고, 다시 음악으로 돌아갑니다. 카페라면 갓 구운 빵이 나왔다는 소식일 수 있고, 유통 매장이라면 현재 프로모션이나 브랜드 이야기일 수 있습니다. 진행자의 목소리와 성격, 언어를 선택하고 얼마나 자주 말할지도 정할 수 있습니다. 음악은 각 매장에서 이미 재생 중인 목록을 유지하거나, 방송용으로 구성하거나, AI에 한 주 계획을 맡길 수 있습니다. 실제 방송을 시작하기 전에 한 시간 분량의 예시도 미리 들어볼 수 있습니다.","index":9,"src":"audio/20261102-radio-1768db7c49a78a50/radio-your-station.mp3","transcriptSha256":"364c6e9acfe14bb53e7e5b6137ecf366b9869f530a88873d10be026dcacf2dc7","audioSha256":"0b5d807c5f6eaf160bbde2a1835a82d76d7517d9fbff2189711ace83ce7bb7c8","durationSeconds":51.68,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-2.9},{"id":"radio-across-locations","label":"여러 매장을 위한 Radio","text":"여러 매장을 운영한다면 본사에서 방송의 방향을 정하고, 지역별 버전으로 현지에 맞는 내용을 전달할 수 있습니다. 이 그림의 가지들은 하나의 브랜드가 지역마다 다른 진행 언어와 혜택을 사용하는 모습을 보여줍니다. 날씨 정보는 해당 방송을 받는 매장에 적합할 때 포함됩니다. 가격이나 날짜 같은 프로모션의 사실은 고객사 팀이 제공합니다. Radio는 그 사실을 유지하면서 표현을 다양하게 바꾸며, 방송 전에 대본과 녹음된 음성을 확인합니다. 프로그램은 즉석에서 말하는 생방송이 아니라 미리 준비됩니다. 본사는 다음 안내를 미리 듣고, 방송을 일시 정지하거나 안내를 건너뛰고, 특정 정보 출처의 재사용을 중단할 수 있으며, 방송 이력도 확인할 수 있습니다. Radio는 유료 Beat Breeze 요금제에서 AI 크레딧을 사용하므로 다른 AI 도구와 함께 사용량을 계획하시면 됩니다.","index":10,"src":"audio/20261102-radio-da6f72cfa1b98ae5/radio-across-locations.mp3","transcriptSha256":"e2b4584a57b471269172bcf0bb81b1ad507dbaf98db8eedb9d442f7b855aec9f","audioSha256":"8276188a52a41a4e79a23dfc34bd065367a3267a8f7cec73c660dbbf908bb55e","durationSeconds":64.76,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.42},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"Claude와 ChatGPT 연동","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/09-works-with-claude-and-chatgpt.mp3","text":"팀이 이미 Claude나 ChatGPT를 사용한다면, 익숙한 채팅 창 안에서 Beat Breeze를 바로 이용할 수 있습니다. 예시처럼 금요일 저녁에 어떤 음악이 재생되는지 묻거나, 로비 음량을 조금 낮추거나, 내일 스파의 새 음악 스케줄을 준비해 달라고 요청할 수 있습니다. 즉시 실행되는 작업도 사용자 권한을 따르고, 스케줄 변경은 시스템에 저장하기 전에 다시 보여 주고 확인을 받습니다. 연결에는 언제든 회수할 수 있는 보안 키를 사용하므로 직원이나 연동 서비스가 더 이상 접근할 필요가 없을 때 쉽게 해제할 수 있습니다. 팀은 자연어로 일상적인 음악 업무를 처리하면서도 최종 통제권을 유지합니다.","visualCoverage":["자연어 제어","현재 스케줄 질문","스케줄 변경 전 확인","안전하고 회수 가능한 접근 권한"],"transcriptSha256":"d9fa4d51c96e8f6f66b87763d806286439e319daf2fd66b4f8f6e10472fc669f","audioSha256":"86df7a8b65e087876415fb39dc0dba6323f3585f98cc712b413d7e2272d91aba","durationSeconds":44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.38,"loudnessRangeLu":2.3,"thresholdLufs":-28.96,"targetOffsetLu":0.1,"cached":false},{"index":12,"id":"10-built-for-operators","label":"운영팀을 위한 설계","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/10-built-for-operators.mp3","text":"이 슬라이드는 두 가지 운영 방식을 위아래로 보여줍니다. 위쪽은 직접 운영하는 방식입니다. 하나의 계정으로 여러 지점과 존을 관리하고, 각 팀원에게 필요한 권한만 부여하며, 브랜드 기준을 지켜야 하는 존은 Brand Lock으로 잠급니다. 플레이어는 기존 모바일 기기, Windows 컴퓨터 또는 지원되는 브라우저에서 실행됩니다. 적절한 다중 채널 사운드 카드를 사용하면 한 대의 Windows PC로 여러 존을 운영할 수도 있습니다. 아래쪽은 BMAsia가 관리하는 방식입니다. 플랫폼은 같지만 맞춤 음악 설계, 24시간 기술 지원, 계정 관리와 시스템 모니터링을 저희 팀이 더합니다. 조직의 운영 방식에 맞는 지원 수준을 선택하시면 됩니다.","visualCoverage":["다지점 셀프서비스","팀 권한과 Brand Lock","플레이어 선택과 Windows 다중 존","BMAsia 관리 서비스"],"transcriptSha256":"b1ef970ab55ef01eb928aa4cfcbc8d80f47273461fda6f75bdaee156ebb3d0ac","audioSha256":"fba2343ce17c03242947943996ac2648c571dd6281c80af65b793ea2186f38be","durationSeconds":52.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.28,"loudnessRangeLu":2.9,"thresholdLufs":-29.13,"targetOffsetLu":0.17,"cached":false},{"index":13,"id":"11-never-go-silent","label":"음악은 멈추지 않습니다","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/11-never-go-silent.mp3","text":"아무리 창의적인 기능도 실제 매장에서 안정적으로 작동해야 의미가 있습니다. 화면의 네 가지 보호 장치가 바로 그 역할을 합니다. 주간 스케줄, 자동화, 기도 시간 일시정지는 현장에 저장되므로 인터넷이 끊겨도 계속 실행되고, 재생 기록은 연결이 돌아오면 동기화됩니다. 모니터링 기능은 각 플레이어를 확인해 멈춘 장치를 자동으로 다시 시작합니다. 모든 음성 안내는 어떤 플레이어에서 성공적으로 재생되었는지 보고하므로 필요한 공간에 메시지가 전달됐는지 알 수 있습니다. 라이선스 증명서도 QR 코드로 현장에서 바로 확인할 수 있습니다. 기술의 목표는 하나입니다. 매장의 고객은 문제가 있었다는 사실조차 느끼지 않아야 합니다.","visualCoverage":["지속적인 오프라인 운영","플레이어 자동 복구","안내 재생 확인","즉시 확인 가능한 라이선스"],"transcriptSha256":"7808c5e93e1df90af7fa41fdeac7cab4691977b083b11a748cb38560678cc2f1","audioSha256":"cbc30fe37c7634e7d55c313ba7952f4520ce36baaaf1b49566525345449efd1e","durationSeconds":52.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.34,"loudnessRangeLu":3.3,"thresholdLufs":-29.1,"targetOffsetLu":0.17,"cached":false},{"id":"12-why-beat-breeze","label":"왜 Beat Breeze인가","text":"이 비교표는 지금까지의 이야기를 한눈에 연결합니다. 존별 음악과 자동 스케줄은 기본이며 많은 서비스가 여기까지는 제공합니다. Beat Breeze는 여기서 더 나아가 오프라인 운영, Compose의 오리지널 음악, 이미지와 영상 제작, 다국어 음성 안내, 전화 대기 음원, 브랜드 TV Channels까지 하나로 묶습니다. Radio는 여기에 진행자가 있는 방송을 더해 음악 사이에 브랜드 이야기와 프로모션을 전달합니다. 진짜 차이는 표 안의 체크 표시 하나가 아닙니다. 매장이 음악 시스템, 제작 도구, 메시지, 스크린을 서로 다른 솔루션으로 이어 붙일 필요가 없다는 점입니다. Beat Breeze는 현장 경험을 운영하는 동시에 그 안에 들어갈 콘텐츠도 만들 수 있게 합니다.","index":14,"src":"audio/20261102-radio-fac3a5ce9e2b8028/12-why-beat-breeze.mp3","transcriptSha256":"5913958e1488b79b32e66bc3ad4618000c4cf077f290c712c99461c9d96b8f19","audioSha256":"0bb441fc88140b44773a24440a7f6cb307498e4471f66fd6653f0069f4edc357","durationSeconds":52.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.39},{"id":"13-pricing","label":"요금","text":"음악을 직접 관리하거나 BMAsia에 맡기는 두 가지 방식이 있습니다. 셀프서비스는 존당 월 미화 15달러입니다. 연간 요금제를 선택하면 존당 연 미화 150달러입니다. 두 셀프서비스 요금제 모두 앱 기능이 포함되며, 고객사가 재생목록과 재생 일정을 직접 관리합니다. 음악 관리를 맡기고 싶으시다면 BMAsia 관리형은 존당 연 미화 260달러이며, 연간 요금제로만 제공됩니다. 이 요금제에는 BMAsia의 음악 및 Radio 방송 관리가 포함됩니다. 음악 디자인팀이 각 존에 배정된 재생목록과 일정을 선정하고 새롭게 구성하며, 계절과 행사에 맞춘 변경도 담당합니다. 여기에 24시간 연중무휴 기술 지원과 전담 계정 관리자가 포함됩니다. 추가 AI 생성 크레딧은 별도 요금이 부과됩니다. 어떤 요금제를 선택하든 모든 고객은 지속적인 앱 업데이트를 받습니다. 차이는 일상적인 음악 관리를 누가 맡느냐입니다. 셀프서비스는 한 개 존에서 14일 동안 무료로 체험할 수 있으며, 카드 등록이 필요하지만 시작할 때 요금은 청구되지 않습니다. BMAsia가 체험을 준비해 드리는 경우에는 카드가 필요 없습니다. 대규모 기업은 맞춤 계약과 현지 청구 방식을 이용할 수 있으며, 전용 플레이어 박스를 구매할 필요는 없습니다.","index":15,"src":"audio/20261102-radio-90804541a4ce86b1/13-pricing.mp3","transcriptSha256":"87087493f4102ca9386225676eea400a617d3eb4e3286b288bef6e55ef51fe59","audioSha256":"3b808b5e9cd42a0f3750a1c1a6cc842bb1080d2750b2f08064dd72f4540583ba","durationSeconds":89.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.36},{"index":16,"id":"14-whos-behind-it","label":"Beat Breeze를 만드는 사람들","src":"../beat-breeze-ko/audio/20260903-596761b7abf1/14-whos-behind-it.mp3","text":"Beat Breeze 뒤에는 2002년부터 호텔, 레스토랑, 리테일과 웰니스 공간의 음악을 설계해 온 BMAsia가 있습니다. 이 경험이 중요한 이유는 플랫폼이 기술만으로 만들어지지 않기 때문입니다. 현업 음악 디자이너가 큐레이션 방식과 AI가 각 공간의 특성을 이해하는 방법을 함께 설계합니다. 전문 지원팀은 하루 24시간 도움을 제공하고, 제품 로드맵은 실제 운영팀이 저희에게 전하는 필요를 바탕으로 발전합니다. 따라서 Beat Breeze를 선택한다는 것은 현대적인 기술뿐 아니라 그 기술을 실제로 뒷받침하는 경험 많은 음악팀과 서비스팀을 함께 선택하는 것입니다.","visualCoverage":["2002년부터 이어진 BMAsia 경험","큐레이션을 이끄는 현업 음악 디자이너","24시간 전문 지원과 운영자 중심 로드맵"],"transcriptSha256":"76efc8998373e762d71a34186d0bfcb9e0b2100a554780e8b04fc000acee087d","audioSha256":"f40ffb28527836efaf2a0dd69018b19c9b57ada3c03073b5588a9b435fc6f005","durationSeconds":44.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-2.88,"loudnessRangeLu":2.7,"thresholdLufs":-28.79,"targetOffsetLu":0.15,"cached":false},{"id":"15-close","label":"시작하기","text":"지금까지 보신 것이 오늘의 Beat Breeze입니다. 음악을 중심으로 스크린, 콘텐츠, 음성 안내, 그리고 이제 Radio까지 연결합니다. 이미 사용 중이시라면 계정의 도구를 살펴보고 우리 매장만의 방송이 어떻게 들리는지 확인해 보세요. Radio는 유료 요금제와 AI 크레딧이 필요합니다. 처음 시작하신다면 beatbreeze.io를 방문하거나 BMAsia의 노르베르트에게 연락해 주세요. 매장에 맞는 시작점을 함께 찾아드리겠습니다.","index":17,"src":"audio/20261102-radio-ca21ecd9fa62404e/15-close.mp3","transcriptSha256":"6457a470cbd9879264800b0cc8a9ebf0cc2eda3902c7afec1c906f5cb8f28817","audioSha256":"1c47095cae120995ea86abcf8ff27530b6f5770dd554436c3a41ae8613bff035","durationSeconds":33.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3}],"qualityAssurance":{"record":"docs/beat-breeze-radio-ko-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};
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
