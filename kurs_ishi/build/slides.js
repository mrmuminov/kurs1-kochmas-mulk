// Himoya taqdimoti: node slides.js  ->  kurs_ishi/taqdimot.pptx (10 slayd)

const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(`${process.env.PPTX_SKILL}/scripts/apply_theme.js`);

const PROJECT = path.resolve(__dirname, "../..");
const IMAGES = `${PROJECT}/kurs_ishi/rasmlar`;
const OUT = `${PROJECT}/kurs_ishi/taqdimot.pptx`;

const THEME = {
  name: "Kochmas mulk",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2B2A", lt1: "FFFFFF", dk2: "0F3D3E", lt2: "EAF1EF",
    accent1: "D9692A", accent2: "2A7F77", accent3: "8FB9B0", accent4: "B9893B", accent5: "5B6F6D", accent6: "A23E2A",
    hlink: "2A7F77", folHlink: "5B6F6D",
  },
};
const HEX = { dark: "0F3D3E", amber: "D9692A", teal: "2A7F77", mint: "8FB9B0", ink: "1B2B2A", card: "EAF1EF", grey: "5B6F6D" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Ko‘chmas mulk agentligi axborot tizimi";
const C = pres.SchemeColor;

pres.defineSlideMaster({
  title: "COVER", background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 1.1, w: 8.6, h: 1.9, fontSize: 34, bold: true, color: C.background1, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 3.3, w: 8.6, h: 1.4, fontSize: 18, color: C.background2, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CLOSING", background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.7, y: 0.7, w: 8.6, h: 0.9, fontSize: 36, bold: true, color: C.background1, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.7, y: 1.9, w: 8.6, h: 2.8, fontSize: 18, color: C.background2, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT", background: { color: C.background1 },
  slideNumber: { x: 9.1, y: 5.15, w: 0.5, h: 0.3, fontSize: 11, color: C.accent5, align: "right" },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 34, bold: true, color: C.text2, align: "left", valign: "middle", margin: 0 }, text: "" } },
  ],
});
pres.addSection({ title: "Himoya" });

const card = (slide, name, x, y, w, h) =>
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.background2 }, line: { color: C.background2 }, objectName: name });
const text = (slide, content, opts) => slide.addText(content, { isTextBox: true, margin: 0, ...opts });
const bullets = (items, size = 16, color = C.text1) =>
  items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, fontSize: size, color, paraSpaceAfter: 6 } }));

// 1. Sarlavha
{
  const s = pres.addSlide({ masterName: "COVER", sectionTitle: "Himoya" });
  s.addText("Ko‘chmas mulk agentligi faoliyatini avtomatlashtirish axborot tizimini loyihalash", { placeholder: "title" });
  s.addText([
    { text: "Kurs loyihasi, 13-mavzu", options: { breakLine: true } },
    { text: "Bajardi: ______________   Rahbar: ______________", options: { fontSize: 14 } },
  ], { placeholder: "body" });
  s.addNotes("Mavzu: ko‘chmas mulk agentligi faoliyatini avtomatlashtirish. Natija: ishlaydigan Flask + SQLite prototipi va hisobot.");
}

// 2. Dolzarblik
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Dolzarblik", { placeholder: "title" });
  const stats = [
    ["229,8 ming", "oldi-sotdi shartnomalari", "2025-yil yanvar–sentabr, +12,8 %"],
    ["110,1 ming", "oldi-sotdi shartnomalari", "2026-yil I chorak, +48,4 %"],
    ["5,7 trln", "so‘m ipoteka kreditlari", "2026-yil I chorak, +29 %"],
  ];
  stats.forEach(([big, label, caption], i) => {
    const x = 0.5 + i * 3.05;
    card(s, `Stat ${i + 1}`, x, 1.4, 2.9, 2.2);
    text(s, big, { x: x + 0.2, y: 1.6, w: 2.5, h: 0.7, fontSize: 32, bold: true, color: C.accent1, fontFace: "Cambria" });
    text(s, label, { x: x + 0.2, y: 2.45, w: 2.5, h: 0.4, fontSize: 16, bold: true, color: C.text1 });
    text(s, caption, { x: x + 0.2, y: 3.1, w: 2.5, h: 0.4, fontSize: 14, color: C.accent5 });
  });
  text(s, "Bitimlar ko‘payadi: qo‘lda hisob qiyinlashadi, xatolar ko‘payadi", { x: 0.5, y: 3.95, w: 9, h: 0.5, fontSize: 20, bold: true, color: C.text2 });
  text(s, "Manba: O‘zbekiston Respublikasi Markaziy banki, «Ko‘chmas mulk bozori tahlili» (2025 III chorak, 2026 I chorak). O‘zgarish o‘tgan yilning mos davriga nisbatan.",
    { x: 0.5, y: 4.7, w: 8.4, h: 0.5, fontSize: 11, color: C.accent5 });
  s.addNotes("Raqamlar hisobotning 1-jadvalidan. Tendensiya: bitimlar va ipoteka hajmi o‘sib bormoqda.");
}

// 3. Maqsad va vazifalar
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Maqsad va vazifalar", { placeholder: "title" });
  card(s, "Muammolar", 0.5, 1.4, 4.4, 3.5);
  text(s, "Qo‘lda yuritilgan hisobda", { x: 0.75, y: 1.6, w: 3.9, h: 0.4, fontSize: 20, bold: true, color: C.text2 });
  text(s, bullets(["Ma’lumot takrorlanadi va mos kelmaydi", "Sotilgan obyekt qayta taklif qilinadi", "Komissiya hisobida xato bo‘ladi", "Kirish va o‘chirish nazoratsiz"]),
    { x: 0.75, y: 2.15, w: 3.9, h: 2.5, valign: "top" });
  card(s, "Maqsad", 5.1, 1.4, 4.4, 3.5);
  text(s, "Maqsad", { x: 5.35, y: 1.6, w: 3.9, h: 0.4, fontSize: 20, bold: true, color: C.text2 });
  text(s, "Agentlik faoliyatini avtomatlashtiruvchi axborot tizimini loyihalash va ishlaydigan prototipini yaratish", { x: 5.35, y: 2.1, w: 3.9, h: 1.1, fontSize: 16, color: C.text1, valign: "top" });
  text(s, bullets(["Tahlil va talablar", "UML, ER va algoritmlar", "Flask + SQLite, login va rollar", "Sinov va o‘lchov"], 15),
    { x: 5.35, y: 3.25, w: 3.9, h: 1.5, valign: "top" });
  s.addNotes("Mavjud analoglar (e’lon portallari, davlat reyestri, CRM, daftar) agentlik ichki hisobini to‘liq yopmaydi; hisobotning 3-jadvali.");
}

// 4. Talablar va rollar
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Talablar va rollar", { placeholder: "title" });
  s.addImage({ path: `${IMAGES}/uml1.png`, x: 0.5, y: 1.3, w: 4.6, h: 3.69, altText: "Use case diagrammasi: agent va administrator" });
  const roles = [
    ["Agent", "Obyekt, mijoz va bitim: qo‘shish, tahrirlash, ko‘rish"],
    ["Administrator", "Agent huquqlari va obyekt hamda mijozni o‘chirish"],
    ["Tizim", "Komissiya 2 %, obyekt «sotilgan», bitimi borlar o‘chirilmaydi"],
  ];
  roles.forEach(([head, body], i) => {
    const y = 1.35 + i * 1.2;
    card(s, `Rol ${i + 1}`, 5.4, y, 4.1, 1.05);
    text(s, head, { x: 5.6, y: y + 0.1, w: 3.7, h: 0.35, fontSize: 18, bold: true, color: C.accent1 });
    text(s, body, { x: 5.6, y: y + 0.47, w: 3.7, h: 0.5, fontSize: 14, color: C.text1, valign: "top" });
  });
  text(s, "12 funksional va 7 nofunksional talab", { x: 5.4, y: 4.95, w: 4.1, h: 0.3, fontSize: 12, color: C.accent5 });
  s.addNotes("Use case diagrammasi 1-rasm. Rollar bo‘yicha ruxsatlar 7-jadvalda.");
}

// 5. Arxitektura va MB
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Arxitektura va ma’lumotlar bazasi", { placeholder: "title" });
  s.addImage({ path: `${IMAGES}/arch.png`, x: 0.5, y: 1.4, w: 4.4, h: 2.34, altText: "Tizim arxitekturasi: brauzer, Flask, SQLite" });
  s.addImage({ path: `${IMAGES}/er.png`, x: 5.1, y: 1.3, w: 4.4, h: 2.64, altText: "ER-diagramma: obyektlar, bitimlar, mijozlar, foydalanuvchilar" });
  text(s, "Monolit Flask ilovasi, 4 qatlam", { x: 0.5, y: 3.85, w: 4.4, h: 0.3, fontSize: 14, bold: true, color: C.text2 });
  text(s, "4 jadval: obyekt, mijoz, bitim, foydalanuvchi", { x: 5.1, y: 3.85, w: 4.4, h: 0.3, fontSize: 14, bold: true, color: C.text2 });
  card(s, "Texnologiyalar", 0.5, 4.3, 9, 0.7);
  text(s, "Python + Flask  ·  SQLite  ·  Jinja2  ·  Docker  ·  12 marshrut, bitta tashqi kutubxona (Flask)", { x: 0.7, y: 4.4, w: 8.6, h: 0.5, fontSize: 16, color: C.text1, valign: "middle" });
  s.addNotes("Tanlov asosi: oddiylik (KISS). Tashqi kalit cheklovlari bazada e’lon qilinmagan, yaxlitlik ilovada ta’minlanadi; bu rivojlantirish yo‘nalishi.");
}

// 6. Bitim algoritmi
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Bitim tuzish algoritmi", { placeholder: "title" });
  s.addImage({ path: `${IMAGES}/flow_deal.png`, x: 0.5, y: 1.3, w: 5.0, h: 3.41, altText: "Bitim tuzish blok-sxemasi" });
  card(s, "Formula", 5.8, 1.4, 3.7, 1.7);
  text(s, "K = N × 0,02", { x: 6.0, y: 1.55, w: 3.3, h: 0.7, fontSize: 32, bold: true, color: C.accent1, fontFace: "Cambria" });
  text(s, "56 000 $ bitim → komissiya 1 120 $", { x: 6.0, y: 2.35, w: 3.3, h: 0.6, fontSize: 16, color: C.text1, valign: "top" });
  text(s, bullets(["Obyekt sotuvda, mijoz xaridor", "Narx musbat butun son, sana bor", "Xato bo‘lsa hech narsa yozilmaydi"], 15),
    { x: 5.8, y: 3.35, w: 3.7, h: 1.6, valign: "top" });
  s.addNotes("Bitim formasi: obyekt, xaridor, narx, sana. Tekshiruvdan o‘tsa komissiya hisoblanadi, bitim yoziladi, obyekt sold=1 bo‘ladi.");
}

// 7. Ekran shakllari
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Ekran shakllari", { placeholder: "title" });
  s.addImage({ path: `${IMAGES}/properties_agent.png`, x: 0.5, y: 1.35, w: 4.4, h: 2.54, altText: "Obyektlar sahifasi, agent hisobi" });
  s.addImage({ path: `${IMAGES}/deals.png`, x: 5.1, y: 1.35, w: 4.4, h: 1.97, altText: "Bitimlar sahifasi" });
  text(s, "Agent: «O‘chirish» tugmalari ko‘rinmaydi", { x: 0.5, y: 4.0, w: 4.4, h: 0.5, fontSize: 14, bold: true, color: C.text2, valign: "top" });
  text(s, "Bitim tuzish, komissiya avtomatik", { x: 5.1, y: 3.45, w: 4.4, h: 0.5, fontSize: 14, bold: true, color: C.text2, valign: "top" });
  text(s, "Uch ekran bir xil tuzilmada: tepada forma, pastda jadval. Interfeys o‘zbek tilida.", { x: 5.1, y: 4.0, w: 4.4, h: 0.9, fontSize: 14, color: C.text1, valign: "top" });
  s.addNotes("Ekran shakllaridagi ma’lumotlar namuna sifatida kiritilgan.");
}

// 8. Xavfsizlik va sinov
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Xavfsizlik va sinov", { placeholder: "title" });
  card(s, "Test natijasi", 0.5, 1.4, 3.2, 3.5);
  text(s, "10 / 10", { x: 0.7, y: 1.6, w: 2.8, h: 0.9, fontSize: 48, bold: true, color: C.accent1, fontFace: "Cambria" });
  text(s, "avtomatik testlar o‘tdi", { x: 0.7, y: 2.55, w: 2.8, h: 0.4, fontSize: 16, bold: true, color: C.text1 });
  text(s, "Himoya olib tashlanganda test yiqildi. Agentning o‘chirish so‘rovi: 403.", { x: 0.7, y: 3.1, w: 2.8, h: 1.6, fontSize: 14, color: C.text1, valign: "top" });
  const rows = [
    ["A01", "Kirishni boshqarish", "Rollar, serverda tekshiruv"],
    ["A02", "Kriptografiya", "Parollar scrypt bilan heshlanadi"],
    ["A03", "In’ektsiya", "Parametrli SQL, Jinja2 ekranlash"],
    ["A07", "Autentifikatsiya", "Login, sessiya, umumiy xato xabari"],
  ];
  rows.forEach(([code, head, body], i) => {
    const y = 1.4 + i * 0.85;
    card(s, `OWASP ${code}`, 3.9, y, 5.6, 0.75);
    text(s, code, { x: 4.05, y, w: 0.7, h: 0.75, fontSize: 18, bold: true, color: C.accent1, valign: "middle" });
    text(s, head, { x: 4.8, y: y + 0.08, w: 4.5, h: 0.3, fontSize: 15, bold: true, color: C.text2 });
    text(s, body, { x: 4.8, y: y + 0.4, w: 4.5, h: 0.3, fontSize: 14, color: C.text1 });
  });
  text(s, "Cheklovlar: CSRF-token, urinishlar chegarasi va HTTPS hali yo‘q", { x: 3.9, y: 4.85, w: 5.6, h: 0.3, fontSize: 12, color: C.accent5 });
  s.addNotes("OWASP Top 10:2021 kategoriyalari. Cheklovlar hisobotda ochiq qayd etilgan.");
}

// 9. Samaradorlik
{
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Himoya" });
  s.addText("Samaradorlik", { placeholder: "title" });
  s.addChart(pres.charts.LINE, [
    { name: "Obyektlar", labels: ["100", "1 000", "10 000"], values: [9.1, 12.6, 55.3] },
    { name: "Mijozlar", labels: ["100", "1 000", "10 000"], values: [8.9, 11.5, 39.6] },
    { name: "Bitimlar", labels: ["100", "1 000", "10 000"], values: [9.1, 12.4, 42.0] },
    { name: "Bosh sahifa", labels: ["100", "1 000", "10 000"], values: [8.8, 8.3, 8.8] },
  ], {
    x: 0.5, y: 1.3, w: 5.7, h: 3.7, chartColors: [HEX.amber, HEX.teal, HEX.mint, HEX.grey], lineSize: 3, lineDataSymbolSize: 8,
    showLegend: true, legendPos: "b", legendFontSize: 12, legendColor: HEX.ink, legendFontFace: "+mn-lt",
    showTitle: true, title: "Javob vaqti medianasi, ms (yozuvlar soni)", titleFontSize: 13, titleColor: HEX.ink, titleFontFace: "+mn-lt",
    catAxisLabelColor: HEX.grey, valAxisLabelColor: HEX.grey, catAxisLabelFontSize: 12, valAxisLabelFontSize: 12,
    catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
    valGridLine: { color: "D5DEDC", size: 0.75 }, catGridLine: { style: "none" },
  });
  card(s, "Natija 1", 6.5, 1.4, 3.0, 1.55);
  text(s, "12,6 ms", { x: 6.7, y: 1.5, w: 2.6, h: 0.7, fontSize: 32, bold: true, color: C.accent1, fontFace: "Cambria" });
  text(s, "eng sekin sahifa, 1 000 yozuvda (talab: < 100 ms)", { x: 6.7, y: 2.2, w: 2.6, h: 0.7, fontSize: 14, color: C.text1, valign: "top" });
  card(s, "Natija 2", 6.5, 3.15, 3.0, 1.75);
  text(s, "3,6 MB", { x: 6.7, y: 3.25, w: 2.6, h: 0.7, fontSize: 32, bold: true, color: C.accent6, fontFace: "Cambria" });
  text(s, "sahifa hajmi 10 000 yozuvda: sahifalash kerak", { x: 6.7, y: 3.95, w: 2.6, h: 0.8, fontSize: 14, color: C.text1, valign: "top" });
  s.addNotes("O‘lchov: lokal, Flask ichki serveri, har sahifaga 50 so‘rov, Python 3.14.7, Flask 3.1.3, SQLite 3.53.1. Brauzerda chizish vaqti hisobga olinmagan.");
}

// 10. Xulosa
{
  const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Himoya" });
  s.addText("Xulosa", { placeholder: "title" });
  s.addText([
    { text: "Ishlaydigan tizim: 12 marshrut, login va 2 rol, 10 test", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "1 000 yozuvgacha javob 15 ms dan kam", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Keyingi qadam: qidiruv, sahifalash, CSRF, foydalanuvchilarni boshqarish", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "E’tiboringiz uchun rahmat!", options: { bold: true, color: "D9692A", fontSize: 22 } },
  ], { placeholder: "body" });
  s.addNotes("Qo‘lda ishlashga nisbatan vaqt tejalishi o‘lchanmagan: sinov ekspluatatsiyasida aniqlanadi.");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("yozildi:", OUT);
})();
