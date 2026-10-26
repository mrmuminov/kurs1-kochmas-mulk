// II BOB. LOYIHA QISM

module.exports = (b) => {
  b.h1("II BOB. LOYIHA QISM");

  // ---------------- 2.1 ----------------
  b.h2("2.1. Tizim talablari, foydalanuvchi rollari va foydalanish variantlari");

  b.p(`Talablar texnik topshiriq tuzilmasiga [15] muvofiq funksional va nofunksional guruhlarga ajratildi. Funksional talablar tizim nima qilishi kerakligini, nofunksional talablar esa uning qanday sifatda ishlashini belgilaydi. Funksional talablar 5-jadvalda keltirilgan.`);

  b.table("Tizimning funksional talablari",
    ["Kod", "Talab", "Bajaruvchi"],
    [
      ["F1", "Login va parol bilan tizimga kirish", "Agent, administrator"],
      ["F2", "Tizimdan chiqish", "Agent, administrator"],
      ["F3", "Obyektni qo‘shish va tahrirlash (manzil, tur, xonalar soni, maydon, narx)", "Agent, administrator"],
      ["F4", "Mijozni qo‘shish va tahrirlash (F.I.Sh., telefon, rol: sotuvchi yoki xaridor)", "Agent, administrator"],
      ["F5", "Bitim tuzish: faqat sotuvdagi obyekt va xaridor mijoz uchun", "Agent, administrator"],
      ["F6", "Komissiyani bitim narxining 2 foizi sifatida avtomatik hisoblash", "Tizim"],
      ["F7", "Bitim tuzilganda obyektni «sotilgan» deb belgilash", "Tizim"],
      ["F8", "Obyekt va mijozni o‘chirish", "Administrator"],
      ["F9", "Bitimi bor obyekt va mijozni o‘chirishga yo‘l qo‘ymaslik", "Tizim"],
      ["F10", "Bosh sahifada statistika: obyektlar, sotuvdagilar, mijozlar va bitimlar soni, jami daromad", "Agent, administrator"],
      ["F11", "Bitimlar ro‘yxatini ko‘rish (so‘nggi bitimlar tepada)", "Agent, administrator"],
      ["F12", "Kiritilgan ma’lumotlarni tekshirish: bo‘sh maydon, musbat butun son, ro‘yxatdagi qiymat", "Tizim"],
    ],
    [800, 6000, 2554]);

  b.p(`Nofunksional talablar 6-jadvalda berilgan. Ularning bir qismi o‘lchanadigan ko‘rsatkich ko‘rinishida ifodalangan va III bobda tekshiriladi.`);

  b.table("Tizimning nofunksional talablari",
    ["Kod", "Talab", "Tekshirish usuli"],
    [
      ["N1", "Ishlash: 1000 tagacha obyekt va mijozda sahifa javobi 100 ms dan kam bo‘lishi", "So‘rov vaqti o‘lchovi (3.3)"],
      ["N2", "Xavfsizlik: parollar heshlangan holda saqlanadi, o‘chirish huquqi serverda tekshiriladi", "Avtomatik testlar (3.2)"],
      ["N3", "Oddiylik: ilova bitta Python faylidan iborat, tashqi kutubxona faqat Flask", "Kod tahlili"],
      ["N4", "Ko‘chirib o‘tkazuvchanlik: Windows, Linux va Docker muhitida ishlashi", "Ishga tushirish (3.1)"],
      ["N5", "Ma’lumotlarni saqlash: bitta fayl, zaxira nusxa fayl nusxalash bilan olinadi", "Yo‘riqnoma"],
      ["N6", "Til: interfeys va xabarlar o‘zbek tilida", "Ekran shakllari (3.1)"],
      ["N7", "Tekshiriluvchanlik: asosiy xatti-harakatlar avtomatik testlar bilan qoplangan", "Test natijalari (3.2)"],
    ],
    [800, 5400, 3154]);

  b.p(`Tizimda ikkita foydalanuvchi roli belgilangan: agent va administrator. Agent kundalik ishni bajaradi: obyekt, mijoz va bitim bilan ishlaydi. Administrator agentning barcha huquqlariga ega va qo‘shimcha ravishda obyekt hamda mijozni o‘chira oladi. Rollar bo‘yicha ruxsatlar 7-jadvalda keltirilgan. Bitimni o‘zgartirish yoki o‘chirish funksiyasi umuman mavjud emas: bitim tuzilgandan keyin u hisobot hujjati sifatida o‘zgarmaydi, bu daromad hisobining ishonchliligini ta’minlaydi.`);

  b.table("Rollar bo‘yicha ruxsatlar",
    ["Amal", "Agent", "Administrator"],
    [
      ["Tizimga kirish va chiqish", "Ha", "Ha"],
      ["Statistikani va ro‘yxatlarni ko‘rish", "Ha", "Ha"],
      ["Obyekt va mijozni qo‘shish, tahrirlash", "Ha", "Ha"],
      ["Bitim tuzish", "Ha", "Ha"],
      ["Obyekt va mijozni o‘chirish (bitimi bo‘lmasa)", "Yo‘q", "Ha"],
      ["Bitimni o‘zgartirish yoki o‘chirish", "Yo‘q", "Yo‘q"],
    ],
    [5354, 2000, 2000]);

  b.p(`Foydalanish variantlari 1-rasmdagi use case diagrammasida ko‘rsatilgan. Tizim chegarasi ichida yettita asosiy variant joylashgan. «Obyektni o‘chirish» va «Mijozni o‘chirish» variantlari «Bitimi borligini tekshirish» variantini o‘z ichiga oladi («include» bog‘lanishi). Xuddi shunday, «Bitim tuzish» varianti «Komissiyani hisoblash» va «Obyektni sotilgan qilish» variantlarini o‘z ichiga oladi. Administrator barcha variantlarga, agent esa o‘chirish variantlaridan tashqari qolganlariga ulangan. Tizimga kirish barcha variantlar uchun old shart hisoblanadi va diagrammada alohida ko‘rsatilmagan.`);

  b.figure("uml1.png", "Foydalanish variantlari diagrammasi (use case)", 15.5, 15);

  // ---------------- 2.2 ----------------
  b.h2("2.2. Ma’lumotlar bazasi modeli va algoritmlar");

  b.p(`Ma’lumotlar bazasi to‘rtta jadvaldan iborat (2-rasm). Uchta jadval domen tushunchalariga mos keladi: properties (obyektlar), clients (mijozlar) va deals (bitimlar). To‘rtinchi jadval users (foydalanuvchilar) tizimga kirishni boshqaradi va boshqa jadvallar bilan bog‘lanmaydi. Bitim jadvali obyekt va mijoz jadvallari bilan «bir-ko‘pga» munosabatida bog‘langan: jadval darajasida bitta obyekt yoki bitta mijozga bir nechta bitim yozuvi tegishli bo‘lishi mumkin. Amalda esa bitta obyekt faqat bir marta sotiladi, chunki sotilgan obyekt bitim formasida ko‘rsatilmaydi va ilova uni qayta sotishga yo‘l qo‘ymaydi.`);

  b.figure("er.png", "Ma’lumotlar bazasining ER-diagrammasi", 15.5, 12);

  b.p(`Jadvallar tuzilmasi 8-jadvalda keltirilgan. Maydon turlari SQLite ning tur tizimiga mos tanlangan. Sana ISO 8601 formatida (YYYY-MM-DD) matn sifatida saqlanadi, bu tartiblash va taqqoslashni osonlashtiradi. Pul qiymatlari AQSh dollarida saqlanadi.`);

  b.table("Ma’lumotlar bazasi jadvallari tuzilmasi",
    ["Jadval", "Maydon", "Turi", "Cheklov va izoh"],
    [
      ["properties", "id", "INTEGER", "Birlamchi kalit, avtomatik ortadi"],
      ["", "address", "TEXT", "NOT NULL. Obyekt manzili"],
      ["", "type", "TEXT", "NOT NULL. Kvartira, Uy, Yer uchastkasi, Ofis"],
      ["", "rooms", "INTEGER", "Standart qiymat 0. Xonalar soni"],
      ["", "area", "REAL", "NOT NULL. Maydon, m²"],
      ["", "price", "REAL", "NOT NULL. Narx, $"],
      ["", "sold", "INTEGER", "Standart qiymat 0. 0 — sotuvda, 1 — sotilgan"],
      ["clients", "id", "INTEGER", "Birlamchi kalit"],
      ["", "name", "TEXT", "NOT NULL. F.I.Sh."],
      ["", "phone", "TEXT", "NOT NULL. Telefon raqami"],
      ["", "role", "TEXT", "NOT NULL. Sotuvchi yoki Xaridor"],
      ["deals", "id", "INTEGER", "Birlamchi kalit"],
      ["", "property_id", "INTEGER", "NOT NULL. Obyektga havola"],
      ["", "client_id", "INTEGER", "NOT NULL. Xaridor mijozga havola"],
      ["", "price", "REAL", "NOT NULL. Kelishilgan narx, $"],
      ["", "commission", "REAL", "NOT NULL. Komissiya, $ (narxning 2 foizi)"],
      ["", "deal_date", "TEXT", "NOT NULL. Bitim sanasi"],
      ["users", "id", "INTEGER", "Birlamchi kalit"],
      ["", "login", "TEXT", "NOT NULL, UNIQUE. Foydalanuvchi logini"],
      ["", "password_hash", "TEXT", "NOT NULL. Parolning heshi (scrypt)"],
      ["", "role", "TEXT", "NOT NULL. admin yoki agent"],
    ],
    [1500, 1900, 1400, 4554]);

  b.p(`Model uchinchi normal shaklga yaqin: har bir jadvaldagi ustun faqat shu jadvalning birlamchi kalitiga bog‘liq. Bitim jadvalidagi narx obyekt jadvalidagi narx bilan takrorlanmaydi: birinchisi bitimda kelishilgan narx, ikkinchisi esa obyektning e’lon qilingan narxi, ular bir-biridan farq qilishi mumkin. Komissiya narxdan hisoblanadigan qiymat bo‘lsa-da, bitim jadvalida saqlanadi. Bu ongli qaror: komissiya foizi keyinchalik o‘zgartirilsa ham, ilgari tuzilgan bitimlarning daromadi o‘zgarmaydi.`);

  b.p(`Jadvallar orasidagi mantiqiy tashqi kalitlar (property_id, client_id) SQLite darajasida FOREIGN KEY cheklovi bilan e’lon qilinmagan. Ma’lumotlar yaxlitligi ilova darajasida ta’minlanadi: bitim faqat mavjud sotuvdagi obyekt va mavjud xaridor mijoz uchun yoziladi, bitimi bor obyekt va mijoz esa o‘chirilmaydi. Bu qaror ilovani soddalashtiradi, ammo yaxlitlikni to‘g‘ridan-to‘g‘ri bazaga o‘tkazish tizimning keyingi takomillashtirish yo‘nalishlaridan biri sifatida III bobda qayd etilgan.`);

  b.p(`Ilovaning asosiy so‘rovlari 9-jadvalda keltirilgan. Foydalanuvchi kiritgan qiymatlar so‘rov matniga qo‘shilmaydi, balki «?» belgisi orqali parametr sifatida uzatiladi, shu tufayli SQL-in’ektsiya xavfi yo‘qoladi. Bitimlar ro‘yxati so‘rovida LEFT JOIN ishlatilgan: bu bitim yozuvini unga bog‘langan obyekt yoki mijoz topilmagan taqdirda ham ko‘rsatishga imkon beradi.`);

  b.table("Ilovaning asosiy SQL so‘rovlari",
    ["Vazifasi", "SQL so‘rovi (qisqartirilgan)"],
    [
      ["Obyektlar soni (bosh sahifa)", "SELECT COUNT(*) FROM properties"],
      ["Sotuvdagi obyektlar soni", "SELECT COUNT(*) FROM properties WHERE sold = 0"],
      ["Jami daromad", "SELECT SUM(commission) FROM deals"],
      ["Bitimlar ro‘yxati", "SELECT deals.*, properties.address, clients.name FROM deals LEFT JOIN properties ... LEFT JOIN clients ... ORDER BY deals.id DESC"],
      ["Bitim uchun obyektni tekshirish", "SELECT * FROM properties WHERE id = ? AND sold = 0"],
      ["Bitim uchun xaridorni tekshirish", "SELECT * FROM clients WHERE id = ? AND role = 'Xaridor'"],
      ["Obyektni sotilgan qilish", "UPDATE properties SET sold = 1 WHERE id = ?"],
      ["O‘chirishdan oldin bitimni tekshirish", "SELECT COUNT(*) FROM deals WHERE property_id = ?"],
      ["Kirishda foydalanuvchini topish", "SELECT * FROM users WHERE login = ?"],
    ],
    [3000, 6354]);

  b.p(`Tizimning asosiy biznes-algoritmi — bitim tuzish. Uning blok-sxemasi 3-rasmda berilgan. Algoritm forma ma’lumotlarini oladi va bir vaqtning o‘zida quyidagilarni tekshiradi: tanlangan obyekt mavjud va sotuvda ekanligi, tanlangan mijoz mavjud va xaridor ekanligi, narx musbat butun son va sana kiritilganligi. Tekshiruvdan o‘tmasa, hech narsa yozilmaydi va forma qayta ochiladi. O‘tsa, komissiya K = N × 0,02 formulasi bo‘yicha hisoblanadi (N — kelishilgan narx), bitim jadvalga yoziladi va obyektning sold maydoni 1 ga o‘zgartiriladi. Misol uchun, N = 56 000 $ bo‘lganda K = 1 120 $ ga teng. Agentlikning jami daromadi barcha bitimlar komissiyalari yig‘indisi sifatida hisoblanadi: D = ΣKᵢ.`);

  b.figure("flow_deal.png", "Bitim tuzish algoritmining blok-sxemasi", 13, 15);

  b.p(`Ikkinchi muhim algoritm — so‘rovga ruxsat berish (4-rasm). Har bir so‘rov dastlab sessiyada login borligi bo‘yicha tekshiriladi, yo‘q bo‘lsa foydalanuvchi kirish sahifasiga yo‘naltiriladi. O‘chirish so‘rovlari uchun qo‘shimcha ravishda rol tekshiriladi: administrator bo‘lmasa, so‘rov 403 («ruxsat yo‘q») xatosi bilan to‘xtatiladi. Administrator uchun esa obyekt yoki mijozning bitimi borligi tekshiriladi va faqat bitim bo‘lmaganda yozuv o‘chiriladi. Rol tekshiruvi serverda bajarilgani sababli, o‘chirish tugmasi interfeysda yashirilgan bo‘lsa ham, so‘rovni qo‘lda yuborish urinishi foyda bermaydi.`);

  b.figure("flow_access.png", "So‘rovga ruxsat berish algoritmining blok-sxemasi", 12.5, 15);

  // ---------------- 2.3 ----------------
  b.h2("2.3. Dasturiy arxitektura, UML diagrammalari va interfeys loyihasi");

  b.p(`Tizim monolit veb-ilova sifatida qurilgan va to‘rtta mantiqiy qatlamdan iborat (5-rasm). Birinchi qatlam — kirish tekshiruvi: har bir so‘rovdan oldin ishga tushadigan funksiya (before_request) sessiyani tekshiradi. Ikkinchi qatlam — marshrutlar: har bir URL manzili bitta funksiyaga biriktirilgan va rol cheklovlari shu yerda qo‘llanadi. Uchinchi qatlam — biznes qoidalari: tekshiruvlar, komissiya hisobi va obyektni sotilgan deb belgilash. To‘rtinchi qatlam — Jinja2 shabloni, u HTML sahifani shakllantiradi. Ma’lumotlarga murojaat sqlite3 moduli orqali bajariladi, baza esa bitta faylda saqlanadi. Qatlamlarga bo‘lish va ularning bir-biriga bog‘liqligini kamaytirish tamoyili toza arxitektura g‘oyalariga mos keladi [11].`);

  b.figure("arch.png", "Tizimning umumiy arxitekturasi", 15.5, 11);

  b.p(`Ilovaning marshrutlari 10-jadvalda keltirilgan. Jami 12 ta marshrut mavjud. GET usulidagi marshrutlar faqat ma’lumot ko‘rsatadi, POST usulidagi marshrutlar ma’lumotni o‘zgartiradi va natijadan keyin foydalanuvchini tegishli ro‘yxatga qaytaradi. Dizayn fayli (style.css) kirishsiz ham yuklanadi, chunki kirish sahifasi ham shu uslublardan foydalanadi.`);

  b.table("Ilova marshrutlari",
    ["Marshrut", "Usul", "Vazifasi", "Kirish huquqi"],
    [
      ["/login", "GET, POST", "Kirish sahifasi va login-parolni tekshirish", "Hamma"],
      ["/logout", "GET", "Sessiyani tugatish", "Kirgan"],
      ["/", "GET", "Bosh sahifa: statistika", "Kirgan"],
      ["/properties", "GET", "Obyektlar ro‘yxati va forma", "Kirgan"],
      ["/properties/save", "POST", "Obyektni qo‘shish yoki yangilash", "Kirgan"],
      ["/properties/delete", "POST", "Obyektni o‘chirish", "Administrator"],
      ["/clients", "GET", "Mijozlar ro‘yxati va forma", "Kirgan"],
      ["/clients/save", "POST", "Mijozni qo‘shish yoki yangilash", "Kirgan"],
      ["/clients/delete", "POST", "Mijozni o‘chirish", "Administrator"],
      ["/deals", "GET", "Bitimlar ro‘yxati va forma", "Kirgan"],
      ["/deals/add", "POST", "Bitim tuzish", "Kirgan"],
      ["/style.css", "GET", "Dizayn fayli", "Hamma"],
    ],
    [2500, 1400, 3654, 1800]);

  b.p(`Tizimning sinflar diagrammasi 6-rasmda berilgan. Diagrammada uchta domen sinfi ko‘rsatilgan: Property (obyekt), Client (mijoz) va Deal (bitim). Har bir sinfning atributlari bazadagi jadval ustunlariga mos keladi, operatsiyalar esa mantiqiy ko‘rsatilgan: kodda ular ilova funksiyalari sifatida amalga oshirilgan. Bitim obyekt bilan «sotiladi» munosabatida (0..1: bitta obyekt ko‘pi bilan bitta bitimga ega) va mijoz bilan «xaridor» munosabatida (0..*: bitta mijoz bir nechta bitimda xaridor bo‘lishi mumkin) bog‘langan. Foydalanuvchilar jadvali (users) domen sinflari bilan bog‘lanmagani uchun diagrammada ko‘rsatilmagan.`);

  b.figure("uml2.png", "Sinflar diagrammasi", 16, 10);

  b.p(`Bitim tuzishning ketma-ketlik diagrammasi 7-rasmda ko‘rsatilgan. Ishtirokchilar: agent, brauzer, ilova (app.py) va SQLite bazasi. Agent bitimlar sahifasini ochadi, ilova bazadan sotuvdagi obyektlar va xaridorlar ro‘yxatini oladi va forma qaytaradi. Agent formani to‘ldirib yuborgach, ilova ma’lumotlarni bazadagi holat bilan solishtirib tekshiradi. Tekshiruv o‘tsa, bitim yoziladi (komissiya = narx × 2 %), obyekt sotilgan deb belgilanadi va foydalanuvchi bitimlar ro‘yxatiga yo‘naltiriladi; aks holda hech narsa saqlanmaydi.`);

  b.figure("uml3.png", "Bitim tuzishning ketma-ketlik diagrammasi", 14, 15);

  b.p(`Foydalanuvchi interfeysi bir xil tuzilmada loyihalangan (11-jadval). Sahifaning yuqorisida tizim nomi va menyu joylashgan: «Bosh sahifa», «Obyektlar», «Mijozlar», «Bitimlar», o‘ng tomonda esa joriy foydalanuvchi logini, uning roli va «Chiqish» tugmasi. Har bir ro‘yxat sahifasida tepada ma’lumot kiritish formasi, pastda jadval joylashgan. Obyekt holati rang bilan ajratilgan: «Sotuvda» yashil, «Sotilgan» qizil. «Tahrirlash» tugmasi sariq, «O‘chirish» tugmasi qizil rangda, o‘chirishdan oldin tasdiqlash so‘raladi. Shunday yagona tuzilma foydalanuvchini yangi sahifaga tez o‘rganishga yordam beradi, bu ISO/IEC 25010 dagi foydalanish qulayligi xususiyatiga mos keladi [14].`);

  b.table("Interfeys ekranlari",
    ["Ekran", "Vazifasi", "Asosiy elementlari"],
    [
      ["Kirish", "Foydalanuvchini aniqlash", "Login va parol maydonlari, «Kirish» tugmasi, xato xabari"],
      ["Bosh sahifa", "Agentlik holatini ko‘rsatish", "Beshta ko‘rsatkich kartasi: obyektlar, sotuvda, mijozlar, bitimlar, jami daromad"],
      ["Obyektlar", "Obyektlarni yuritish", "Forma (manzil, tur, xonalar, maydon, narx), jadval, holat, tahrirlash va o‘chirish tugmalari"],
      ["Mijozlar", "Mijozlarni yuritish", "Forma (F.I.Sh., telefon, rol), jadval, tahrirlash va o‘chirish tugmalari"],
      ["Bitimlar", "Bitim tuzish va ko‘rish", "Obyekt va xaridor tanlash, narx, sana, bitimlar jadvali (komissiya bilan)"],
    ],
    [1700, 2700, 4954]);
};
