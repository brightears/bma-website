(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-id/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-narration-invitation-seen-id";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-id","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-id.html","officialDeckSha256":"06407aeaaaff80159d9743810efb00f2e03795c69b99ca1803516e3e22bb92a3","scriptPath":"public/presentations/narration/beat-breeze-id/script.json","scriptSha256":"ed0d2cab077a88a800ad9fedbb8a4c767646c58ced34d40ad68e61b7aee2c0a4","copyPath":"public/presentations/narration/beat-breeze-id/copy.json","copySha256":"1d26fa5eaf3cd0970c390a90d44335f2d124ab78273fa250938ad0b45003a735"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"spesialis produk Beat Breeze yang hangat, profesional, dan memahami operasional venue","scene":"presentasi langsung yang santai bersama seorang pengelola venue, sambil memandu secara alami mengikuti slide yang sedang tampil","style":"Percaya diri, ramah, dan alami. Berbicara seperti sedang membantu pelanggan memahami bagaimana Beat Breeze mendukung operasional, bukan membaca teks di layar dan bukan menggunakan gaya iklan.","pacing":"Tenang dan komunikatif, dengan jeda singkat di antara gagasan utama. Nama produk diucapkan dengan jelas tanpa penekanan berlebihan."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":902.24,"slides":[{"index":1,"id":"01-title","label":"Sampul","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/01-title.mp3","text":"Halo, dan terima kasih sudah meluangkan waktu untuk mengenal Beat Breeze. Platform ini bermula dari satu janji yang sangat sederhana: musik yang tepat selalu hadir di setiap zona venue. Namun, apa yang Anda lihat hari ini sudah berkembang jauh lebih luas. Dalam satu platform, Beat Breeze kini menghubungkan musik, layar, pengumuman suara, dan seluruh konten pendukung di setiap ruang yang Anda kelola. Jadi, ini bukan sekadar presentasi tentang sebuah pemutar musik. Kita akan melihat bagaimana satu sistem dapat membantu menciptakan sekaligus menjalankan seluruh pengalaman media di venue, menggunakan perangkat yang sudah Anda miliki.","visualCoverage":["platform pengalaman venue lengkap","musik, layar, pengumuman, dan konten","satu platform untuk setiap ruang"],"transcriptSha256":"af0d9f6d76ce804ee739807f9253aa470ca5df9576ca1f130f98b0abd5567ed8","audioSha256":"07728d2b06187119921f97e4df8462fb6fe2ef7cba44c696ebfd0e5bc535f033","durationSeconds":45.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.31,"loudnessRangeLu":3.5,"thresholdLufs":-28.95,"targetOffsetLu":0.39,"cached":false},{"id":"02-one-platform-many-jobs","label":"Satu platform, banyak fungsi","text":"Slide ini merangkum Beat Breeze dalam tiga bidang utama. Di sebelah kiri ada musik dan otomatisasi: katalog berlisensi yang terus bertambah, musik berbeda untuk setiap zona, jadwal cerdas, Music Director, dan pemutaran offline yang andal. Bagian tengah adalah pembuatan konten. Compose membuat musik orisinal, Content Studio menghasilkan gambar dan video, TV Channels menayangkannya ke layar, dan pengumuman dapat dibuat dalam berbagai bahasa. Pengumuman menangani pesan satu per satu, sedangkan Radio menyediakan stasiun berpenyiar yang berjalan terus untuk bisnis Anda. Di sebelah kanan adalah operasional: jumlah venue dan zona tidak dibatasi, anggota tim dapat ditambahkan tanpa biaya kursi, Brand Lock menjaga standar brand, dan sistem berjalan pada perangkat yang sudah Anda miliki. Jika diperlukan, BMAsia juga menambahkan desain musik khusus dan dukungan sepanjang waktu. Tiga bagian ini penting karena biasanya memerlukan beberapa alat terpisah. Di sini semuanya berada dalam satu dasbor.","index":2,"src":"audio/20261102-radio-df9d6fef6b693129/02-one-platform-many-jobs.mp3","transcriptSha256":"a96f5aaa529fc4d36ed3595ad55f4d319763c12164f8bba3bceb2b2a173b5469","audioSha256":"3bb498a6ce510fb192cf86d531415d63eb672f89492f4cb1e920dfa931330bc1","durationSeconds":63.08,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.58,"truePeakDbtp":-3.4},{"index":3,"id":"03-music-that-runs-itself","label":"Musik yang berjalan otomatis","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/03-music-that-runs-itself.mp3","text":"Fondasinya tetap musik, tetapi musik yang tidak selalu membutuhkan perhatian staf. Setiap ruang dapat menjadi zona tersendiri: misalnya jazz di lobi, deep house di bar, dan ambient di spa, semuanya dipantau dari satu dasbor. Jadwal mengatur perubahan suasana dari sarapan sampai larut malam, baik pada tingkat properti maupun seluruh grup. Jika internet terputus, jadwal dan musik tetap berjalan secara offline. Katalog sudah menyediakan lebih dari seratus ribu lagu berlisensi dan ratusan playlist hasil kurasi profesional, serta terus bertambah. Tim juga dapat menjelaskan suasana yang diinginkan agar AI membantu menyusun playlist yang sesuai. Dan karena musiknya bebas royalti serta berlisensi untuk penggunaan komersial, bukti lisensi dapat ditunjukkan melalui kode QR tanpa harus mencari dokumen. Inilah alasan kami menyebutnya musik yang dapat menjalankan dirinya sendiri.","visualCoverage":["musik berbeda untuk setiap zona","jadwal dan pembagian waktu","pemutaran offline","katalog dan penyusunan playlist dengan AI","lisensi bisnis"],"transcriptSha256":"61edc1e94332ac38d1243c50219b52aebbbaed9330926f791622e567f9104cb2","audioSha256":"690d19dd84cb2ac62d4c80809b4f56d5150b0b60997300f70a7bed9f2e921cdb","durationSeconds":60,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.43,"truePeakDbtp":-3.43,"loudnessRangeLu":3.1,"thresholdLufs":-28.86,"targetOffsetLu":0.09,"cached":false},{"index":4,"id":"04-automations","label":"Otomatisasi","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/04-automations.mp3","text":"Otomatisasi membawa jadwal satu langkah lebih jauh karena musik dapat merespons kondisi nyata di venue. Jam tenang dapat menurunkan volume pada malam hari dan menaikkannya kembali pada pagi hari. Alur energi harian membuat suasana berubah secara bertahap, dari pagi yang tenang menuju siang yang lebih hidup lalu malam yang santai. Cuaca dan suhu juga dapat menjadi pemicu, misalnya musik yang terasa lebih hangat saat hujan atau lebih sejuk ketika hari panas. Dengan sensor atau data POS yang sesuai, energi dapat meningkat ketika jumlah pengunjung bertambah. Di pasar yang membutuhkannya, musik dapat berhenti dengan halus pada waktu salat lalu berlanjut kembali. Anda juga dapat mengatur playlist berdasarkan waktu, musim, dan hari raya. Semua contoh ini dapat dipilih langsung, atau tim Anda dapat membuat aturan sendiri sesuai cara venue beroperasi.","visualCoverage":["jam tenang dan alur energi harian","pemicu cuaca dan suhu","jumlah pengunjung atau tingkat hunian","jeda waktu salat","playlist menurut waktu dan musim","aturan otomatis khusus"],"transcriptSha256":"546bd6bd84fb1badf78e1e8c6148a9e57797c12b17bf6deb6056446202d2b9cb","audioSha256":"10327eb329222bb9dbbdb638968be19ca2648acaf44ff201c2c9b9baa8ed2d04","durationSeconds":56.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.29,"loudnessRangeLu":2.6,"thresholdLufs":-28.86,"targetOffsetLu":0.13,"cached":false},{"index":5,"id":"05-your-music-director","label":"Music Director Anda","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/05-your-music-director.mp3","text":"Music Director adalah kurator AI yang bekerja secara proaktif di dalam Beat Breeze. Tiga poin di sebelah kiri menjelaskan cara kerjanya. Pertama, sistem mempelajari perilaku nyata di setiap zona: lagu yang sering dilewati, perubahan volume, dan pilihan yang tetap diputar. Kedua, sistem mempersiapkan momen musiman seperti Natal, Tahun Baru Imlek, Songkran, atau kalender waktu salat sebelum tanggalnya tiba. Ketiga, data POS atau jumlah tamu dapat digunakan untuk menilai apakah perubahan musik benar-benar berdampak. Contoh di sebelah kanan menunjukkan bentuk sarannya. Music Director melihat pola selama enam Jumat malam, menjelaskan mengapa rotasi Golden Hour yang lebih hangat layak dicoba, lalu meminta persetujuan. Saran dibatasi agar tidak mengganggu, alasannya selalu terlihat, dan setiap perubahan dapat dibatalkan. Jadi, keputusan akhir tetap berada di tangan tim Anda.","visualCoverage":["belajar dari perilaku setiap zona","persiapan musim dan kalender","laporan dampak sebelum dan sesudah","saran yang disertai alasan","perubahan yang dapat dibatalkan"],"transcriptSha256":"7aee2555d55b42f6d5aedeb6dc2fd5e2d5a062ad3274104d8dbf70d0a6a44e3b","audioSha256":"88c5109b14196d20cf06d17c1980e951aae752eea58fe4cc8a3f2f76fe116d77","durationSeconds":59.32,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.43,"loudnessRangeLu":3.5,"thresholdLufs":-28.91,"targetOffsetLu":0.18,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/06-compose.mp3","text":"Compose mengubah sebuah brief sederhana menjadi musik orisinal. Contoh di layar meminta bossa nova yang hangat dan pelan untuk makan malam dengan cahaya lilin, dengan perkusi ringan dan tanpa vokal. Dari kalimat seperti itu, Beat Breeze membuat lagu baru khusus untuk momen tersebut. Hasil pertama tidak harus menjadi versi akhir. Anda dapat menambahkan kalimat lain untuk mengubah suasana, tempo, instrumen, atau penggunaan vokal. Nilai utamanya bagi venue bukan hanya bahwa AI mampu membuat sebuah lagu. Yang lebih penting adalah kemampuan untuk membangun identitas suara yang benar-benar khas bagi sebuah kampanye, ruang, atau waktu layanan—bukan selalu menggunakan playlist umum yang juga dipakai banyak tempat lain.","visualCoverage":["brief musik dalam bahasa sehari-hari","musik orisinal untuk venue","penyempurnaan melalui percakapan","identitas suara khusus"],"transcriptSha256":"379ff5aa5f7031b94c29bbe37563d67e6d456287cd9302947b5e22146f94ce39","audioSha256":"34eb3929844dd4ce6ca3886dfbda4f85bca61c938416aee6d48849d5b659639a","durationSeconds":45.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.39,"loudnessRangeLu":3.8,"thresholdLufs":-28.89,"targetOffsetLu":-0.1,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studio dan layar","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/07-studio-and-screens.mp3","text":"Pendekatan yang sama juga berlaku untuk konten visual. Content Studio membantu tim membuat materi yang sering dibutuhkan venue, seperti konten media sosial, poster promosi, video pendek, signage, atau ambient loop, semuanya mengikuti logo dan warna brand. Setelah itu, TV Channels mengirimkan konten langsung dari alat kreatif ke layar yang sudah tersedia. Layar lobi dapat menampilkan promosi malam ini sambil mengikuti musik zona tersebut; layar spa dapat memutar visual brand yang tenang; dan hotel dapat memperluas saluran yang sama ke TV di kamar tamu. Dengan begitu, proses membuat konten dan mendistribusikannya berada dalam satu tempat, bukan menjadi proyek digital signage terpisah yang harus dibeli dan dikelola sendiri.","visualCoverage":["format konten Content Studio","desain yang mengikuti brand","distribusi melalui TV Channels","hiburan TV di kamar hotel"],"transcriptSha256":"bc622112bd2915efcf9beb589e4f8e3f57286c8762d091b8eaa37fb052a85b9f","audioSha256":"68b0c00f5a9e2c38b6c296a659e2b20f6ec40cb4439e127608bcf66cba6632ce","durationSeconds":49.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.41,"truePeakDbtp":-3.42,"loudnessRangeLu":2.9,"thresholdLufs":-28.67,"targetOffsetLu":0.21,"cached":false},{"index":8,"id":"08-announcements","label":"Pengumuman suara","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/08-announcements.mp3","text":"Ini adalah bagian komunikasi suara dari pengalaman venue. Anda menulis pesannya, memilih bahasa dan suara, menentukan waktu, lalu membiarkan pengumuman diputar di atas musik. Pesannya bisa berupa happy hour, panggilan pesanan terakhir, sambutan, atau informasi operasional. Tiga contoh di layar menunjukkan bagaimana satu venue dapat berkomunikasi dalam berbagai bahasa tanpa memesan studio rekaman untuk setiap versi. Alat yang sama juga dapat membuat audio tunggu telepon yang profesional, menggabungkan narasi multibahasa dengan musik sebelum mengirimkannya langsung ke sistem telepon. Dengan kata lain, musik dan semua pesan yang mengelilinginya dapat dikelola dari satu tempat yang sama.","visualCoverage":["pengumuman multibahasa di venue","pemutaran terjadwal di atas musik","audio tunggu telepon"],"transcriptSha256":"7110beb375cdeb024d41475bcaa7bc81cae1d8d72c3f16d1597edfe096bdd352","audioSha256":"a34d7eec5ca3f771d93e600a708cda8ded5ea2523a9b85081988f879862046f7","durationSeconds":48.92,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.3,"loudnessRangeLu":2,"thresholdLufs":-28.97,"targetOffsetLu":0.11,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"Pengumuman berguna saat Anda ingin memutar pesan tertentu. Radio melangkah lebih jauh dengan menyediakan program berpenyiar yang berjalan terus untuk bisnis Anda. Ikuti urutan di layar: musik sedang diputar, penyiar masuk dengan sapaan atau penawaran singkat, lalu kembali ke musik. Untuk kafe, pesannya bisa berupa pengingat tentang roti yang baru matang. Untuk jaringan ritel, bisa berupa promosi terbaru atau cerita tentang brand. Anda memilih suara, karakter, dan bahasa penyiar, serta menentukan seberapa sering mereka berbicara. Anda bisa mempertahankan musik yang sudah diputar di setiap lokasi, memilih campuran musik untuk stasiun, atau meminta AI menyusun rencana mingguan. Sebelum mengudara, Anda dapat mendengarkan contoh program selama satu jam.","index":9,"src":"audio/20261102-radio-e4afec689b61900a/radio-your-station.mp3","transcriptSha256":"4e01af887ae018dcabeb4d92c80e35329acdc6db1a743b747c15643972602644","audioSha256":"3fdd26c71f6681b7fa36ec2acd9d2d7e4e6ddfcfededa6a5bfc1c492cfa71f70","durationSeconds":56.48,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.43},{"id":"radio-across-locations","label":"Radio untuk seluruh lokasi","text":"Untuk bisnis dengan banyak lokasi, kantor pusat mengatur stasiun, sementara edisi regional membuat isinya lebih relevan secara lokal. Cabang-cabang pada diagram ini menunjukkan bagaimana satu brand bisa menggunakan bahasa penyiar dan penawaran yang berbeda di tiap wilayah. Informasi cuaca ditambahkan jika relevan bagi toko yang menerima versi tersebut. Tim Anda menyediakan fakta promosi, seperti harga dan tanggal. Radio dapat memvariasikan kalimat di sekitarnya, dengan pemeriksaan naskah dan rekaman suara sebelum sebuah segmen disiarkan. Program disiapkan terlebih dahulu, bukan diimprovisasi secara langsung. Kantor pusat bisa mendengarkan segmen berikutnya, menjeda stasiun, melewati segmen, menghentikan penggunaan suatu sumber, dan melihat riwayat siaran. Radio memakai kredit AI dan memerlukan paket Beat Breeze berbayar, sehingga penggunaannya dapat direncanakan bersama alat AI lainnya.","index":10,"src":"audio/20261102-radio-ce197e75ecfa1ca8/radio-across-locations.mp3","transcriptSha256":"67dac50250cc4f0d8d0a03fe307fede6f8e000bdcf8213c40b73683009d2476f","audioSha256":"fb5747a3add49e7a41936e7f8b6bbce5812e50a1c848fddc7e79e869bed0479d","durationSeconds":55.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.38},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"Terhubung dengan Claude dan ChatGPT","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/09-works-with-claude-and-chatgpt.mp3","text":"Jika tim Anda sudah bekerja dengan Claude atau ChatGPT, Beat Breeze dapat hadir langsung di jendela percakapan tersebut. Contoh di layar menunjukkan beberapa kegunaan: menanyakan musik yang akan diputar Jumat malam, menurunkan volume lobi, atau menyiapkan jadwal ambient baru untuk spa besok. Perintah langsung tetap mengikuti hak akses pengguna, sedangkan perubahan jadwal akan ditampilkan kembali untuk dikonfirmasi sebelum diterapkan. Koneksi menggunakan kunci aman milik akun yang dapat dicabut kapan saja, sehingga akses mudah dihentikan ketika seseorang atau sebuah integrasi tidak lagi memerlukannya. Manfaatnya sederhana: tim dapat menangani pekerjaan musik sehari-hari dengan bahasa yang alami, tanpa kehilangan kendali akhir atas apa yang berubah di venue.","visualCoverage":["kendali dengan bahasa sehari-hari","pertanyaan tentang jadwal saat ini","konfirmasi sebelum perubahan jadwal","akses aman yang dapat dicabut"],"transcriptSha256":"54c96b7b62c180fbb97e17e09d263312c2fb838813ab29930f445d78b6408774","audioSha256":"407004efe342a63c3cc83edcb480eec4781a5ac2fc5ae07f59a6c4f3adc64253","durationSeconds":49.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.44,"loudnessRangeLu":2,"thresholdLufs":-28.93,"targetOffsetLu":0.04,"cached":false},{"index":12,"id":"10-built-for-operators","label":"Dibuat untuk tim operasional","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/10-built-for-operators.mp3","text":"Slide ini menunjukkan dua model operasional. Pada bagian atas, Anda mengelola Beat Breeze secara mandiri. Satu akun dapat mencakup banyak venue dan zona, setiap anggota tim hanya memperoleh akses yang dibutuhkan, dan Brand Lock menjaga musik pada area yang harus mengikuti standar brand. Pemutar berjalan pada perangkat mobile, Windows, atau browser yang didukung dan sudah Anda miliki. Dengan kartu suara multisaluran yang sesuai, satu PC Windows bahkan dapat melayani beberapa zona. Pada bagian bawah adalah model yang dikelola BMAsia. Platformnya tetap sama, tetapi tim kami menambahkan desain musik khusus, dukungan teknis sepanjang waktu, account manager, serta pengawasan seluruh grup. Anda dapat memilih tingkat dukungan yang paling sesuai dengan cara organisasi Anda ingin bekerja.","visualCoverage":["pengelolaan mandiri untuk banyak properti","hak akses tim dan Brand Lock","pilihan pemutar dan beberapa zona di Windows","layanan yang dikelola BMAsia"],"transcriptSha256":"81690673ff7b31a023d2e3ba8825733b769e42696b4be4db8e233056753b9eec","audioSha256":"0f004c8d71134fc5979a2182873a23062c8c7272b303887c15ffcd2f1ab1d71d","durationSeconds":49.64,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.54,"truePeakDbtp":-3.33,"loudnessRangeLu":1.8,"thresholdLufs":-28.83,"targetOffsetLu":0.21,"cached":false},{"index":13,"id":"11-never-go-silent","label":"Musik tak pernah terhenti","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/11-never-go-silent.mp3","text":"Semua kemampuan kreatif tadi hanya bernilai jika sistem tetap dapat diandalkan saat venue sedang beroperasi. Itulah tujuan empat lapisan perlindungan di layar. Jadwal mingguan, otomatisasi, dan jeda waktu salat disimpan secara lokal, sehingga tetap berjalan tanpa internet dan riwayat pemutaran akan tersinkron setelah koneksi kembali. Sistem pemantau mengawasi setiap pemutar dan memulihkannya secara otomatis jika perangkat macet. Setiap pengumuman melaporkan perangkat mana yang berhasil memutarnya, sehingga operator mengetahui bahwa pesan benar-benar sampai ke semua ruang yang dituju. Sertifikat lisensi juga menyediakan kode QR untuk verifikasi langsung ketika diminta pemeriksa. Seluruh rekayasa ini mengejar satu hasil: tamu di venue seharusnya tidak pernah menyadari adanya masalah teknis.","visualCoverage":["operasional offline tanpa gangguan","pemutar yang pulih otomatis","konfirmasi pengiriman pengumuman","bukti lisensi yang dapat diverifikasi langsung"],"transcriptSha256":"d855a4a1b8ad66f2a074811cc44c81a77f8902a0e787003736cb2b17fdcb0f3e","audioSha256":"f15f12c661c3007013193ee24269346b9106ea003783f6c67ee52c6d0f173254","durationSeconds":53.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.59,"truePeakDbtp":-3.06,"loudnessRangeLu":3.5,"thresholdLufs":-28.97,"targetOffsetLu":0.1,"cached":false},{"id":"12-why-beat-breeze","label":"Mengapa Beat Breeze","text":"Tabel ini menyatukan seluruh cerita. Musik per zona dan jadwal otomatis adalah fondasi yang juga ditawarkan oleh banyak solusi lain. Beat Breeze dirancang untuk melangkah lebih jauh dengan pemutaran offline, musik orisinal melalui Compose, pembuatan gambar dan video, pengumuman multibahasa, audio tunggu telepon, dan TV Channels berbrand. Radio menambahkan stasiun berpenyiar yang menyelingi musik dengan cerita dan promosi brand Anda. Perbedaan sebenarnya bukan hanya satu tanda centang di dalam tabel. Yang membedakan adalah venue tidak perlu menyatukan sendiri platform musik, alat kreatif, sistem pesan, dan layar menjadi beberapa solusi terpisah. Beat Breeze menjalankan pengalaman di venue sekaligus membantu menciptakan konten yang menjadi bagian dari pengalaman tersebut.","index":14,"src":"audio/20261102-radio-2728b35523f5f36d/12-why-beat-breeze.mp3","transcriptSha256":"06d033704033e7188834d161470858286c55619e6d7d0ee03cf2ad7908dbca74","audioSha256":"94c83d177b6968dc681d34eb24be3e571b9a2d0860b308a2e38e2f44047d94ba","durationSeconds":52.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.43,"truePeakDbtp":-3.31},{"id":"13-pricing","label":"Harga","text":"Anda bisa mengelola musik sendiri atau menyerahkannya kepada BMAsia. Paket mandiri berharga 15 dolar AS per zona per bulan. Jika memilih paket tahunan, harganya 150 dolar AS per zona per tahun. Kedua paket mandiri mencakup fitur aplikasi, dan Anda mengelola playlist serta jadwal pemutaran sendiri. Untuk layanan yang dikelola tim kami, paket BMAsia berharga 260 dolar AS per zona per tahun, dan hanya tersedia dalam paket tahunan. Paket ini mencakup pengelolaan musik dan stasiun Radio oleh BMAsia. Tim desain musik kami memilih dan menyegarkan playlist serta jadwal yang ditetapkan untuk setiap zona, termasuk penyesuaian musim dan hari raya. Layanan ini juga mencakup dukungan teknis sepanjang waktu dan account manager khusus. Kredit tambahan untuk pembuatan konten AI dikenakan biaya terpisah. Semua pelanggan mendapatkan pembaruan aplikasi secara berkala, apa pun paketnya. Perbedaannya adalah siapa yang mengurus musik Anda. Paket mandiri bisa dicoba gratis selama 14 hari untuk satu zona; uji coba ini memerlukan kartu, tanpa biaya saat dimulai. Jika BMAsia yang mengatur uji coba Anda, tidak perlu kartu. Grup besar dapat mengatur kontrak khusus dan penagihan lokal, tanpa kewajiban membeli box pemutar khusus.","index":15,"src":"audio/20261102-radio-418039d64ff6793a/13-pricing.mp3","transcriptSha256":"4f05da0782917928dd5f9bb31f98b3b9a4f33fa05e2224709b4c9f26de8720c4","audioSha256":"af30031e0a4373794c51f5e26befff6849c82db0c1b3e3efd8d3208d5f2be8a2","durationSeconds":78.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.41},{"index":16,"id":"14-whos-behind-it","label":"Tim di balik Beat Breeze","src":"../beat-breeze-id/audio/20260903-a2cd6329f4db/14-whos-behind-it.mp3","text":"Di balik Beat Breeze ada BMAsia, tim yang telah merancang musik untuk hotel, restoran, ritel, dan wellness sejak 2002. Pengalaman itu penting karena platform ini tidak dibentuk oleh teknologi saja. Desainer musik yang aktif di bidangnya membantu mengarahkan cara konten dikurasi dan cara AI memahami karakter setiap jenis ruang. Tim ahli juga siap memberikan dukungan dua puluh empat jam sehari, sementara arah pengembangan produk dipandu oleh kebutuhan nyata yang disampaikan operator kepada kami. Jadi, ketika memilih Beat Breeze, Anda mendapatkan teknologi yang modern sekaligus tim musik dan layanan berpengalaman yang benar-benar berada di belakangnya.","visualCoverage":["BMAsia sejak 2002","desainer musik berpengalaman yang membimbing kurasi","tim ahli 24/7 dan pengembangan berdasarkan kebutuhan operator"],"transcriptSha256":"3cc92dda6e36e5ef7495cea0c2c45e10ed9487551541c947ccd46925a51235bd","audioSha256":"98812ac29baf502247ee6e7df8864c192b4f79f07d804ab58accf63ba93db8a9","durationSeconds":45.6,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.41,"loudnessRangeLu":2.5,"thresholdLufs":-28.81,"targetOffsetLu":0.01,"cached":false},{"id":"15-close","label":"Mulai","text":"Itulah Beat Breeze hari ini: musik tetap menjadi pusatnya, dengan layar, konten, pengumuman, dan kini Radio. Jika Anda sudah memakai Beat Breeze, jelajahi alat di akun Anda dan dengarkan seperti apa stasiun sendiri dapat terdengar. Radio memerlukan paket berbayar dan menggunakan kredit AI. Jika baru memulai, kunjungi beatbreeze.io atau hubungi Norbert di BMAsia. Kami akan membantu memilih titik awal yang sesuai untuk venue Anda.","index":17,"src":"audio/20261102-radio-b448c192a61ec947/15-close.mp3","transcriptSha256":"1706ea73b44fc29ee099021115b201e2280b27f81194f801a943074f41d2072d","audioSha256":"362f556049280e6bea8153b63aac7fc6cb3db79e67a6e9e5b718ecc0344fb448","durationSeconds":32.68,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.6,"truePeakDbtp":-3.39}],"qualityAssurance":{"record":"docs/beat-breeze-radio-id-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};

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
        visible: "Memuat narasi",
        short: "Memuat",
        pressed: "false",
        label: "Memuat narasi presentasi",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "Menyiapkan narasi",
        short: "Menyiapkan",
        pressed: "false",
        label: "Menyiapkan narasi presentasi",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "Mulai narasi",
        short: "Mulai",
        pressed: "false",
        label: "Mulai narasi",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "Narasi aktif",
        short: "Diputar",
        pressed: "true",
        label: "Jeda narasi",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "Lanjutkan narasi",
        short: "Lanjutkan",
        pressed: "false",
        label: "Lanjutkan narasi",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "Putar ulang narasi",
        short: "Ulangi",
        pressed: "false",
        label: "Putar ulang presentasi dengan narasi",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "Coba lagi",
        short: "Coba lagi",
        pressed: "false",
        label: "Muat ulang narasi",
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
            throw new Error(`Berkas narasi mengembalikan status ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Berkas narasi tidak cocok dengan presentasi ini");
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
    label.textContent = "Slide ini belum memiliki narasi";
    shortLabel.textContent = "Belum ada";
    button.setAttribute(
      "aria-label",
      "Slide ini tidak memiliki audio narasi",
    );
    button.title = "Slide ini tidak memiliki audio narasi";
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
        announce("Narasi sedang disiapkan");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("Slide ini tidak memiliki audio narasi");
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
      announce(`Memutar narasi slide ${currentIndex + 1}`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Narasi Beat Breeze tidak dapat diputar", error);
      failPlayback("Narasi tidak dapat diputar. Silakan coba lagi");
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
        announce("Slide ini tidak memiliki audio narasi");
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

    toolbar.setAttribute("aria-label", "Kontrol presentasi");
    const previousButton = toolbar.querySelector(".btn.prev");
    const nextButton = toolbar.querySelector(".btn.next");
    const resetControl = toolbar.querySelector(".btn.reset");
    if (previousButton) {
      previousButton.setAttribute("aria-label", "Slide sebelumnya");
      previousButton.title = "Slide sebelumnya";
    }
    if (nextButton) {
      nextButton.setAttribute("aria-label", "Slide berikutnya");
      nextButton.title = "Slide berikutnya";
    }
    if (resetControl) {
      resetControl.setAttribute("aria-label", "Mulai ulang presentasi");
      resetControl.title = "Mulai ulang presentasi";
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
    invitation.setAttribute("aria-label", "Undangan untuk memulai narasi");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">Ingin mendengarkan narasi?</span>
      <button class="narration-invitation-start" type="button">Mulai</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="Tutup undangan narasi">×</button>
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
        announce("Presentasi dengan narasi telah selesai");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("Audio narasi tidak dapat dimuat");
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
          announce("Narasi siap diputar");
        } else {
          setNarrationUnavailable();
          announce("Slide ini tidak memiliki audio narasi");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("Berkas narasi Beat Breeze tidak dapat dimuat", error);
        setButtonState("error");
        announce("Narasi tidak dapat dimuat. Silakan coba lagi");
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
