// I BOB. NAZARIY QISM

module.exports = (b) => {
  b.h1("I BOB. NAZARIY QISM");

  // ---------------- 1.1 ----------------
  b.h2("1.1. Ko‘chmas mulk agentligi faoliyati va soha tushunchalari");

  b.p(`Ko‘chmas mulk obyekti deganda yer uchastkalari hamda yerga mustahkam bog‘langan binolar, inshootlar kabi mol-mulk tushuniladi [1]. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi qonun yer uchastkalari, binolar va inshootlar (shu jumladan qurilishi tugallanmagan obyektlar), ko‘p yillik daraxtlar hamda mulkiy majmua sifatidagi korxonaga nisbatan qo‘llanadi [4]. Ushbu loyihada ko‘chmas mulk obyekti (qisqacha «obyekt») to‘rtta turga bo‘lingan: kvartira, uy, yer uchastkasi va ofis.`);

  b.p(`Ko‘chmas mulk agentligi sotuvchi va xaridor o‘rtasida vositachi sifatida ishtirok etadi. Agentlikning asosiy faoliyati obyektlarni qabul qilish va ularning ma’lumotlarini yuritish, mijozlar (sotuvchi va xaridorlar) bilan ishlash, obyektni ko‘rsatish, tomonlarni kelishtirish hamda bitimni rasmiylashtirishdan iborat. Bitim tuzilgandan keyin huquqlar belgilangan tartibda davlat ro‘yxatidan o‘tkaziladi, ro‘yxatdan o‘tkazish tartiblari, to‘lov stavkalari va muddatlari ma’muriy reglamentlarda belgilangan [7]. Vositachilik haqi (komissiya) amaliyotda tomonlarning kelishuvi bilan belgilanadi. Hisob-kitobni soddalashtirish maqsadida loyihada komissiya bitim narxining 2 foizi miqdorida qabul qilingan.`);

  b.p(`Agentlik faoliyati ketma-ket bosqichlardan iborat va har bir bosqichning o‘z axborot ehtiyoji bor (1-jadval). Loyihada bosqichlarning agentlik ichida bajariladigan qismi qamrab olingan. Huquqlarni davlat ro‘yxatidan o‘tkazish esa tizim doirasidan tashqarida qoladi, chunki u belgilangan tartibda davlat organlari tomonidan amalga oshiriladi [4].`);

  b.table("Agentlik faoliyati bosqichlari va ularning axborot ehtiyoji",
    ["Bosqich", "Mazmuni", "Axborot ehtiyoji", "Tizimda"],
    [
      ["1. Obyektni qabul qilish", "Sotuvchidan obyekt ma’lumotlari olinadi", "Manzil, tur, xonalar soni, maydon, narx", "Obyekt formasi"],
      ["2. Mijoz bilan ishlash", "Sotuvchi va xaridor qayd etiladi", "F.I.Sh., telefon raqami, mijoz roli", "Mijoz formasi"],
      ["3. Ko‘rsatish va kelishuv", "Xaridorga obyekt ko‘rsatiladi, narx kelishiladi", "Obyekt holati, kelishilgan narx", "Sotuvdagi obyektlar ro‘yxati"],
      ["4. Bitimni qayd etish", "Bitim rasmiylashtiriladi, komissiya hisoblanadi", "Obyekt, xaridor, narx, sana, komissiya", "Bitim formasi, avtomatik hisob"],
      ["5. Huquqlarni ro‘yxatdan o‘tkazish", "Davlat reyestrida rasmiylashtiriladi", "Rasmiy hujjatlar [4], [7]", "Tizimdan tashqarida"],
    ],
    [2100, 2700, 2554, 2000]);

  b.p(`Agentlik faoliyatidagi ma’lumotlar uchta asosiy tushuncha atrofida shakllanadi. Birinchisi — obyekt: uning manzili, turi, xonalar soni, maydoni, narxi va holati («sotuvda» yoki «sotilgan») saqlanadi. Ikkinchisi — mijoz: F.I.Sh., telefon raqami va roli (sotuvchi yoki xaridor) qayd etiladi. Uchinchisi — bitim: u bitta obyektni bitta xaridor bilan bog‘laydi va kelishilgan narx, komissiya hamda sanani o‘z ichiga oladi. Bu tushunchalar tizimning ma’lumotlar modeli va ilova interfeysining asosini tashkil etadi. Mijoz roli (sotuvchi, xaridor) tizim foydalanuvchisining roli (administrator, agent) bilan aralashtirilmasligi kerak: birinchisi agentlik mijozining kimligini, ikkinchisi esa dasturdan foydalanuvchi xodimning huquqlarini bildiradi.`);

  b.p(`Soha rivojlanishining tendensiyasini bir necha ko‘rsatkich orqali kuzatish mumkin (2-jadval). Ma’lumotlar Markaziy bankning chorakliklar bo‘yicha e’lon qilinadigan «Ko‘chmas mulk bozori tahlili» hisobotlaridan olingan; barcha o‘zgarish ko‘rsatkichlari o‘tgan yilning mos davriga nisbatan berilgan.`);

  b.table("Ko‘chmas mulk bozorining asosiy ko‘rsatkichlari",
    ["Davr", "Ko‘rsatkich", "Qiymat", "Manba"],
    [
      ["2025-yil yanvar–sentabr", "Oldi-sotdi shartnomalari soni", "229,8 ming (+12,8 %)", "[19]"],
      ["2025-yil III chorak", "Ajratilgan ipoteka kreditlari", "5,6 trln so‘m (+14,9 %)", "[19]"],
      ["2025-yil yanvar–sentabr", "Foydalanishga topshirilgan uy-joy", "11,1 mln m² (+2,4 %)", "[19]"],
      ["2026-yil I chorak", "Oldi-sotdi shartnomalari soni", "110,1 ming (+48,4 %)", "[20]"],
      ["2026-yil I chorak", "Ajratilgan ipoteka kreditlari", "5,7 trln so‘m (+29 %)", "[20]"],
    ],
    [2300, 3100, 2954, 1000]);

  b.p(`2-jadvaldan ko‘rinib turibdiki, bitimlar soni ham, ularni moliyalashtiruvchi ipoteka kreditlari hajmi ham izchil o‘sib bormoqda. 2026-yilning I choragida, ayniqsa mart oyida, bitimlar soni keskin ko‘paygan [20]. Bu agentliklar zimmasidagi ma’lumotlar oqimi ham shunga mos ravishda kengayishini anglatadi. Bitimlar soni yuzlab va minglab bo‘lganda daftar yoki alohida fayllarda yuritilgan yozuvlar orasida kerakli obyektni topish, uning holatini aniqlash va daromadni hisoblash ko‘p vaqt talab qiladi, xato ehtimoli esa oshadi.`);

  b.p(`Qo‘lda yuritiladigan hisobda quyidagi tipik muammolar uchraydi: bir xil ma’lumotning bir necha joyda takrorlanishi va ularning bir-biriga mos kelmay qolishi; sotilgan obyektning ro‘yxatdan o‘chirilmay qolishi va qayta taklif qilinishi; komissiyani har bir bitim uchun alohida hisoblashda xatoga yo‘l qo‘yilishi; ma’lumotga kimning kirishi va uni kim o‘zgartirgani nazorat qilinmasligi. Avtomatlashtirilgan tizim bu muammolarning har birini ma’lumotlarni bitta joyda saqlash, biznes qoidalarini dastur darajasida tekshirish va foydalanuvchi huquqlarini ajratish orqali bartaraf etadi.`);

  // ---------------- 1.2 ----------------
  b.h2("1.2. Mavjud analoglar, ularning kamchiliklari va me’yoriy-huquqiy asos");

  b.p(`Agentlik faoliyatiga yaqin bo‘lgan mavjud yechimlarni to‘rt guruhga ajratish mumkin. Birinchi guruh — e’lon portallari (masalan, OLX.uz, Uybor.uz): ular sotuvchi va xaridorni uchrashtiradi, obyektlarni e’lon sifatida joylashtiradi va qidirish imkonini beradi. Ikkinchi guruh — davlat axborot tizimlari: ko‘chmas mulk obyektlariga bo‘lgan huquqlarning davlat reyestri va kadastr tizimlari huquqlarni ro‘yxatga oladi va obyekt to‘g‘risida rasmiy ma’lumot beradi [4]. Uchinchi guruh — umumiy maqsadli CRM tizimlari (masalan, Bitrix24, amoCRM): ular mijozlar bilan munosabatlarni yuritishga mo‘ljallangan. To‘rtinchi guruh — daftar va elektron jadvallar (Excel va shunga o‘xshash dasturlar). Taqqoslash ochiq ma’lumotlarga ko‘ra umumiy tavsif asosida, agentlik ichki hisobi uchun muhim bo‘lgan mezonlar bo‘yicha o‘tkazildi (3-jadval).`);

  b.table("Mavjud yechimlarni agentlik ichki hisobi mezonlari bo‘yicha taqqoslash",
    ["Mezon", "E’lon portallari", "Davlat reyestri", "Umumiy CRM", "Daftar / jadval", "Loyiha tizimi"],
    [
      ["Asosiy maqsad", "E’lon joylash", "Huquqlarni ro‘yxatga olish", "Mijozlar bilan ishlash", "Universal yozuv", "Agentlik ichki hisobi"],
      ["Obyektlar hisobi", "E’lon sifatida", "Rasmiy ma’lumot", "Sozlash kerak", "Qo‘lda", "Bor"],
      ["Mijozlar hisobi", "Yo‘q", "—", "Bor", "Qo‘lda", "Bor"],
      ["Bitim va komissiya", "Yo‘q", "—", "Sozlash kerak", "Qo‘lda hisoblanadi", "Avtomatik (2 %)"],
      ["Sotilgan obyektni qayta sotishdan himoya", "Yo‘q", "—", "Sozlash kerak", "Yo‘q", "Bor"],
      ["Foydalanuvchi rollari", "Yo‘q", "—", "Bor", "Yo‘q", "Bor (2 ta rol)"],
      ["O‘rnatish va sozlash", "Talab qilinmaydi", "Talab qilinmaydi", "Murakkab", "Oddiy", "Oddiy"],
    ],
    [1700, 1450, 1450, 1450, 1650, 1654]);

  b.p(`3-jadvaldan ko‘rinadiki, mavjud yechimlarning har biri agentlikning ichki hisobi bo‘yicha o‘z kamchiligiga ega. E’lon portallari va davlat reyestri boshqa maqsadga xizmat qiladi va bitim hamda komissiya hisobini yuritmaydi. Umumiy CRM tizimlarida obyekt, narx, maydon, bitim va komissiya maydonlarini agentlik o‘zi sozlashi, xodimlarni o‘qitishi kerak, tizimning murakkabligi esa kichik agentlik uchun ortiqcha bo‘lishi mumkin. Daftar va jadvallarda esa ma’lumotlar yaxlitligi, rollarga ajratish va avtomatik hisob-kitob umuman yo‘q. Shuning uchun loyihada faqat zarur funksiyalarni o‘z ichiga olgan, o‘rnatish va foydalanishda oddiy bo‘lgan alohida tizim taklif etiladi.`);

  b.p(`Tizim loyihasi quyidagi me’yoriy-huquqiy hujjatlarni inobatga oladi. Fuqarolik kodeksi ko‘chmas mulk tushunchasini va unga oid bitimlarning asosiy qoidalarini belgilaydi [1]. «Shaxsga doir ma’lumotlar to‘g‘risida»gi qonun shaxsga doir ma’lumotlarni qayta ishlash munosabatlarini tartibga soladi [2]; tizimda saqlanadigan mijozlarning F.I.Sh. va telefon raqami shunday ma’lumotlarga kiradi, shu bois ularga kirish autentifikatsiya bilan cheklanadi. «Kiberxavfsizlik to‘g‘risida»gi qonun axborot tizimlaridagi ma’lumotlarni qonunga xilof ravishda tarqatish, o‘g‘irlash, yo‘qotish, o‘zgartirish va ruxsatsiz kirishning oldini olish majburiyatini belgilaydi [3]. Ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish to‘g‘risidagi qonun [4] va unga muvofiq qabul qilingan Vazirlar Mahkamasi qarori [7] bitimdan keyingi rasmiy bosqichni belgilaydi.`);

  b.p(`Strategik darajada «Raqamli O‘zbekiston — 2030» strategiyasi tarmoqlarni raqamlashtirish yo‘nalishini belgilaydi [5], ko‘chmas mulkni ommaviy baholash tizimini joriy etish to‘g‘risidagi Prezident farmoni esa soliq solish, sotish va ipoteka jarayonlarida ko‘chmas mulk qiymatini bozor narxiga yaqin aniqlashni ko‘zda tutadi [6]. Bu obyekt narxi to‘g‘risidagi ma’lumotning tizimda aniq va tartibli saqlanishi ahamiyatini oshiradi. Texnik talablarni rasmiylashtirishda dasturiy hujjatlarga qo‘yiladigan texnik topshiriq tuzilmasi [15], tizim sifatini baholashda esa ISO/IEC 25010 sifat modeli [14] asos qilib olindi.`);

  // ---------------- 1.3 ----------------
  b.h2("1.3. Loyihada qo‘llaniladigan texnologiyalar va ularning tanlov asosi");

  b.p(`Tizim Python dasturlash tilida Flask mikrofreymvorki asosida yozilgan. Flask kichik yadro va zarur kengaytmalarni o‘z ichiga olgan veb-freymvork bo‘lib, so‘rovlarni marshrutlash, shablonlar bilan ishlash va sessiyalarni boshqarish imkonini beradi [10], [16]. Sahifalar Jinja2 shablon tizimi yordamida shakllantiriladi, u qiymatlarni avtomatik ekranlash orqali brauzerga zararli kod kiritilishidan himoya qiladi [16]. Foydalanuvchi interfeysi HTML va CSS bilan yaratilgan, qo‘shimcha JavaScript kutubxonalari ishlatilmagan.`);

  b.p(`Ma’lumotlar bazasini boshqarish tizimi sifatida SQLite tanlangan. U serversiz relyatsion MBBT bo‘lib, butun bazani bitta faylda saqlaydi, alohida o‘rnatish va sozlashni talab qilmaydi, tranzaksiyalarni qo‘llab-quvvatlaydi [17]. Python bilan ishlash uchun standart kutubxonadagi sqlite3 moduli ishlatilgan, barcha SQL so‘rovlari parametrlar orqali beriladi. Relyatsion model nazariyasi [8], [12] bo‘yicha ma’lumotlar jadvallarga ajratilgan va jadvallar kalitlar orqali bog‘langan. Parollarni heshlash uchun Werkzeug kutubxonasining xavfsizlik funksiyalari qo‘llangan (u Flask bilan birga o‘rnatiladi). Dasturni turli kompyuterlarda bir xil ishga tushirish uchun Docker tasviri tayyorlangan, avtomatik testlar esa Python standart kutubxonasidagi unittest moduli bilan yozilgan.`);

  b.p(`Texnologiyalar tanlovi uchta alternativa bilan taqqoslab asoslandi (4-jadval). Taqqoslash kichik agentlik (bir necha xodim, o‘n minglab yozuvgacha ma’lumot) sharoiti uchun o‘tkazildi.`);

  b.table("Texnologiyalar tanlovi bo‘yicha taqqoslash",
    ["Mezon", "Flask + SQLite (tanlangan)", "Django + PostgreSQL", "Elektron jadval"],
    [
      ["O‘rnatish murakkabligi", "Juda past: Python va bitta kutubxona", "O‘rta: alohida MBBT serveri kerak", "Past"],
      ["Ma’lumotlar yaxlitligi", "Bor (tranzaksiyalar, cheklovlar)", "Bor, kengroq imkoniyatlar", "Deyarli yo‘q"],
      ["Rollarga ajratish", "Dasturda amalga oshiriladi", "Tayyor tizim mavjud", "Yo‘q"],
      ["Bir vaqtda ko‘p yozish", "Cheklangan (yozish navbat bilan)", "Yuqori", "Cheklangan"],
      ["Kod hajmi va tushunarlilik", "Kichik, bitta fayl", "Katta, ko‘p fayl va sozlama", "Kod yo‘q"],
      ["Kengaytirish", "Oson, MBBTni keyin almashtirish mumkin", "Juda oson", "Qiyin"],
    ],
    [2200, 2450, 2450, 2254]);

  b.p(`Tanlovning asosiy sababi — oddiylik tamoyili (KISS): kichik agentlik uchun ortiqcha murakkablik foyda keltirmaydi, balki o‘rnatish va qo‘llab-quvvatlash xarajatini oshiradi. Flask va SQLite birgalikda ilovani bitta fayl va bitta kutubxona bilan ishga tushirishga imkon beradi. SQLite ning asosiy cheklovi — bir vaqtda ko‘p yozuvchi bilan ishlashning chekliligi; agentlikdagi ish ko‘lami bu cheklovni muhim qilmaydi. Tizimning bu qarorga mosligi III bobda o‘lchovlar bilan tasdiqlanadi. Zarurat tug‘ilganda MBBT ni almashtirish mumkin, chunki barcha ma’lumotlarga murojaat bir joyda, standart SQL orqali amalga oshiriladi.`);

  b.p(`Dasturiy ta’minot sifatini baholashda ISO/IEC 25010 modeli xususiyatlaridan foydalanildi: funksional moslik, ishlash samaradorligi, o‘zaro moslik, foydalanish qulayligi, ishonchlilik, xavfsizlik, qo‘llab-quvvatlash qulayligi va ko‘chirib o‘tkazuvchanlik [14]. Loyiha uchun ustuvor xususiyatlar sifatida funksional moslik (agentlik qoidalariga muvofiqlik), xavfsizlik (autentifikatsiya va rollar), foydalanish qulayligi (o‘zbek tilidagi sodda interfeys) va ko‘chirib o‘tkazuvchanlik (Windows, Linux va Docker) tanlandi.`);
};
