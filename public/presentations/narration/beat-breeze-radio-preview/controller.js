(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-preview/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-radio-preview-invitation-seen-en";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":3,"deck":"beat-breeze","presentation":"beat-breeze-radio-preview","status":"english-radio-review-preview","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-5","publicationStatus":"Separate English-only Radio preview for review; official presentations unchanged.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckSha256":"c85f12948326f2188d9a5b29405020076d9825d615ea429c2bf027ff0b602a77","previewDeckSha256":"8d2f17e87066ecdbb57bcd7e0603be52d88ed28d3bdb9881033f563cd021756c"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"a warm, capable Beat Breeze product specialist","scene":"a relaxed one-to-one presentation with a venue manager, talking naturally through the slide currently on screen","style":"Friendly, grounded and conversational. Speak as if helping one real person understand the venue value, not reading slide copy or delivering a commercial voice-over.","pacing":"Easy and unforced, with brief natural pauses between the main ideas on each slide. Give product names clear emphasis without sounding theatrical."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":718.52,"slides":[{"index":1,"id":"01-title","label":"Title","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/01-title.mp3","text":"Welcome. Beat Breeze began with a simple promise: keep the right music playing in every part of a venue. What you are looking at today is much broader. The same platform now brings together music, screens, announcements, and the content that fills them, across every space you operate. So this is not only a tour of a music player. It is a look at how one system can help shape and run the whole in-venue media experience.","visualCoverage":["all-in-one venue platform","music, screens, announcements, and content","one platform across every space"],"transcriptSha256":"42a03641a762391718643e46115ea4bf9b5ce0811d4258c7f39155ad60fdf1f3","audioSha256":"087d789bf9130db103ee23f1b20e1e6f0ec461fc6877b2a210f309093d5c8b0b","durationSeconds":34.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.42,"loudnessRangeLu":4.8,"thresholdLufs":-29.25,"targetOffsetLu":0.16,"cached":true},{"id":"02-one-platform-many-jobs","label":"One platform, many jobs","text":"This slide is the map of the platform, and it falls into three parts. On the left is music and automation: licensed music for each zone, schedules that run the day, an AI Music Director, and playback that keeps going offline. In the middle is content creation: Compose makes original music, Content Studio creates images and video, and TV Channels puts that work on your screens. Announcements handle individual messages, while Radio gives your business an ongoing hosted station. On the right is operations: one dashboard for venues, zones, teams, and players, with brand controls when consistency matters. You can run that yourself, or add BMAsia's music design and support. Now let's start with the core: the music.","visualCoverage":["music and automation","content creation","operations"],"index":2,"src":"audio/20261102-radio-a77dcd9c727d5e5c/02-one-platform-many-jobs.mp3","transcriptSha256":"0e3e8e0ff45bc3239d8166d848805290deaeffa462f946dad1a4cbf831fe9f62","audioSha256":"cd4aa69d93eb9114ea5e571cb03e331da84d796f2d769ac6bfe7eebb0dd947f9","durationSeconds":47.76,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-2.84},{"index":3,"id":"03-music-that-runs-itself","label":"Music that runs itself","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/03-music-that-runs-itself.mp3","text":"At the centre of Beat Breeze is music that can run the venue day without constant attention. Your lobby, bar, spa, and restaurant can each have their own sound, while head office sees every property from one dashboard. You shape the flow once—perhaps calm in the morning, more energy over lunch, and something warmer in the evening—and the dayparts change automatically. The library is licensed for business and keeps growing, or you can describe a mood and let the assistant assemble a playlist. Most importantly, if the internet drops, the local player is designed to keep the music going.","visualCoverage":["different music per zone","scheduling and dayparts","offline playback","licensed library and AI playlist building"],"transcriptSha256":"ef8d28a45491b5d7c3ad7f6545b68b396812008873df0681ab5d0a7db43dc9f0","audioSha256":"f3108953718c23fdbf39be4e55ef846eb09a0f1ebb4efea79cb410f00167ad51","durationSeconds":37.16,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.7,"truePeakDbtp":-3.29,"loudnessRangeLu":3.1,"thresholdLufs":-29.14,"targetOffsetLu":0.58,"cached":true},{"index":4,"id":"04-automations","label":"Automations","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/04-automations.mp3","text":"A schedule changes music by the clock; automations let the venue react to what is actually happening. Quiet hours can lower the volume at night. A daily energy curve can move from calm to lively and back again. Weather or temperature can trigger a cozier or cooler sound. With a people counter or point-of-sale feed, a busy room can lift the energy automatically. Prayer times, dayparts, seasonal dates, and holidays can all be built into the same system. You can begin with one of these ready-made ideas or create your own rule—and the essential automation, including prayer pauses, continues even when the venue is offline.","visualCoverage":["time and volume rules","weather and temperature responses","footfall or POS triggers","prayer times, dayparts, and seasonal events","offline automation"],"transcriptSha256":"04c70277ce81aaca536038e89d62da5d21597f10acc1b842155954fc1e1743e2","audioSha256":"3289102c78395e93b1d1e758f55a927dc9330600a4d11fa78a4e93a9f4819ee3","durationSeconds":43.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.39,"truePeakDbtp":-3.43,"loudnessRangeLu":2.9,"thresholdLufs":-28.9,"targetOffsetLu":0.19,"cached":true},{"index":5,"id":"05-your-music-director","label":"Your Music Director","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/05-your-music-director.mp3","text":"Music Director is the proactive AI curator built into Beat Breeze. It reviews each zone overnight and only speaks up when it finds something worth improving—never more than three suggestions a week. The example on screen shows the important part: it explains the evidence behind the recommendation, and you choose whether to accept it. Every change can be undone. Over time, it learns from real behavior such as skips, volume adjustments, and what the team leaves playing. It can also prepare for seasonal moments before they arrive. And if you connect sales or covers data, you can compare the period before a music change with the period after, rather than relying on guesswork.","visualCoverage":["nightly zone review","limited, explained suggestions","learning from venue behavior","seasonal preparation","before-and-after reporting"],"transcriptSha256":"3623a98664b988de2320d038afd7a9e04988f3e082f2914fcef3e27123d279b4","audioSha256":"b940ce6375c00b685c5723c12560d16c7e25ca1e0a436c84e7379f8add49383a","durationSeconds":42.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.02,"loudnessRangeLu":3.2,"thresholdLufs":-28.98,"targetOffsetLu":0.04,"cached":true},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/06-compose.mp3","text":"Compose moves from choosing music to creating it. You describe the scene in normal language—like the candlelit dinner brief shown here—and Beat Breeze returns original tracks made for that moment. The first result does not have to be final: you can refine the mood, tempo, instruments, or vocals with another sentence. For a venue, the point is not simply that AI can make a track. It is that you can develop a signature sound for a campaign, a space, or a particular service moment instead of always drawing from the same shared playlists.","visualCoverage":["original music from a prompt","venue-specific creative brief","iterative refinement"],"transcriptSha256":"33cba4c915093d100b4bf0e996c298363813796dd8620316c534f958b8c41c8c","audioSha256":"50a6e269b7476ac789b24b9411414d4983b6bf99cc38c22028ba8569585a8b7b","durationSeconds":39.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.63,"truePeakDbtp":-3.08,"loudnessRangeLu":3.6,"thresholdLufs":-29.01,"targetOffsetLu":0,"cached":true},{"index":7,"id":"07-studio-and-screens","label":"Studio & screens","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/07-studio-and-screens.mp3","text":"The same idea continues visually. Content Studio helps your team create the pieces a venue regularly needs: a social post, a promotional poster, a short video, digital signage, or an ambient loop, styled around your logo and colours. Then TV Channels takes that material out of the editor and onto the screens you already have. A lobby screen can carry tonight's offer while the matching zone music plays; a spa screen can run a calm branded loop; and hotels can extend the channels to guest-room televisions. So the creative tool and the distribution system sit together, rather than becoming another separate signage project.","visualCoverage":["Content Studio formats","brand styling","TV Channels distribution","in-room hotel use"],"transcriptSha256":"3b188522a9766003f9dbdd74cf34838213f76b142bbdf434f728253ba8aa9a24","audioSha256":"c8250f56e77b4de944be74d81a9af9adbb35c64de405a22c8ffd41bdba58f80d","durationSeconds":40.48,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.36,"loudnessRangeLu":2.2,"thresholdLufs":-28.81,"targetOffsetLu":0.2,"cached":true},{"index":8,"id":"08-announcements","label":"Announcements","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/08-announcements.mp3","text":"This is the spoken side of the venue experience. You can write an announcement, choose the language and voice, schedule the moment, and have it play over the music—whether that is happy hour, a last-order call, a welcome, or an operational message. The three examples show how one venue can communicate in different languages without arranging a studio session for every recording. The same tools can also produce professional phone on-hold audio, combining voice and music for the caller. In other words, the soundtrack and the messages around it are managed in one place.","visualCoverage":["multilingual in-venue announcements","scheduled playback over music","phone on-hold audio"],"transcriptSha256":"c722e089a81f2054e37e5d4f2bc26e091c5530884c2f55ea4ced06fbefc768b4","audioSha256":"b187b2c3de701623254bf3c07ff13426aa9abbf237d487948427c998f05914c8","durationSeconds":37.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.59,"truePeakDbtp":-3.3,"loudnessRangeLu":3,"thresholdLufs":-28.88,"targetOffsetLu":0.47,"cached":true},{"id":"radio-your-station","label":"AI Radio","text":"Announcements are useful when you have a specific message to play. Radio takes that further, giving your business an ongoing hosted programme. Follow the sequence here: the music is playing, your host comes in with a short welcome or offer, and then hands back to the music. For a café, that might be a reminder about fresh pastries. For a retail group, it could be a current promotion or a story about the brand. You choose the host's voice, personality and languages, and decide how often they speak. You can keep the music your locations already play, choose a station mix, or ask AI to plan the week. You can hear a sample hour before putting the station on air.","visualCoverage":["music and host sequence","brand promotions and stories","host identity and language","music choices","sample hour"],"index":9,"src":"audio/20261102-radio-1448fefd90fe31cc/radio-your-station.mp3","transcriptSha256":"22b2589bc7c30a982fa23d45355a0099dd05c1793c4cac4be8faa1e14a98010b","audioSha256":"81f7fcbf4ff225f6b9e3398571808c35b547e2282eceb85d78defb241b254a7b","durationSeconds":43.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.59,"truePeakDbtp":-3.28},{"id":"radio-across-locations","label":"Radio across your locations","text":"For a group of locations, head office sets the station, while regional versions make the content relevant locally. The branches on this slide show how one brand can use different host languages and offers in different regions. Weather is included where it is relevant to the stores receiving that version. Your team supplies the promotion's facts, such as its price and dates. Radio can vary the wording around them, with checks on the script and the recorded speech before a break airs. The programme is prepared ahead rather than improvised live. Head office can preview upcoming breaks, pause the station, skip a break or stop a source being used again, and see which breaks have played. Radio runs on AI credits with a paid Beat Breeze plan, so its usage should be planned alongside the rest of your AI tools.","visualCoverage":["HQ control and regional editions","local language and offers","script and recorded-speech checks","on-air controls and reporting","paid plan and AI credits"],"index":10,"src":"audio/20261102-radio-a1c1f69f6999ba71/radio-across-locations.mp3","transcriptSha256":"20b2d0da64216465d289226a482977699766acbd8e8f7def1c0e34a7d1b410aa","audioSha256":"e7e69ff11e539c65b03ca52ff7b00e2b2a58d6f2614c9caa9ddb5253cd54f725","durationSeconds":51.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.69,"truePeakDbtp":-3.16},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"Works with Claude & ChatGPT","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/09-works-with-claude-and-chatgpt.mp3","text":"If your team already works in Claude or ChatGPT, Beat Breeze can meet them in that familiar chat window. The examples make the range clear: ask what is playing on Friday night, turn the lobby down a little, or prepare a different spa schedule for tomorrow. Immediate controls still follow the user's permissions, and planned schedule changes are shown back for confirmation before anything is committed. Access uses secure, revocable keys, so it can be removed when a person or integration no longer needs it. The benefit is simple: everyday music operations can be handled in plain language, without giving up operator control.","visualCoverage":["plain-language control","questions about current schedules","confirmation before schedule changes","secure and revocable access"],"transcriptSha256":"702663d3359b9f332f7ba74d7f2356e21b0e224eecabcb9c79b684caf237f8ed","audioSha256":"5ad5d77629ca23b6c81f1e94ca6415b758337daeffbdd15e94aafa7ac5b3f1cb","durationSeconds":41.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.64,"truePeakDbtp":-3.14,"loudnessRangeLu":5,"thresholdLufs":-29.12,"targetOffsetLu":0.37,"cached":true},{"index":12,"id":"10-built-for-operators","label":"Built for operators","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/10-built-for-operators.mp3","text":"There are two operating models on this slide. Above, you run Beat Breeze directly: one login can cover multiple venues and zones, team members receive the access they need, and brand-lock protects the soundtrack where local changes should not be allowed. The player can run on supported mobile, Windows, or web devices you already own, and one Windows computer with the right multi-channel sound card can serve several zones. Below is the BMAsia-managed model. The platform stays the same, but our team adds bespoke music design, round-the-clock technical support, account management, and group-wide oversight. You can choose the level of involvement that suits your operation.","visualCoverage":["self-operated multi-property control","team access and brand-lock","player choices and Windows multi-zone","BMAsia-managed service"],"transcriptSha256":"cde763075781c08efb50f1a2322a29fabfc9986e26b5e6357d5348a41fe337d9","audioSha256":"2f51081968647bf371c92fbc158ea68fe5a7ea00454cc4d85080351ed5e4157c","durationSeconds":42.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.62,"truePeakDbtp":-3.34,"loudnessRangeLu":3.2,"thresholdLufs":-28.98,"targetOffsetLu":0.68,"cached":false},{"index":13,"id":"11-never-go-silent","label":"Never go silent","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/11-never-go-silent.mp3","text":"All of the creative features matter only if the system is dependable in a real venue. That is what these four safeguards are about. The weekly schedule, automations, and prayer pauses remain available locally when the connection is down, and the play history syncs later. Watchdogs monitor the players and can recover one that becomes stuck. Announcements report which devices actually received them, so an operator can see whether a message reached every intended space. And the live licence certificate gives the venue QR-verifiable proof when an inspector asks. The engineering is designed around one outcome: the room should not notice a technical problem.","visualCoverage":["full offline continuity","self-healing players","announcement delivery receipts","live licence proof"],"transcriptSha256":"2a1f5ab15f1a8167a77ba0e7dfafbc847f62b29ee79b39f95365a70df0eee8d3","audioSha256":"5b8041a8c7ea7cdb622efa1642ccff6eca31028dd0672bbf007e77c4369b3006","durationSeconds":43.28,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.34,"loudnessRangeLu":3.1,"thresholdLufs":-28.98,"targetOffsetLu":0.4,"cached":true},{"id":"12-why-beat-breeze","label":"Why Beat Breeze","text":"This comparison brings the story back together. Music by zone and automatic scheduling are the foundation; that is where many platforms begin. Beat Breeze continues into original music through Compose, visual content creation, multilingual announcements, phone on-hold audio, and branded TV channels. Radio adds an ongoing hosted station, with your brand's stories and promotions alongside the music. The point is that the venue can manage these activities together, rather than assembling separate music, creative, messaging and screen systems.","visualCoverage":["music and scheduling foundation","offline resilience","custom music and visual creation","announcements, on-hold audio, and TV channels","one-platform proposition"],"index":14,"src":"audio/20261102-radio-61eb5b1baab5aa01/12-why-beat-breeze.mp3","transcriptSha256":"cc65beea0aab359f70ff655f8fbd615ec43afc3383e50c25374049cf531e0e06","audioSha256":"35830aa87b791388f5c5ea7eda9a8cc473867d09146e942d53850b43266724b6","durationSeconds":36.56,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.41},{"id":"13-pricing","label":"Pricing","text":"You can choose to manage the music yourself, or have BMAsia take care of it. Self-service costs 15 US dollars per zone per month. If you prefer an annual plan, it is 150 US dollars per zone per year. Both self-service plans include the app’s features, and you manage your own playlists and schedules. For a hands-off service, BMAsia manages your music and Radio station for 260 US dollars per zone per year, available on annual plans only. Our music design team selects and refreshes the playlists and schedules assigned to each zone, including seasonal changes. That service also includes 24/7 technical support and a dedicated account manager. Additional AI generation credits are charged separately. Everyone receives ongoing app updates, whichever plan they choose. The difference is who looks after your music and Radio. You can try self-service free for 14 days on one zone; it asks for a card, with no charge when it starts. If BMAsia arranges your trial, no card is needed. Larger groups can arrange custom contracts and local invoicing, and no dedicated player box is required.","visualCoverage":["self-serve price and trial","BMAsia-managed price and services","enterprise arrangements","no required player box"],"index":15,"src":"audio/20261102-radio-0a0d04691a5a1117/13-pricing.mp3","transcriptSha256":"a0f55260d65bb7499c090cbff728222824343732b3cdb15132691e8830ae6ab4","audioSha256":"752a32158da50ba3b5bee17074001663fe22d909f6efbe15d7039dec0fee6bd6","durationSeconds":75.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.27},{"index":16,"id":"14-whos-behind-it","label":"Who's behind it","src":"../beat-breeze-voice-preview/audio/20260902-4616b86a157b/14-whos-behind-it.mp3","text":"Behind Beat Breeze is BMAsia, a team that has designed music for hotels, restaurants, retail, and wellness since 2002. That experience matters because the platform is not shaped by software engineering alone. Working music designers guide the curation and the way the AI thinks about a venue. Real people provide support around the clock, and the roadmap is driven by the practical requests operators bring to us. So when you choose the platform, there is an experienced music and service team standing behind it.","visualCoverage":["BMAsia since 2002","music designers behind the curation","human support and operator-led roadmap"],"transcriptSha256":"31e88bcc8978e65f3283ccc223af1f57774e2853528adef02fc22c9b0fb07baa","audioSha256":"f5e0412f605760c61a87f17bd7299b1ee5d501367b6bea18c5099af8524c38e4","durationSeconds":34,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.41,"truePeakDbtp":-3.03,"loudnessRangeLu":3.1,"thresholdLufs":-28.76,"targetOffsetLu":0.1,"cached":true},{"id":"15-close","label":"Close","text":"That is Beat Breeze today: music at the centre, with screens, content, announcements and now Radio around it. If you already use Beat Breeze, explore the tools in your account and hear what your own station could sound like. Radio needs a paid plan and uses AI credits. If you are new, visit beatbreeze.io or contact Norbert at BMAsia, and we can help you choose a sensible starting point for your venues.","visualCoverage":["music foundation and expanded platform","next step for existing and new customers","Beat Breeze and BMAsia contact paths"],"index":17,"src":"audio/20261102-radio-b3960254cfd777e2/15-close.mp3","transcriptSha256":"ffddc200c5c7eb26ec98509628da5c37d87b3d7d9378195aea8538bb5a23bc07","audioSha256":"5a7f053fd9fb5d22fa4eb33423518e450adedc1fce9a9721fd40407c7c6bac63","durationSeconds":27.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.41}],"generation":{"mode":"six-targeted-preview-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11,"previousReleaseId":"20261024-pricing-1c747b2a731466c7"},"qualityAssurance":{"method":"Primary transcript, independent audio transcript QA and assistant semantic review; not customer listening approval.","record":"docs/beat-breeze-radio-preview-20261102-qa.json","managedOfferRecord":"docs/beat-breeze-radio-preview-20261102-managed-offer-qa.json","reviewedClipCount":6,"verifiedUnchangedClipCount":11},"preview":true,"complete":true};

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
        visible: "Loading",
        short: "Loading",
        pressed: "false",
        label: "Loading narration",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "Voice pending",
        short: "Pending",
        pressed: "false",
        label: "Narration audio is being prepared",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "Start narration",
        short: "Start",
        pressed: "false",
        label: "Start narration",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "Narration on",
        short: "Voice on",
        pressed: "true",
        label: "Mute narration",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "Resume narration",
        short: "Resume",
        pressed: "false",
        label: "Resume narration",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "Replay",
        short: "Replay",
        pressed: "false",
        label: "Replay narrated presentation",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "Retry audio",
        short: "Retry",
        pressed: "false",
        label: "Retry narration audio",
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
    label.textContent = "Voice unavailable";
    shortLabel.textContent = "Unavailable";
    button.setAttribute(
      "aria-label",
      "Narration is not available on this slide",
    );
    button.title = "Narration is not available on this slide";
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
        announce("Narration audio is being prepared.");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("Narration is not available on this slide.");
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
      announce(`Narration playing for slide ${currentIndex + 1}.`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Beat Breeze narration playback failed", error);
      failPlayback("Narration could not be played. Please try again.");
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce("Narration off.");
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
        announce("Narration is not available on this slide.");
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
    toolbar = root?.querySelector('[role="toolbar"][aria-label="Deck controls"]');
    if (!stage || !root || !toolbar) return false;
    if (root.querySelector("#beat-breeze-narration-toggle")) return true;

    addStyles(root);

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
      <span class="narration-label">Narration</span>
      <span class="narration-label-short">Voice</span>
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
    invitation.setAttribute("aria-label", "Narration invitation");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">Want the guided version?</span>
      <button class="narration-invitation-start" type="button">Start narration</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="Dismiss narration invitation">×</button>
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
        announce("Narrated presentation complete.");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("Narration audio could not be loaded.");
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
          announce("Narration ready.");
        } else {
          setNarrationUnavailable();
          announce("Narration is not available on this slide.");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("Beat Breeze narration manifest failed to load", error);
        setButtonState("error");
        announce("Narration could not be loaded. Try again.");
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
