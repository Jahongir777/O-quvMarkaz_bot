const { Composer } = require('micro-bot');

const {  
	session,
	Scenes: { BaseScene, Stage },
	Markup,
} = require("telegraf");

 //const {Markup} = require('telegraf')
 const bot = new Composer;
 const chatId = 'id';


bot.command('/start', async (ctx) => {
  return await ctx.reply(`Assalom alaykum ${ctx.message.from.first_name}!  Pastdan kerakli b\'limni tanlang! `, Markup
    .keyboard([
      ['πΉ DATA learning centreπΈ', 'π O\'quv kurslar'],
      ['βοΈ Aloqa', 'π Location'],
      ["π Registratsiya"],
    ])
    .resize()
  )
})


//error
const nameScene = new BaseScene('nameScene')
nameScene.enter((ctx) => ctx.reply('Ismingiz va familiyangiz'))
nameScene.on('text', (ctx) => {
    ctx.session.name = ctx.message.text
    return ctx.scene.enter('ageScene', { name: ctx.message.text })
})

const ageScene = new BaseScene('ageScene')
ageScene.enter((ctx) => ctx.reply('Yoshingiz nechida?'))
ageScene.on('text',(ctx)  => {
    ctx.session.age = ctx.message.text
    return ctx.scene.enter('courseScene', { age: ctx.message.text })
   
})

const courseScene = new BaseScene('courseScene')
courseScene.enter((ctx)  => ctx.reply('Qaysi yo\'nalishda o\'qishni hohlaysiz?\n (Misol uchun: Web dasturlash, Android dasturlash, Video mantaj, Kompyuter savodhonligi va h.k)'))
courseScene.on('text',(ctx)  => {
    
    ctx.session.course = ctx.message.text
    return ctx.scene.enter('infoScene', { course: ctx.message.text })
})

const infoScene = new BaseScene('infoScene')
infoScene.enter((ctx)  => ctx.reply('Bu yo\'nalish bo\'yicha ma\'lumotingiz qanday?\n(Misol uchun: Umuman bilmayman, o\'rtacha, yaxshi bilaman'))
infoScene.on('text', (ctx)  => {
    
  
    ctx.session.info = ctx.message.text

    ctx.reply(`Anketa o\'rnatildi jo'natishni tasdiqlaysizmi?\n\nπ¨βπ Ismi: ${ctx.session?.name}\nπ§ Yoshi: ${ctx.session?.age}\nπ» Tanlangan yo\'nalish: ${ctx.session?.course}\nπ Ma\'lumoti: ${ctx.session?.info}`, {reply_markup: {
      inline_keyboard: [ 
        [{text: 'Anketani jo\'natish', callback_data: 'send'}],
      ]
  } })
    return ctx.scene.leave()
})

const stage = new Stage([ nameScene, ageScene, courseScene,  infoScene])
stage.hears('exit',(ctx) => ctx.scene.leave())

bot.use(session());
bot.use(stage.middleware());
bot.hears('π Registratsiya',async (ctx) => ctx.scene.enter('nameScene'))
bot.command('/send', (ctx)  => ctx.telegram.sendMessage(chatId, `Ism: ${ctx.session?.name}\nYoshi: ${ctx.session?.age}\nTanlangan yo\'nalish: ${ctx.session?.course}\nMa\'lumoti: ${ctx.session?.info}`))
bot.action('send', async (ctx) => {
  return  await  ctx.telegram.sendMessage(chatId, `Yangi o'quvchi\n\nπ¨βπ Ismi: ${ctx.session?.name}\nπ§ Yoshi: ${ctx.session?.age}\nπ» Tanlangan yo\'nalish: ${ctx.session?.course}\nπ Ma\'lumoti: ${ctx.session?.info}`)
})

//error

bot.hears('πΉ DATA learning centreπΈ', async (ctx) => {
  return await ctx.replyWithVideo(
    {source: './video/video.mp4'}, 
    {caption: 'Siz IT soha mutaxassissi bo\'lishni istayszimi? \n \n β Unda sizni, Urganch shahrida faoliyat ko\'rsatayotgan "DATA" o\'quv markazining 3 oydan 4 oygacha boβlgan kasbga oβqitish kurslariga taklif etamiz.\n\n βDATAβ innovatsion texnologiyalar markazi o\'quv kurslari:\nπ» Web dasturlash;\nπ± Android dasturlash;\nπ₯ Video montaj;\nπArxitektura va dizayn;\nπQurilish ishlari SMETAsini ishlash;\nπ₯Kompyuter Savodxonligi;\n\nπDarslarni professional mutaxassislar olib borishib, amaliy mashgβulotlar kompyuterlar bilan jihozlangan hududda boβlib oβtadi.π₯³\n\nπKurs yakunida qatnashuvchilarga sertifikat beriladi. Kurslarimizda o\'qish uchun hoziroq online anketa to\'ldiring!\n\nπ±Online anketa to\'ldirish\n\nπ§π»βπΌAdministratorlar bilan aloqa\n\nπ Tel: +99899-759-88-86\n\nπ© MoΚ»ljal: Urganch, Darital, 2-qavat\n\nβ‘οΈ @data_learning_centre', parse_mode: 'html' })
})


bot.hears('π O\'quv kurslar', async (ctx) => {
  return await ctx.reply('π O\'quv kurslar', Markup
    .keyboard([
      ['π Arxitektura va dizayn', 'π Arxitektura SMETA'],
      ['π» Web dasturlash', 'π₯ Video montaj'],
      ['π± Android dasturlash', 'π» Kompyuter Savodxonligi'],
      ['π Main Menu']
    ])
    .resize()
  )
})



bot.hears('π Arxitektura va dizayn', async (ctx) => {
  return await ctx.reply('<b>"Arxitektura va dizayn" kurslari. 3 oyda noldan professionalgacha!</b>\n\n<b>1.Kurs kimlar uchun:</b>\nπΉMazkur sohada ishlamoqchi bo\'lganlar;\nπΉDizayn studiya xodimlari;\nπΉShu yo\'nalishida universitetga kirmoqchi bo\'lganlar;\nπΉ3D model yaratishni o\'rganmoqchi bo\'lganlar;\n\n <b>2.Darsliklar dasturi:</b> \n πΈAutoCAD\nπΈ3Ds MAX\nπΈLumion\n\n<b>3.Kurs haqida</b>\nβ’ Davomiyligi: 3 oy;\nβ’ Dars vaqti: Du,Cho,Ju kunlari, soat 11:00-13:00 gacha;\nβ’ 10 nafar qatnashuvchi qabul qilinadi;\nβ’ Har bir o\'quvchiga kompyuter beriladi;\nβ’ Kurs yakunida sertifikat beriladi;\n\n<b>4.Kurs narxi haqida</b>\nKurs narxi 30% chegirma bilan.\n750 000 ming so\'m\n\n<b>β οΈ DIQQAT!</b>  Kurs davomida talabalar haqiqiy Arxitektor sifatida ishlaydilar: AutoCAD dasturida maket yaratish, 3Ds MAX bilan ishlash, dekorativ elementlar bilan inshoat yaratish, animatsiya bilan ishlash, modelni optimallashtirish va oxirida β tugallangan loyihalarni taqdimot qilish. <a href="https://form.jotform.com/201725058712451">Kursda o\'qish uchun hoziroq online anketa to\'diring yoki adminstartorlar bilan bog\'laning!</a>\n\nπ Tel: +99899-759-88-86\n\nπ©π»βπ» @Data_Administrator\n\nβ‘οΈ MoΚ»ljal: Urganch, Darital 2-qavat\n\n<b>π»"DATA" - innovatsion texnologiyalar ta\'lim markazi</b>\n\n<a href="http://t.me/data_learning_centre">Telegram</a> | <a href="http://instagram.com/data_learning_centre">Instagram</a>  |  <a href="http://youtube.com/data_learning_centre">YouTube</a>',
   
   {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [ 
      [{text: 'Kurs narxi haqida', callback_data: 'price'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1481'}]
  ]
}})})

bot.action('price', async (ctx) => {
  return  await ctx.answerCbQuery('"Arxitektura va dizayn" kurslari. 3 oyda 0 dan professionalgacha!\nKurs narxi 30% chegirma bilan 750 000 ming so\'m.', true)
})



bot.hears('π Arxitektura SMETA', async (ctx) => {
  return await ctx.reply('<b>XORAZMDA ILK MAROTABA!</b>\n\n<b>Siz yetuk smeta mutaxassisi bo\'lishni xohlaysizmi? Qurilish, ta\'mirlash va rekonstruksiya yo\'nalishlarida smeta hisob-kitob malakasini o\'zlashtirmoqchimisiz?</b>\n\n<b>"DATA"</b> o\'quv markazida <b>\"Qurilishda smeta ishi\"</b> yo\'nalishi bo\'yicha yangi yo\'nalish.\n\nπ’ <b>\"Qurilishda smeta ishi kimlar uchun?:</b>\n\nβ‘οΈ Loyiha tashkilotlari xodimlari;\nβ‘οΈ Qurilish tashkilotlari xodimlari;\nβ‘οΈ Smeta ishlashni o\'rganishni xohlagan ko\'ngillilar;\nβ‘οΈ Zamonaviy va talab yuqori kasb egasi bo\'lishni istaganlar.\n\nπ’ <b>Darsda nimalarni bilib olasiz?:</b>\n\nβ‘οΈ Smeta ishining ahamiyati va tarkibi;\nβ‘οΈ Qurilish sohasida smeta hujjatini tayyorlash texnologiyasi;\nβ‘οΈ βQurqiymatasos-2005β dasturni amalyotda qo\'llanilishi;\nβ‘οΈ Bozor iqtisodiyoti sharoitida qurilish materiyallari, ish haqi va moshina mexanizimlar harajatlarini o\'zgaruvchanligi;\nβ‘οΈ Yakuniy smeta hujjatini taxt qilish;\nβ‘οΈ 3 oylik kursni tugatgach qanday joylarda ishlash mumkinligini;\n\nππ»ββοΈShoshiling, bunday imkoniyatni o\'tkazib yubormang!π\n\n<b>Ochiq darslarda ishtirok etish uchun administrator bilan bog\'laning!</b>\n\nπ Tel: +99899-759-88-86\n\n π© <b>MoΚ»ljal:</b> Urganch, Darital, 2-qavat\n\nπ¨π»βπ»<b>\"DATA\"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html',
  disable_web_page_preview: true, 
     reply_markup: {
      inline_keyboard: [
        [{text: 'Kurs narxi haqida', callback_data: 'price1'}],
      [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1509'}]
    ]
  }
  
})})

bot.action('price1', async (ctx) => {
  return  await ctx.answerCbQuery('"DATA" o\'quv markazida "Qurilishda smeta ishi" yo\'nalishi bo\'yicha yangi yo\'nalish.\nKurs narxi chegirma bilan 950 000 ming so\'m.', true)
})



bot.hears('π» Web dasturlash', async (ctx) => {
  return await ctx.reply('<b>O\'z kelajagingizni IT soha bilan bog\'lang. Buning uchun "Web dasturlash" kursida o\'qing!π€</b>\n\n<b>Qisqach ma\'lumot</b>\n β’ Darslar noldan boshlab o\'rgatiladi;\nβ’ Minimal yosh chegarasi 14 yosh;\nβ’ Kurs davomiyligi 3 oy;\nβ’ Darslar haftada 3 kun, 4 soatdan;\nβ’ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nβ’ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nβ’ Har bir guruhga 2 ta o\qituvchi mentorlik qiladi;\nβ’ Kurs yakunida sertifikat beriladi;\n\n<b>Darsliklar dasturi:</b>\n<b>βͺοΈ (Frontend)| HTML, CSS3, JS, Bootstrap</b>\n<b>βͺοΈ (Backend)| PHP, MySQL</b>\n<b>βͺοΈ DevOps</b>(Domain, Server, ishchi muhit konfiguratsiyasi yaβni dasturlarni oβrnatish ulardan foydalanib kod yozish hamda local testlash jarayonlari, β¦)\n\n<b>π§π»βπ» Kurs davomida talabalar haqiqiy programmist sifatida ishlaydilar:</b>Sahifalarni yaratish, Photoshop tartiblari bilan ishlash, dekorativ elementlar bilan saytni yaratish, animatsiya bilan ishlash, kodni optimallashtirish va oxirida β tugallangan loyihalarni internetda nashr qilish uchun tayyorlash.\n\n<b>O\'qitvichilar</b>\n<a href="https://t.me/data_learning_centre/1540">Alisher Xo\'janiyazov</a>\n<a href="https://t.me/data_learning_centre/1222">Kamron Fozilov</a>\n\nπ <b>Tel:</b> +99899-759-88-86\n\n π© <b>MoΚ»ljal:</b> Urganch, Darital, 2-qavat\n\nπ¨π»βπ»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price2'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1540'}]
  ]
}})})

bot.action('price2', async (ctx) => {
  return  await ctx.answerCbQuery(' O\'z kelajagingizni IT soha bilan bog\'lang. Buning uchun "Web dasturlash" kursida o\'qing.\nKurs narxi chegirma bilan 650 000 ming so\'m.',  true)
})


  
bot.hears('π₯ Video montaj', async (ctx) => {
  return await ctx.reply('<b>π O\'rgan va hayratda qoldir!π€©</b>\n\n<code>π΄ Bugungi kunda televideniye, kino sanoati, reklama, "Youtube" hamda Instagram bloglari, onlayn ta\'lim va yana boshqa turdagi sohalarni videolavhalarsiz tasavvur qilib bo\'lmaydi.Albatta bu yo\'nalishda videolarni kreativ montaj qilib hammani hayratga solishingiz va proffessional mutaxassis sifatida katta mablag\' ishlashingiz mumkin!</code>\n\nβBuning uchun esa video montajni o\'rganishingiz kerak!\nAgar siz bu sohasiga qiziqsangiz "Video montaj" kurslarimiz aynan siz uchun!\n\nβ’ Boshlang\'ich bilim talab etilmaydi\nβ’ Minimal yosh chegarasi 14 yosh;\nβ’ Kurs davomiyligi 3 oy;\nβ’ Darslar haftada 3 kun, 4 soatdan;\nβ’ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nβ’ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nβ’ Kurs yakunida sertifikat beriladi;\n\nπ΅Kurs davomida quyidag dasturlarda ishlashni o\'rganasiz:\n\n<b>π Adobe Premiere Pro</b>\n<b>π Adobe After Effects</b>\n<b>π Cinema 4D</b>\n\nπ§βπ»Darslarni <b>βSTRONG EFFECTβ</b> o\'quv sistemasi asoschisi. Sohada 10 yillik tajribaga ega, oliy ma\'lumotli, <b>ZO\'R TV</b>, <b>O\'zbekkino</b> agentliklarida faoliyat yuritgan  <a href=\"https://t.me/data_learning_centre/1473\">O\'tkirbek Karimov</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">π§π»βπΌAdministratorlar bilan aloqa</a>\n\nπ <b>Tel:</b> +99899-759-88-86\n\n π© <b>MoΚ»ljal:</b> Urganch, Darital, 2-qavat\n\nπ¨π»βπ»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price3'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1473'}]
  ]
}})})

bot.action('price3', async (ctx) => {
  return  await ctx.answerCbQuery('O\'rgan va hayratda qoldir!\nAgar siz bu sohaga qiziqsangiz "Video montaj" kurslarimiz aynan siz uchun!\nKurs narxi chegirma bilan 950 000 ming so\'m.', true)
})
  


bot.hears('π± Android dasturlash', async (ctx) => {
  return await ctx.reply('<b>πTrendda bo\'ling va biz bilan parvoz qiling!</b>\n\n<b>π―Siz IT sohasiga qiziqasizmi va dasturlashni o\'rganmoqchimisiz?</b>\nUnda <b>"Android dasturlash"</b> kurslarimiz aynan siz uchun!\n\nβ’ Boshlang\'ich bilim talab etilmaydi;β’ Minimal yosh chegarasi 14 yosh;\nβ’ Kurs davomiyligi 3 oy;\nβ’ Darslar haftada 3 kun, 4 soatdan;\β’ Guruhga 9 nafar qatnashuvchi qabul qilinadi;\nβ’ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi;\nβ’ Har bir guruhga 2 ta o\'qituvchi mentorlik qiladi;\nβ’ Kurs yakunida sertifikat beriladi;\n\nπ¨βπ»Kurslarimizda qatnashib nafaqat mobil ilovalar yaratish va balki tobora rivojlanib borayotgan smart qurilmalariga ham dasturiy taβminot yaratishni o\'rganishingiz mumkin.\n\n<b>π΅Kurs davomida quyidagi imkoniyatlarga ega boβlasiz:</b>\n\nβͺοΈChuqurlashtirilgan Java dasturlash texnologiyalari saboqlari\nβͺοΈIstalgan yoβnalishdagi Android ilova yarata olish imkoniyati\nβͺοΈ<b>Yuqori daromadli</b> ishga ega boβlish imkoniyati\nβͺοΈZamonaviy texnik qurilmalar uchun dasturiy taβminot yaratish(smartfonlar, soatlar, televizorlar, fitness bilakuzuklar va hokazo)\nβͺοΈ<b>Freelancing</b> yordamida masofaviy qoβshimcha daromad qilish.\n\nπ¨π»βπ» Darslarni sohada 6 yillik tajribaga ega android dasturchi  <a href="https://bit.ly/3r7uTo3">Doniyor Xujamovo</a> olib boradi.\n\nπ <b>Tel:</b> +99899-759-88-86\n\n π© <b>MoΚ»ljal:</b> Urganch, Darital, 2-qavat\n\nπ¨π»βπ»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price4'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1460'}]
  ]
}})})

bot.action('price4', async (ctx) => {
  return  await ctx.answerCbQuery('Siz IT sohaga qiziqasizmi va dasturlashni o\'rganmoqchimisiz?\nUnda "Android dasturlash" kurslarimiz aynan siz uchun!\nKurs narxi chegirma bilan 750 000 ming so\'m.', true)
})



bot.hears('π» Kompyuter Savodxonligi', async (ctx) => {
  return await ctx.reply('<b>π»π€©Kompyuterni o\'rgan va hayotingni osonlashtir!</b>\n\nπ§π»βπ»<b>Buning</b> uchun esa <b>"DATA"</b> o\'quv markazida <b>"Kompyuter savodxonligi"</b> yo\'nalishida 2 oy taxsil olishning o\'zi yetarli.\n\nβ’ Boshlang\'ich bilim talab etilmaydi;\nβ’ Minimal yosh chegarasi 14 yosh;\nβ’ Kurs davomiyligi 2 oy;\nβ’ Darslar haftada 3 kun, 2 soatdan;\nβ’ Darslar kompyuterlar bilan jihozlangan xonada o\'tadi\nβ’ Kurs yakunida sertifikat beriladi;\n\n<b>Kursda quyidagi ofis dasturlari zamonaviy tarzda o\'rgatiladi:</b>\n<b>πMs Word</b>\n<b>πMs Excel</b>\n<b>πMs Power Point dasturlari</b>\n\nπ§βπ»Kursni <b>"SWPU"</b> universitetining <b>"Computer engineering"</b> kurs talabasi, yuqoridagi dasturlar bo\'yicha mutaxassis  <a href="https://t.me/data_learning_centre/1487">Jamshidbek Qurbonboev</a> olib boradi.\n\n<a href="https://t.me/Data_Administrator">Administratorlar bilan aloqa</a>\n\nπ <b>Tel:</b> +99899-759-88-86\n\n π© <b>MoΚ»ljal:</b> Urganch, Darital, 2-qavat\n\nπ¨π»βπ»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{text: 'Kurs narxi haqida', callback_data: 'price5'}],
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}, {text: 'O\'qituvchi haqida', url: 'https://t.me/data_learning_centre/1487'}]
  ]
}})})

bot.action('price5', async (ctx) => {
  return  await ctx.answerCbQuery('Kompyuterni o\'rgan va hayotingni osonlashtir!\nKurs narxi chegirma bilan 455 000 ming so\'m.', true)
})
    


bot.hears('βοΈ Aloqa', async (ctx) => {
  return await ctx.reply('<b>π¨π»βπ»"DATA" - Xorazmda birinchi innovatsion texnologiyalar markazi bo\'lib hazoirgi kunda ko\'plab o\'quvchilarga IT sohasidagi eng yaxshi bilimlarni berib va ularni o\'z maqsadlari sari intilishiga ko\'maklashayotgan ta\'lim markazi hisoblanadi.</b>\n\n<b>Siz "DATA" markazida quyidagi kursalar orqali bilim olishingz mumkun.</b>\nπ» Web dasturlash \nπ± Android dasturlash\nπ₯ Video montaj\nπ Arxitektura va dizayn\nπ Arxitektura va SMETA ishlash\nπ₯ Kompyuter savadxonligi\n\n<b>Aloqa uchun</b>\n<b>π Tel:</b>  +998997598886\n<b>π Web Sayt:</b>  <a href="http://Datalearningcentre.uz">Datalearningcentre.uz</a>\n<b>π Manzil:</b>  Urganch, DARITAL\n<a href="https://t.me/Data_Administrator">π©  Administrator</a>\n<a href="https://form.jotform.com/201725058712451">π  Online ro\'yxatdan o\'tish</a>\n\nπ¨π»βπ»<b>"DATA"</b> - Xorazmda birinchi innovatsion texnologiyalar markazi\n\n<a href="https://t.me/data_learning_centre">Telegram</a> | <a href="https://instagram.com/data_learning_centre">Instagram</a> | <a href="https://youtube.com/data_learning_centre">You Tube</a>',
  {parse_mode: 'html', 
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
    [{text: 'Online anketa to\'ldirish', url: 'https://form.jotform.com/201725058712451'}]
  ]
}})})
  
 
bot.hears('π Main Menu', async (ctx) => {
  return await ctx.reply('π Main Menu', Markup
    .keyboard([
      ['πΉ DATA learning centreπΈ', 'π O\'quv kurslar'],
      ['βοΈ Aloqa', 'π Location'],
      ["π Registratsiya"],
    ])
    .resize()
  )
})



bot.hears('π Location', async (ctx) => {
  ctx.telegram.sendLocation(ctx.chat.id, 41.56044515274724, 60.607803062078204)
})


module.exports = bot





