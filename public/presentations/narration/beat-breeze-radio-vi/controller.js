(() => {
  "use strict";

  const CONTROLLER_URL =
    document.currentScript?.src ||
    new URL(
      "./narration/beat-breeze-radio-vi/controller.js",
      window.location.href,
    ).href;
  const MANIFEST_URL = new URL("manifest.json", CONTROLLER_URL).href;
  const DISCOVERY_MS = 9500;
  const INVITATION_MS = 9000;
  const INVITATION_SESSION_KEY =
    "beat-breeze-narration-invitation-seen-vi";
  const ADVANCE_DELAY_MS = 650;
  const LOCAL_FALLBACK_MANIFEST = {"version":4,"deck":"beat-breeze","presentation":"beat-breeze-radio-vi","status":"official","ready":true,"generatedAt":"2026-11-02","releaseId":"2026-11-02-radio-all-1","publicationStatus":"Official 17-slide Radio presentation. AI transcript QA and assistant review; native-speaker feedback remains welcome.","coverage":{"slideIndexes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"behaviorAfterLastClip":"replay-from-start","manualNavigation":"restart-current-slide-when-narration-is-on"},"source":{"englishDeckPath":"public/presentations/beat-breeze.html","englishDeckSha256":"7a8972251c7183d2940102b9cae1690f374a5c82ecac1c2f70d243e5d1553c46","officialDeckPath":"public/presentations/beat-breeze-vi.html","officialDeckSha256":"0c3f95c636140a160ecbda2068bde66152a4d8ac9efefe26852b5bb82f5c494b","scriptPath":"public/presentations/narration/beat-breeze-vi/script.json","scriptSha256":"6a8e088f7e099f9dcff1494e4ced00f5a4287ce375bcb3502e6f5f9a9ae6b396","copyPath":"public/presentations/narration/beat-breeze-vi/copy.json","copySha256":"4b02101eb51f7606b3b2d1a4c59a45de2d544c134a86124cad81afe5df8e6fd4"},"voice":{"provider":"google-gemini","model":"gemini-3.1-flash-tts-preview","name":"Sulafat","apiRevision":"2026-05-20","performance":{"name":"Maya","role":"một chuyên gia sản phẩm Beat Breeze ấm áp, chuyên nghiệp và am hiểu hoạt động địa điểm","scene":"một buổi giới thiệu trực tiếp, thoải mái với người quản lý địa điểm, tự nhiên dẫn dắt theo slide đang hiển thị","style":"Thân thiện, tự tin và gần gũi. Trò chuyện như đang giúp một khách hàng thực sự hiểu Beat Breeze hỗ trợ vận hành ra sao, không đọc lại nội dung slide và không dùng giọng quảng cáo.","pacing":"Nhịp nói thong thả, tự nhiên; ngắt nhẹ giữa các ý chính. Phát âm rõ tên sản phẩm nhưng không nhấn quá mức."}},"processing":{"highpassHz":65,"loudnessTargetLufs":-18,"truePeakTargetDbtp":-3,"sampleRateHz":48000,"channels":1,"format":"MP3","bitRateKbps":128},"totalDurationSeconds":738.6000000000001,"slides":[{"index":1,"id":"01-title","label":"Trang bìa","src":"../beat-breeze-vi/audio/20260903-214d179462e3/01-title.mp3","text":"Xin chào và cảm ơn quý khách đã dành thời gian tìm hiểu Beat Breeze. Nền tảng bắt đầu từ một cam kết rất đơn giản: luôn phát đúng âm nhạc ở từng khu vực của địa điểm. Nhưng những gì quý khách đang thấy hôm nay đã rộng hơn nhiều. Cùng một nền tảng giờ đây kết nối âm nhạc, màn hình, thông báo bằng giọng nói và toàn bộ nội dung đi kèm trên mọi không gian quý khách vận hành. Vì vậy, đây không chỉ là phần giới thiệu một trình phát nhạc. Chúng ta sẽ cùng xem một hệ thống có thể giúp tạo nên và vận hành toàn bộ trải nghiệm truyền thông tại địa điểm như thế nào.","visualCoverage":["nền tảng trải nghiệm không gian tất cả trong một","âm nhạc, màn hình, thông báo và nội dung","một nền tảng cho mọi không gian"],"transcriptSha256":"09c09daca2ecc11abcdc6b062f09221db9864ac306ba9084db11ec55084af6c2","audioSha256":"6b52ec06a256866e4ccae4a9947561714c58baa824910d0923286bd3e5fc806b","durationSeconds":31.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.4,"loudnessRangeLu":1.7,"thresholdLufs":-28.86,"targetOffsetLu":0.15,"cached":false},{"id":"02-one-platform-many-jobs","label":"Một nền tảng, nhiều chức năng","text":"Có thể xem slide này như bản đồ của toàn bộ nền tảng, gồm ba phần. Bên trái là âm nhạc và tự động hóa: mỗi khu vực có nhạc được cấp phép, lịch phát tự vận hành trong ngày, Music Director đưa ra đề xuất bằng AI, và nhạc vẫn tiếp tục khi mất mạng. Ở giữa là sáng tạo nội dung: Compose tạo nhạc gốc, Content Studio làm hình ảnh và video, TV Channels đưa nội dung lên màn hình, còn thông báo đa ngôn ngữ giúp địa điểm giao tiếp bằng giọng nói. Thông báo dành cho từng thông điệp riêng, còn Radio tạo một đài phát liên tục có người dẫn cho doanh nghiệp. Bên phải là vận hành: mọi địa điểm, khu vực, thành viên và trình phát đều nằm trong một bảng điều khiển, với Brand Lock khi cần giữ nhất quán thương hiệu. Quý khách có thể tự quản lý hoặc để BMAsia hỗ trợ thiết kế âm nhạc và vận hành. Bây giờ, chúng ta bắt đầu từ phần cốt lõi: âm nhạc.","index":2,"src":"audio/20261102-radio-afec898043a28630/02-one-platform-many-jobs.mp3","transcriptSha256":"7ca8ba5dc72729bc7caf13b239d33ef960dd9eb7d5f5b38b075f77485ecfca61","audioSha256":"7717035eb6e13796e4efcb504f220ef5e929b37f681ca8c9dd4cb94eee7c4f16","durationSeconds":53.4,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.62,"truePeakDbtp":-3.32},{"index":3,"id":"03-music-that-runs-itself","label":"Âm nhạc tự vận hành","src":"../beat-breeze-vi/audio/20260903-214d179462e3/03-music-that-runs-itself.mp3","text":"Cốt lõi của Beat Breeze là hệ thống âm nhạc có thể theo sát nhịp vận hành cả ngày mà không cần nhân viên liên tục can thiệp. Sảnh, quầy bar, spa và nhà hàng có thể mang màu sắc âm nhạc riêng, trong khi trụ sở chính theo dõi mọi cơ sở từ một bảng điều khiển. Quý khách chỉ cần định hình dòng chảy một lần, chẳng hạn nhẹ nhàng vào buổi sáng, nhiều năng lượng hơn vào giờ trưa và ấm áp hơn vào buổi tối; hệ thống sẽ tự chuyển theo từng khung giờ. Kho nhạc đã có bản quyền sử dụng cho doanh nghiệp và được bổ sung liên tục. Quý khách cũng có thể mô tả bầu không khí mong muốn để trợ lý xây dựng playlist phù hợp. Quan trọng hơn, khi internet gián đoạn, trình phát tại chỗ vẫn được thiết kế để âm nhạc tiếp tục.","visualCoverage":["âm nhạc riêng cho từng khu vực","lịch phát và khung giờ","phát ngoại tuyến","kho nhạc có bản quyền và playlist do AI hỗ trợ"],"transcriptSha256":"5ccac7ad8becb9c0b514d4cc015e6e1199fe6f36ab181cedd09887060473e170","audioSha256":"d3a41939b16b24c1b864fdecaacf978a54d97b4eb191f80cffe031b6ebca900d","durationSeconds":40.8,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.41,"loudnessRangeLu":2.1,"thresholdLufs":-28.75,"targetOffsetLu":-0.01,"cached":false},{"index":4,"id":"04-automations","label":"Tự động hóa","src":"../beat-breeze-vi/audio/20260903-214d179462e3/04-automations.mp3","text":"Lịch phát thay đổi âm nhạc theo giờ, còn tự động hóa giúp địa điểm phản hồi theo những gì thực sự đang diễn ra. Hệ thống có thể tự hạ âm lượng vào đêm muộn và điều chỉnh nhịp năng lượng từ nhẹ nhàng buổi sáng, sôi động hơn vào giờ trưa rồi thư giãn về tối. Khi trời mưa hoặc nhiệt độ tăng, âm nhạc cũng có thể chuyển sang sắc thái ấm áp hay mát dịu phù hợp hơn. Nếu kết nối bộ đếm người hoặc dữ liệu POS, hệ thống sẽ tự tăng năng lượng khi lượng khách đông hơn. Giờ cầu nguyện, từng khung giờ, mùa lễ hội và ngày đặc biệt đều có thể nằm trong cùng một hệ thống. Quý khách có thể chọn quy tắc có sẵn hoặc tự xây dựng quy tắc riêng, và những tự động hóa quan trọng, kể cả tạm dừng theo giờ cầu nguyện, vẫn hoạt động khi internet bị gián đoạn.","visualCoverage":["giảm âm lượng tự động và nhịp năng lượng trong ngày","phản hồi theo thời tiết và nhiệt độ","kích hoạt theo lượng khách hoặc POS","giờ cầu nguyện, khung giờ và sự kiện theo mùa","tự động hóa ngoại tuyến"],"transcriptSha256":"b47efd2ae7330cde272a9c42061021b7353eedb2d2d3fede94fa28a18fee2177","audioSha256":"b9ea51d97e3a1c3b8eed2a43ba9d771084d3f4ca1c4ff7ce564d4a9d8edccdc5","durationSeconds":44.84,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.44,"loudnessRangeLu":2.7,"thresholdLufs":-28.75,"targetOffsetLu":0.38,"cached":false},{"index":5,"id":"05-your-music-director","label":"Music Director của quý khách","src":"../beat-breeze-vi/audio/20260903-214d179462e3/05-your-music-director.mp3","text":"Music Director là trợ lý AI chủ động được tích hợp trong Beat Breeze. Mỗi đêm, hệ thống rà soát từng khu vực và chỉ lên tiếng khi nhận thấy điều đáng cải thiện, với tối đa ba đề xuất mỗi tuần. Ví dụ trên màn hình cho thấy điểm quan trọng nhất: Music Director trình bày dữ liệu và lý do đằng sau đề xuất, còn quý khách quyết định có áp dụng hay không. Mọi thay đổi đều có thể hoàn tác. Qua thời gian, hệ thống học từ hành vi thực tế như những bài thường bị bỏ qua, các lần chỉnh âm lượng và nội dung đội ngũ chọn giữ lại. Hệ thống cũng chuẩn bị trước cho những thời điểm theo mùa. Nếu kết nối dữ liệu doanh số hoặc lượng khách, quý khách còn có thể so sánh kết quả trước và sau khi thay đổi âm nhạc, thay vì chỉ dựa vào cảm nhận.","visualCoverage":["rà soát từng khu vực mỗi đêm","đề xuất có giới hạn và giải thích rõ","học từ cách địa điểm thực sự vận hành","chuẩn bị trước theo mùa","báo cáo trước và sau thay đổi"],"transcriptSha256":"5571ff75dc6b0b0beb0ce88b9d123bfd956863deaef1cd0881442a3649b8721b","audioSha256":"d2acd55acc7952913173012637eb392b034259745ea3728a080cfa3ffa6b9fac","durationSeconds":45,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.58,"truePeakDbtp":-3.4,"loudnessRangeLu":2.7,"thresholdLufs":-28.98,"targetOffsetLu":0.41,"cached":false},{"index":6,"id":"06-compose","label":"Compose","src":"../beat-breeze-vi/audio/20260903-214d179462e3/06-compose.mp3","text":"Compose đưa quý khách từ việc chọn nhạc sang chủ động tạo nhạc. Chỉ cần mô tả khung cảnh bằng ngôn ngữ tự nhiên, giống yêu cầu cho bữa tối dưới ánh nến trên màn hình, Beat Breeze sẽ tạo những bản nhạc gốc dành cho chính khoảnh khắc đó. Kết quả đầu tiên không nhất thiết phải là phiên bản cuối. Quý khách có thể dùng thêm một câu để điều chỉnh cảm xúc, nhịp độ, nhạc cụ hoặc giọng hát. Giá trị với một địa điểm không chỉ nằm ở việc AI có thể tạo ra một bài nhạc, mà ở khả năng phát triển dấu ấn âm thanh riêng cho một chiến dịch, một không gian hay một thời điểm phục vụ, thay vì luôn dùng những playlist đại trà giống nhau.","visualCoverage":["tạo nhạc gốc từ câu mô tả","yêu cầu sáng tạo riêng cho địa điểm","điều chỉnh qua nhiều lần"],"transcriptSha256":"864e6983acf0c7d7653599a736ce974b97b412b7d6672e1743e13308a8fcc25b","audioSha256":"911c43ffa8367bfff215b3940af366d1b002c6d493b67dbcb739480fe14dabfd","durationSeconds":35.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.44,"truePeakDbtp":-3.02,"loudnessRangeLu":1.9,"thresholdLufs":-28.69,"targetOffsetLu":0.05,"cached":false},{"index":7,"id":"07-studio-and-screens","label":"Studio và màn hình","src":"../beat-breeze-vi/audio/20260903-214d179462e3/07-studio-and-screens.mp3","text":"Cách tiếp cận đó cũng được mở rộng sang nội dung hình ảnh. Content Studio giúp đội ngũ tạo những tài liệu địa điểm thường xuyên cần đến, như bài đăng mạng xã hội, poster khuyến mãi, video ngắn, bảng hiệu số hoặc video nền lặp, tất cả theo logo và màu sắc thương hiệu. Sau đó, TV Channels đưa nội dung trực tiếp từ công cụ biên tập lên những màn hình quý khách đang có. Màn hình tại sảnh có thể giới thiệu ưu đãi tối nay trong khi phát đúng âm nhạc của khu vực; màn hình spa có thể chạy video thương hiệu nhẹ nhàng; còn khách sạn có thể mở rộng các kênh đó lên TV trong phòng. Công cụ sáng tạo và hệ thống phân phối vì thế nằm cùng một nơi, thay vì trở thành một dự án bảng hiệu số riêng biệt.","visualCoverage":["các định dạng của Content Studio","thiết kế theo thương hiệu","phân phối qua TV Channels","nội dung TV trong phòng khách sạn"],"transcriptSha256":"8aa0183553ebb6ada19ab997f6c52699fc159b29275e37d3d7ed5622468129a5","audioSha256":"5d703aa76c2e3e6d58a0750cd03e86a00a64e374a88f80bbecce5c7be2a07412","durationSeconds":41.72,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.51,"truePeakDbtp":-3.44,"loudnessRangeLu":2.5,"thresholdLufs":-28.81,"targetOffsetLu":0.39,"cached":false},{"index":8,"id":"08-announcements","label":"Thông báo bằng giọng nói","src":"../beat-breeze-vi/audio/20260903-214d179462e3/08-announcements.mp3","text":"Đây là phần giao tiếp bằng giọng nói trong trải nghiệm tại địa điểm. Quý khách viết nội dung, chọn ngôn ngữ và giọng đọc, đặt thời gian rồi để thông báo phát trên nền nhạc. Đó có thể là happy hour, lời nhắc gọi món cuối, câu chào mừng hoặc thông tin vận hành. Ba ví dụ trên màn hình cho thấy một địa điểm có thể giao tiếp bằng nhiều ngôn ngữ mà không phải đặt phòng thu cho từng bản ghi. Cùng công cụ này còn tạo được âm thanh chờ điện thoại chuyên nghiệp, kết hợp giọng nói và âm nhạc cho người gọi. Nói cách khác, cả phần âm nhạc lẫn những thông điệp xoay quanh nó đều được quản lý tại một nơi.","visualCoverage":["thông báo tại địa điểm bằng nhiều ngôn ngữ","phát theo lịch trên nền nhạc","âm thanh chờ điện thoại"],"transcriptSha256":"2fedb4c87fa156e4ddf172b0df0720c001acd465cacad6ec441a8c7286e5d979","audioSha256":"a447616aa6c25559163b932a16a778e4c8aa3f1d7d5a09d1d08c485d04aa6c8d","durationSeconds":37.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.45,"truePeakDbtp":-3.44,"loudnessRangeLu":2.8,"thresholdLufs":-28.76,"targetOffsetLu":-0.1,"cached":false},{"id":"radio-your-station","label":"AI Radio","text":"Thông báo phù hợp khi quý khách cần phát một thông điệp cụ thể. Radio đi xa hơn, tạo một chương trình liên tục có người dẫn cho doanh nghiệp. Hãy nhìn theo trình tự trên slide: nhạc đang phát, người dẫn xen vào bằng một lời chào hoặc ưu đãi ngắn, rồi trở lại với âm nhạc. Với quán cà phê, đó có thể là lời nhắc về bánh mới ra lò. Với chuỗi bán lẻ, đó có thể là chương trình khuyến mãi hiện tại hoặc câu chuyện thương hiệu. Quý khách chọn giọng nói, phong cách và ngôn ngữ của người dẫn, đồng thời quyết định tần suất xuất hiện. Về âm nhạc, có thể giữ danh sách đang phát tại các địa điểm, chọn cách phối nhạc cho đài, hoặc để AI lập kế hoạch cả tuần. Quý khách còn có thể nghe thử một giờ chương trình trước khi đưa đài vào hoạt động.","index":9,"src":"audio/20261102-radio-81e202e0248da245/radio-your-station.mp3","transcriptSha256":"62ff3899d0b8068b14e9f5ae016db4d55d3d5fce9b08d13fe761b30aa4254d63","audioSha256":"5b9eebe5281338e9b9bbd9cd55b0d130ad6eae07bc75317af17282d5c1557ca9","durationSeconds":45.24,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.42},{"id":"radio-across-locations","label":"Radio tại nhiều địa điểm","text":"Với hệ thống nhiều địa điểm, trụ sở chính định hướng đài phát, còn các phiên bản khu vực giúp nội dung phù hợp với địa phương. Sơ đồ phân nhánh cho thấy một thương hiệu có thể dùng ngôn ngữ người dẫn và ưu đãi khác nhau ở từng vùng. Thông tin thời tiết được đưa vào khi phù hợp với các cửa hàng nhận phiên bản đó. Đội ngũ của quý khách cung cấp thông tin chính xác về ưu đãi, như giá và thời gian áp dụng. Radio có thể thay đổi cách diễn đạt quanh những thông tin này, với bước kiểm tra kịch bản và bản thu trước khi từng đoạn được phát. Chương trình được chuẩn bị trước, không phải ứng biến trực tiếp. Trụ sở chính có thể nghe trước, tạm dừng đài, bỏ qua một đoạn, ngừng sử dụng một nguồn thông tin và xem các đoạn đã phát. Radio sử dụng tín dụng AI và cần gói Beat Breeze trả phí, nên quý khách có thể lên kế hoạch sử dụng cùng các công cụ AI khác.","index":10,"src":"audio/20261102-radio-9f4a25fe1bc3e11c/radio-across-locations.mp3","transcriptSha256":"425c0239bd2abae8b967f91d61c4e8797ea8f49d9fcd683f49c2e64bed15c970","audioSha256":"56c3eb6248877fc0a5b1edcb0f277b6449ba4636511f6ac87d7a40f1c3dec704","durationSeconds":51.36,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.48,"truePeakDbtp":-3.4},{"index":11,"id":"09-works-with-claude-and-chatgpt","label":"Kết nối với Claude và ChatGPT","src":"../beat-breeze-vi/audio/20260903-214d179462e3/09-works-with-claude-and-chatgpt.mp3","text":"Nếu đội ngũ đã làm việc với Claude hoặc ChatGPT, Beat Breeze có thể xuất hiện ngay trong cửa sổ trò chuyện quen thuộc đó. Các ví dụ cho thấy nhiều cách sử dụng: hỏi tối thứ Sáu sẽ phát gì, giảm âm lượng sảnh một chút, hoặc chuẩn bị lịch nhạc spa mới cho ngày mai. Những thao tác tức thời vẫn tuân theo quyền của từng người dùng, còn thay đổi lịch phát sẽ được hiển thị lại để xác nhận trước khi ghi vào hệ thống. Kết nối sử dụng khóa bảo mật có thể thu hồi, nên quyền truy cập dễ dàng được gỡ bỏ khi một cá nhân hay tích hợp không còn cần đến. Lợi ích rất rõ ràng: đội ngũ xử lý công việc âm nhạc hằng ngày bằng ngôn ngữ tự nhiên mà người vận hành vẫn giữ quyền kiểm soát cuối cùng.","visualCoverage":["điều khiển bằng ngôn ngữ tự nhiên","hỏi về lịch phát hiện tại","xác nhận trước khi thay đổi lịch","quyền truy cập bảo mật và có thể thu hồi"],"transcriptSha256":"b369c2b280b0c2ff054d651cda3194701c7defef9ab0c1129f82cf55ba5f70ae","audioSha256":"011c1886025d79c1301d63f84ea14ed989ba0d6b187be69eef676aa55fcefec3","durationSeconds":39.52,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.5,"truePeakDbtp":-3.4,"loudnessRangeLu":1.5,"thresholdLufs":-28.81,"targetOffsetLu":0.19,"cached":false},{"index":12,"id":"10-built-for-operators","label":"Dành cho đội ngũ vận hành","src":"../beat-breeze-vi/audio/20260903-214d179462e3/10-built-for-operators.mp3","text":"Slide này thể hiện hai mô hình vận hành. Ở phía trên, quý khách trực tiếp quản lý Beat Breeze: một tài khoản có thể bao phủ nhiều địa điểm và khu vực, mỗi thành viên chỉ nhận quyền cần thiết, còn Brand Lock khóa âm nhạc tại những nơi phải giữ đúng tiêu chuẩn thương hiệu. Trình phát hoạt động trên thiết bị di động, Windows hoặc trình duyệt được hỗ trợ mà quý khách đang có. Với card âm thanh đa kênh phù hợp, một máy tính Windows cũng có thể phục vụ nhiều khu vực. Phía dưới là mô hình BMAsia quản lý. Nền tảng vẫn như vậy, nhưng đội ngũ chúng tôi bổ sung thiết kế âm nhạc riêng, hỗ trợ kỹ thuật suốt ngày đêm, quản lý tài khoản và giám sát toàn hệ thống. Quý khách có thể chọn mức độ hỗ trợ phù hợp nhất với cách vận hành của mình.","visualCoverage":["tự quản lý nhiều cơ sở","quyền thành viên và Brand Lock","lựa chọn trình phát và nhiều khu vực trên Windows","dịch vụ do BMAsia quản lý"],"transcriptSha256":"e24005828f28ee0a908fd74eeb3879ba79a1a439db393a8b8abc24038ee436d6","audioSha256":"4ad6873aa1142718c828aa8f812dd98a628fde6acbb8b8b66ac824a66d3ec148","durationSeconds":42,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.58,"truePeakDbtp":-3.41,"loudnessRangeLu":2.8,"thresholdLufs":-28.87,"targetOffsetLu":0.25,"cached":false},{"index":13,"id":"11-never-go-silent","label":"Âm nhạc luôn tiếp diễn","src":"../beat-breeze-vi/audio/20260903-214d179462e3/11-never-go-silent.mp3","text":"Mọi tính năng sáng tạo chỉ thực sự có giá trị khi hệ thống đủ đáng tin cậy trong một địa điểm đang hoạt động. Đó là mục đích của bốn lớp bảo vệ trên màn hình. Lịch tuần, tự động hóa và tạm dừng theo giờ cầu nguyện đều được lưu tại chỗ, vì vậy vẫn chạy khi mất mạng, còn lịch sử phát sẽ đồng bộ sau. Hệ thống giám sát theo dõi từng trình phát và tự khôi phục nếu thiết bị bị treo. Mỗi thông báo báo lại chính xác thiết bị nào đã phát thành công, để người vận hành biết nội dung đã đến mọi không gian cần thiết. Chứng nhận giấy phép cũng có mã QR để xác minh ngay khi người kiểm tra yêu cầu. Toàn bộ phần kỹ thuật hướng đến một kết quả duy nhất: khách tại địa điểm không nên cảm nhận thấy bất kỳ sự cố nào.","visualCoverage":["hoạt động ngoại tuyến liên tục","trình phát tự khôi phục","xác nhận thông báo đã phát","xác minh giấy phép tức thì"],"transcriptSha256":"bb34b012e865efda1b080d9695b314184bdbd2a256ea571a4f6ec3d95cfaf891","audioSha256":"bea042ae9254c05306b9aac0570bee345509c23e4e6ffbfcd3d182f833e79384","durationSeconds":41.12,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.53,"truePeakDbtp":-3.36,"loudnessRangeLu":2.1,"thresholdLufs":-28.9,"targetOffsetLu":0.09,"cached":false},{"id":"12-why-beat-breeze","label":"Vì sao chọn Beat Breeze","text":"Bảng so sánh này kết nối toàn bộ câu chuyện. Âm nhạc theo từng khu vực và lịch tự động là nền tảng, cũng là nơi nhiều giải pháp khác bắt đầu. Beat Breeze được thiết kế để đi xa hơn nền tảng đó, với khả năng hoạt động ngoại tuyến, nhạc gốc từ Compose, sáng tạo hình ảnh và video, thông báo đa ngôn ngữ, âm thanh chờ điện thoại và TV Channels mang thương hiệu. Radio bổ sung một đài phát liên tục có người dẫn, đưa câu chuyện thương hiệu và ưu đãi vào giữa các bản nhạc. Khác biệt thật sự không nằm ở một dấu tích riêng lẻ trong bảng. Đó là việc địa điểm không phải tự ghép hệ thống âm nhạc, công cụ sáng tạo, thông điệp và màn hình thành nhiều giải pháp rời rạc. Beat Breeze vừa vận hành trải nghiệm tại địa điểm, vừa giúp tạo nên nội dung bên trong trải nghiệm đó.","index":14,"src":"audio/20261102-radio-2f1fca1837b8a7b0/12-why-beat-breeze.mp3","transcriptSha256":"60426878f2f9992cc2f5c89b12743744e65e3de97cf25e560ead0630afe30f21","audioSha256":"fb4a8d81abfb543179f2e347ace3918d72234e383862eef81b07dc2b1caa66fe","durationSeconds":45.96,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.46,"truePeakDbtp":-3.31},{"id":"13-pricing","label":"Bảng giá","text":"Quý khách có thể tự quản lý âm nhạc hoặc để BMAsia chăm sóc. Gói tự phục vụ có giá 15 đô la Mỹ cho mỗi khu vực mỗi tháng. Nếu chọn thanh toán theo năm, giá là 150 đô la Mỹ cho mỗi khu vực mỗi năm. Cả hai gói tự phục vụ đều bao gồm các tính năng của ứng dụng, và quý khách tự quản lý danh sách phát cùng lịch phát. Nếu muốn giao việc này cho đội ngũ chuyên môn, gói do BMAsia quản lý có giá 260 đô la Mỹ cho mỗi khu vực mỗi năm, và chỉ có gói năm. Gói này bao gồm việc BMAsia quản lý cả âm nhạc lẫn đài Radio. Đội ngũ thiết kế âm nhạc của chúng tôi lựa chọn và làm mới danh sách phát cùng lịch phát được gán cho từng khu vực, kể cả thay đổi theo mùa và dịp lễ. Dịch vụ còn có hỗ trợ kỹ thuật suốt ngày đêm và quản lý tài khoản riêng. Tín dụng tạo nội dung AI bổ sung được tính phí riêng. Mọi khách hàng đều được cập nhật ứng dụng thường xuyên, bất kể chọn gói nào. Điểm khác biệt là ai chăm sóc âm nhạc cho quý khách. Có thể dùng thử gói tự phục vụ miễn phí 14 ngày trên một khu vực; gói này yêu cầu thẻ nhưng không tính phí khi bắt đầu. Nếu BMAsia sắp xếp bản dùng thử cho quý khách thì không cần thẻ. Doanh nghiệp lớn có thể chọn hợp đồng và hình thức xuất hóa đơn phù hợp, và không cần mua hộp phát chuyên dụng.","index":15,"src":"audio/20261102-radio-49137a324290ec60/13-pricing.mp3","transcriptSha256":"d87850d78ae031c1d77bbfa718670a59de91762298991af7edec278f2afc842e","audioSha256":"fa6a0531d8db38fd5127d9c3af43c805e276a56723b013c1cfa41a55fac16fff","durationSeconds":76.32,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.52,"truePeakDbtp":-3.07},{"index":16,"id":"14-whos-behind-it","label":"Đội ngũ phía sau","src":"../beat-breeze-vi/audio/20260903-214d179462e3/14-whos-behind-it.mp3","text":"Đứng sau Beat Breeze là BMAsia, đội ngũ đã thiết kế âm nhạc cho khách sạn, nhà hàng, bán lẻ và chăm sóc sức khỏe từ năm 2002. Kinh nghiệm đó rất quan trọng vì nền tảng không chỉ được định hình bởi kỹ thuật phần mềm. Những chuyên gia thiết kế âm nhạc đang làm nghề trực tiếp hướng dẫn cách tuyển chọn nội dung và cách AI hiểu từng loại không gian. Đội ngũ chuyên môn luôn sẵn sàng hỗ trợ 24 giờ mỗi ngày, còn lộ trình sản phẩm được dẫn dắt bởi những nhu cầu thực tế mà người vận hành chia sẻ với chúng tôi. Vì vậy, khi chọn Beat Breeze, quý khách có cả một đội ngũ âm nhạc giàu kinh nghiệm và một đội ngũ dịch vụ đứng phía sau.","visualCoverage":["BMAsia từ năm 2002","chuyên gia thiết kế âm nhạc định hướng tuyển chọn","đội ngũ chuyên môn hỗ trợ 24/7 và lộ trình từ nhu cầu vận hành"],"transcriptSha256":"f6da4347706053b2d3a9bd604f114e7f90ee19e7eb3e05f384824b573c3898b8","audioSha256":"ad634bdc5b360ea94c5f0db7bac10d272f31a931dc07a4af4412937efcdec884","durationSeconds":38.44,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.55,"truePeakDbtp":-3.42,"loudnessRangeLu":3.1,"thresholdLufs":-28.84,"targetOffsetLu":0.16,"cached":false},{"id":"15-close","label":"Bắt đầu","text":"Đó là Beat Breeze hôm nay: âm nhạc ở trung tâm, kết nối màn hình, nội dung, thông báo và nay có thêm Radio. Nếu đã sử dụng Beat Breeze, quý khách có thể khám phá các công cụ trong tài khoản và nghe thử đài riêng của mình. Radio cần gói trả phí và sử dụng tín dụng AI. Nếu mới bắt đầu, hãy truy cập beatbreeze.io hoặc liên hệ Norbert tại BMAsia. Chúng tôi sẽ giúp chọn điểm khởi đầu phù hợp cho các địa điểm của quý khách.","index":17,"src":"audio/20261102-radio-0a3fd97a5e2b407f/15-close.mp3","transcriptSha256":"25f9dc1e88cc1d83079f8a9ff36c8836f175da2d158d1f1f226aec7e66ff6ca3","audioSha256":"a412cb3b1057beef8f57e54f8f1dde46fea418f863ec278f149c56cef9727d13","durationSeconds":28.2,"codec":"mp3","sampleRateHz":48000,"channels":1,"bitRate":128000,"integratedLufs":-18.57,"truePeakDbtp":-3.43}],"qualityAssurance":{"record":"docs/beat-breeze-radio-vi-20261102-qa.json","reviewedClipCount":6,"unchangedClipCount":11},"generation":{"mode":"six-targeted-radio-clips","updatedSlideIds":["02-one-platform-many-jobs","radio-your-station","radio-across-locations","12-why-beat-breeze","13-pricing","15-close"],"verifiedCarryForwardSlideCount":11},"preview":false,"complete":true};

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
        visible: "Đang tải thuyết minh",
        short: "Đang tải",
        pressed: "false",
        label: "Đang tải phần thuyết minh",
        disabled: true,
      },
      unavailable: {
        icon: ICONS.muted,
        visible: "Đang chuẩn bị thuyết minh",
        short: "Đang chuẩn bị",
        pressed: "false",
        label: "Đang chuẩn bị phần thuyết minh",
        disabled: true,
      },
      idle: {
        icon: ICONS.muted,
        visible: "Bắt đầu thuyết minh",
        short: "Bắt đầu",
        pressed: "false",
        label: "Bắt đầu thuyết minh",
        disabled: false,
      },
      playing: {
        icon: ICONS.playing,
        visible: "Đang thuyết minh",
        short: "Đang phát",
        pressed: "true",
        label: "Tạm dừng thuyết minh",
        disabled: false,
      },
      muted: {
        icon: ICONS.muted,
        visible: "Tiếp tục thuyết minh",
        short: "Tiếp tục",
        pressed: "false",
        label: "Tiếp tục thuyết minh",
        disabled: false,
      },
      replay: {
        icon: ICONS.replay,
        visible: "Phát lại thuyết minh",
        short: "Phát lại",
        pressed: "false",
        label: "Phát lại bài trình bày có thuyết minh",
        disabled: false,
      },
      error: {
        icon: ICONS.muted,
        visible: "Thử lại thuyết minh",
        short: "Thử lại",
        pressed: "false",
        label: "Tải lại phần thuyết minh",
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
            throw new Error(`Tệp thuyết minh trả về trạng thái ${response.status}`);
          }
          return response.json();
        })
        .then((value) => {
          if (!value || value.deck !== "beat-breeze") {
            throw new Error("Tệp thuyết minh không khớp với bài trình bày này");
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
    label.textContent = "Trang này chưa có thuyết minh";
    shortLabel.textContent = "Chưa có";
    button.setAttribute(
      "aria-label",
      "Trang này không có âm thanh thuyết minh",
    );
    button.title = "Trang này không có âm thanh thuyết minh";
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
        announce("Đang chuẩn bị phần thuyết minh");
        return;
      }

      const slide = slideAudio(requestedIndex);
      if (!slide?.src) {
        narrationEnabled = false;
        setNarrationUnavailable();
        announce("Trang này không có âm thanh thuyết minh");
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
      announce(`Đang phát thuyết minh trang ${currentIndex + 1}`);
      await audio.play();
    } catch (error) {
      if (request !== playbackRequest || error?.name === "AbortError") return;
      console.error("Không thể phát thuyết minh Beat Breeze", error);
      failPlayback("Không thể phát thuyết minh. Vui lòng thử lại");
    }
  };

  const turnNarrationOff = () => {
    clearAdvanceTimer();
    playbackRequest += 1;
    narrationEnabled = false;
    audio.pause();
    setButtonState("muted");
    announce("Đã tạm dừng thuyết minh");
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
        announce("Trang này không có âm thanh thuyết minh");
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

    toolbar.setAttribute("aria-label", "Thanh điều khiển bài trình bày");
    const previousButton = toolbar.querySelector(".btn.prev");
    const nextButton = toolbar.querySelector(".btn.next");
    const resetControl = toolbar.querySelector(".btn.reset");
    if (previousButton) {
      previousButton.setAttribute("aria-label", "Trang trước");
      previousButton.title = "Trang trước";
    }
    if (nextButton) {
      nextButton.setAttribute("aria-label", "Trang tiếp theo");
      nextButton.title = "Trang tiếp theo";
    }
    if (resetControl) {
      resetControl.setAttribute("aria-label", "Bắt đầu lại bài trình bày");
      resetControl.title = "Bắt đầu lại bài trình bày";
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
      <span class="narration-label">Thuyết minh</span>
      <span class="narration-label-short">Âm thanh</span>
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
    invitation.setAttribute("aria-label", "Lời mời bắt đầu thuyết minh");
    invitation.innerHTML = `
      <span class="narration-invitation-copy">Quý khách muốn nghe thuyết minh?</span>
      <button class="narration-invitation-start" type="button">Bắt đầu</button>
      <button class="narration-invitation-dismiss" type="button" aria-label="Đóng lời mời thuyết minh">×</button>
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
        announce("Đã phát xong bài trình bày có thuyết minh");
      }
    });
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        failPlayback("Không thể tải âm thanh thuyết minh");
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
          announce("Phần thuyết minh đã sẵn sàng");
        } else {
          setNarrationUnavailable();
          announce("Trang này không có âm thanh thuyết minh");
        }
        toolbar.classList.add("narration-discovery");
        showInvitation();
        window.setTimeout(
          () => toolbar.classList.remove("narration-discovery"),
          DISCOVERY_MS,
        );
      })
      .catch((error) => {
        console.error("Không thể tải tệp thuyết minh Beat Breeze", error);
        setButtonState("error");
        announce("Không thể tải thuyết minh. Vui lòng thử lại");
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
