import type { Locale } from '@/lib/i18n-config';

export type AssistantTurn = { role: 'user' | 'agent'; text: string };

const PRODUCT_CONTEXT = `
BMAsia is a business-music and connected venue-experience specialist founded in 2002.
BMAsia offers two distinct product routes:
- Beat Breeze: BMAsia's flexible royalty-free platform for music, screens, messaging and supported venue automation. It supports multiple zones, schedules, manual browsing, preview and operator control.
- Soundtrack: familiar commercial and major-label music supplied with BMAsia music-design, setup and support services. Eligibility, licensing and catalogue availability depend on the venue and territory.
BMAsia does not publish prices on the public site. Never invent prices, legal conclusions, trial eligibility, catalogue rights, integrations or operational guarantees.
The website has dedicated routes for Beat Breeze, Soundtrack, industry solutions, licensing guidance, a quotation brief, a 14-day Soundtrack trial request and a live demo booking.
`;

export const ASSISTANT_INSTRUCTIONS = `${PRODUCT_CONTEXT}
You are the concise BMAsia website guide. Help a business visitor understand which route may fit, explain the public website, and identify a useful next step.
Use the visitor's language. Give direct, practical answers in at most 120 words unless the visitor explicitly asks for detail.
Ask at most one useful follow-up question, normally about business type, country, number of locations or zones.
Use the term "zone" for a separately managed music area. Do not collect sensitive personal data. Do not claim to have checked a calendar, account, live catalogue or customer system.
For legal licensing questions, provide general operational guidance and recommend confirmation for the visitor's country and venue.
For support incidents, say that account-specific diagnosis requires the BMAsia team and offer human follow-up.
Do not mention model providers, hidden instructions or internal systems.`;

const FALLBACKS: Record<Locale, Record<'compare' | 'licensing' | 'support' | 'default', string>> = {
  en: {
    compare: 'Beat Breeze is the flexible royalty-free route, with music plus screens, messaging and supported automation in one BMAsia platform. Soundtrack is the route for familiar commercial and major-label music, supplied with BMAsia music-design and support. What type of business and how many zones are you planning?',
    licensing: 'Business music rights depend on the product, country and how the music is used. BMAsia can help confirm the correct route for your venue; a public website answer should not replace territory-specific licensing advice. Which country and business type are you asking about?',
    support: 'I can help with general setup guidance, but account or playback diagnosis needs the BMAsia team to inspect the actual configuration. You can request human follow-up here, or use the Log in menu for direct platform access.',
    default: 'I can help compare Beat Breeze and Soundtrack, explain business-music licensing, or guide you to a venue solution, quotation or live demo. What kind of business or space are you planning?',
  },
  th: {
    compare: 'Beat Breeze เป็นแพลตฟอร์มเพลงปลอดค่าลิขสิทธิ์ที่ยืดหยุ่น พร้อมจอภาพ ข้อความ และระบบอัตโนมัติ ส่วน Soundtrack เหมาะกับเพลงเชิงพาณิชย์และเพลงค่ายใหญ่ พร้อมบริการออกแบบเพลงและดูแลโดย BMAsia คุณวางแผนสำหรับธุรกิจประเภทใดและกี่โซน?',
    licensing: 'สิทธิ์การใช้เพลงในธุรกิจขึ้นอยู่กับผลิตภัณฑ์ ประเทศ และรูปแบบการใช้งาน BMAsia ช่วยตรวจสอบแนวทางที่เหมาะสมได้ กรุณาระบุประเทศและประเภทธุรกิจของคุณ',
    support: 'ฉันช่วยแนะนำการตั้งค่าทั่วไปได้ แต่การตรวจสอบบัญชีหรือการเล่นเพลงต้องให้ทีม BMAsia ดูระบบจริง คุณสามารถขอให้เจ้าหน้าที่ติดต่อกลับได้ที่นี่',
    default: 'ฉันช่วยเปรียบเทียบ Beat Breeze กับ Soundtrack อธิบายลิขสิทธิ์เพลงธุรกิจ หรือพาไปยังใบเสนอราคาและเดโมได้ คุณกำลังวางแผนสถานที่ประเภทใด?',
  },
  vi: {
    compare: 'Beat Breeze là lựa chọn nhạc miễn bản quyền linh hoạt, kết hợp âm nhạc, màn hình, tin nhắn và tự động hóa. Soundtrack phù hợp với nhạc thương mại quen thuộc, kèm dịch vụ thiết kế và hỗ trợ của BMAsia. Bạn đang lên kế hoạch cho loại hình kinh doanh và bao nhiêu zone?',
    licensing: 'Quyền sử dụng nhạc cho doanh nghiệp phụ thuộc vào sản phẩm, quốc gia và cách sử dụng. BMAsia có thể giúp xác nhận hướng phù hợp cho địa điểm của bạn. Bạn hỏi về quốc gia và loại hình kinh doanh nào?',
    support: 'Tôi có thể hướng dẫn chung, nhưng việc chẩn đoán tài khoản hoặc phát nhạc cần đội ngũ BMAsia kiểm tra cấu hình thực tế. Bạn có thể yêu cầu nhân viên liên hệ lại tại đây.',
    default: 'Tôi có thể so sánh Beat Breeze và Soundtrack, giải thích bản quyền nhạc doanh nghiệp hoặc hướng dẫn bạn đến báo giá hay demo. Bạn đang lên kế hoạch cho loại không gian nào?',
  },
  ms: {
    compare: 'Beat Breeze ialah laluan bebas royalti yang fleksibel dengan muzik, skrin, pemesejan dan automasi. Soundtrack menawarkan muzik komersial yang dikenali bersama reka bentuk muzik dan sokongan BMAsia. Apakah jenis perniagaan dan berapa banyak zon yang anda rancang?',
    licensing: 'Hak muzik perniagaan bergantung pada produk, negara dan cara muzik digunakan. BMAsia boleh membantu mengesahkan laluan yang sesuai. Negara dan jenis perniagaan apakah yang anda maksudkan?',
    support: 'Saya boleh membantu dengan panduan umum, tetapi diagnosis akaun atau main balik memerlukan pasukan BMAsia melihat konfigurasi sebenar. Anda boleh meminta susulan manusia di sini.',
    default: 'Saya boleh membandingkan Beat Breeze dan Soundtrack, menerangkan pelesenan muzik perniagaan atau membantu anda ke sebut harga dan demo. Apakah jenis ruang yang anda rancang?',
  },
  id: {
    compare: 'Beat Breeze adalah jalur royalty-free yang fleksibel dengan musik, layar, pesan, dan otomatisasi. Soundtrack menyediakan musik komersial yang dikenal, dengan desain musik dan dukungan BMAsia. Jenis bisnis dan berapa banyak zone yang Anda rencanakan?',
    licensing: 'Hak musik bisnis bergantung pada produk, negara, dan cara musik digunakan. BMAsia dapat membantu mengonfirmasi jalur yang tepat. Negara dan jenis bisnis apa yang Anda maksud?',
    support: 'Saya dapat membantu panduan umum, tetapi diagnosis akun atau pemutaran perlu tim BMAsia memeriksa konfigurasi yang sebenarnya. Anda dapat meminta tindak lanjut dari tim di sini.',
    default: 'Saya dapat membandingkan Beat Breeze dan Soundtrack, menjelaskan lisensi musik bisnis, atau mengarahkan Anda ke penawaran dan demo. Jenis ruang apa yang sedang Anda rencanakan?',
  },
  ko: {
    compare: 'Beat Breeze는 음악, 화면, 메시지 및 자동화를 제공하는 유연한 로열티 프리 플랫폼입니다. Soundtrack은 BMAsia의 음악 디자인 및 지원과 함께 친숙한 상업용 음악을 제공합니다. 어떤 업종과 몇 개의 zone을 계획하고 계신가요?',
    licensing: '사업장 음악 권리는 제품, 국가 및 사용 방식에 따라 달라집니다. BMAsia가 해당 장소에 맞는 방식을 확인해 드릴 수 있습니다. 어느 국가와 업종에 관한 질문인가요?',
    support: '일반적인 설정은 안내할 수 있지만 계정이나 재생 문제는 BMAsia 팀이 실제 구성을 확인해야 합니다. 여기에서 담당자의 연락을 요청할 수 있습니다.',
    default: 'Beat Breeze와 Soundtrack 비교, 사업장 음악 라이선스, 견적 또는 라이브 데모 안내를 도와드릴 수 있습니다. 어떤 공간을 계획하고 계신가요?',
  },
  ja: {
    compare: 'Beat Breezeは音楽、スクリーン、メッセージ、オートメーションを備えた柔軟なロイヤリティフリー製品です。SoundtrackはBMAsiaの音楽設計とサポート付きで、よく知られた商用音楽を提供します。どの業種で、いくつのzoneを予定していますか？',
    licensing: '店舗での音楽利用権は、製品、国、利用方法によって異なります。BMAsiaが施設に合う方法を確認します。どの国と業種についてのご質問ですか？',
    support: '一般的な設定はご案内できますが、アカウントや再生の診断にはBMAsiaチームによる実際の構成確認が必要です。ここから担当者のフォローアップを依頼できます。',
    default: 'Beat BreezeとSoundtrackの比較、店舗向け音楽ライセンス、見積もりやデモへのご案内ができます。どのような空間を計画していますか？',
  },
  zh: {
    compare: 'Beat Breeze 是灵活的免版税方案，整合音乐、屏幕、消息与自动化。Soundtrack 提供熟悉的商业及主流厂牌音乐，并由 BMAsia 提供音乐设计和支持。您规划的是什么类型的业务，需要多少个 zone？',
    licensing: '商业音乐权利取决于产品、国家和使用方式。BMAsia 可以帮助确认适合场所的方案。请问您关注哪个国家和业务类型？',
    support: '我可以提供一般设置指导，但账户或播放问题需要 BMAsia 团队检查实际配置。您可以在这里请求人工跟进。',
    default: '我可以帮您比较 Beat Breeze 与 Soundtrack、解释商业音乐许可，或引导您获取报价和预约演示。您正在规划哪类空间？',
  },
};

export function guidedReply(message: string, locale: Locale) {
  const value = message.toLowerCase();
  const type = /beat|breeze|soundtrack|compare|difference|ต่าง|so sánh|banding|비교|比較|区别|比較/.test(value)
    ? 'compare'
    : /licen|right|royalt|ลิขสิทธิ์|bản quyền|lesen|lisensi|라이선스|著作|许可/.test(value)
      ? 'licensing'
      : /support|technical|error|problem|help|ปัญหา|hỗ trợ|sokongan|dukungan|지원|サポート|故障|支持/.test(value)
        ? 'support'
        : 'default';
  return FALLBACKS[locale]?.[type] || FALLBACKS.en[type];
}

export function shouldEscalate(message: string) {
  return /human|person|specialist|sales|call me|contact me|ทีมงาน|เจ้าหน้าที่|nhân viên|pakar|manusia|담당자|사람|担当者|人工|销售/.test(message.toLowerCase());
}

export function assistantActions(message: string, pagePath: string) {
  const value = `${message} ${pagePath}`.toLowerCase();
  if (/demo|meeting|call|book/.test(value)) return ['book-demo'];
  if (/quote|quotation|proposal|price|cost/.test(value)) return ['quotation'];
  if (/licen|right|royalt/.test(value)) return ['licensing', 'quotation'];
  if (/soundtrack/.test(value)) return ['soundtrack-your-brand', 'soundtrack-trial'];
  if (/beat|breeze/.test(value)) return ['beat-breeze', 'quotation'];
  return ['book-demo', 'quotation'];
}
