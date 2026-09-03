import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");
const SOURCE_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze.html",
);
const OUTPUT_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "beat-breeze-th.html",
);
const SCRIPT_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview-th",
  "script.json",
);
const MANIFEST_PATH = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview-th",
  "manifest.json",
);
const FONT_ROOT = path.join(
  REPO_ROOT,
  "public",
  "presentations",
  "narration",
  "beat-breeze-voice-preview-th",
  "fonts",
);
const ENGLISH_GUARD_SOURCE_PATTERN =
  /\n  <template id="beat-breeze-layout-guard-source"[\s\S]*?<\/template>/;
const MOTION_SCRIPT =
  '  <script src="./narration/beat-breeze-motion/controller.js?v=2026-09-02-5" defer></script>';
const MOTION_SCRIPT_PATTERN =
  /\n\s*<script src="\.\/narration\/beat-breeze-motion(?:-preview)?\/controller\.js(?:\?v=[^"]+)?" defer><\/script>/g;

const requiredFiles = [
  SOURCE_PATH,
  SCRIPT_PATH,
  path.join(FONT_ROOT, "NotoSansThai-wdth-wght.ttf"),
  path.join(FONT_ROOT, "NotoSerifThai-wdth-wght.ttf"),
  path.join(FONT_ROOT, "OFL-Noto-Sans-Thai.txt"),
  path.join(FONT_ROOT, "OFL-Noto-Serif-Thai.txt"),
];
for (const required of requiredFiles) {
  if (!existsSync(required)) {
    throw new Error(`Required Thai presentation source is missing: ${required}`);
  }
}

const SLIDE_LABELS = new Map([
  ["Title", "หน้าปก"],
  ["One platform, many jobs", "แพลตฟอร์มเดียว หลายหน้าที่"],
  ["Music that runs itself", "เพลงที่ทำงานได้เอง"],
  ["Automations", "ระบบอัตโนมัติ"],
  ["Your Music Director", "Music Director ของคุณ"],
  ["Compose", "Compose"],
  ["Studio &amp; screens", "Studio และหน้าจอ"],
  ["Announcements", "ประกาศ"],
  ["Works with Claude &amp; ChatGPT", "ใช้งานร่วมกับ Claude และ ChatGPT"],
  ["Built for operators", "สร้างมาเพื่อผู้ดูแลสถานที่"],
  ["Never go silent", "ออกแบบมาให้เพลงไม่หยุด"],
  ["Why Beat Breeze", "ทำไมต้อง Beat Breeze"],
  ["Pricing", "ราคา"],
  ["Who's behind it", "ทีมที่อยู่เบื้องหลัง"],
  ["Close", "เริ่มต้นใช้งาน"],
]);

const COPY = new Map([
  ["Product Overview · 2026", "ภาพรวมผลิตภัณฑ์ · 2026"],
  ["The all-in-one venue platform", "แพลตฟอร์มครบวงจรสำหรับสถานที่"],
  ["It doesn't just play music anymore —", "ไม่ได้แค่เล่นเพลงอีกต่อไป —"],
  ["it runs your whole", "แต่ดูแลทั้ง"],
  ["in‑venue media experience.", "ประสบการณ์สื่อภายในสถานที่"],
  [
    "Music, screens, announcements, and content — made by AI and human hands — across every space you operate — one&nbsp;platform, on the devices you&nbsp;already&nbsp;own.",
    "เพลง หน้าจอ ประกาศ และคอนเทนต์ — สร้างสรรค์ด้วย AI และฝีมือคน — ครอบคลุมทุกพื้นที่ที่คุณดูแล — ในแพลตฟอร์มเดียว บนอุปกรณ์ที่คุณมีอยู่แล้ว",
  ],
  ["Wherever Music Matters", "ทุกที่ที่เสียงเพลงมีความหมาย"],
  ["What it is now", "วันนี้ Beat Breeze ทำอะไรได้บ้าง"],
  ["One platform.", "แพลตฟอร์มเดียว"],
  ["Ten jobs it used to take five tools to do.", "ทำงานได้สิบอย่าง แทนเครื่องมือห้าชุด"],
  [
    "Every capability below is a section inside the app — all managed from one dashboard.",
    "ทุกความสามารถด้านล่างอยู่ในแอป และดูแลจากแดชบอร์ดเดียว",
  ],
  ["Music &amp; automation", "เพลงและระบบอัตโนมัติ"],
  ["Licensed library, growing every week", "คลังเพลงลิขสิทธิ์ เพิ่มใหม่ทุกสัปดาห์"],
  ["Music per zone, one dashboard", "เพลงแยกแต่ละโซน แดชบอร์ดเดียว"],
  ["Automations + your AI Music Director", "ระบบอัตโนมัติ + AI Music Director ของคุณ"],
  ["Resilient offline playback", "เล่นเพลงออฟไลน์ได้อย่างต่อเนื่อง"],
  ["Content creation", "การสร้างคอนเทนต์"],
  ["Compose — original AI music", "Compose — เพลงต้นฉบับสร้างด้วย AI"],
  ["Content Studio — images &amp; video", "Content Studio — ภาพและวิดีโอ"],
  ["TV Channels for your screens", "TV Channels สำหรับหน้าจอของคุณ"],
  ["Multilingual AI announcements", "ประกาศเสียง AI หลายภาษา"],
  ["Operations", "การดำเนินงาน"],
  ["Unlimited venues &amp; zones", "ไม่จำกัดสถานที่และโซน"],
  ["Free team seats + brand-lock", "เพิ่มผู้ใช้ในทีมได้ฟรี + Brand Lock"],
  ["Runs on devices you own", "ใช้งานบนอุปกรณ์ที่คุณมี"],
  ["Bespoke design + 24/7 support", "ออกแบบเฉพาะแบรนด์ + ซัพพอร์ต 24/7"],
  ["The core · automation", "แกนหลัก · ระบบอัตโนมัติ"],
  ["Set the day once. It", "ตั้งวันไว้ครั้งเดียว แล้วระบบ"],
  ["runs itself.", "ทำงานต่อเอง"],
  [
    "Calm mornings, energetic lunch, warm evenings — the music changes on its own, with no one touching a screen.",
    "เช้าที่สงบ กลางวันที่คึกคัก เย็นที่อบอุ่น — เพลงเปลี่ยนเองโดยไม่ต้องมีใครแตะหน้าจอ",
  ],
  ["Music in every zone", "เพลงที่เหมาะกับทุกโซน"],
  [
    "Lobby jazz, bar deep house, spa ambient — each space is its own zone, and head office can monitor every property from one dashboard.",
    "ล็อบบี้แจ๊ส บาร์ดีปเฮาส์ สปาแอมเบียนต์ — แต่ละพื้นที่เป็นคนละโซน และสำนักงานใหญ่เห็นทุกสาขาจากแดชบอร์ดเดียว",
  ],
  ["Smart scheduling &amp; dayparts", "ตารางอัจฉริยะและช่วงเวลาของวัน"],
  [
    "Breakfast to late night set once — with group-level playlists and per-property schedules.",
    "ตั้งครั้งเดียวตั้งแต่อาหารเช้าถึงช่วงดึก พร้อมเพลย์ลิสต์ระดับกลุ่มและตารางเฉพาะแต่ละสาขา",
  ],
  ["Keeps playing through outages", "เพลงเล่นต่อแม้อินเทอร์เน็ตขัดข้อง"],
  [
    "Resilient offline playback — if the internet drops, the music doesn't stop.",
    "การเล่นแบบออฟไลน์ช่วยให้เพลงไม่หยุดเมื่ออินเทอร์เน็ตขัดข้อง",
  ],
  ["A library that never stops growing", "คลังเพลงที่เติบโตไม่หยุด"],
  [
    "100,000+ licensed tracks and 200+ professionally curated playlists, ready from day one — and growing every week.",
    "เพลงที่ได้รับอนุญาตกว่า 100,000 แทร็ก และเพลย์ลิสต์ที่ผู้เชี่ยวชาญคัดสรรกว่า 200 ชุด พร้อมใช้ตั้งแต่วันแรก และเพิ่มใหม่ทุกสัปดาห์",
  ],
  ["AI builds the playlist", "AI ช่วยสร้างเพลย์ลิสต์"],
  [
    "Describe the vibe you want and let the assistant assemble the right playlist for the moment.",
    "บอกอารมณ์ที่ต้องการ แล้วให้ผู้ช่วยจัดเพลย์ลิสต์ที่เหมาะกับช่วงเวลานั้น",
  ],
  ["Licensed for business", "ลิขสิทธิ์ครบ พร้อมใช้ในธุรกิจ"],
  [
    "100% royalty-free and licensed for commercial use worldwide — proof of licence one QR scan away, no paperwork to chase.",
    "เพลงแบบ royalty-free 100% พร้อมสิทธิ์ใช้งานเชิงพาณิชย์ทั่วโลก — ตรวจสอบสิทธิ์ได้ทันทีด้วย QR code ไม่ต้องค้นเอกสาร",
  ],
  ["Automations that", "ระบบอัตโนมัติที่"],
  ["react to your venue.", "ตอบสนองต่อสถานที่ของคุณ"],
  [
    "Not just a schedule — it responds to the day, the weather, the crowd, and the calendar. Pick one, or build your own.",
    "ไม่ใช่แค่ตารางเวลา แต่ตอบสนองต่อวัน สภาพอากาศ จำนวนคน และปฏิทิน เลือกใช้แบบที่มี หรือสร้างกฎของคุณเอง",
  ],
  ["Quiet hours", "ลดเสียงอัตโนมัติในช่วงดึก"],
  [
    "Turn the volume down late at night and back up in the morning, automatically.",
    "ลดระดับเสียงช่วงดึก และเพิ่มกลับในตอนเช้าโดยอัตโนมัติ",
  ],
  ["Daily energy curve", "Daily Energy Curve"],
  ["Calm mornings, lively lunch, relaxed late nights — built through the day.", "ปรับบรรยากาศจากสงบในตอนเช้า คึกคักช่วงกลางวัน ไปจนถึงผ่อนคลายยามค่ำคืน"],
  ["Rainy-day cozy", "บรรยากาศอบอุ่นในวันฝนตก"],
  ["Switch to warm, cozy music whenever it's raining at your venue.", "เปลี่ยนเป็นเพลงอบอุ่นนุ่มนวลเมื่อฝนตกที่สถานที่ของคุณ"],
  ["Beat the heat", "เพลงชิลเมื่ออากาศร้อน"],
  ["Switch to cooler, chill music when the temperature climbs.", "เปลี่ยนเป็นเพลงเย็นสบายเมื่ออุณหภูมิสูงขึ้น"],
  ["Needs a sensor", "ต้องใช้เซ็นเซอร์"],
  ["Busy = upbeat", "คนเยอะขึ้น เพลงคึกคักขึ้น"],
  ["Lift the energy when the venue fills up — via a people-counter or POS feed.", "เพิ่มพลังของเพลงเมื่อคนเริ่มแน่น ผ่านเครื่องนับคนหรือข้อมูลจาก POS"],
  ["Respect prayer times", "พักเพลงตามเวลาละหมาด"],
  ["Gently pause the music during each of the five daily prayers, then resume.", "พักเพลงในช่วงละหมาดทั้งห้าครั้ง แล้วเล่นต่อโดยอัตโนมัติ"],
  ["Playlist by time of day", "เพลย์ลิสต์ตามช่วงเวลาของวัน"],
  ["A different vibe each part of the day, from the weekly schedule editor.", "เปลี่ยนอารมณ์เพลงในแต่ละช่วง ผ่านตัวแก้ไขตารางประจำสัปดาห์"],
  ["Seasonal &amp; holidays", "เพลงตามเทศกาลและวันหยุด"],
  ["Festive music for a set date range, from the event scheduler.", "กำหนดเพลงเทศกาลตามช่วงวันที่ผ่านตัวจัดตารางอีเวนต์"],
  ["Or build your own —", "หรือสร้างระบบอัตโนมัติของคุณเอง —"],
  ["triggers for weather, temperature, footfall &amp; occupancy, and prayer times.", "กำหนดให้ระบบตอบสนองต่อสภาพอากาศ อุณหภูมิ จำนวนคน ความหนาแน่น หรือเวลาละหมาด"],
  ["Runs fully offline — prayer pauses included", "ทำงานออฟไลน์ได้เต็มรูปแบบ — รวมถึงการพักเพลงตามเวลาละหมาด"],
  ["Your Music Director", "Music Director ของคุณ"],
  ["It doesn't wait to be", "ไม่ต้องรอให้คุณ"],
  ["asked.", "สั่งก่อน"],
  [
    "Your Music Director is the AI curator built into Beat Breeze. It reviews every zone nightly, and when something is worth improving it suggests a change — never more than three suggestions a week, each with its reasoning shown. Accept in one tap; every change comes with automatic undo.",
    "Music Director คือ AI คิวเรเตอร์ใน Beat Breeze ระบบตรวจสอบทุกโซนในแต่ละคืน และจะแนะนำเมื่อพบสิ่งที่ควรปรับปรุง โดยไม่เกินสามคำแนะนำต่อสัปดาห์ พร้อมเหตุผลทุกครั้ง กดรับได้ในครั้งเดียว และย้อนกลับทุกการเปลี่ยนแปลงได้",
  ],
  ["Learns every zone from real behavior", "เรียนรู้จากการใช้งานจริงในแต่ละโซน"],
  ["Skips, volume nudges, what stays on — each zone's profile sharpens week by week.", "เพลงที่ถูกข้าม การปรับระดับเสียง และเพลงที่ถูกปล่อยให้เล่นต่อ ช่วยให้โปรไฟล์ของแต่ละโซนแม่นยำขึ้นทุกสัปดาห์"],
  ["Seasonal radar", "เตรียมเพลงล่วงหน้าตามฤดูกาล"],
  ["Songkran, Christmas, Lunar New Year, prayer calendars — prepared before the moment arrives.", "สงกรานต์ คริสต์มาส ตรุษจีน และปฏิทินเวลาละหมาด เตรียมพร้อมก่อนช่วงเวลานั้นมาถึง"],
  ["Proof, not promises", "วัดผลได้จริง ไม่ใช่แค่ความรู้สึก"],
  ["Connect POS or covers data and get an honest before/after report on whether a change moved sales.", "เชื่อมข้อมูล POS หรือจำนวนลูกค้า แล้วดูรายงานก่อนและหลังว่าการเปลี่ยนเพลงส่งผลต่อยอดขายหรือไม่"],
  ["Tonight's suggestion · Pool Bar", "คำแนะนำสำหรับคืนนี้ · Pool Bar"],
  ["Max 3 / week", "ไม่เกิน 3 ครั้ง / สัปดาห์"],
  ["“Friday nights, your team skips a third of the chill-house tracks. Swap in the warmer Golden Hour rotation?”", "“คืนวันศุกร์ ทีมของคุณข้ามเพลงชิลเฮาส์หนึ่งในสาม ลองเปลี่ยนเป็นชุด Golden Hour ที่อบอุ่นขึ้นไหม?”"],
  ["Why", "เหตุผล"],
  ["Six weeks of Friday-night data from this zone — which tracks got skipped and when the volume was turned down.", "ข้อมูลคืนวันศุกร์หกสัปดาห์จากโซนนี้ แสดงว่าเพลงใดถูกข้าม และช่วงใดที่ระดับเสียงถูกลดลง"],
  ["Accept", "นำไปใช้"],
  ["Undo anytime — every change is reversible", "ย้อนกลับได้ทุกเมื่อ — ทุกการเปลี่ยนแปลงคืนค่าได้"],
  ["Your own music,", "เพลงของคุณเอง"],
  ["made", "สร้างขึ้น"],
  ["from a sentence.", "จากหนึ่งประโยค"],
  ["Describe the vibe you want and Compose generates brand-new, original tracks made just for your venue — in minutes.", "บอกอารมณ์ที่ต้องการ แล้ว Compose จะสร้างเพลงต้นฉบับใหม่สำหรับสถานที่ของคุณโดยเฉพาะ ภายในไม่กี่นาที"],
  ["A signature sound no competitor is playing, not a stock playlist everyone shares.", "สร้างเสียงประจำแบรนด์ที่คู่แข่งไม่มี ไม่ใช่เพลย์ลิสต์สำเร็จรูปที่ทุกคนใช้เหมือนกัน"],
  ["Not quite right? Refine it with another sentence.", "ยังไม่ใช่หรือ? ปรับต่อได้ด้วยอีกหนึ่งประโยค"],
  ["You type", "คุณพิมพ์"],
  ["“Warm, slow bossa nova for candlelit dinner service — light percussion, no vocals.”", "“บอสซาโนวาช้า ๆ โทนอุ่น สำหรับมื้อค่ำใต้แสงเทียน — เพอร์คัสชันเบา ๆ ไม่มีเสียงร้อง”"],
  ["Beat Breeze returns", "Beat Breeze สร้างให้"],
  ["Content Studio · TV Channels", "Content Studio · TV Channels"],
  ["Make the visuals — then put them", "สร้างภาพ — แล้วนำขึ้น"],
  ["on your screens.", "หน้าจอของคุณ"],
  ["Generate images and video with AI — social posts, promo posters, signage, ambient loops — on-brand with your logo and colors.", "สร้างภาพและวิดีโอด้วย AI ทั้งโพสต์โซเชียล โปสเตอร์โปรโมชัน ป้ายดิจิทัล และวิดีโอวน โดยใช้โลโก้และสีของแบรนด์"],
  ["Social posts", "โพสต์โซเชียล"],
  ["Posters", "โปสเตอร์"],
  ["Short video", "วิดีโอสั้น"],
  ["Ambient loops", "วิดีโอวนสร้างบรรยากาศ"],
  ["Stream those visuals to any screen you already own, paired with the zone's music. For hotels, the same channels become", "ส่งภาพเหล่านั้นไปยังหน้าจอที่คุณมีอยู่แล้ว พร้อมเพลงของแต่ละโซน สำหรับโรงแรม ช่องเดียวกันยังใช้เป็น"],
  ["in-room entertainment", "ความบันเทิงในห้องพัก"],
  ["on guest TVs.", "บนทีวีของแขกได้"],
  ["Your music platform and your screens in one product — no separate signage service to buy.", "แพลตฟอร์มเพลงและหน้าจออยู่ในผลิตภัณฑ์เดียว ไม่ต้องซื้อบริการป้ายดิจิทัลแยก"],
  ["TV Channel · Lobby", "TV Channel · ล็อบบี้"],
  ["Tonight", "คืนนี้"],
  ["Chef's Tasting Menu", "เมนูชิมรสจากเชฟ"],
  ["Now playing · Bossa Nova Lounge", "กำลังเล่น · Bossa Nova Lounge"],
  ["Poster", "โปสเตอร์"],
  ["Spa Sundays", "สปาวันอาทิตย์"],
  ["Social", "โซเชียล"],
  ["Weekend Brunch", "บรันช์วันหยุด"],
  ["Video", "วิดีโอ"],
  ["Ambient Loop", "วิดีโอวนสร้างบรรยากาศ"],
  ["Announcements &amp; messaging", "ประกาศและข้อความ"],
  ["Everything your venue says", "ทุกสิ่งที่สถานที่ของคุณ"],
  ["out loud.", "ต้องการสื่อสาร"],
  ["AI voice announcements in dozens of languages, layered right over your music at the times you choose — no recording booth, no freelancer.", "ประกาศเสียง AI หลายสิบภาษา เล่นทับเพลงตามเวลาที่คุณกำหนด ไม่ต้องใช้ห้องอัดหรือจ้างผู้บรรยายแยก"],
  ["Plus phone on-hold audio — multilingual voice-overs and music, produced in the app and sent straight to your phone system.", "รวมถึงเสียงระหว่างรอสาย ทั้งเสียงพูดหลายภาษาและเพลง สร้างในแอปแล้วส่งไปยังระบบโทรศัพท์ของคุณ"],
  ["In-venue announcement · over music", "ประกาศในสถานที่ · เล่นทับเพลง"],
  ["Last-order call · scheduled", "แจ้งรับออร์เดอร์สุดท้าย · ตั้งเวลา"],
  ["Phone on-hold message", "ข้อความระหว่างรอสาย"],
  ["Works with Claude &amp; ChatGPT", "ใช้งานร่วมกับ Claude และ ChatGPT"],
  ["Control it from the AI", "ควบคุมผ่าน AI"],
  ["you already use.", "ที่คุณใช้อยู่แล้ว"],
  ["Beat Breeze connects to Claude and ChatGPT — so your team runs the music in plain language, from the chat window that's already open.", "Beat Breeze เชื่อมต่อกับ Claude และ ChatGPT ให้ทีมจัดการเพลงด้วยภาษาธรรมดาจากหน้าต่างแชตที่เปิดใช้อยู่แล้ว"],
  ["Schedule changes are always shown for confirmation before they commit. Nothing moves without a yes. And it all runs on your account's own secure, revocable keys — no subscription, no access.", "การเปลี่ยนตารางจะแสดงให้ยืนยันก่อนบันทึกทุกครั้ง ไม่มีคำยืนยันก็ไม่มีอะไรเปลี่ยน และทั้งหมดใช้คีย์ของบัญชีคุณที่ปลอดภัยและเพิกถอนได้ เมื่อไม่มีสิทธิ์ ก็ไม่มีการเข้าถึง"],
  ["First in the category", "รายแรกในกลุ่มผลิตภัณฑ์นี้"],
  ["Your AI assistant · connected to Beat Breeze", "ผู้ช่วย AI ของคุณ · เชื่อมต่อกับ Beat Breeze"],
  ["Turn the lobby down a little.", "ลดเสียงล็อบบี้ลงหน่อย"],
  ["Done — Lobby volume 60% → 45%.", "เรียบร้อย — ระดับเสียงล็อบบี้ 60% → 45%"],
  ["What plays Friday at 8pm?", "วันศุกร์สองทุ่มเล่นอะไร?"],
  ["Pool Bar · Deep House Evenings. Lobby · Warm Jazz After Dark.", "Pool Bar · Deep House Evenings  ล็อบบี้ · Warm Jazz After Dark"],
  ["Move the spa to ambient from 6pm tomorrow.", "พรุ่งนี้หกโมงเย็น เปลี่ยนสปาเป็นเพลงแอมเบียนต์"],
  ["Ready to schedule — Spa · Ambient Textures, tomorrow 18:00 to close. Confirm?", "พร้อมตั้งเวลา — สปา · Ambient Textures พรุ่งนี้ 18:00 ถึงเวลาปิด ยืนยันไหม?"],
  ["Confirm change", "ยืนยันการเปลี่ยนแปลง"],
  ["Cancel", "ยกเลิก"],
  ["Built for operators", "สร้างมาเพื่อผู้ดูแลสถานที่"],
  ["Run it yourself —", "บริหารเอง —"],
  ["or let us run it for you.", "หรือให้เราดูแลให้"],
  ["One login for everything", "หนึ่งบัญชีสำหรับทุกอย่าง"],
  ["Unlimited venues and zones, with group-level control across every property.", "ไม่จำกัดสถานที่และโซน พร้อมการควบคุมระดับกลุ่มทุกสาขา"],
  ["Per-zone permissions enforced server-side — lock a zone so the brand playlist can't be changed.", "กำหนดสิทธิ์แยกแต่ละโซนและล็อกเพลย์ลิสต์ของแบรนด์ เพื่อป้องกันการเปลี่ยนแปลงที่ไม่ได้รับอนุญาต"],
  ["A proactive AI assistant", "AI ผู้ช่วยที่คอยแนะนำการปรับเพลง"],
  ["Your Music Director manages the sound and suggests content — and reaches you in Claude or ChatGPT.", "Music Director ดูแลเสียง แนะนำคอนเทนต์ และติดต่อคุณผ่าน Claude หรือ ChatGPT"],
  ["Free apps for iPhone, iPad, Android and Windows, plus a web player. No box required.", "แอปฟรีสำหรับ iPhone, iPad, Android และ Windows พร้อมเครื่องเล่นผ่านเว็บ ไม่ต้องใช้กล่องเฉพาะ"],
  ["One Windows PC can run several zones at once.", "คอมพิวเตอร์ Windows หนึ่งเครื่องดูแลหลายโซนพร้อมกันได้"],
  ["With a multi-channel sound card, each zone gets its own output from a single machine.", "เมื่อใช้การ์ดเสียงหลายช่องสัญญาณ แต่ละโซนจะมีเอาต์พุตของตัวเองจากเครื่องเดียว"],
  ["For corporate partners", "สำหรับพันธมิตรองค์กร"],
  ["A completely hands-off experience.", "ให้ BMAsia ดูแลทั้งหมด"],
  ["Bespoke music design", "ออกแบบเพลงเฉพาะสำหรับแบรนด์"],
  ["A signature soundtrack crafted for your brand, zone by zone.", "ซาวด์แทร็กประจำแบรนด์ ออกแบบแยกทีละโซน"],
  ["24/7 support", "ซัพพอร์ต 24/7"],
  ["A dedicated account manager and round-the-clock technical support.", "ผู้จัดการบัญชีเฉพาะ พร้อมการสนับสนุนด้านเทคนิคตลอดเวลา"],
  ["Group-wide oversight and control", "ดูแลและควบคุมทุกสาขาในภาพรวม"],
  ["Brand-locked zones across properties, custom contracts, and invoicing.", "ล็อกเพลงตามมาตรฐานแบรนด์ได้ทุกสาขา พร้อมสัญญาและการออกใบแจ้งหนี้ที่ปรับให้เหมาะกับองค์กร"],
  ["Trust · engineering", "ความไว้วางใจ · วิศวกรรม"],
  ["Engineered to never", "ออกแบบมาให้เพลง"],
  ["go silent.", "ไม่เคยหยุด"],
  ["The player is built around one promise: the room never notices a problem.", "เราออกแบบเครื่องเล่นโดยยึดหลักง่าย ๆ ว่า ผู้ใช้บริการไม่ควรรู้สึกถึงปัญหาทางเทคนิคที่เกิดขึ้น"],
  ["True offline", "ทำงานออฟไลน์ได้เต็มรูปแบบ"],
  ["The full weekly schedule, automations, and prayer pauses keep running with no internet at all — and every play syncs back when the connection returns.", "ตารางทั้งสัปดาห์ ระบบอัตโนมัติ และการหยุดตามเวลาละหมาดทำงานต่อได้โดยไม่มีอินเทอร์เน็ต และประวัติการเล่นจะซิงก์กลับเมื่อเชื่อมต่ออีกครั้ง"],
  ["Self-healing players", "กู้คืนเครื่องเล่นอัตโนมัติ"],
  ["Watchdogs monitor every player and restart a stuck one automatically — before anyone in the room notices.", "ระบบเฝ้าระวังตรวจสอบทุกเครื่อง และรีสตาร์ตเครื่องที่ค้างอัตโนมัติก่อนคนในห้องจะสังเกตเห็น"],
  ["Announcement delivery receipts", "ยืนยันว่าประกาศเล่นสำเร็จ"],
  ["Every announcement reports back — “confirmed by 3 of 4 players” — so you know it actually played, everywhere it should.", "ทุกประกาศรายงานกลับ เช่น “ยืนยันแล้ว 3 จาก 4 เครื่อง” คุณจึงรู้ว่าข้อความเล่นจริงในทุกพื้นที่ที่กำหนด"],
  ["Licence proof, live", "ตรวจสอบสิทธิ์การใช้งานได้ทันที"],
  ["A live-verifiable licence certificate with a QR code — hand any inspector real-time proof, on the spot.", "ตรวจสอบใบอนุญาตผ่าน QR code ได้ทันที เมื่อต้องแสดงหลักฐานต่อผู้ตรวจสอบ"],
  ["Why Beat Breeze", "ทำไมต้อง Beat Breeze"],
  ["Everyone plays music. We do", "ทุกแพลตฟอร์มเล่นเพลงได้ ส่วนเรา"],
  ["the rest.", "ดูแลสิ่งที่เหลือ"],
  ["What matters", "สิ่งที่สำคัญ"],
  ["Typical competitor", "คู่แข่งทั่วไป"],
  ["Music per zone + auto-scheduling", "เพลงแยกโซน + ตารางอัตโนมัติ"],
  ["Keeps playing through outages", "เล่นต่อเมื่ออินเทอร์เน็ตขัดข้อง"],
  ["Sometimes", "บางครั้ง"],
  ["Make your own custom music (AI)", "สร้างเพลงเฉพาะของคุณเองด้วย AI"],
  ["Create social posts, posters, video", "สร้างโพสต์ โปสเตอร์ และวิดีโอ"],
  ["On-hold phone audio built in", "มีเสียงระหว่างรอสายในระบบ"],
  ["Branded TV channels + in-room", "TV Channels มีแบรนด์ + ในห้องพัก"],
  ["Rare", "พบได้น้อย"],
  ["One platform instead of five tools", "แพลตฟอร์มเดียวแทนเครื่องมือห้าชุด"],
  ["Everyone plays music. Beat Breeze runs your whole in-venue experience —", "ทุกแพลตฟอร์มเล่นเพลงได้ Beat Breeze ดูแลประสบการณ์ทั้งหมดภายในสถานที่ —"],
  ["and creates the content for it.", "และสร้างคอนเทนต์ให้ด้วย"],
  ["Pricing", "ราคา"],
  ["Everything included.", "รวมทุกอย่างแล้ว"],
  ["Two ways to run it.", "เลือกวิธีดูแลได้สองแบบ"],
  ["Self-serve", "ดูแลเอง"],
  ["/ zone / month", "/ โซน / เดือน"],
  ["฿399 · cancel anytime", "฿399 · ยกเลิกได้ทุกเมื่อ"],
  ["Everything included — music, automations, Compose, Content Studio, TV Channels, announcements", "รวมเพลง ระบบอัตโนมัติ Compose, Content Studio, TV Channels และประกาศทั้งหมด"],
  ["Set up yourself, straight from the app", "ตั้งค่าเองได้โดยตรงจากแอป"],
  ["14-day free trial — one zone, no card required", "ทดลองใช้ฟรี 14 วัน — หนึ่งโซน ไม่ต้องใช้บัตร"],
  ["Through BMAsia", "ให้ BMAsia ดูแล"],
  ["/ zone / year", "/ โซน / ปี"],
  ["Fully managed for you", "เราดูแลให้ทั้งหมด"],
  ["Everything in self-serve — plus ongoing bespoke music design for your brand", "รวมทุกอย่างในแบบดูแลเอง พร้อมการออกแบบเพลงเฉพาะแบรนด์อย่างต่อเนื่อง"],
  ["Technical support whenever you need it", "การสนับสนุนด้านเทคนิคเมื่อคุณต้องการ"],
  ["A dedicated account manager", "ผู้จัดการบัญชีเฉพาะ"],
  ["Enterprise", "องค์กร"],
  ["Custom contracts · invoicing by bank transfer or PromptPay · 24/7 support", "สัญญาเฉพาะ · ออกใบแจ้งหนี้ ชำระผ่านธนาคารหรือ PromptPay · ซัพพอร์ต 24/7"],
  ["No box required — runs on devices you already own.", "ไม่ต้องใช้กล่องเฉพาะ — ทำงานบนอุปกรณ์ที่คุณมีอยู่แล้ว"],
  ["Who's behind Beat Breeze", "ใครอยู่เบื้องหลัง Beat Breeze"],
  ["Software with", "เทคโนโลยีที่"],
  ["people behind it.", "ผู้เชี่ยวชาญดูแล"],
  ["Beat Breeze is built by BMAsia — a team that has designed music for venues since 2002 and operates globally today. The AI is trained by real music designers, and real humans answer when you need them.", "Beat Breeze พัฒนาโดย BMAsia ทีมที่ออกแบบเพลงให้ธุรกิจต่าง ๆ มาตั้งแต่ปี 2002 และให้บริการทั่วโลก AI เรียนรู้จากนักออกแบบเพลงมืออาชีพ และมีทีมผู้เชี่ยวชาญคอยดูแลตลอด 24 ชั่วโมง"],
  ["Since 2002", "ตั้งแต่ปี 2002"],
  ["Two decades of designing music for hotels, restaurants, retail and wellness.", "กว่าสองทศวรรษในการออกแบบเพลงให้โรงแรม ร้านอาหาร ร้านค้าปลีก และเวลเนส"],
  ["Musicians, not just engineers", "สร้างโดยนักดนตรีและวิศวกร"],
  ["The curation behind the platform comes from working music designers.", "นักออกแบบเพลงมืออาชีพมีส่วนกำหนดแนวทางการคัดสรรของแพลตฟอร์ม"],
  ["Humans on support, 24/7", "ทีมผู้เชี่ยวชาญดูแลตลอด 24 ชั่วโมง"],
  ["A real person answers — and the roadmap is driven by what operators ask for.", "ทีมงานพร้อมตอบคำถาม และแผนพัฒนาผลิตภัณฑ์ขับเคลื่อนจากความต้องการของผู้ดูแลสถานที่"],
  ["Try it today", "ลองใช้วันนี้"],
  ["The music you rely on.", "เพลงที่คุณไว้วางใจ"],
  ["Now doing", "วันนี้ทำได้"],
  ["far more than music.", "มากกว่าแค่เพลง"],
  ["Log in, choose and schedule your music in minutes — then try Compose, Content Studio, or Announcements.", "เข้าสู่ระบบ เลือกและตั้งเวลาเพลงได้ในไม่กี่นาที แล้วลองใช้ Compose, Content Studio หรือ Announcements"],
  ["Already included in your plan.", "รวมอยู่ในแผนของคุณแล้ว"],
  ["Talk to us&nbsp;&nbsp;→", "คุยกับเรา&nbsp;&nbsp;→"],
  ["Email", "อีเมล"],
  ["to get started, add zones, or see what's included in your plan.", "เพื่อเริ่มต้น เพิ่มโซน หรือสอบถามสิ่งที่รวมอยู่ในแผนของคุณ"],
]);

const THAI_FONT_CSS = `
/* Noto Thai fonts from google/fonts, licensed under the SIL Open Font License 1.1. */
@font-face {
  font-family: 'Noto Sans Thai';
  font-style: normal;
  font-weight: 100 900;
  font-stretch: 62.5% 100%;
  font-display: swap;
  src: url('./narration/beat-breeze-voice-preview-th/fonts/NotoSansThai-wdth-wght.ttf') format('truetype');
}
@font-face {
  font-family: 'Noto Serif Thai';
  font-style: normal;
  font-weight: 100 900;
  font-stretch: 62.5% 100%;
  font-display: swap;
  src: url('./narration/beat-breeze-voice-preview-th/fonts/NotoSerifThai-wdth-wght.ttf') format('truetype');
}
section {
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
}
`;

const normalizeNode = (value) => value.replace(/\s+/g, " ").trim();
const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const script = JSON.parse(readFileSync(SCRIPT_PATH, "utf8"));
if (
  script.deck !== "beat-breeze" ||
  script.presentation !== "beat-breeze-voice-preview-th" ||
  script.language !== "th" ||
  !Array.isArray(script.slides) ||
  script.slides.length !== 15
) {
  throw new Error("The Thai presenter script must contain all 15 Beat Breeze slides.");
}

const source = readFileSync(SOURCE_PATH, "utf8")
  .replace(ENGLISH_GUARD_SOURCE_PATTERN, "")
  .replace(MOTION_SCRIPT_PATTERN, "");
const templateMarker = '<script type="__bundler/template">';
const templateStart = source.indexOf(templateMarker) + templateMarker.length;
const templateEnd = source.indexOf("</script>", templateStart);
if (templateStart < templateMarker.length || templateEnd < templateStart) {
  throw new Error("The bundled Beat Breeze slide template could not be found.");
}

let template = JSON.parse(source.slice(templateStart, templateEnd).trim());
const sections = [
  ...template.matchAll(
    /<section\b[^>]*data-label="([^"]+)"[^>]*>[\s\S]*?<\/section>/g,
  ),
];
if (sections.length !== 15) {
  throw new Error(`Expected 15 Beat Breeze slides, found ${sections.length}.`);
}

let cursor = 0;
let translatedTemplate = "";
let translatedNodeCount = 0;
for (const [index, match] of sections.entries()) {
  const englishLabel = match[1];
  const thaiLabel = SLIDE_LABELS.get(englishLabel);
  const scriptSlide = script.slides[index];
  if (!thaiLabel || scriptSlide.label !== thaiLabel) {
    throw new Error(`Thai label mismatch on slide ${index + 1}: ${englishLabel}.`);
  }

  let section = match[0]
    .replace(`data-label="${englishLabel}"`, `data-label="${thaiLabel}"`)
    .replace(
      /data-speaker-notes="[^"]*"/,
      `data-speaker-notes="${escapeAttribute(scriptSlide.text)}"`,
    )
    .replace(
      "<section ",
      '<section class="slide" data-zone="slide" data-layout_box_budget="1920x1080-approved-layout-safe-nav-top-940" data-mechanical_layout_preflight="thai-font-and-copy-browser-check-required" ',
    );

  section = section.replace(/>([^<>]+)</g, (whole, rawNode) => {
    const normalized = normalizeNode(rawNode);
    const translated = COPY.get(normalized);
    if (translated === undefined) return whole;
    translatedNodeCount += 1;
    const leading = rawNode.match(/^\s*/)?.[0] || "";
    const trailing = rawNode.match(/\s*$/)?.[0] || "";
    return `>${leading}${translated}${trailing}<`;
  });

  // Expose the real title composition to the source-level layout guard. The
  // deck is bundled as a JSON string, so these markers are also mirrored into
  // the inert source template below for static inspection.
  const firstHeadingIndex = section.search(/<h[1-3]\b/i);
  if (firstHeadingIndex >= 0) {
    const titleContainerStarts = [
      ...section.slice(0, firstHeadingIndex).matchAll(/<div\b[^>]*>/gi),
    ];
    const titleContainer = titleContainerStarts.at(-1);
    if (titleContainer) {
      const at = titleContainer.index;
      section = `${section.slice(0, at)}${titleContainer[0].replace(
        /^<div\b/i,
        '<div data-zone="title"',
      )}${section.slice(at + titleContainer[0].length)}`;
    }
  }

  translatedTemplate += template.slice(cursor, match.index) + section;
  cursor = match.index + match[0].length;
}
translatedTemplate += template.slice(cursor);
template = translatedTemplate;

template = template
  .replace("<html>", '<html lang="th">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — ภาพรวมผลิตภัณฑ์ 2026</title>",
  )
  .replace("<style>", `<style>${THAI_FONT_CSS}`)
  .replaceAll("'DM Sans',sans-serif", "'DM Sans','Noto Sans Thai',sans-serif")
  .replaceAll("'Libre Caslon Text',serif", "'Libre Caslon Text','Noto Serif Thai',serif")
  .replaceAll("'Space Grotesk',monospace", "'Space Grotesk','Noto Sans Thai',sans-serif")
  .replaceAll("'DM Sans', sans-serif", "'DM Sans','Noto Sans Thai',sans-serif")
  .replaceAll("'Libre Caslon Text', serif", "'Libre Caslon Text','Noto Serif Thai',serif")
  .replaceAll("'Space Grotesk', monospace", "'Space Grotesk','Noto Sans Thai',sans-serif")
  .replaceAll("line-height: var(--lh-6xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-5xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-4xl)", "line-height: 1.08")
  .replaceAll("line-height: var(--lh-3xl)", "line-height: 1.08")
  .replaceAll("line-height:0.92", "line-height:1.02")
  .replace(/letter-spacing:\s*-?[\d.]+em/g, "letter-spacing:0");

const remainingText = sections.flatMap((_, index) => {
  const label = script.slides[index].label;
  const sectionMatch = new RegExp(
    `<section\\b[^>]*data-label="${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>([\\s\\S]*?)<\\/section>`,
  ).exec(template);
  return sectionMatch
    ? [...sectionMatch[1].matchAll(/>([^<>]+)</g)]
        .map((item) => normalizeNode(item[1]))
        .filter(Boolean)
    : [];
});
const allowedNonThai = new Set([
  "Beat",
  "Breeze",
  "Beat Breeze",
  "Compose",
  "Content Studio",
  "Content Studio · TV Channels",
  "TV Channels",
  "Daily Energy Curve",
  "EN",
  "JA",
  "TH",
  "2:41",
  "3:08",
  "2:55",
  "$12",
  "$260",
  "✓",
  "✕",
  "norbert@bmasiamusic.com",
  "beatbreeze.io →",
  "“Happy hour starts now — two-for-one at the bar.”",
  "「まもなくラストオーダーです。」",
  "“ขอบคุณที่โทรมา สักครู่นะคะ…”",
]);
const suspicious = remainingText.filter(
  (value) =>
    /[A-Za-z]{3,}/.test(value) &&
    !/[\u0E00-\u0E7F]/.test(value) &&
    !allowedNonThai.has(value),
);
if (suspicious.length) {
  throw new Error(
    `Untranslated English-only slide text remains:\n${[...new Set(suspicious)].join("\n")}`,
  );
}

let output = source
  .replace("<html>", '<html lang="th">')
  .replace(
    "<title>Beat Breeze — Product Overview 2026</title>",
    "<title>Beat Breeze — ภาพรวมผลิตภัณฑ์ 2026 (ภาษาไทย)</title>",
  )
  .replace("Unpacking...", "กำลังเตรียมงานนำเสนอ…")
  .replace("This page requires JavaScript to display.", "งานนำเสนอนี้ต้องใช้ JavaScript ในการแสดงผล")
  .replace(
    source.slice(templateStart, templateEnd),
    `\n${JSON.stringify(template).replaceAll("</script>", "<\\/script>")}\n  `,
  )
  .replace(
    '\n  <script src="./narration/beat-breeze-voice-preview/controller.js" defer></script>',
    "",
  )
  .replace(
    "\n</body>",
    `\n  <template id="beat-breeze-thai-layout-guard-source" aria-hidden="true">\n${[
      ...template.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g),
    ]
      .map((match) => match[0])
      .join("\n")}\n  </template>\n</body>`,
  )
  .replace(
    "\n</body>",
    `\n  <script src="./narration/beat-breeze-voice-preview-th/controller.js" defer></script>\n${MOTION_SCRIPT}\n</body>`,
  );

output = output.replace(/[ \t]+$/gm, "");

writeFileSync(OUTPUT_PATH, output);
if (existsSync(MANIFEST_PATH)) {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  manifest.source.officialDeckSha256 = createHash("sha256")
    .update(Buffer.from(output))
    .digest("hex");
  const pendingManifestPath = `${MANIFEST_PATH}.${process.pid}.tmp`;
  try {
    writeFileSync(pendingManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    renameSync(pendingManifestPath, MANIFEST_PATH);
  } finally {
    rmSync(pendingManifestPath, { force: true });
  }
}
console.log(
  `Thai presentation built: 15 slides, ${translatedNodeCount} localized text nodes, ${path.relative(REPO_ROOT, OUTPUT_PATH)}.`,
);
