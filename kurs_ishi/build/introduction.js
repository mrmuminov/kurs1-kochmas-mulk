// KIRISH: 8 band (dolzarblik, o'rganilganlik, maqsad, vazifalar, obyekt, predmet, amaliy ahamiyat, tuzilishi)

module.exports = (b, ctx) => {
  b.h1("KIRISH");

  b.p(`Ko‘chmas mulk bozori iqtisodiyotning tez rivojlanayotgan tarmoqlaridan biridir. O‘zbekiston Respublikasi Markaziy bankining ma’lumotlariga ko‘ra, 2025-yil yanvar–sentabr oylarida ko‘chmas mulk oldi-sotdi shartnomalari soni 229,8 ming tani tashkil etib, o‘tgan yilning mos davriga nisbatan 12,8 foizga oshgan [19]. 2026-yilning I choragida bu ko‘rsatkich 110,1 ming tani tashkil etib, 48,4 foizga ko‘paygan [20]. Bitimlar soni ortishi bilan agentliklarning axborot yuklamasi ham oshadi: obyektlar, ularning egalari va xaridorlar to‘g‘risidagi ma’lumotlarni yuritish, bitimlarni qayd etish va agentlik daromadini hisoblash zarur bo‘ladi.`, "Mavzuning dolzarbligi.");

  b.p(`Bu ishlar qog‘oz daftarda yoki alohida elektron jadvallarda bajarilganda ma’lumotlar takrorlanadi, hisob-kitob xatolari ko‘payadi, bitta obyekt ikki marta sotilib qolishi mumkin bo‘ladi, umumiy holatni ko‘rish esa qiyinlashadi. Shu bilan birga raqamlashtirish davlat siyosatining ustuvor yo‘nalishi sifatida belgilangan [5], ko‘chmas mulkka bo‘lgan huquqlarni davlat ro‘yxatidan o‘tkazish tartibi yangilangan [4], ko‘chmas mulkni ommaviy baholash tizimi joriy etilmoqda [6]. Bunday sharoitda agentlik faoliyatini avtomatlashtiruvchi, sodda va arzon axborot tizimini loyihalash dolzarb vazifadir.`);

  b.p(`Axborot tizimlarini loyihalash nazariyasi dasturiy ta’minot injiniringi [13], [11], ma’lumotlar bazalari [8], [12], UML bilan modellashtirish [9] va veb-ilovalar yaratish [10] bo‘yicha asarlarda yetarlicha yoritilgan. Xavfsizlik masalalari OWASP tavsiyalarida tizimlashtirilgan [18]. Ko‘chmas mulk sohasida mavjud ishlanmalar asosan e’lon joylashtirishga yoki davlat reyestrini yuritishga qaratilgan, kichik agentlikning ichki hisobini (obyekt, mijoz, bitim va komissiya) yuritadigan sodda tizimlar esa kamroq yoritilgan. Ushbu loyihada shu bo‘shliq to‘ldiriladi.`, "Muammoning o‘rganilganlik darajasi.");

  b.p(`ko‘chmas mulk agentligi faoliyatini avtomatlashtiruvchi axborot tizimini loyihalash va uning ishlaydigan prototipini yaratish.`, "Loyihaning maqsadi:");

  b.p(`maqsadga erishish uchun quyidagi vazifalar bajarildi: (1) soha tushunchalari, mavjud analoglar va me’yoriy-huquqiy asos tahlil qilindi; (2) tizimning funksional va nofunksional talablari hamda foydalanuvchi rollari aniqlandi; (3) UML diagrammalari va ma’lumotlar bazasi modeli (ER-diagramma) ishlab chiqildi; (4) bitim tuzish va ruxsatni tekshirish algoritmlari loyihalandi; (5) tizim Flask va SQLite asosida amalga oshirildi, autentifikatsiya hamda rollarga ajratish joriy etildi; (6) tizim avtomatik testlar bilan sinaldi va uning samaradorligi o‘lchandi.`, "Loyihaning vazifalari:");

  b.p(`ko‘chmas mulk agentligining obyektlar, mijozlar va bitimlarni yuritish jarayonlari.`, "Loyiha obyekti:");

  b.p(`ushbu jarayonlarni avtomatlashtiruvchi axborot tizimining modellari, algoritmlari va dasturiy ta’minoti.`, "Loyiha predmeti:");

  b.p(`natijada ishlaydigan veb-ilova yaratildi: u 12 ta marshrutdan iborat, 2 ta foydalanuvchi roli bilan ishlaydi va ${ctx.tests} ta avtomatik test bilan tekshirilgan. Ilova Docker tasviri sifatida ham ishga tushiriladi, shu sababli uni kichik agentlikda ko‘p o‘zgartirishlarsiz joriy etish mumkin. Loyiha bitimlar bo‘yicha komissiyani avtomatik hisoblaydi, sotilgan obyektni qayta sotishga yo‘l qo‘ymaydi va o‘chirish huquqini administratorga cheklaydi.`, "Loyihaning amaliy ahamiyati.");

  b.p(`kurs loyihasi kirish, uch bob, xulosa, foydalanilgan adabiyotlar ro‘yxati va ilovalardan iborat. I bobda soha tahlili va texnologiyalar tanlovi, II bobda tizim talablari, UML diagrammalari, ma’lumotlar bazasi modeli va arxitektura, III bobda tizimni ishga tushirish, sinov natijalari, axborot xavfsizligi choralari va samaradorlik bayon etilgan. Asosiy matnda ${ctx.figures} ta rasm va ${ctx.tables} ta jadval keltirilgan, adabiyotlar ro‘yxati ${ctx.sources} ta manbadan iborat, ilovalar soni ${ctx.appendices} ta.`, "Kurs loyihasining tuzilishi va hajmi.");
};
