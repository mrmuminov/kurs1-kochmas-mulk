// III BOB. TADBIQ QILISHNI TASHKIL ETISH VA LOYIHA SAMARADORLIGI

module.exports = (b, ctx) => {
  b.h1("III BOB. TADBIQ QILISHNI TASHKIL ETISH VA LOYIHA SAMARADORLIGI");

  // ---------------- 3.1 ----------------
  b.h2("3.1. Dasturni ishga tushirish va foydalanuvchi yo‘riqnomasi");

  b.p(`Dastur Python 3 muhitida ishlaydi: Docker tasviri Python 3.12 asosida tuzilgan, testlar esa Python ${ctx.pythonVersion} da o‘tkazilgan. Yagona tashqi kutubxona — Flask, u «pip install flask» buyrug‘i bilan o‘rnatiladi. Ilova «python app.py» buyrug‘i bilan ishga tushiriladi (Windows tizimida «py app.py») va brauzerda http://localhost:8080 manzilida ochiladi. Ma’lumotlar bazasi fayli (database.sqlite) birinchi ishga tushirishda avtomatik yaratiladi, jadvallar tuzilmasi 2-ilovada keltirilgan. Dastur matni 1-ilovada berilgan.`);

  b.p(`Docker orqali ishga tushirish uchun loyiha papkasida tasvir yig‘iladi («docker build -t kurs1 .») va konteyner ishga tushiriladi («docker run -p 8080:8080 -v kurs1-data:/data kurs1»). Baza fayli /data hajmida saqlanadi, shu sababli konteyner qayta ishga tushirilganda ma’lumotlar yo‘qolmaydi. Bu usul sinab ko‘rildi: konteynerda kirish sahifasi ochildi, login-parol qabul qilindi va baza fayli /data ichida yaratildi. Sessiya cookie’larini imzolash kaliti SECRET_KEY muhit o‘zgaruvchisi orqali beriladi; u berilmasa, faqat ishlab chiqish uchun mo‘ljallangan standart kalit ishlatiladi. Haqiqiy muhitda bu kalitni almashtirish shart.`);

  b.p(`Birinchi ishga tushirishda ikkita hisob yaratiladi: administrator (login «admin», parol «admin123») va agent (login «agent», parol «agent123»). Bu parollar faqat boshlang‘ich kirish uchun mo‘ljallangan va joriy etishdan oldin o‘zgartirilishi kerak. Hozirgi versiyada parolni o‘zgartirish uchun interfeys mavjud emas: parol heshi users jadvalida to‘g‘ridan-to‘g‘ri almashtiriladi. Bu cheklov 3.3-bandda rivojlantirish yo‘nalishlari qatorida qayd etilgan.`);

  b.p(`Foydalanuvchi ish tartibi quyidagicha: avval tizimga kiriladi (8-rasm), so‘ng mijozlar va obyektlar kiritiladi, keyin ular asosida bitim tuziladi. Kirishdan keyin bosh sahifa ochiladi (9-rasm), unda obyektlar, sotuvdagi obyektlar, mijozlar, bitimlar soni va jami daromad ko‘rsatiladi. Quyidagi ekran shakllaridagi ma’lumotlar namuna sifatida kiritilgan.`);

  b.figure("login.png", "Tizimga kirish sahifasi", 14, 7);
  b.figure("home.png", "Bosh sahifa (administrator hisobi)", 14, 8);

  b.p(`«Obyektlar» sahifasida (10-rasm) tepada forma, pastda barcha obyektlar jadvali joylashgan. Forma manzil, tur, xonalar soni, maydon va narxni kiritishga imkon beradi. Bo‘sh manzil, noto‘g‘ri tur yoki musbat butun son bo‘lmagan maydon/narx kiritilsa, ma’lumot saqlanmaydi va forma qayta ochiladi. «Tahrirlash» tugmasi tanlangan obyekt ma’lumotlarini formaga chiqaradi, «Saqlash» tugmasi esa o‘zgarishni yozadi. Mijozlar sahifasi ham shu tuzilmada ishlaydi; uning ekran shakli hamda obyektni tahrirlash holati 4-ilovada keltirilgan.`);

  b.figure("properties.png", "«Obyektlar» sahifasi (administrator hisobi)", 15, 11);

  b.p(`«Bitimlar» sahifasida (11-rasm) agent ro‘yxatdan sotuvdagi obyektni va xaridor mijozni tanlaydi, kelishilgan narxni kiritadi va sanani tasdiqlaydi. «Bitim tuzish» tugmasi bosilgach, komissiya avtomatik hisoblanadi va obyekt «Sotilgan» holatiga o‘tadi. Jadvalda bitimlar eng yangisidan boshlab ko‘rsatiladi.`);

  b.figure("deals.png", "«Bitimlar» sahifasi", 15, 10);

  b.p(`Agent hisobi bilan kirilganda interfeys o‘zgaradi: «O‘chirish» tugmalari ko‘rsatilmaydi (12-rasm). Bu foydalanuvchi uchun qulaylik, haqiqiy himoya esa serverda amalga oshiriladi (3.2-band).`);

  b.figure("properties_agent.png", "«Obyektlar» sahifasi (agent hisobi, o‘chirish tugmalarisiz)", 15, 11);

  b.p(`Kiritilgan ma’lumotlar brauzerdagi tekshiruvga tayanmasdan server tomonida ham tekshiriladi (12-jadval). Qoidalardan birortasi buzilsa, yozuv saqlanmaydi va foydalanuvchi shu formaga qaytariladi.`);

  b.table("Kiritish maydonlarini tekshirish qoidalari",
    ["Forma", "Maydon", "Qoida"],
    [
      ["Obyekt", "Manzil", "Bo‘sh bo‘lmasligi kerak"],
      ["Obyekt", "Tur", "Kvartira, Uy, Yer uchastkasi, Ofis ro‘yxatidan biri"],
      ["Obyekt", "Xonalar soni", "Bo‘sh qoldirilsa 0, aks holda butun manfiy bo‘lmagan son"],
      ["Obyekt", "Maydon, narx", "Butun son va noldan katta"],
      ["Mijoz", "F.I.Sh., telefon", "Bo‘sh bo‘lmasligi kerak"],
      ["Mijoz", "Rol", "Sotuvchi yoki Xaridor"],
      ["Bitim", "Obyekt", "Mavjud va sotuvda bo‘lishi kerak"],
      ["Bitim", "Mijoz", "Mavjud va roli «Xaridor» bo‘lishi kerak"],
      ["Bitim", "Narx", "Butun son va noldan katta"],
      ["Bitim", "Sana", "Bo‘sh bo‘lmasligi kerak"],
    ],
    [1500, 2300, 5554]);

  b.p(`Misol sifatida ikkita namunaviy bitim kiritildi. Birinchisida Chilonzor tumanidagi 58 000 $ lik kvartira 56 000 $ ga xaridorga sotildi: komissiya 56 000 × 0,02 = 1 120 $ bo‘ldi. Ikkinchisida Mirzo Ulug‘bek tumanidagi 135 000 $ lik ofis 130 000 $ ga sotildi: komissiya 2 600 $ ni tashkil etdi. Natijada bosh sahifada bitimlar soni 2, jami daromad esa 1 120 + 2 600 = 3 720 $ ko‘rsatildi (9-rasm), sotuvdagi obyektlar soni esa beshtadan uchtaga kamaydi.`);

  // ---------------- 3.2 ----------------
  b.h2("3.2. Sinov natijalari va axborot xavfsizligi choralari");

  b.p(`Tizim HTTP chegarasida avtomatik testlar bilan sinaldi: testlar Flask test klienti orqali so‘rovlar yuboradi va javob hamda bazadagi natijani tekshiradi, ilovaning ichki funksiyalariga murojaat qilmaydi. Har bir test uchun alohida bo‘sh baza yaratiladi, shu sababli testlar bir-biriga bog‘liq emas. Jami ${ctx.tests} ta test yozilgan, ularning mazmuni 13-jadvalda keltirilgan, matni esa 3-ilovada berilgan. Testlar Python ${ctx.pythonVersion}, Flask ${ctx.flaskVersion} muhitida ishga tushirilganda barchasi muvaffaqiyatli o‘tdi (${ctx.testTime} soniya).`);

  b.table("Avtomatik testlar va ularning natijalari",
    ["№", "Tekshiriladigan holat", "Kutilgan natija", "Natija"],
    [
      ["1", "Kirmagan foydalanuvchi to‘rtta sahifani ochishga urinadi", "Kirish sahifasiga yo‘naltiriladi", "O‘tdi"],
      ["2", "Noto‘g‘ri parol kiritiladi", "Xato xabari chiqadi, kirish bo‘lmaydi", "O‘tdi"],
      ["3", "To‘g‘ri login-parol, so‘ng chiqish", "Kirish ochiladi, chiqishdan keyin yopiladi", "O‘tdi"],
      ["4", "Bazadagi parollar tekshiriladi", "Parollar ochiq matnda emas, heshlangan", "O‘tdi"],
      ["5", "Agent obyekt va mijozni o‘chirishga urinadi", "403 xatosi, yozuvlar saqlanadi, tugma ko‘rinmaydi", "O‘tdi"],
      ["6", "Agent obyekt va mijoz qo‘shadi", "Yozuvlar bazaga qo‘shiladi", "O‘tdi"],
      ["7", "Administrator obyekt va mijozni o‘chiradi", "Yozuvlar o‘chadi", "O‘tdi"],
      ["8", "Narxi 40 000 $ bo‘lgan bitim tuziladi", "Komissiya 800 $, obyekt «sotilgan»", "O‘tdi"],
      ["9", "Bitimi bor obyekt va mijoz o‘chirilmoqchi", "Yozuvlar o‘chmaydi", "O‘tdi"],
      ["10", "Bitimdan keyin bosh sahifa ochiladi", "Jami daromad 800,00 ko‘rinadi", "O‘tdi"],
    ],
    [600, 3900, 3954, 900]);

  b.p(`Testlarning sezgirligi ham tekshirildi: serverdagi rol tekshiruvi vaqtincha olib tashlanganda 5-test muvaffaqiyatsiz tugadi, ya’ni test himoya buzilishini haqiqatan aniqlaydi. Qo‘lda sinov ham o‘tkazildi: agent hisobidan o‘chirish so‘rovi to‘g‘ridan-to‘g‘ri yuborilganda server 403 holat kodi bilan javob berdi.`);

  b.p(`Axborot xavfsizligi choralari OWASP tomonidan tizimlashtirilgan eng keng tarqalgan xavflar [18] asosida tanlandi va 14-jadvalda keltirilgan. Autentifikatsiya login va parol bilan amalga oshiriladi: parol Werkzeug kutubxonasining scrypt algoritmi bilan heshlanadi va bazada faqat hesh saqlanadi, tekshiruv hesh bo‘yicha bajariladi. Rollarga ajratish ikki rol (administrator va agent) asosida ishlaydi, o‘chirish cheklovi esa interfeysda emas, serverda qo‘llanadi. Ma’lumotlarni himoyalash uchun barcha SQL so‘rovlari parametrlar bilan beriladi, shablon esa qiymatlarni avtomatik ekranlaydi. Mijozlarning F.I.Sh. va telefon raqami shaxsga doir ma’lumot bo‘lgani uchun [2] ularga faqat kirgan foydalanuvchi murojaat qila oladi, bu axborot tizimlarini ruxsatsiz kirishdan himoya qilish talabiga [3] mos keladi.`);

  b.table("Xavfsizlik xavflari va qo‘llangan choralar",
    ["Xavf (OWASP 2021)", "Qo‘llangan chora", "Holat"],
    [
      ["A01. Kirishni boshqarishning buzilishi", "Har so‘rovda sessiya tekshiriladi; o‘chirish faqat administratorga, serverda tekshiriladi", "Amalga oshirilgan, testlangan"],
      ["A02. Kriptografik nosozliklar", "Parollar scrypt bilan heshlanadi, ochiq saqlanmaydi. HTTPS ilovaning o‘zida yo‘q", "Qisman: HTTPS joriy etishda proksi orqali yoqiladi"],
      ["A03. In’ektsiya (SQL, XSS)", "Barcha SQL so‘rovlari parametrli; Jinja2 avtomatik ekranlashi", "Amalga oshirilgan"],
      ["A07. Identifikatsiya va autentifikatsiya nosozliklari", "Login va parol, sessiya, noto‘g‘ri kirishda umumiy xabar. Urinishlar soni cheklanmagan, boshlang‘ich parollar standart", "Qisman"],
    ],
    [2500, 4554, 2300]);

  b.p(`Xavfsizlik bo‘yicha cheklovlar ochiq qayd etiladi. Ilovada CSRF-token joriy etilmagan, noto‘g‘ri parol kiritish urinishlari soni cheklanmaydi, parolni o‘zgartirish va foydalanuvchilarni boshqarish interfeysi yo‘q, bazada tashqi kalit cheklovlari e’lon qilinmagan. Flask ning o‘rnatilgan serveri faqat ishlab chiqish uchun mo‘ljallangan, haqiqiy muhitda uni ishlab chiqarish serveri va HTTPS ni ta’minlaydigan proksi orqali ishga tushirish kerak [16]. Shaxsga doir ma’lumotlar to‘g‘risidagi qonun talablariga to‘liq muvofiqlikni tekshirish joriy etish bosqichida alohida huquqiy ekspertizani talab qiladi [2].`);

  // ---------------- 3.3 ----------------
  b.h2("3.3. Loyihadan kutiladigan natijalar va samaradorlik");

  b.p(`Samaradorlikning birinchi ko‘rsatkichi — tizimning ishlash tezligi. O‘lchov quyidagi sharoitda o‘tkazildi: ilova Flask ning o‘rnatilgan serverida (bitta oqim) lokal kompyuterda ishga tushirilgan, har bir sahifa uchun agent hisobidan ketma-ket 50 ta so‘rov yuborilgan, baza esa 100, 1 000 va 10 000 ta obyekt hamda shuncha mijoz bilan to‘ldirilgan. Muhit: Python ${ctx.pythonVersion}, Flask ${ctx.flaskVersion}, SQLite ${ctx.sqliteVersion}. O‘lchov faqat serverning javob berish vaqtini qamrab oladi, brauzerda sahifani chizish va tarmoq kechikishi hisobga olinmagan. Natijalar 15-jadvalda va 13-rasmda keltirilgan (qiymatlar millisekundlarda: mediana / 95-persentil).`);

  b.table("Ilova javob vaqti va sahifa hajmi yozuvlar soniga qarab",
    ["Ko‘rsatkich", "100 yozuv", "1 000 yozuv", "10 000 yozuv"],
    [
      ["Bosh sahifa, ms", "8,8 / 9,7", "8,3 / 9,3", "8,8 / 10,4"],
      ["Obyektlar sahifasi, ms", "9,1 / 10,4", "12,6 / 14,4", "55,3 / 67,2"],
      ["Mijozlar sahifasi, ms", "8,9 / 10,2", "11,5 / 12,9", "39,6 / 48,6"],
      ["Bitimlar sahifasi, ms", "9,1 / 10,6", "12,4 / 14,3", "42,0 / 53,4"],
      ["Kirish (parolni tekshirish), ms", "86,0", "85,7", "84,9"],
      ["Obyektlar sahifasi hajmi, KB", "37,6", "365,4", "3 670,1"],
      ["Baza fayli hajmi, KB", "28", "100", "744"],
    ],
    [3354, 2000, 2000, 2000]);

  b.figure("performance.png", "Sahifa javob vaqti medianasining yozuvlar soniga bog‘liqligi", 14, 9);

  b.p(`Natijalar N1 talabini (1000 tagacha yozuvda javob 100 ms dan kam) tasdiqlaydi: 1 000 yozuvda eng sekin sahifaning mediana vaqti 12,6 ms, 95-persentil esa 14,4 ms ni tashkil etdi. Bosh sahifaning vaqti yozuvlar soniga deyarli bog‘liq emas (8–9 ms), chunki u faqat yig‘indi ko‘rsatkichlarni hisoblaydi. Ro‘yxat sahifalarida vaqt yozuvlar soniga qarab o‘sadi, chunki ular barcha yozuvlarni bir sahifada chiqaradi: 10 000 yozuvda ham javob vaqti 100 ms dan kam bo‘ldi (55,3 ms), ammo sahifa hajmi 3,6 MB ga yetdi. Demak, sahifalash (bo‘laklab ko‘rsatish) yo‘qligi katta ma’lumotlarda foydalanuvchi uchun asosiy cheklov bo‘ladi, serverning o‘zi esa bu hajmni ko‘taradi. Kirish vaqti (taxminan 85 ms) parol heshlash algoritmining ataylab sekinligi bilan izohlanadi: bu parolni tez-tez sinab ko‘rish (brute force) hujumini qimmatlashtiradi. Baza fayli 10 000 obyekt va mijozda ham 1 MB dan kam (744 KB) hajm egallaydi, ya’ni saqlash xarajati ahamiyatsiz.`);

  b.p(`Ikkinchi ko‘rsatkich — dastur hajmi va soddaligi. Ilova ${ctx.appLines} qatorli bitta faylda yozilgan, uning ${ctx.templateLines} qatori HTML shablonga, qolgani Python kodiga tegishli. Dizayn fayli ${ctx.cssLines} qator, testlar ${ctx.testLines} qator. Tashqi kutubxona faqat Flask. Bu N3 talabini bajaradi va tizimni tushunish hamda qo‘llab-quvvatlashni osonlashtiradi: bitta dasturchi butun kodni bir necha soat ichida o‘qib chiqa oladi.`);

  b.p(`Uchinchi ko‘rsatkich — agentlik ish jarayonlariga ta’sir. Tizim qo‘lda yuritiladigan hisobga nisbatan 16-jadvalda keltirilgan jarayonlarni o‘zgartiradi. Bu taqqoslash tizim funksiyalariga asoslangan sifat jihatidan baholash bo‘lib, qo‘lda ishga nisbatan vaqt tejalishi bu loyiha doirasida o‘lchanmagan: uni agentlikda sinov ekspluatatsiyasi davomida haqiqiy ish vaqtini yozib borish orqali aniqlash mumkin.`);

  b.table("Qo‘lda yuritiladigan hisob va loyiha tizimining taqqoslanishi",
    ["Jarayon", "Qo‘lda yuritish (daftar, jadval)", "Loyiha tizimi"],
    [
      ["Obyekt holati", "Qo‘lda belgilanadi, unutilishi mumkin", "Bitim tuzilganda avtomatik «Sotilgan»"],
      ["Komissiya hisobi", "Har bir bitim uchun qo‘lda", "Narxning 2 foizi avtomatik"],
      ["Qayta sotish", "Nazoratsiz", "Sotilgan obyekt bitim formasida ko‘rinmaydi"],
      ["Jami daromad", "Yig‘indi qo‘lda chiqariladi", "Bosh sahifada darhol ko‘rinadi"],
      ["Ma’lumotni o‘chirish", "Cheklanmagan", "Faqat administrator; bitimi borlar o‘chirilmaydi"],
      ["Kirish nazorati", "Yo‘q", "Login-parol va ikki rol"],
      ["Kiritish xatolari", "Tekshirilmaydi", "Maydonlar tekshiriladi (F12)"],
    ],
    [2000, 3400, 3954]);

  b.p(`Tizimning cheklovlari va keyingi rivojlantirish yo‘nalishlari quyidagilar. Birinchidan, ro‘yxatlarga qidiruv va filtr, sahifalash qo‘shish zarur: 1 000 dan ortiq yozuvda bu qulaylikni sezilarli oshiradi. Ikkinchidan, foydalanuvchilarni boshqarish va parolni o‘zgartirish interfeysi, CSRF himoyasi va noto‘g‘ri kirish urinishlarini cheklash xavfsizlikni kuchaytiradi. Uchinchidan, bazada FOREIGN KEY cheklovlarini e’lon qilish yaxlitlikni ma’lumotlar bazasi darajasida ta’minlaydi. To‘rtinchidan, komissiya foizini sozlanadigan qilish va bitimlar bo‘yicha hisobotni faylga chiqarish agentlik ehtiyojlarini kengroq qamrab oladi. Beshinchidan, ko‘p xodim bir vaqtda intensiv yozadigan bo‘lsa, SQLite ni server MBBTga almashtirish mumkin, chunki ma’lumotlarga murojaat standart SQL orqali amalga oshiriladi.`);
};
