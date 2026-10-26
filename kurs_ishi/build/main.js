// Kurs ishini yig'adi: node main.js  ->  kurs_ishi/kurs_ishi.docx
// Mundarijadagi sahifa raqamlari birinchi yig'ishdan keyin PDF'dan olinadi va ikkinchi yig'ishda joylanadi.

const fs = require("fs");
const { execFileSync } = require("child_process");
const { Builder } = require("./lib");

const PROJECT = require("path").resolve(__dirname, "../..");
const OUT = `${PROJECT}/kurs_ishi`;
const DOCX = `${OUT}/kurs_ishi.docx`;
const WORK = process.env.WORK_DIR || "/tmp/kurs_build";
const ACCESS_DATE = "26.10.2026";

const read = (name) => fs.readFileSync(`${PROJECT}/${name}`, "utf8").replace(/\n$/, "").split("\n");

function sourceStats() {
  const app = read("app.py");
  const start = app.findIndex((line) => line.startsWith('PAGE = r"""'));
  const end = app.findIndex((line, index) => index > start && line === '"""');
  return { app, start, end, templateLines: end - start + 1 };
}

function context() {
  const { app, templateLines } = sourceStats();
  const tests = read("test_app.py");
  return {
    tests: tests.filter((line) => line.trim().startsWith("def test_")).length,
    pythonVersion: "3.14.7", flaskVersion: "3.1.3", sqliteVersion: "3.53.1", testTime: "2,4",
    appLines: app.length, templateLines, cssLines: read("style.css").length, testLines: tests.length,
    sources: 20, appendices: 4,
  };
}

const sources = {
  "Qonunlar": [
    `O‘zbekiston Respublikasining Fuqarolik kodeksi (birinchi qism): 1995-yil 21-dekabrda qabul qilingan. – URL: https://lex.uz/docs/111181 (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasining «Shaxsga doir ma’lumotlar to‘g‘risida»gi Qonuni: 2019-yil 2-iyul, O‘RQ-547-son. – URL: https://lex.uz/docs/-4396419 (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasining «Kiberxavfsizlik to‘g‘risida»gi Qonuni: 2022-yil 15-aprel, O‘RQ-764-son. – URL: https://lex.uz/uz/docs/5960604 (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasining «Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risida»gi Qonuni: 2022-yil 28-noyabr, O‘RQ-803-son. – URL: https://lex.uz/acts/-6297080 (murojaat qilingan sana: ${ACCESS_DATE}).`,
  ],
  "Prezident farmonlari va hukumat qarorlari": [
    `O‘zbekiston Respublikasi Prezidentining 2020-yil 5-oktabrdagi PF-6079-son Farmoni: «Raqamli O‘zbekiston — 2030» strategiyasini tasdiqlash va uni samarali amalga oshirish chora-tadbirlari to‘g‘risida. – URL: https://lex.uz/docs/5031048 (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasi Prezidentining 2025-yil 5-martdagi PF-43-son Farmoni: Ko‘chmas mulkni ommaviy baholash tizimini joriy etish to‘g‘risida. – URL: https://lex.uz/docs/-7417774 (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasi Vazirlar Mahkamasining 2023-yil 25-avgustdagi 424-son qarori: «Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risida»gi Qonun qabul qilinganligi munosabati bilan Vazirlar Mahkamasining ayrim qarorlariga o‘zgartirish va qo‘shimchalar kiritish haqida. – URL: https://lex.uz/acts/-6583937 (murojaat qilingan sana: ${ACCESS_DATE}).`,
  ],
  "Ilmiy adabiyotlar, darsliklar": [
    `Date C.J. An Introduction to Database Systems. 8th ed. – Boston: Pearson Addison-Wesley, 2003. – 1024 p.`,
    `Fowler M. UML Distilled: A Brief Guide to the Standard Object Modeling Language. 3rd ed. – Boston: Addison-Wesley, 2003. – 208 p.`,
    `Grinberg M. Flask Web Development: Developing Web Applications with Python. 2nd ed. – Sebastopol: O’Reilly Media, 2018. – 316 p.`,
    `Martin R.C. Clean Architecture: A Craftsman’s Guide to Software Structure and Design. – Boston: Prentice Hall, 2017. – 432 p.`,
    `Silberschatz A., Korth H.F., Sudarshan S. Database System Concepts. 7th ed. – New York: McGraw-Hill, 2019. – 1376 p.`,
    `Sommerville I. Software Engineering. 10th ed. – Harlow: Pearson, 2015. – 816 p.`,
  ],
  "Yo‘riqnomalar, texnik hujjatlar, standartlar": [
    `ISO/IEC 25010:2011. Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models. – Geneva: ISO, 2011.`,
    `ГОСТ 19.201-78. Единая система программной документации. Техническое задание. Требования к содержанию и оформлению. – М.: Изд-во стандартов, 1978.`,
  ],
  "Internet saytlari": [
    `Flask Documentation (3.1.x). – URL: https://flask.palletsprojects.com/ (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `SQLite Documentation. – URL: https://www.sqlite.org/docs.html (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `OWASP Top 10:2021. – URL: https://owasp.org/Top10/ (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasi Markaziy banki. Ko‘chmas mulk bozori tahlili (2025-yil III chorak): press-reliz, 2025-yil 19-dekabr. – URL: https://cbu.uz/uz/press_center/releases/3181427/ (murojaat qilingan sana: ${ACCESS_DATE}).`,
    `O‘zbekiston Respublikasi Markaziy banki. Ko‘chmas mulk bozori tahlili (2026-yil I chorak): press-reliz, 2026-yil 6-iyul. – URL: https://cbu.uz/uz/press_center/releases/4116346/ (murojaat qilingan sana: ${ACCESS_DATE}).`,
  ],
};

function conclusion(b) {
  b.h1("XULOSA");
  b.p(`Kurs loyihasida ko‘chmas mulk agentligi faoliyatini avtomatlashtiruvchi axborot tizimi loyihalandi va uning ishlaydigan prototipi yaratildi. Soha tahlili agentlikning ichki hisobi (obyekt, mijoz, bitim va komissiya) uchun mavjud yechimlar orasida sodda va arzon variant yetishmasligini ko‘rsatdi. Shu asosda Flask va SQLite texnologiyalari tanlandi: bu juftlik o‘rnatish va qo‘llab-quvvatlashni minimal darajaga tushiradi.`);
  b.p(`Loyiha jarayonida 12 ta funksional va 7 ta nofunksional talab shakllantirildi, ikki foydalanuvchi roli (agent va administrator) aniqlandi, use case, sinflar va ketma-ketlik diagrammalari, to‘rt jadvalli ma’lumotlar bazasi modeli, bitim tuzish va ruxsat berish algoritmlari ishlab chiqildi. Tizim 12 ta marshrutli veb-ilova sifatida amalga oshirildi, unga login, rollarga ajratish va parollarni heshlash qo‘shildi. Bitimlar bo‘yicha komissiya avtomatik hisoblanadi, sotilgan obyekt qayta sotilmaydi, bitimi bor yozuv esa o‘chirilmaydi.`);
  b.p(`Tizim sinovdan o‘tkazildi: 10 ta avtomatik test barchasi muvaffaqiyatli o‘tdi, o‘chirish himoyasi buzilganda test buni aniqladi. O‘lchovlar 1 000 ta obyekt va mijozda har bir sahifa javobi 15 ms dan kam vaqtda berilishini, 10 000 yozuvda ham 70 ms dan oshmasligini ko‘rsatdi. Bu qo‘yilgan nofunksional talabdan (100 ms) yaxshi natijadir. Shu bilan birga ro‘yxatlarda sahifalash yo‘qligi sababli 10 000 yozuvda sahifa hajmi 3,6 MB ga yetishi aniqlandi.`);
  b.p(`Loyihaning amaliy ahamiyati shundaki, kichik ko‘chmas mulk agentligi uni qo‘shimcha dasturiy va texnik xarajatlarsiz, bitta kompyuterda yoki Docker konteynerida ishga tushirishi mumkin. Tizim qo‘lda yuritiladigan hisobdagi asosiy muammolarni, ya’ni takroriy yozuvlar, komissiyani hisoblashdagi xatolar, obyektni qayta sotish va ma’lumotni nazoratsiz o‘chirishni bartaraf etadi. Qo‘lda ishlashga nisbatan vaqt tejalishi bu loyiha doirasida o‘lchanmagan, uni sinov ekspluatatsiyasida aniqlash rejalashtiriladi.`);
  b.p(`Muallif tomonidan loyihani rivojlantirish bo‘yicha quyidagi takliflar beriladi: birinchidan, ro‘yxatlarga qidiruv, filtr va sahifalash qo‘shish; ikkinchidan, xavfsizlikni kuchaytirish uchun CSRF himoyasi, noto‘g‘ri kirish urinishlarini cheklash, parolni o‘zgartirish va foydalanuvchilarni boshqarish interfeysini joriy etish, boshlang‘ich parollarni almashtirish; uchinchidan, ma’lumotlar bazasida FOREIGN KEY cheklovlarini e’lon qilish; to‘rtinchidan, komissiya foizini sozlanadigan qilish va bitimlar bo‘yicha hisobotni faylga chiqarish; beshinchidan, tizimni haqiqiy muhitda ishlab chiqarish serveri va HTTPS bilan joylashtirish hamda shaxsga doir ma’lumotlar to‘g‘risidagi qonun talablariga muvofiqligini huquqiy jihatdan tekshirish. Agentlik hajmi o‘sib, bir vaqtda ko‘p xodim intensiv yozadigan bo‘lsa, SQLite ni server MBBTga almashtirish tavsiya etiladi.`);
}

function bibliography(b) {
  b.h1("FOYDALANILGAN ADABIYOTLAR RO‘YXATI");
  let number = 0;
  for (const [group, items] of Object.entries(sources)) {
    b.subtitle(group);
    for (const text of items) { number += 1; b.item(number, text); }
  }
  if (number !== 20) throw new Error(`Manbalar soni ${number}, kerak 20`);
}

function appendices(b) {
  const { app, start, end } = sourceStats();
  b.h1("ILOVALAR");
  b.p(`Ilovalarga dastur matni (1-ilova), ma’lumotlar bazasi sxemasi (2-ilova), avtomatik testlar matni (3-ilova) hamda qo‘shimcha ekran shakllari (4-ilova) kiritilgan. Ularning har biriga asosiy matnda havola berilgan.`);

  const code = [...app.slice(0, start), 'PAGE = r"""', "... HTML shabloni bu yerda qisqartirildi: u sahifalarning ko‘rinishini belgilaydi ...", '"""', ...app.slice(end + 1)];
  b.appendix("1-ILOVA", "Dastur matni (app.py)");
  b.code(code);

  const schemaStart = app.findIndex((line) => line.includes('db.executescript("""'));
  const schemaEnd = app.findIndex((line, index) => index > schemaStart && line.includes('""")'));
  const schema = app.slice(schemaStart + 1, schemaEnd).map((line) => line.replace(/^ {8}/, ""));
  b.appendix("2-ILOVA", "Ma’lumotlar bazasi sxemasi (SQL)");
  b.code(schema);

  b.appendix("3-ILOVA", "Avtomatik testlar matni (test_app.py)");
  b.code(read("test_app.py"));

  b.appendix("4-ILOVA", "Qo‘shimcha ekran shakllari");
  b.figure("clients.png", "«Mijozlar» sahifasi (administrator hisobi)", 15, 11);
  b.figure("property_edit.png", "Obyektni tahrirlash holati (forma tanlangan obyekt ma’lumotlari bilan to‘ldirilgan)", 15, 11);
}

function build(ctx) {
  const b = new Builder(`${OUT}/rasmlar`);
  b.plainTitle("MUNDARIJA");
  b.tocPlaceholder();
  require("./introduction")(b, ctx);
  require("./chapter1")(b, ctx);
  require("./chapter2")(b, ctx);
  require("./chapter3")(b, ctx);
  conclusion(b);
  bibliography(b);
  appendices(b);
  return b;
}

function toPdf(docx, folder) {
  execFileSync("soffice", ["--headless", "--convert-to", "pdf", "--outdir", folder, docx], { stdio: "ignore" });
  return docx.replace(/^.*\//, "").replace(/\.docx$/, ".pdf");
}

function headingPages(headings, pdf) {
  const text = execFileSync("pdftotext", ["-layout", pdf, "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
  const pages = text.split("\f").map((page) => page.replace(/\s+/g, " "));
  const result = [];
  let from = 1; // 0-sahifa: mundarija
  for (const heading of headings) {
    const key = heading.text.replace(/\s+/g, " ").slice(0, 28);
    let found = -1;
    for (let index = from; index < pages.length; index++) {
      if (pages[index].includes(key)) { found = index; break; }
    }
    if (found < 0) throw new Error(`Sarlavha topilmadi: ${heading.text}`);
    result.push(found + 1); // PDF sahifa indeksi + 1 = bosilgan raqam (raqamlash 2 dan boshlanadi)
    from = found;
  }
  return { result, total: pages.filter((page) => page.trim()).length };
}

(async () => {
  fs.mkdirSync(WORK, { recursive: true });
  // 1-o'tish: rasm va jadval sonini aniqlash
  const base = context();
  const counts = build(base);
  const ctx = { ...base, figures: counts.figureCount, tables: counts.tableCount };
  // 2-o'tish: sahifa raqamlarini aniqlash
  const first = build(ctx);
  const draft = `${WORK}/draft.docx`;
  await first.save(draft, null);
  const pdfName = toPdf(draft, WORK);
  const { result: pageNumbers, total } = headingPages(first.headings, `${WORK}/${pdfName}`);
  // 3-o'tish: yakuniy hujjat
  const final = build(ctx);
  await final.save(DOCX, pageNumbers);
  fs.copyFileSync(DOCX, `${WORK}/final.docx`);
  toPdf(`${WORK}/final.docx`, WORK);
  const check = headingPages(final.headings, `${WORK}/final.pdf`);
  const same = JSON.stringify(check.result) === JSON.stringify(pageNumbers);
  console.log(JSON.stringify({ figures: ctx.figures, tables: ctx.tables, pdfPages: total, tocStable: same,
    headings: final.headings.map((h, i) => `${pageNumbers[i]}\t${h.text}`) }, null, 1));
})();
