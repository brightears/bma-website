(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-th/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-narration-invitation-seen-th";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-th","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-th.html","officialDeckSha256":"8df0fe9803b82e4a6e98b90869c58974bc96f8e72db9a1d6215597c7b9f28c29","scriptPath":"public/presentations/narration/beat-breeze-voice-preview-th/script.json","scriptSha256":"c362e8b4746a41c9b8f6e7f52fe6f86df151f6a664e687f2f75cd479ba386cfd"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"ผู้เชี่ยวชาญผลิตภัณฑ์ Beat Breeze ที่อบอุ่น เป็นมืออาชีพ และเข้าใจงานของผู้ประกอบการ","scene":"การนำเสนอแบบเป็นกันเองกับผู้จัดการสถานที่หนึ่งคน โดยพูดอธิบายสไลด์ที่กำลังแสดงอยู่","style":"เป็นมิตร มั่นใจ และเป็นธรรมชาติ เหมือนกำลังช่วยให้คนหนึ่งคนเข้าใจว่า Beat Breeze ช่วยงานสถานที่ได้อย่างไร ไม่ใช่การอ่านสไลด์หรือพากย์โฆษณา","pacing":"จังหวะสบาย ไม่เร่ง เว้นช่วงสั้น ๆ ระหว่างแนวคิดสำคัญ และออกเสียงชื่อผลิตภัณฑ์ให้ชัดเจนโดยไม่เน้นจนเกินไป"}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":819.6,"slides":[{"index":1,"id":"01-title","label":"หน้าปก","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/01-title.mp3","text":"สวัสดีค่ะ Beat Breeze เริ่มต้นจากคำสัญญาง่าย ๆ ว่า เพลงที่เหมาะสมจะต้องเล่นต่อเนื่องในทุกพื้นที่ของสถานที่ แต่สิ่งที่เห็นในวันนี้ไปไกลกว่านั้นมาก เพราะแพลตฟอร์มเดียวกันรวมทั้งเพลง หน้าจอ ประกาศ และคอนเทนต์ที่ใช้กับสื่อเหล่านั้นไว้ด้วยกัน ครอบคลุมทุกพื้นที่ที่คุณดูแล ดังนั้นนี่จึงไม่ใช่แค่การพาชมเครื่องเล่นเพลง แต่เป็นการดูว่าระบบเดียวจะช่วยสร้างและบริหารประสบการณ์สื่อทั้งหมดภายในสถานที่ได้อย่างไรค่ะ","visualCoverage":["แพลตฟอร์มครบวงจรสำหรับสถานที่","เพลง หน้าจอ ประกาศ และคอนเทนต์","แพลตฟอร์มเดียวสำหรับทุกพื้นที่"],"transcriptSha256":"558996688c9ffcdd7e67bd0bc435a227433da7b2073e8e2a3838a0c1d759b960","audioSha256":"008c9d07b0829ec4b37b84d1a2e5dd3de92888e4d02b9d6bf19633904620e7dd","durationSeconds":32,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.43,"loudnessRangeLu":2.8,"thresholdLufs":-28.69,"targetOffsetLu":0.14,"cached":false,"reusedFromPreviousRelease":true},{"id":"02-one-platform-many-jobs","label":"แพลตฟอร์มเดียว หลายหน้าที่","text":"สไลด์นี้คือแผนที่ของแพลตฟอร์ม และแบ่งออกเป็นสามส่วนค่ะ ด้านซ้ายคือเพลงและระบบอัตโนมัติ มีเพลงที่ได้รับอนุญาตสำหรับแต่ละโซน ตารางที่ดูแลทั้งวัน Music Director ที่ใช้ AI และการเล่นเพลงแบบออฟไลน์ ตรงกลางคือการสร้างคอนเทนต์ Compose ใช้สร้างเพลงต้นฉบับ Content Studio สร้างภาพและวิดีโอ TV Channels นำผลงานเหล่านั้นขึ้นหน้าจอ และระบบประกาศช่วยให้สถานที่สื่อสารได้หลายภาษา ประกาศเสียงใช้สำหรับข้อความแต่ละครั้ง ส่วน Radio เป็นสถานีที่มีผู้ดำเนินรายการอย่างต่อเนื่องในแบบของธุรกิจคุณค่ะ ส่วนด้านขวาคือการดำเนินงาน ทุกสาขา โซน ทีม และเครื่องเล่นอยู่ในแดชบอร์ดเดียว พร้อมการควบคุมแบรนด์เมื่อคุณต้องการความสม่ำเสมอ คุณจะบริหารเองก็ได้ หรือให้ทีม BMAsia ช่วยออกแบบเพลงและดูแลระบบก็ได้เช่นกัน ต่อไปเรามาเริ่มจากหัวใจของแพลตฟอร์ม นั่นคือเพลงค่ะ","index":2,"src":"audio/20261102-radio-495c8cf43715023a/02-one-platform-many-jobs.mp3","transcriptSha256":"e8724e9441d150a0a689f1c0916e9b2acf020706c174d0b2d6a129b5dfd4bfe7","audioSha256":"7f0083d854ebd63ac1bc4ae86c3920b66cbbd527fb3c01cd0df26b209dcc0404","durationSeconds":62.36,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.2},{"index":3,"id":"03-music-that-runs-itself","label":"เพลงที่ทำงานได้เอง","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/03-music-that-runs-itself.mp3","text":"หัวใจของ Beat Breeze คือเพลงที่ดูแลวันของสถานที่ได้โดยไม่ต้องมีคนคอยสั่งตลอดเวลา ล็อบบี้ บาร์ สปา และร้านอาหารสามารถมีบรรยากาศของตัวเอง ขณะที่สำนักงานใหญ่เห็นทุกสาขาจากแดชบอร์ดเดียว คุณวางจังหวะของวันไว้ครั้งเดียว เช่น สงบในตอนเช้า มีพลังขึ้นช่วงกลางวัน และอบอุ่นในช่วงเย็น จากนั้นระบบจะเปลี่ยนช่วงเวลาให้เอง คลังเพลงได้รับอนุญาตสำหรับการใช้ในธุรกิจและเพิ่มเพลงใหม่อย่างต่อเนื่อง หรือจะอธิบายอารมณ์ที่ต้องการแล้วให้ผู้ช่วยจัดเพลย์ลิสต์ก็ได้ และที่สำคัญ หากอินเทอร์เน็ตขัดข้อง เครื่องเล่นในสถานที่ยังออกแบบมาให้เพลงเล่นต่อได้ค่ะ","visualCoverage":["เพลงที่แตกต่างกันในแต่ละโซน","ตารางเวลาและช่วงเวลาของวัน","การเล่นแบบออฟไลน์","คลังเพลงสำหรับธุรกิจและการสร้างเพลย์ลิสต์ด้วย AI"],"transcriptSha256":"e3c36496c4fdb68e113c1f1eb584f2e6514d77d688adda21a2e720531f2442f4","audioSha256":"1ece2f27e5b532995a3eb4e3fd46507827c85f4f6825bd8216ad7f50370c16cd","durationSeconds":45.08,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.61,"truePeakDbtp":-3.42,"loudnessRangeLu":3.2,"thresholdLufs":-28.94,"targetOffsetLu":0.19,"cached":false,"reusedFromPreviousRelease":true},{"index":4,"id":"04-automations","label":"ระบบอัตโนมัติ","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/04-automations.mp3","text":"ตารางเวลาจะเปลี่ยนเพลงตามเวลาที่กำหนด ส่วนระบบอัตโนมัติจะช่วยให้สถานที่ตอบสนองต่อสิ่งที่กำลังเกิดขึ้นจริงค่ะ ระบบลดเสียงอัตโนมัติในช่วงดึกได้ และ Daily Energy Curve จะค่อย ๆ ปรับบรรยากาศเพลงจากสงบในตอนเช้า ให้คึกคักขึ้นช่วงกลางวัน แล้วผ่อนคลายลงในตอนค่ำ เมื่อฝนตกหรืออากาศร้อน ระบบก็เปลี่ยนอารมณ์เพลงให้เหมาะกับสภาพอากาศได้ หากเชื่อมต่อเครื่องนับคนหรือข้อมูลจาก POS เพลงจะคึกคักขึ้นโดยอัตโนมัติเมื่อมีลูกค้ามากขึ้น นอกจากนี้ยังพักเพลงตามเวลาละหมาด เปลี่ยนเพลย์ลิสต์ตามช่วงเวลาของวัน และเตรียมเพลงสำหรับเทศกาลหรือวันหยุดได้ คุณจะเริ่มจากตัวอย่างที่มีอยู่ หรือสร้างกฎของตัวเองก็ได้ และระบบสำคัญเหล่านี้ รวมถึงการพักเพลงตามเวลาละหมาด ยังทำงานต่อได้แม้อินเทอร์เน็ตขัดข้องค่ะ","visualCoverage":["การลดเสียงอัตโนมัติและ Daily Energy Curve","การตอบสนองต่อสภาพอากาศและอุณหภูมิ","ตัวกระตุ้นจากจำนวนคนหรือ POS","เวลาละหมาด ช่วงเวลา และเทศกาล","การทำงานแบบออฟไลน์"],"transcriptSha256":"633d765ba6c4d8ed8439de07bc3586aa251e6bf01d72248ea5db77d744c3f035","audioSha256":"28f3d24ffad16334e283bad86219d8709a0402b4ac429487fa3654d4790b583c","durationSeconds":57,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.3,"loudnessRangeLu":2,"thresholdLufs":-28.91,"targetOffsetLu":0.23,"cached":false,"reusedFromPreviousRelease":false},{"index":5,"id":"05-your-music-director","label":"Music Director ของคุณ","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/05-your-music-director.mp3","text":"Music Director คือผู้ช่วย AI ใน Beat Breeze ที่คอยดูแลและแนะนำการปรับเพลงค่ะ ระบบจะตรวจสอบแต่ละโซนทุกคืน และเสนอเฉพาะสิ่งที่เห็นว่าควรปรับปรุง โดยไม่เกินสามคำแนะนำต่อสัปดาห์ ตัวอย่างบนหน้าจอแสดงหลักฐานและเหตุผลประกอบอย่างชัดเจน ส่วนคุณเป็นผู้ตัดสินใจว่าจะนำคำแนะนำนั้นไปใช้หรือไม่ และทุกการเปลี่ยนแปลงย้อนกลับได้ เมื่อใช้งานไป ระบบจะเรียนรู้จากพฤติกรรมจริง เช่น เพลงที่ถูกข้าม การปรับระดับเสียง และเพลงที่ทีมงานเลือกให้เล่นต่อ พร้อมเตรียมคำแนะนำล่วงหน้าสำหรับเทศกาลต่าง ๆ หากเชื่อมต่อข้อมูลยอดขายหรือจำนวนลูกค้า คุณยังเปรียบเทียบผลก่อนและหลังเปลี่ยนเพลงได้ จึงตัดสินใจจากข้อมูลจริง ไม่ใช่เพียงความรู้สึกค่ะ","visualCoverage":["การตรวจสอบแต่ละโซนทุกคืน","คำแนะนำที่จำกัดจำนวนและอธิบายเหตุผล","การเรียนรู้จากการใช้งานจริงในสถานที่","การเตรียมเพลงล่วงหน้าตามฤดูกาล","รายงานก่อนและหลังการเปลี่ยนแปลง"],"transcriptSha256":"77fb50f73ea25f381773d0d5966de72e5276a01f81bcaa52be1442cc981615e8","audioSha256":"3bd5ab7f800167a203d3e6ec939d1d7f2f982f7a5740db355fae051a6eeb3c09","durationSeconds":48.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.39,"loudnessRangeLu":1.8,"thresholdLufs":-28.74,"targetOffsetLu":0.12,"cached":false,"reusedFromPreviousRelease":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/06-compose.mp3","text":"Compose พาเราไปไกลกว่าการเลือกเพลง เพราะคุณสามารถสร้างเพลงขึ้นมาใหม่ได้ค่ะ เพียงอธิบายฉากด้วยภาษาธรรมดา อย่างบรีฟสำหรับมื้อค่ำใต้แสงเทียนที่เห็นบนหน้าจอ Beat Breeze จะสร้างเพลงต้นฉบับสำหรับช่วงเวลานั้นโดยเฉพาะ และผลลัพธ์แรกไม่จำเป็นต้องเป็นคำตอบสุดท้าย คุณสามารถขอปรับอารมณ์ จังหวะ เครื่องดนตรี หรือเสียงร้องด้วยอีกหนึ่งประโยค สำหรับสถานที่ คุณค่าไม่ได้อยู่แค่ว่า AI สร้างเพลงได้ แต่อยู่ที่คุณสามารถพัฒนาเสียงประจำแบรนด์สำหรับแคมเปญ พื้นที่ หรือช่วงบริการสำคัญ โดยไม่ต้องใช้เพลย์ลิสต์เดียวกับคนอื่นค่ะ","visualCoverage":["เพลงต้นฉบับจากข้อความบรีฟ","แนวทางสร้างสรรค์เฉพาะสถานที่","การปรับแก้ด้วยข้อความเพิ่มเติม"],"transcriptSha256":"7c2e529200f89d680342a736aec0a2207226053c76c46d4dbdae40dd137c4952","audioSha256":"8a4e667458eb3a8ee133b1c087635652cd0924a86330e096040d9522b912c0bb","durationSeconds":39.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.41,"loudnessRangeLu":2.2,"thresholdLufs":-28.8,"targetOffsetLu":0.17,"cached":false,"reusedFromPreviousRelease":true},{"index":7,"id":"07-studio-and-screens","label":"Studio และหน้าจอ","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/07-studio-and-screens.mp3","text":"แนวคิดเดียวกันต่อยอดไปถึงภาพค่ะ Content Studio ช่วยทีมของคุณสร้างสื่อที่สถานที่ต้องใช้เป็นประจำ ไม่ว่าจะเป็นโพสต์โซเชียล โปสเตอร์โปรโมชัน วิดีโอสั้น ป้ายดิจิทัล หรือวิดีโอวนสร้างบรรยากาศ โดยใช้โลโก้และสีของแบรนด์ จากนั้น TV Channels จะนำคอนเทนต์ออกจากเครื่องมือสร้างไปยังหน้าจอที่คุณมีอยู่แล้ว หน้าจอล็อบบี้อาจแสดงข้อเสนอคืนนี้พร้อมกับเพลงของโซนนั้น หน้าจอสปาอาจเล่นภาพวนที่สงบและมีแบรนด์ และโรงแรมสามารถขยายช่องเหล่านี้ไปยังทีวีในห้องพักได้ เครื่องมือสร้างสรรค์และระบบเผยแพร่จึงอยู่ด้วยกัน ไม่ต้องกลายเป็นอีกหนึ่งโครงการป้ายดิจิทัลที่แยกออกไปค่ะ","visualCoverage":["รูปแบบผลงานใน Content Studio","การใช้สไตล์ของแบรนด์","การเผยแพร่ผ่าน TV Channels","การใช้งานบนทีวีในห้องพัก"],"transcriptSha256":"764d716b4b7f538a9e9b023a37ada56597e97dd92d6757bde5bdb05474304ef8","audioSha256":"52b7209a4a161280db96e567dc4ec1aaab05b548c200e6751a9056384085b40e","durationSeconds":46.08,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.4,"loudnessRangeLu":2.3,"thresholdLufs":-28.77,"targetOffsetLu":0.14,"cached":false,"reusedFromPreviousRelease":true},{"index":8,"id":"08-announcements","label":"ประกาศ","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/08-announcements.mp3","text":"ต่อไปคือการสื่อสารด้วยเสียงภายในสถานที่ค่ะ คุณเขียนข้อความ เลือกภาษาและเสียง กำหนดเวลา แล้วให้ประกาศเล่นทับเพลงได้ ไม่ว่าจะเป็นช่วงแฮปปี้อาวร์ การแจ้งรับออร์เดอร์สุดท้าย ข้อความต้อนรับ หรือข้อความสำหรับการดำเนินงาน ตัวอย่างสามแบบบนหน้าจอแสดงให้เห็นว่าสถานที่เดียวสื่อสารได้หลายภาษา โดยไม่ต้องจองสตูดิโอสำหรับทุกไฟล์ ระบบเดียวกันยังสร้างเสียงระหว่างรอสายแบบมืออาชีพ โดยผสมเสียงพูดและเพลงให้ผู้โทรได้ฟัง พูดง่าย ๆ คือทั้งเพลงและประกาศทั้งหมดจัดการได้จากที่เดียวกันค่ะ","visualCoverage":["ประกาศหลายภาษาในสถานที่","การตั้งเวลาเล่นประกาศทับเพลง","เสียงระหว่างรอสาย"],"transcriptSha256":"1d2c5e338709ffeb04270ede21c1914325c86c00523d54f0f8b089d1bc8c70f0","audioSha256":"e355871b40bc1528a7ef903d6c794e24f810715960ff0648fd5743e19edafcaf","durationSeconds":36.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.39,"loudnessRangeLu":1.7,"thresholdLufs":-28.73,"targetOffsetLu":0.16,"cached":false,"reusedFromPreviousRelease":false},{"id":"radio-your-station","label":"AI Radio","text":"ประกาศเสียงเหมาะกับข้อความที่ต้องการเปิดในช่วงเวลาหนึ่งค่ะ ส่วน Radio ช่วยต่อยอดเป็นรายการที่มีผู้ดำเนินรายการอย่างต่อเนื่องสำหรับธุรกิจของคุณ ลองดูตามลำดับบนสไลด์นะคะ ระหว่างที่เพลงกำลังเล่น ผู้ดำเนินรายการจะเข้ามาทักทายหรือแนะนำโปรโมชันสั้น ๆ แล้วส่งกลับเข้าสู่เพลง สำหรับคาเฟ่ อาจเป็นการบอกว่าขนมอบใหม่พร้อมแล้ว สำหรับกลุ่มร้านค้าปลีก อาจเป็นโปรโมชันปัจจุบันหรือเรื่องราวของแบรนด์ คุณเลือกเสียง บุคลิก และภาษาของผู้ดำเนินรายการได้ รวมทั้งกำหนดว่าจะให้พูดบ่อยแค่ไหน จะใช้เพลงที่แต่ละสาขาเปิดอยู่แล้ว เลือกมิกซ์สำหรับสถานี หรือให้ AI วางแผนทั้งสัปดาห์ก็ได้ และสามารถฟังรายการตัวอย่างหนึ่งชั่วโมงก่อนนำสถานีออกอากาศจริงค่ะ","index":9,"src":"audio/20261102-radio-f01f548d5620bd3a/radio-your-station.mp3","transcriptSha256":"8e87ccb373724e028269b8b03c0aaaec2322b1119bbc6033f6127b3cd1df9a63","audioSha256":"20bab37330b180e481f7d49d10d2a1f27009a9651eca70b187d809b589719339","durationSeconds":51.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.41},{"id":"radio-across-locations","label":"Radio สำหรับทุกสาขา","text":"สำหรับธุรกิจที่มีหลายสาขา สำนักงานใหญ่กำหนดทิศทางของสถานี ส่วนรายการเฉพาะภูมิภาคช่วยให้เนื้อหาเหมาะกับแต่ละพื้นที่ค่ะ แผนภาพนี้แสดงว่าแบรนด์เดียวกันสามารถใช้ภาษาของผู้ดำเนินรายการและโปรโมชันต่างกันในแต่ละภูมิภาคได้ ข้อมูลสภาพอากาศจะใช้เมื่อเกี่ยวข้องกับสาขาที่รับรายการ ทีมของคุณเป็นผู้ระบุข้อเท็จจริงของโปรโมชัน เช่น ราคาและวันที่ Radio สามารถปรับถ้อยคำรอบข้อมูลเหล่านั้นได้ โดยมีการตรวจทั้งสคริปต์และเสียงบันทึกก่อนเปิดแต่ละช่วง รายการถูกเตรียมไว้ล่วงหน้า ไม่ใช่การพูดสดโดยไม่มีสคริปต์ สำนักงานใหญ่ฟังช่วงพูดล่วงหน้า พักสถานี ข้ามช่วงพูด หรือหยุดใช้แหล่งข้อมูลนั้นอีกได้ และดูย้อนหลังได้ว่าช่วงใดออกอากาศแล้ว Radio ใช้เครดิต AI และต้องมีแพ็กเกจ Beat Breeze แบบชำระเงิน จึงควรวางแผนการใช้งานร่วมกับเครื่องมือ AI อื่น ๆ ค่ะ","index":10,"src":"audio/20261102-radio-e18b913de0415f1c/radio-across-locations.mp3","transcriptSha256":"e9cdc7f7e59bbcc6bae38bd96c791ddc293c9d7c23778d5708d9ddfcec70b916","audioSha256":"f28d76eff39ed87a86b3d6c5c65d34752884ea53e76c8bb4ac4853bb006c0739","durationSeconds":58.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.31},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"ใช้งานร่วมกับ Claude และ ChatGPT","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/09-works-with-claude-and-chatgpt.mp3","text":"ถ้าทีมของคุณใช้ Claude หรือ ChatGPT อยู่แล้ว Beat Breeze ก็ทำงานผ่านหน้าต่างแชตที่คุ้นเคยได้ค่ะ ตัวอย่างบนหน้าจอแสดงขอบเขตได้ชัดเจน คุณถามได้ว่าเย็นวันศุกร์จะเล่นอะไร ขอให้ลดเสียงล็อบบี้ลงเล็กน้อย หรือเตรียมตารางสปาแบบใหม่สำหรับวันพรุ่งนี้ การควบคุมทันทีจะยังอิงตามสิทธิ์ของผู้ใช้ และการเปลี่ยนตารางที่วางแผนไว้จะแสดงให้ตรวจสอบและยืนยันก่อนบันทึกทุกครั้ง การเชื่อมต่อใช้คีย์ที่ปลอดภัยและเพิกถอนได้ จึงยกเลิกสิทธิ์ได้เมื่อบุคคลหรือระบบนั้นไม่จำเป็นต้องใช้อีก ประโยชน์คือทีมจัดการงานเพลงประจำวันด้วยภาษาธรรมดาได้ โดยยังคงการควบคุมของผู้ดูแลไว้ครบถ้วนค่ะ","visualCoverage":["การควบคุมด้วยภาษาธรรมดา","คำถามเกี่ยวกับตารางปัจจุบัน","การยืนยันก่อนเปลี่ยนตาราง","สิทธิ์เข้าถึงที่ปลอดภัยและเพิกถอนได้"],"transcriptSha256":"0742522b2f2ffb73385d4c06f963db6f2812a0bff0d1a363b2e5ab3c60eeb845","audioSha256":"b747073349a8132bfe877bea79128c9cd2a13ed70f39f426f5ec49477187a599","durationSeconds":43.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.43,"loudnessRangeLu":2.9,"thresholdLufs":-28.79,"targetOffsetLu":0.25,"cached":false,"reusedFromPreviousRelease":true},{"index":12,"id":"10-built-for-operators","label":"สร้างมาเพื่อผู้ดูแลสถานที่","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/10-built-for-operators.mp3","text":"สไลด์นี้มีรูปแบบการดูแลสองแบบค่ะ ด้านบน คุณบริหาร Beat Breeze เอง หนึ่งบัญชีครอบคลุมหลายสาขาและหลายโซน สมาชิกทีมได้รับสิทธิ์เท่าที่จำเป็น และ Brand Lock ช่วยล็อกเพลงในโซนที่ต้องรักษามาตรฐานของแบรนด์ เครื่องเล่นทำงานบนอุปกรณ์มือถือ Windows หรือเว็บที่รองรับและคุณมีอยู่แล้ว และคอมพิวเตอร์ Windows หนึ่งเครื่องที่มีการ์ดเสียงหลายช่องสัญญาณสามารถดูแลหลายโซนได้ ด้านล่างคือแบบที่ BMAsia ดูแลให้ แพลตฟอร์มยังเหมือนเดิม แต่ทีมของเราจะเพิ่มการออกแบบเพลงเฉพาะสำหรับแบรนด์ การสนับสนุนด้านเทคนิคตลอดเวลา ผู้จัดการบัญชี และการดูแลภาพรวมทุกสาขา คุณเลือกได้ว่าต้องการให้เราเข้ามาช่วยมากน้อยเพียงใดค่ะ","visualCoverage":["การควบคุมหลายสาขาด้วยตนเอง","สิทธิ์ทีมและ Brand Lock","ตัวเลือกเครื่องเล่นและ Windows หลายโซน","บริการแบบ BMAsia ดูแลให้"],"transcriptSha256":"a646193667aa363e5249acf58fbeab6f4375ec770db054242f1d64738513059a","audioSha256":"3f02201a026f82e38d18aabff2370f790c756ee46b9a7279427e9b2101a3fb81","durationSeconds":45.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.41,"loudnessRangeLu":2.1,"thresholdLufs":-28.88,"targetOffsetLu":0.25,"cached":false,"reusedFromPreviousRelease":false},{"index":13,"id":"11-never-go-silent","label":"ออกแบบมาให้เพลงไม่หยุด","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/11-never-go-silent.mp3","text":"ฟีเจอร์สร้างสรรค์ทั้งหมดจะมีความหมายก็ต่อเมื่อระบบเชื่อถือได้ในสถานที่จริงค่ะ นั่นคือเหตุผลของการป้องกันสี่ส่วนบนหน้าจอ ตารางประจำสัปดาห์ ระบบอัตโนมัติ และการพักเพลงตามเวลาละหมาดถูกเก็บไว้ในเครื่อง จึงทำงานต่อได้เมื่ออินเทอร์เน็ตขัดข้อง และประวัติการเล่นจะซิงก์กลับภายหลัง ระบบเฝ้าระวังช่วยกู้คืนเครื่องเล่นโดยอัตโนมัติเมื่อเครื่องค้าง ประกาศทุกข้อความจะรายงานกลับว่าเล่นสำเร็จบนอุปกรณ์ใดบ้าง ผู้ดูแลจึงตรวจสอบได้ว่าข้อความไปถึงทุกพื้นที่ตามที่กำหนด และใบอนุญาตเพลงสามารถตรวจสอบได้ทันทีผ่านคิวอาร์โค้ด งานวิศวกรรมทั้งหมดมุ่งไปที่ผลลัพธ์เดียว คือผู้ใช้บริการไม่ควรรู้สึกถึงปัญหาทางเทคนิคที่เกิดขึ้นค่ะ","visualCoverage":["การทำงานออฟไลน์อย่างต่อเนื่อง","การกู้คืนเครื่องเล่นอัตโนมัติ","การยืนยันว่าประกาศเล่นสำเร็จ","การตรวจสอบสิทธิ์การใช้งานได้ทันที"],"transcriptSha256":"b91ac248d7628d2614ad6d97230bb284ad4c5920d2e8fe3b614d504bfd66838b","audioSha256":"4057d786d86c8ab9875889274a65f903fddd80283784811cfade2a7e286f5f15","durationSeconds":45.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.42,"loudnessRangeLu":2.2,"thresholdLufs":-28.88,"targetOffsetLu":0.29,"cached":false,"reusedFromPreviousRelease":false},{"id":"12-why-beat-breeze","label":"ทำไมต้อง Beat Breeze","text":"สไลด์นี้สรุปความแตกต่างทั้งหมดไว้ในภาพเดียวค่ะ เพลงแยกตามโซนและตารางอัตโนมัติคือพื้นฐาน ซึ่งเป็นจุดเริ่มต้นของหลายแพลตฟอร์ม แต่ Beat Breeze ออกแบบมาให้ไปต่อจากพื้นฐานนั้น มีทั้งการทำงานแบบออฟไลน์ เพลงต้นฉบับจาก Compose การสร้างภาพและวิดีโอ ประกาศหลายภาษา เสียงระหว่างรอสาย และ TV Channels ที่มีแบรนด์ Radio เพิ่มสถานีที่มีผู้ดำเนินรายการ นำเรื่องราวและโปรโมชันของแบรนด์มาสลับกับเพลงอย่างต่อเนื่องค่ะ ความแตกต่างที่แท้จริงจึงไม่ใช่เครื่องหมายถูกข้อใดข้อหนึ่ง แต่คือสถานที่ไม่ต้องนำระบบเพลง เครื่องมือสร้างสรรค์ ข้อความ และหน้าจอมาต่อกันเองหลายชุด Beat Breeze ช่วยทั้งบริหารประสบการณ์ภายในสถานที่ และสร้างคอนเทนต์ที่อยู่ในประสบการณ์นั้นค่ะ","index":14,"src":"audio/20261102-radio-fb8448fb4ff82d7a/12-why-beat-breeze.mp3","transcriptSha256":"7e4c23fcc8de209cd52167978e06e1995b2ca5cd4fcb312fc17702dda64b7a2f","audioSha256":"098f65c45599194aa388c15eb015be9340e47bf3487811a8521107cc2b82aaf0","durationSeconds":47.08,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.34},{"id":"13-pricing","label":"ราคา","text":"คุณเลือกได้ว่าจะจัดการเพลงเอง หรือให้ BMAsia ดูแลค่ะ แบบดูแลเอง ราคา 15 ดอลลาร์สหรัฐ หรือ 499 บาท ต่อโซนต่อเดือน ถ้าเลือกจ่ายรายปี ราคา 150 ดอลลาร์สหรัฐ หรือ 4,990 บาท ต่อโซนต่อปี ทั้งสองแพ็กเกจมีฟีเจอร์ของแอปครบ โดยคุณเป็นผู้จัดการเพลย์ลิสต์และตารางเล่นเพลงเอง ส่วนบริการที่ BMAsia ดูแลให้ ราคา 260 ดอลลาร์สหรัฐ หรือ 9,000 บาท ต่อโซนต่อปี และมีเฉพาะแพ็กเกจรายปีเท่านั้น แพ็กเกจนี้รวมการดูแลเพลงและสถานี Radio โดย BMAsia ค่ะ ทีมออกแบบเพลงของเราจะเลือกและปรับเพลย์ลิสต์กับตารางเล่นเพลงที่กำหนดให้แต่ละโซน รวมถึงปรับให้เหมาะกับเทศกาลและฤดูกาล พร้อมการสนับสนุนด้านเทคนิคตลอด 24 ชั่วโมง และผู้จัดการบัญชีเฉพาะ เครดิตสำหรับสร้างคอนเทนต์ด้วย AI เพิ่มเติมมีค่าใช้จ่ายแยกต่างหากค่ะ ไม่ว่าจะเลือกแพ็กเกจไหน ทุกคนก็ได้รับการอัปเดตแอปอย่างต่อเนื่องค่ะ สิ่งที่ต่างกันคือใครเป็นผู้ดูแลเพลงให้คุณ แบบดูแลเองเริ่มทดลองใช้ฟรี 14 วันกับหนึ่งโซนได้ โดยต้องใช้บัตร แต่จะไม่มีการเรียกเก็บเงินตอนเริ่มค่ะ ถ้าให้ BMAsia จัดการทดลองใช้ให้ ก็ไม่ต้องใช้บัตรค่ะ สำหรับองค์กรขนาดใหญ่ เราจัดสัญญาและการออกใบแจ้งหนี้ให้เหมาะสมได้ และไม่จำเป็นต้องซื้อกล่องเครื่องเล่นเฉพาะค่ะ","index":15,"src":"audio/20261102-radio-c61dececc241ca96/13-pricing.mp3","transcriptSha256":"cc8c4593ed266896b9ea0150bb2935f0e0e57e6af878af37f4516ff5bdf2943e","audioSha256":"e1215299cb5b09e5d583f7475bddf0d95a1a7c75b772143fa7676129ad3e8d42","durationSeconds":89.64,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.39},{"index":16,"id":"14-whos-behind-it","label":"ทีมที่อยู่เบื้องหลัง","src":"../beat-breeze-voice-preview-th/audio/20260903-3827823b0a44/14-whos-behind-it.mp3","text":"เบื้องหลัง Beat Breeze คือ BMAsia ทีมที่ออกแบบเพลงให้โรงแรม ร้านอาหาร ร้านค้าปลีก และธุรกิจเวลเนสมาตั้งแต่ปี 2002 ค่ะ ประสบการณ์นี้สำคัญ เพราะแพลตฟอร์มไม่ได้ถูกกำหนดโดยวิศวกรรมซอฟต์แวร์เพียงอย่างเดียว นักออกแบบเพลงที่ทำงานจริงช่วยวางแนวทางการคัดสรรและวิธีที่ AI เข้าใจสถานที่ มีทีมผู้เชี่ยวชาญคอยดูแลตลอด 24 ชั่วโมง และแผนพัฒนาผลิตภัณฑ์ขับเคลื่อนจากความต้องการที่ผู้ดูแลสถานที่บอกกับเรา ดังนั้นเมื่อคุณเลือกแพลตฟอร์มนี้ จะมีทั้งทีมเพลงและทีมบริการที่มีประสบการณ์อยู่เบื้องหลังค่ะ","visualCoverage":["BMAsia ตั้งแต่ปี 2002","นักออกแบบเพลงที่อยู่เบื้องหลังการคัดสรร","ทีมผู้เชี่ยวชาญที่ดูแลตลอด 24 ชั่วโมงและแผนพัฒนาจากผู้ใช้งาน"],"transcriptSha256":"1acf6680485996c6c68d3bc2d34ce496869b14464415e20cb3d0b0290361af1b","audioSha256":"06743febd8ea2bb90535ac2075ae3f81868d73658b1d3b0f1e7a7165d440a1e6","durationSeconds":37.56,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.39,"loudnessRangeLu":2.3,"thresholdLufs":-28.89,"targetOffsetLu":0.31,"cached":false,"reusedFromPreviousRelease":true},{"id":"15-close","label":"เริ่มต้นใช้งาน","text":"นี่คือ Beat Breeze ในวันนี้ค่ะ มีเพลงเป็นหัวใจ เชื่อมกับหน้าจอ คอนเทนต์ ประกาศเสียง และตอนนี้มี Radio ด้วย หากคุณใช้ Beat Breeze อยู่แล้ว ลองเปิดเครื่องมือในบัญชีและฟังว่าสถานีของคุณจะเป็นอย่างไร Radio ต้องใช้แพ็กเกจแบบชำระเงินและใช้เครดิต AI หากคุณเพิ่งเริ่มต้น เข้าไปที่ beatbreeze.io หรือติดต่อ Norbert ที่ BMAsia แล้วเราจะช่วยเลือกจุดเริ่มต้นที่เหมาะกับสถานที่ของคุณค่ะ","index":17,"src":"audio/20261102-radio-6492f2894a7eed7f/15-close.mp3","transcriptSha256":"851a2d61f750681a31357876bcced613ea38329bdbe8364059764196557df0ee","audioSha256":"73e4acc92f0d4adc1d462ac380611256aee78fdf89aea2d3e1f2b0a989410034","durationSeconds":32.36,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.62,"truePeakDbtp":-3.42}],"qualityAssurance":{"record":"docs/beat-breeze-radio-th-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};

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
        visible: "กำลังโหลด",
        short: "กำลังโหลด",
        pressed: "false",
        label: "กำลังโหลดเสียงบรรยาย",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "กำลังเตรียมเสียง",
        short: "รอเสียง",
        pressed: "false",
        label: "กำลังเตรียมเสียงบรรยาย",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "เริ่มคำบรรยาย",
        short: "เริ่มฟัง",
        pressed: "false",
        label: "เริ่มคำบรรยาย",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "กำลังบรรยาย",
        short: "กำลังพูด",
        pressed: "true",
        label: "ปิดเสียงบรรยาย",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "ฟังคำบรรยายต่อ",
        short: "ฟังต่อ",
        pressed: "false",
        label: "ฟังคำบรรยายต่อ",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "เล่นใหม่",
        short: "เล่นใหม่",
        pressed: "false",
        label: "เล่นงานนำเสนอพร้อมคำบรรยายอีกครั้ง",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "ลองเสียงอีกครั้ง",
        short: "ลองใหม่",
        pressed: "false",
        label: "ลองโหลดเสียงบรรยายอีกครั้ง",
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
            throw new Error(`ไฟล์รายการเสียงบรรยายตอบกลับด้วยสถานะ ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("ไฟล์รายการเสียงบรรยายไม่ตรงกับงานนำเสนอนี้");
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
    label.textContent = "ไม่มีคำบรรยาย";
    shortLabel.textContent = "ไม่มีเสียง";
    button.setAttribute(
      "aria-label",
      "สไลด์นี้ไม่มีเสียงบรรยาย",
    );
    button.title = "สไลด์นี้ไม่มีเสียงบรรยาย";
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
        announce("กำลังเตรียมเสียงบรรยาย");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("สไลด์นี้ไม่มีเสียงบรรยาย");
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
      announce(`กำลังเล่นคำบรรยายสำหรับสไลด์ ${currentIndex + 1}`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("ไม่สามารถเล่นคำบรรยาย Beat Breeze ได้", error);
      failPlayback("ไม่สามารถเล่นคำบรรยายได้ โปรดลองอีกครั้ง");
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce("ปิดเสียงบรรยายแล้ว");
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
        announce("สไลด์นี้ไม่มีเสียงบรรยาย");
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

    toolbar.setAttribute("aria-label", "ตัวควบคุมงานนำเสนอ");
    const previousButton = toolbar.querySelector(".btn.prev");
    const nextButton = toolbar.querySelector(".btn.next");
    const resetControl = toolbar.querySelector(".btn.reset");
    if (previousButton) {
      previousButton.setAttribute("aria-label", "สไลด์ก่อนหน้า");
      previousButton.title = "สไลด์ก่อนหน้า";
    }
    if (nextButton) {
      nextButton.setAttribute("aria-label", "สไลด์ถัดไป");
      nextButton.title = "สไลด์ถัดไป";
    }
    if (resetControl) {
      resetControl.setAttribute("aria-label", "เริ่มงานนำเสนอใหม่");
      resetControl.title = "เริ่มงานนำเสนอใหม่";
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
      <span class="narration-label">คำบรรยาย</span>
      <span class="narration-label-short">เสียง</span>
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
    invitation.setAttribute("aria-label", "คำเชิญให้เปิดเสียงบรรยาย");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">อยากให้เราพาชมไหม?</span>
      <button class="narration-invitation-start" type="button">เริ่มคำบรรยาย</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="ปิดคำเชิญให้เปิดเสียงบรรยาย">×</button>
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
        announce("เล่นงานนำเสนอพร้อมคำบรรยายครบแล้ว");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("ไม่สามารถโหลดเสียงบรรยายได้");
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
          announce("เสียงบรรยายพร้อมแล้ว");
        } else {
          setNarrationUnavailable();
          announce("สไลด์นี้ไม่มีเสียงบรรยาย");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("ไม่สามารถโหลดไฟล์รายการเสียงบรรยาย Beat Breeze ได้", error);
        setButtonState("error");
        announce("ไม่สามารถโหลดเสียงบรรยายได้ โปรดลองอีกครั้ง");
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
