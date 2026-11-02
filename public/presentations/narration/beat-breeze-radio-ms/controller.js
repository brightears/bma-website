(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-ms/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-narration-invitation-seen-ms";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-ms","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-ms.html","officialDeckSha256":"cbec0a39af9f2b07bed76a131639e558646097b4bbaa3c458c8a2f1f47786de0","scriptPath":"public/presentations/narration/beat-breeze-ms/script.json","scriptSha256":"2f0c76ce1d2ef6a796afc3f19410d2fd13c9671b06db0540d348de01e5c0f66d","copyPath":"public/presentations/narration/beat-breeze-ms/copy.json","copySha256":"3e653f9ba7cd4e2a4b257cb77c8fe74bdcf8ddeb3d6edffbdc7c03e60686d6bc"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"pakar produk Beat Breeze yang mesra, profesional dan memahami operasi premis","scene":"perbualan santai dalam pembentangan langsung bersama seorang pengurus premis, sambil menerangkan slaid yang sedang dipaparkan","style":"Yakin, mesra dan semula jadi. Bercakap seperti membantu pelanggan memahami bagaimana Beat Breeze menyokong operasi mereka, bukan membaca teks pada skrin dan bukan seperti iklan.","pacing":"Tenang dan mudah diikuti, dengan jeda ringkas antara idea utama. Sebut nama produk dengan jelas tanpa penekanan yang berlebihan."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":954.96,"slides":[{"index":1,"id":"01-title","label":"Muka hadapan","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/01-title.mp3","text":"Hai, dan terima kasih kerana meluangkan masa untuk mengenali Beat Breeze. Platform ini bermula dengan satu janji yang mudah: muzik yang tepat sentiasa tersedia di setiap zon premis. Namun, apa yang anda lihat hari ini telah berkembang jauh melangkaui muzik. Dalam satu platform, Beat Breeze kini menghubungkan muzik, skrin, pengumuman suara dan kandungan sokongan untuk setiap ruang yang anda urus. Jadi, ini bukan sekadar pembentangan tentang pemain muzik. Kita akan melihat bagaimana satu sistem boleh membantu mencipta dan mengendalikan keseluruhan pengalaman media di premis, menggunakan peranti yang sudah anda miliki.","visualCoverage":["platform pengalaman premis serba lengkap","muzik, skrin, pengumuman dan kandungan","satu platform untuk setiap ruang"],"transcriptSha256":"f398c084b35c1d2210ea547c0b144b15e3b7102db39ef08624a51bf342012852","audioSha256":"db89d3f1a21d583636227b4a6111c4e80fb1f977312875fbfe6f96dfea44b1a2","durationSeconds":40.88,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.23,"loudnessRangeLu":3.2,"thresholdLufs":-28.97,"targetOffsetLu":0.53,"cached":false},{"id":"02-one-platform-many-jobs","label":"Satu platform, pelbagai fungsi","text":"Slaid ini merumuskan Beat Breeze dalam tiga bidang utama. Di sebelah kiri ialah muzik dan automasi: katalog berlesen yang terus berkembang, muzik berbeza bagi setiap zon, jadual pintar, Music Director dan main balik luar talian yang berdaya tahan. Bahagian tengah ialah penciptaan kandungan. Compose menghasilkan muzik asli, Content Studio mencipta imej dan video, TV Channels menyalurkannya ke skrin, dan pengumuman boleh disediakan dalam pelbagai bahasa. Pengumuman menyampaikan mesej tertentu, manakala Radio menyediakan stesen berpenyampai yang berjalan secara berterusan untuk perniagaan anda. Di sebelah kanan ialah operasi: bilangan premis dan zon tidak dihadkan, ahli pasukan boleh ditambah tanpa bayaran bagi setiap akaun, Brand Lock menjaga standard jenama, dan sistem berjalan pada peranti yang sudah anda miliki. Jika diperlukan, BMAsia turut menyediakan reka bentuk muzik khusus serta sokongan sepanjang masa. Tiga bidang ini penting kerana biasanya setiap satunya memerlukan alat yang berasingan. Di sini, semuanya berada dalam satu papan pemuka.","index":2,"src":"audio/20261102-radio-9ba27cf3987185c1/02-one-platform-many-jobs.mp3","transcriptSha256":"85637b5c6ae6ff1ca5324d0b0d854aee343ab8166b043115faea761a58e82adb","audioSha256":"f8f66edfe585602275bf0617fd9b733d3da4d801a916f60e207662cc3b6c7e6d","durationSeconds":70.56,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.42},{"index":3,"id":"03-music-that-runs-itself","label":"Muzik yang berjalan sendiri","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/03-music-that-runs-itself.mp3","text":"Asasnya tetap muzik, tetapi muzik yang tidak sentiasa memerlukan perhatian kakitangan. Setiap ruang boleh menjadi zon tersendiri: contohnya jazz di lobi, deep house di bar dan ambient di spa, semuanya dipantau melalui satu papan pemuka. Jadual mengurus perubahan suasana dari sarapan hingga lewat malam, sama ada bagi satu lokasi atau seluruh kumpulan. Jika internet terputus, jadual dan muzik terus berjalan di luar talian. Katalog menyediakan lebih seratus ribu trek berlesen dan ratusan senarai main pilihan profesional, serta terus berkembang. Pasukan anda juga boleh menerangkan suasana yang dikehendaki supaya AI membantu menyusun senarai main yang sesuai. Oleh sebab muzik ini bebas royalti dan berlesen untuk kegunaan komersial, bukti lesen boleh ditunjukkan melalui kod QR tanpa perlu mencari dokumen. Inilah maksud muzik yang boleh berjalan sendiri.","visualCoverage":["muzik berbeza bagi setiap zon","jadual dan pembahagian waktu","main balik luar talian","katalog dan pembinaan senarai main dengan AI","lesen perniagaan"],"transcriptSha256":"fa9ce8b8e4d4610b13a89b8352e1971beab396f8970f1b6fa50c16b1b1749389","audioSha256":"67c40358cb7fbd1bd4159aa9a930f33290b6050c344d946f2e0fb696d613c47d","durationSeconds":59.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.47,"truePeakDbtp":-3.44,"loudnessRangeLu":2.3,"thresholdLufs":-28.8,"targetOffsetLu":0.06,"cached":false},{"index":4,"id":"04-automations","label":"Automasi","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/04-automations.mp3","text":"Automasi membawa jadual selangkah lebih jauh kerana muzik boleh bertindak mengikut keadaan sebenar di premis. Waktu tenang boleh merendahkan kelantangan pada lewat malam dan menaikkannya semula pada waktu pagi. Aliran tenaga harian pula membolehkan suasana berubah secara beransur-ansur, daripada pagi yang tenang kepada waktu tengah hari yang lebih bertenaga dan malam yang santai. Cuaca dan suhu juga boleh menjadi pencetus, misalnya muzik yang lebih hangat ketika hujan atau lebih dingin apabila hari panas. Dengan sensor atau data POS yang sesuai, tenaga muzik boleh meningkat apabila jumlah pengunjung bertambah. Di pasaran yang memerlukannya, muzik boleh dijeda dengan lancar pada waktu solat sebelum disambung semula. Anda juga boleh menetapkan senarai main mengikut waktu, musim dan perayaan. Gunakan contoh yang tersedia, atau bina aturan sendiri berdasarkan cara premis anda beroperasi.","visualCoverage":["waktu tenang dan aliran tenaga harian","pencetus cuaca dan suhu","jumlah pengunjung atau kadar penghunian","jeda waktu solat","senarai main mengikut waktu dan musim","aturan automasi khusus"],"transcriptSha256":"e12da9416ded558015d3ac9e285193535f58712d2bec411eee77c85e43b71497","audioSha256":"b23564910743a0dd2147818a0d1336079d0b0c12d4ff81b8ef3debbc0e5f1593","durationSeconds":56.88,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.44,"loudnessRangeLu":2.9,"thresholdLufs":-28.82,"targetOffsetLu":0.12,"cached":false},{"index":5,"id":"05-your-music-director","label":"Music Director anda","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/05-your-music-director.mp3","text":"Music Director ialah kurator AI yang bekerja secara proaktif di dalam Beat Breeze. Tiga perkara di sebelah kiri menerangkan caranya. Pertama, ia mempelajari tingkah laku sebenar bagi setiap zon: trek yang kerap dilangkau, perubahan kelantangan dan pilihan yang terus dimainkan. Kedua, ia membuat persediaan lebih awal untuk musim dan detik penting seperti Krismas, Tahun Baharu Cina, Songkran atau kalendar waktu solat. Ketiga, data POS atau jumlah tetamu boleh digunakan untuk menilai sama ada perubahan muzik benar-benar memberi kesan. Contoh di sebelah kanan menunjukkan rupa cadangannya. Music Director melihat corak daripada enam malam Jumaat, menerangkan mengapa putaran Golden Hour yang lebih hangat patut dicuba, kemudian meminta persetujuan. Cadangan dihadkan supaya tidak mengganggu, sebabnya sentiasa dipaparkan, dan setiap perubahan boleh dibatalkan. Keputusan akhir tetap di tangan pasukan anda.","visualCoverage":["belajar daripada tingkah laku setiap zon","persediaan musim dan kalendar","laporan kesan sebelum dan selepas","cadangan dengan sebab yang jelas","perubahan yang boleh dibatalkan"],"transcriptSha256":"0f2d925ac370f5751b98f3640475ed1e567bda7c677e17f9107ebdf8cfd6ccb2","audioSha256":"404b1da7521012a1d6c7ad08373ede0873cdd0137aca9c8e404d1215d5c0f57c","durationSeconds":63.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.41,"loudnessRangeLu":4.2,"thresholdLufs":-29.06,"targetOffsetLu":0.08,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-ms/audio/20260904-b441167b981b/06-compose.mp3","text":"Dengan Compose, satu ayat ringkas sudah cukup untuk menghasilkan muzik asli. Contoh pada skrin meminta bossa nova yang hangat dan perlahan untuk suasana makan malam bercahaya lilin, dengan perkusi ringan dan tanpa vokal. Berdasarkan ayat itu, Beat Breeze menghasilkan trek baharu khas untuk suasana tersebut. Jika hasil pertama masih belum tepat, perbaikinya lagi dengan menambah satu lagi ayat untuk mengubah suasana, tempo, instrumen atau vokal. Untuk premis anda, kelebihan sebenar bukan sekadar menggunakan AI untuk menghasilkan muzik. Compose membolehkan anda membina bunyi unik yang menjadi identiti tersendiri untuk kempen, ruang atau waktu tertentu—bukan sekadar playlist biasa yang digunakan oleh semua orang.","visualCoverage":["taklimat muzik dalam bahasa biasa","muzik asli untuk premis","penambahbaikan melalui perbualan","identiti bunyi khusus"],"transcriptSha256":"4db57feefa5144fd13978576bbd73ddad830058bae179f8a0f2c295a2090149a","audioSha256":"3e4bb0dde19bf946ee5e5c6d1d986bc4661162985e85bc8f3bf841e3db46657a","durationSeconds":48.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.47,"truePeakDbtp":-3.42,"loudnessRangeLu":3.1,"thresholdLufs":-28.86,"targetOffsetLu":-0.07,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studio dan skrin","src":"../beat-breeze-ms/audio/20260904-b441167b981b/07-studio-and-screens.mp3","text":"Di sinilah pasukan anda boleh mencipta visual untuk pengalaman premis. Content Studio membantu menghasilkan bahan yang kerap diperlukan, seperti hantaran media sosial, poster promosi, video pendek, papan tanda atau gelung visual ambien, semuanya mengikut logo dan warna jenama. Kemudian, TV Channels menghantar kandungan terus daripada alat kreatif ke skrin yang sudah tersedia. Skrin lobi boleh memaparkan promosi malam ini sambil mengikuti muzik zon tersebut; skrin spa boleh memainkan visual jenama yang menenangkan; dan hotel boleh memperluas saluran yang sama kepada TV di dalam bilik tetamu. Dengan cara ini, penciptaan dan pengedaran kandungan berada dalam satu tempat, bukannya projek papan tanda digital berasingan yang perlu dibeli dan diurus sendiri.","visualCoverage":["format kandungan dalam Content Studio","reka bentuk yang mengikuti jenama","pengedaran melalui TV Channels","hiburan pada TV bilik hotel"],"transcriptSha256":"cc700cd15a37b4dd8cd460767a8bb82a207686bf60a9bd6e11dee0ee1713dc77","audioSha256":"5a8a14a6607133b795024fa3db3a0f62c7aef5d3f6ae3d3be62e4e3075cca02a","durationSeconds":50.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-3.42,"loudnessRangeLu":4.3,"thresholdLufs":-28.83,"targetOffsetLu":0.05,"cached":false},{"index":8,"id":"08-announcements","label":"Pengumuman suara","src":"../beat-breeze-ms/audio/20260904-b441167b981b/08-announcements.mp3","text":"Ini ialah bahagian komunikasi suara bagi pengalaman premis. Anda menulis mesej, memilih bahasa dan suara, menetapkan waktu, kemudian pengumuman diselitkan terus ke dalam muzik. Mesej itu boleh berupa promosi happy hour, panggilan pesanan terakhir, ucapan alu-aluan atau maklumat operasi. Tiga contoh pada skrin menunjukkan bagaimana satu premis boleh berkomunikasi dalam beberapa bahasa tanpa menempah studio rakaman bagi setiap versi. Alat yang sama juga boleh menghasilkan audio menunggu panggilan yang profesional, menggabungkan suara latar berbilang bahasa dengan muzik sebelum menghantarnya terus ke sistem telefon. Ertinya, muzik dan semua mesej yang mengiringinya boleh diurus dari tempat yang sama.","visualCoverage":["pengumuman berbilang bahasa di premis","pengumuman berjadual yang diselitkan ke dalam muzik","audio menunggu panggilan"],"transcriptSha256":"9a418526009277b4cbccef5075ad8e3715f99304ffeb0b06c42ca3baa02d1730","audioSha256":"e39c5b45c77c5abe5316fc12fd202bc46750f1e72d36d7ec2ecdd879febbbd10","durationSeconds":46.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.49,"truePeakDbtp":-3.42,"loudnessRangeLu":2.4,"thresholdLufs":-28.75,"targetOffsetLu":0.27,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"Pengumuman berguna apabila anda mahu memainkan mesej tertentu. Radio membawanya lebih jauh dengan rancangan berpenyampai yang berjalan secara berterusan untuk perniagaan anda. Ikuti urutan pada skrin: muzik sedang dimainkan, penyampai masuk dengan sapaan atau tawaran ringkas, kemudian kembali kepada muzik. Bagi kafe, ia mungkin peringatan tentang pastri yang baru dibakar. Bagi rangkaian peruncitan, ia boleh menjadi promosi semasa atau cerita tentang jenama. Anda memilih suara, personaliti dan bahasa penyampai, serta menentukan kekerapan mereka bersuara. Anda boleh mengekalkan muzik yang sudah dimainkan di setiap lokasi, memilih gabungan muzik stesen, atau meminta AI merancang minggu tersebut. Sebelum stesen mula bersiaran, anda boleh mendengar contoh rancangan selama satu jam.","index":9,"src":"audio/20261102-radio-33eb9f9ded64629e/radio-your-station.mp3","transcriptSha256":"4f71b8798805d9a356b6d4ad372cbafac1a41a26f9449b0cfbc2865ed11b640f","audioSha256":"51df335fdfb887cfa8334b29f9286ee25e5dc006a70495ddf6e03b14699e96f1","durationSeconds":51.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.22},{"id":"radio-across-locations","label":"Radio di seluruh lokasi","text":"Bagi perniagaan yang mempunyai banyak lokasi, ibu pejabat menetapkan stesen, manakala edisi serantau menyesuaikan kandungan dengan keperluan tempatan. Cabang pada rajah ini menunjukkan bagaimana satu jenama boleh menggunakan bahasa penyampai dan tawaran yang berbeza mengikut kawasan. Maklumat cuaca dimasukkan apabila sesuai dengan kedai yang menerima versi tersebut. Pasukan anda membekalkan fakta promosi, seperti harga dan tarikh. Radio boleh mempelbagaikan ayat di sekeliling fakta itu, dengan semakan skrip dan rakaman suara sebelum setiap segmen disiarkan. Rancangan disediakan lebih awal, bukan direka secara spontan ketika bersiaran. Ibu pejabat boleh mendengar segmen akan datang, menjeda stesen, melangkau segmen, menghentikan penggunaan sesuatu sumber dan melihat rekod siaran. Radio menggunakan kredit AI dan memerlukan pelan Beat Breeze berbayar, jadi penggunaannya boleh dirancang bersama alat AI yang lain.","index":10,"src":"audio/20261102-radio-3e2fcad37e9d57eb/radio-across-locations.mp3","transcriptSha256":"7eb5a906b5c9af5d655076240793156e4ffc6b24356171ce91315e803ef40ff9","audioSha256":"717ab2987e9fe94fb42d3fe31bdf1360f225408991779575a3120f4f2b753169","durationSeconds":58,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.37},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"Berfungsi dengan Claude dan ChatGPT","src":"../beat-breeze-ms/audio/20260904-b441167b981b/09-works-with-claude-and-chatgpt.mp3","text":"Jika pasukan anda sudah menggunakan Claude atau ChatGPT, Beat Breeze boleh disambungkan terus melalui ruang sembang yang sedia terbuka. Jadi, pasukan anda boleh mengawal muzik hanya dengan arahan mudah. Contoh pada skrin menunjukkan beberapa kegunaan: bertanya muzik yang akan dimainkan pada malam Jumaat, merendahkan kelantangan lobi atau menyediakan jadual ambient baharu untuk spa pada hari esok. Setiap perubahan jadual perlu disahkan sebelum dilaksanakan. Tiada apa-apa yang berubah tanpa persetujuan anda. Sambungan menggunakan kunci keselamatan akaun anda yang boleh ditarik balik pada bila-bila masa, jadi akses boleh dihentikan serta-merta apabila tidak lagi diperlukan. Manfaatnya mudah: pasukan boleh mengendalikan tugas muzik harian dengan arahan mudah tanpa kehilangan kawalan akhir terhadap perkara yang berubah di premis.","visualCoverage":["kawalan menggunakan bahasa biasa","pertanyaan tentang jadual semasa","pengesahan sebelum perubahan jadual","akses selamat yang boleh ditarik balik"],"transcriptSha256":"512c955f8da56a31974877d4f2742e6153d1751636b68e9b11d0152e9af9b37a","audioSha256":"b92f156cb8447611ba508ea25710aaf18d0966217f888f5a38e431d83eea49ff","durationSeconds":52.04,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.39,"loudnessRangeLu":4.3,"thresholdLufs":-28.91,"targetOffsetLu":0.76,"cached":false},{"index":12,"id":"10-built-for-operators","label":"Dibina untuk pasukan operasi","src":"../beat-breeze-ms/audio/20260904-b441167b981b/10-built-for-operators.mp3","text":"Slaid ini menunjukkan dua cara untuk menggunakan Beat Breeze: urus sendiri, atau biar kami uruskannya untuk anda. Pada bahagian atas, satu akaun boleh merangkumi banyak premis dan zon, setiap ahli pasukan hanya menerima akses yang diperlukan, dan Brand Lock melindungi muzik bagi ruang yang mesti mengikut standard jenama. Pemain berjalan pada peranti mudah alih, Windows atau pelayar web yang disokong dan sudah anda miliki. Dengan kad bunyi berbilang saluran yang sesuai, satu PC Windows juga boleh mengendalikan beberapa zon. Pada bahagian bawah ialah model yang diurus oleh BMAsia. Platformnya masih sama, tetapi pasukan kami menambah reka bentuk muzik khusus, sokongan teknikal sepanjang masa, pengurus akaun dan pemantauan seluruh kumpulan. Anda boleh memilih tahap sokongan yang paling sesuai dengan cara organisasi anda mahu bekerja.","visualCoverage":["pengurusan layan diri bagi banyak lokasi","kebenaran pasukan dan Brand Lock","pilihan pemain dan berbilang zon pada Windows","perkhidmatan terurus BMAsia"],"transcriptSha256":"51bb1193b7eef847a147ecff9d0dfd21fa6b508393fedf8197618e38fc7a7bae","audioSha256":"e2d5e72a7e5508e0648141085447fe244bba669c814955aeb36afae0131993f9","durationSeconds":57.16,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.56,"truePeakDbtp":-3.42,"loudnessRangeLu":3.3,"thresholdLufs":-28.98,"targetOffsetLu":0.32,"cached":false},{"index":13,"id":"11-never-go-silent","label":"Muzik tidak pernah terhenti","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/11-never-go-silent.mp3","text":"Semua keupayaan kreatif tadi hanya bernilai jika sistem kekal boleh dipercayai ketika premis sedang beroperasi. Itulah tujuan empat lapisan perlindungan pada skrin. Jadual mingguan, automasi dan jeda waktu solat disimpan secara setempat, jadi semuanya terus berjalan tanpa internet dan sejarah main balik disegerakkan apabila sambungan kembali. Sistem pemantauan memeriksa setiap pemain dan memulihkannya secara automatik jika peranti tersekat. Setiap pengumuman melaporkan pemain yang berjaya menyampaikannya, supaya pengendali tahu mesej benar-benar sampai ke semua ruang yang dimaksudkan. Sijil lesen pula menyediakan kod QR untuk pengesahan langsung apabila diminta oleh pemeriksa. Semua kejuruteraan ini mengejar satu hasil: tetamu di premis tidak sepatutnya menyedari bahawa masalah teknikal pernah berlaku.","visualCoverage":["operasi luar talian tanpa gangguan","pemain yang pulih sendiri","pengesahan penyampaian pengumuman","bukti lesen yang boleh disahkan secara langsung"],"transcriptSha256":"0cb0c05dde415deecdd3f8e950f961625fdc28a8f2993bb888ec3ea914cb848f","audioSha256":"9b11eb50ca24ea2034e7fef4246b4b6e1ff33d24770896edcecf27f0ac7852a5","durationSeconds":54.48,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.43,"loudnessRangeLu":3.4,"thresholdLufs":-28.89,"targetOffsetLu":0.04,"cached":false},{"id":"12-why-beat-breeze","label":"Mengapa Beat Breeze","text":"Jadual perbandingan ini menyatukan keseluruhan cerita. Semua orang memainkan muzik. Selebihnya, kami uruskan. Muzik bagi setiap zon dan jadual automatik ialah asas yang turut ditawarkan oleh banyak penyelesaian lain. Beat Breeze direka untuk pergi lebih jauh dengan main balik luar talian, muzik asli melalui Compose, penciptaan imej dan video, pengumuman berbilang bahasa, audio menunggu panggilan dan TV Channels berjenama. Radio menambah stesen berpenyampai yang menyelitkan cerita dan promosi jenama di antara muzik. Perbezaan sebenar bukan sekadar satu tanda semak dalam jadual. Yang membezakannya ialah premis tidak perlu menggabungkan sendiri platform muzik, alat kreatif, sistem pemesejan dan skrin sebagai beberapa penyelesaian berasingan. Beat Breeze mengendalikan pengalaman di premis sambil membantu menghasilkan kandungan yang menjadi sebahagian daripada pengalaman itu.","index":14,"src":"audio/20261102-radio-bc9030ecdc9f1353/12-why-beat-breeze.mp3","transcriptSha256":"10c152dfb6adcb67f799217fa0396794ae15ae1efdbb3b910285440c3a610bde","audioSha256":"af97dd71ebe86c90c07c5a01ecc50b11917c0db9cd849f1000805cbedddc8e91","durationSeconds":67.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.25},{"id":"13-pricing","label":"Harga","text":"Anda boleh mengurus muzik sendiri atau menyerahkannya kepada BMAsia. Pakej layan diri berharga 15 dolar Amerika bagi setiap zon sebulan. Jika memilih pakej tahunan, harganya 150 dolar Amerika bagi setiap zon setahun. Kedua-dua pakej layan diri merangkumi fungsi aplikasi, dan anda mengurus playlist serta jadual main balik sendiri. Untuk perkhidmatan yang diurus oleh pasukan kami, pakej BMAsia berharga 260 dolar Amerika bagi setiap zon setahun, dan hanya tersedia sebagai pakej tahunan. Pakej ini merangkumi pengurusan muzik dan stesen Radio oleh BMAsia. Pasukan reka bentuk muzik kami memilih dan menyegarkan playlist serta jadual yang ditetapkan bagi setiap zon, termasuk perubahan musim dan perayaan. Perkhidmatan ini turut merangkumi sokongan teknikal sepanjang masa dan pengurus akaun khusus. Kredit tambahan untuk penjanaan kandungan AI dikenakan caj berasingan. Semua pelanggan menerima kemas kini aplikasi secara berterusan, tanpa mengira pakej yang dipilih. Perbezaannya ialah siapa yang menjaga muzik anda. Anda boleh mencuba pakej layan diri secara percuma selama 14 hari untuk satu zon; kad diperlukan, tetapi tiada caj dikenakan semasa ia bermula. Jika BMAsia mengaturkan percubaan anda, tiada kad diperlukan. Kumpulan yang lebih besar boleh mengatur kontrak khusus dan invois tempatan, tanpa perlu membeli kotak pemain khas.","index":15,"src":"audio/20261102-radio-bf2825e781623774/13-pricing.mp3","transcriptSha256":"411c047b097821c9cacf605701b4387c7ebf887bd1240fb3799d3e6d49dbc475","audioSha256":"dbd3229f80cf0fce006144d38b9a7a77680d0009902d0b4de73be39674757059","durationSeconds":94.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.46,"truePeakDbtp":-3.4},{"index":16,"id":"14-whos-behind-it","label":"Pasukan di sebalik Beat Breeze","src":"../beat-breeze-ms/audio/20260903-486f0b11069b/14-whos-behind-it.mp3","text":"Di sebalik Beat Breeze ialah BMAsia, pasukan yang telah mereka bentuk muzik untuk hotel, restoran, peruncitan dan kesejahteraan sejak 2002. Pengalaman itu penting kerana platform ini tidak dibentuk oleh teknologi semata-mata. Pereka muzik yang aktif dalam industri membantu menentukan cara kandungan dikurasi dan cara AI memahami ciri setiap jenis ruang. Pasukan pakar kami juga sedia membantu dua puluh empat jam sehari, sementara hala tuju produk dipandu oleh keperluan sebenar yang dikongsi oleh pasukan operasi. Jadi, apabila memilih Beat Breeze, anda mendapat teknologi moden bersama pasukan muzik dan perkhidmatan berpengalaman yang benar-benar menyokongnya.","visualCoverage":["BMAsia sejak 2002","pereka muzik berpengalaman yang membimbing kurasi","pasukan pakar 24/7 dan pembangunan berdasarkan keperluan pengendali"],"transcriptSha256":"ace2587ab4673dbf84f89b86913f4c78ec1409bad455f421b350a8b84fd527a7","audioSha256":"ca1ec882fd663a0ff0acc4697e363df5165c289e98dc9296e44b3d98784b0f8c","durationSeconds":48.96,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.23,"loudnessRangeLu":2.5,"thresholdLufs":-28.72,"targetOffsetLu":0.01,"cached":false},{"id":"15-close","label":"Mulakan","text":"Itulah Beat Breeze hari ini. Muzik yang anda percayai kekal sebagai terasnya, bersama skrin, kandungan, pengumuman dan kini Radio. Jika anda sudah menggunakan Beat Breeze, terokai alat dalam akaun anda dan dengar bagaimana stesen sendiri boleh berbunyi. Radio memerlukan pelan berbayar dan menggunakan kredit AI. Jika anda baru ingin bermula, kunjungi beatbreeze.io atau hubungi Norbert di BMAsia. Kami akan membantu memilih titik permulaan yang sesuai untuk premis anda.","index":17,"src":"audio/20261102-radio-c3cde7e5d7b8c6de/15-close.mp3","transcriptSha256":"cd38799494de547d9ae526654001a5e2f2d92d2df594545d3034ef50e687b239","audioSha256":"0c88379e9f0417c75386279384d5f274fa7ff9bd48ad46484b0f627b43eb7c79","durationSeconds":32.64,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.4}],"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"qualityAssurance":{"record":"docs/beat-breeze-radio-ms-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"preview":false,"complete":true};

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
        visible: "Memuatkan narasi",
        short: "Memuatkan",
        pressed: "false",
        label: "Memuatkan narasi pembentangan",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "Narasi sedang disediakan",
        short: "Disediakan",
        pressed: "false",
        label: "Narasi pembentangan sedang disediakan",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "Mulakan narasi",
        short: "Mula",
        pressed: "false",
        label: "Mulakan narasi",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "Narasi aktif",
        short: "Dimainkan",
        pressed: "true",
        label: "Jeda narasi",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "Sambung narasi",
        short: "Sambung",
        pressed: "false",
        label: "Sambung narasi",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "Main semula narasi",
        short: "Ulang",
        pressed: "false",
        label: "Main semula pembentangan dengan narasi",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "Coba lagi",
        short: "Coba lagi",
        pressed: "false",
        label: "Muat semula narasi",
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
            throw new Error(`Fail narasi mengembalikan status ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Fail narasi tidak sepadan dengan pembentangan ini");
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
    label.textContent = "Slaid ini belum mempunyai narasi";
    shortLabel.textContent = "Belum ada";
    button.setAttribute(
      "aria-label",
      "Slaid ini tidak mempunyai audio narasi",
    );
    button.title = "Slaid ini tidak mempunyai audio narasi";
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
        announce("Narasi sedang disediakan");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("Slaid ini tidak mempunyai audio narasi");
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
      announce(`Memainkan narasi slaid ${currentIndex + 1}`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Narasi Beat Breeze tidak dapat dimainkan", error);
      failPlayback("Narasi tidak dapat dimainkan. Sila cuba lagi");
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce("Narasi dijeda");
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
        announce("Slaid ini tidak mempunyai audio narasi");
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
        font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        font: 500 13px/1.35 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        font: 700 12px/1 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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

      @keyframes narration-invitation-in-mobile {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 520px) {
        .btn.reset,
        .reset-divider { display: none !important; }
        .narration-invitation {
          left: 14px;
          right: 14px;
          width: auto;
          max-width: none;
          bottom: 88px;
          gap: 8px;
          padding-left: 14px;
          box-sizing: border-box;
          transform: none;
          animation-name: narration-invitation-in-mobile;
        }
        .narration-invitation-copy {
          flex: 1;
          min-width: 0;
          white-space: normal;
        }
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

    toolbar.setAttribute("aria-label", "Kawalan pembentangan");
    const previousButton = toolbar.querySelector(".btn.prev");
    const nextButton = toolbar.querySelector(".btn.next");
    const resetControl = toolbar.querySelector(".btn.reset");
    if (previousButton) {
      previousButton.setAttribute("aria-label", "Slaid sebelumnya");
      previousButton.title = "Slaid sebelumnya";
    }
    if (nextButton) {
      nextButton.setAttribute("aria-label", "Slaid seterusnya");
      nextButton.title = "Slaid seterusnya";
    }
    if (resetControl) {
      resetControl.setAttribute("aria-label", "Mulakan semula pembentangan");
      resetControl.title = "Mulakan semula pembentangan";
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
      <span class="narration-label">Narasi</span>
      <span class="narration-label-short">Audio</span>
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
    invitation.setAttribute("aria-label", "Jemputan untuk memulakan narasi");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">Mahukan versi berpanduan?</span>
      <button class="narration-invitation-start" type="button">Mulakan narasi</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="Tutup jemputan narasi">×</button>
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
        announce("Pembentangan bernarasi telah selesai");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("Audio narasi tidak dapat dimuatkan");
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
          announce("Narasi sedia dimainkan");
        } else {
          setNarrationUnavailable();
          announce("Slaid ini tidak mempunyai audio narasi");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("Fail narasi Beat Breeze tidak dapat dimuatkan", error);
        setButtonState("error");
        announce("Narasi tidak dapat dimuatkan. Sila cuba lagi");
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
