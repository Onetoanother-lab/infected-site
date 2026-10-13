import type { Localized } from '../types';

/**
 * Every user-facing string on the site, Uzbek first. See
 * .claude/skills/uz-copy/SKILL.md. Components never hard-code visible text.
 */
export interface StringTree {
  [key: string]: Localized | StringTree;
}

export const strings = {
  ui: {
    siteTitle: {
      uz: 'Zararlangan sahifa',
      en: 'The site that gets infected',
    },
    whatIs: { uz: 'Bu nima', en: 'What it is' },
    redFlag: { uz: 'Ogohlantiruvchi belgi', en: 'Red flag' },
    defense: { uz: 'Himoya', en: 'Defense' },
    example: { uz: 'Hayotdan misol', en: 'Recognition example' },
    tryIt: { uz: 'Sinab koʻring', en: 'Try it' },
    threatCount: { uz: 'Tahdid', en: 'Threat' },
    trackerTitle: { uz: 'Tahdidlar', en: 'Threats' },
    statePristine: { uz: 'tegilmagan', en: 'clean' },
    stateInfected: { uz: 'zararlangan', en: 'infected' },
    stateSecured: { uz: 'himoyalangan', en: 'secured' },
    scrollHint: { uz: 'Pastga suring', en: 'Scroll down' },
    reducedNotice: {
      uz: 'Kam harakat rejimi yoniq: animatsiya oʻrniga natija koʻrsatiladi.',
      en: 'Reduced motion is on: you see the end state instead of the animation.',
    },
    presenterTitle: { uz: 'Taqdimot tugmalari', en: 'Presenter shortcuts' },
    presenterJump: { uz: '1–9 — tahdidga oʻtish', en: '1–9 — jump to a threat' },
    presenterReset: { uz: 'R — sahifani tiklash', en: 'R — reset the page' },
    presenterHelp: { uz: '? — bu roʻyxat', en: '? — this list' },
    presenterClose: { uz: 'Esc — yopish', en: 'Esc — close' },
    resetDone: { uz: 'Sahifa tiklandi', en: 'Page reset' },
  },

  intro: {
    kicker: { uz: 'IT va ingliz tili darsi', en: 'An IT and English lesson' },
    title: {
      uz: 'Bu sahifa hozir toʻqqiz marta hujumga uchraydi.',
      en: 'This page is about to be attacked nine ways.',
    },
    lead: {
      uz: 'Har bir hujumni koʻrasiz, nomini bilasiz va uni qanday toʻxtatishni oʻrganasiz. Hammasi — animatsiya. Hech narsa haqiqiy emas, siz yozgan hech narsa yuborilmaydi.',
      en: 'You will see each attack, learn its name, and learn how to stop it. All of it is animation. Nothing here is real, and nothing you type is ever sent anywhere.',
    },
    promise: {
      uz: 'Har bir tahdid uch qadamda: hujum, tushuntirish, himoya.',
      en: 'Every threat in three beats: the attack, the explanation, the defense.',
    },
  },

  outro: {
    title: { uz: 'Sahifa tozalandi', en: 'The page is clean' },
    lead: {
      uz: 'Toʻqqiz tahdid, toʻqqiz himoya. Eng kuchli odat — shoshilmaslik va tekshirish.',
      en: 'Nine threats, nine defenses. The strongest habit is to slow down and verify.',
    },
    habits: {
      uz: 'Zaxira nusxa saqlang. Yangilanishlarni oʻrnating. Ikki bosqichli tasdiqlashni yoqing.',
      en: 'Keep backups. Install updates. Turn on 2FA.',
    },
  },

  stages: {
    phishing: {
      name: { uz: 'Fishing', en: 'Phishing' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'phishing', en: 'phishing' },
      what: {
        uz: 'Ishonchli nom ostida yozilgan yolgʻon xabar. Maqsadi — havolani bosishingiz yoki maʼlumotingizni berishingiz.',
        en: 'A fake message that pretends to be someone you trust, so that you click a link or hand over information.',
      },
      redFlag: {
        uz: 'Kutilmagan xabar, shoshiltirish va kirishni talab qiladigan havola.',
        en: 'An unexpected message, urgency, and a link that wants you to log in.',
      },
      defense: {
        uz: 'Xabardagi havolani bosmang. Saytga oʻzingiz kiring: manzilni qoʻlda yozing yoki xatchoʻpdan foydalaning. Yuboruvchini va domenni tekshiring. Ikki bosqichli tasdiqlashni yoqing.',
        en: 'Do not click links in messages. Reach the site yourself: type the address or use your own bookmark. Check the sender and the real domain. Turn on 2FA.',
      },
      example: {
        uz: '«Namuna Bank: hisobingiz 2 soatdan keyin bloklanadi. Tasdiqlang: namuna-bank.tasdiq-kirish.xyz»',
        en: '"Namuna Bank: your account will be blocked in 2 hours. Confirm here: namuna-bank.tasdiq-kirish.xyz"',
      },
      demoTitle: { uz: 'Haqiqiy yoki firibgar?', en: 'Real or scam?' },
      demoHint: {
        uz: 'Har bir xabarni baholang. Tanlovingiz faqat shu brauzerda qoladi.',
        en: 'Judge each message. Your choice stays in this browser only.',
      },
      demoReal: { uz: 'Haqiqiy', en: 'Real' },
      demoScam: { uz: 'Firibgar', en: 'Scam' },
      demoRight: { uz: 'Toʻgʻri', en: 'Correct' },
      demoWrong: { uz: 'Xato', en: 'Wrong' },
      demoScore: { uz: 'Natija', en: 'Score' },
      msg1From: { uz: 'Namuna Bank — Xavfsizlik', en: 'Namuna Bank — Security' },
      msg1Body: {
        uz: 'Hisobingiz 2 soatdan keyin bloklanadi. Hozir kirib tasdiqlang.',
        en: 'Your account will be blocked in 2 hours. Log in now to confirm.',
      },
      msg1Why: {
        uz: 'Firibgar: shoshiltirish va kirish havolasi.',
        en: 'Scam: urgency plus a login link.',
      },
      msg2From: { uz: 'Qalqon Pay', en: 'Qalqon Pay' },
      msg2Body: {
        uz: 'Oktabr hisobingiz ilovada. Hech narsa talab qilinmaydi.',
        en: 'Your October statement is attached. No action needed.',
      },
      msg2Why: {
        uz: 'Haqiqiy: shoshiltirish yoʻq, parol soʻralmaydi.',
        en: 'Real: no urgency, no password asked.',
      },
      msg3From: { uz: 'Namuna Bank yordam xizmati', en: 'Namuna Bank Support' },
      msg3Body: {
        uz: 'Sovrin yutdingiz. Bir martalik kodni yuboring va havolada parol kiriting.',
        en: 'You won a prize. Send us your one-time code and enter your password at the link.',
      },
      msg3Why: {
        uz: 'Firibgar: kod va parol soʻraladi. Bank bunday soʻramaydi.',
        en: 'Scam: it asks for your code and password. A bank never does.',
      },
    },

    pharming: {
      name: { uz: 'Farming', en: 'Pharming' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'pharming', en: 'pharming' },
      what: {
        uz: 'Manzilni toʻgʻri yozsangiz ham, yoʻnaltirish buzilgani uchun nusxa saytga tushasiz. Bu yerda bosish shart emas.',
        en: 'You type the right address, but tampering quietly sends you to a look-alike copy. No click is needed here.',
      },
      redFlag: {
        uz: 'Hammasini toʻgʻri qildingiz, lekin sayt boshqacha: sertifikat ogohlantirishi, gʻalati tus, oʻzgargan tugmalar.',
        en: 'You did everything right and the site is still off: a certificate warning, odd colours, buttons that moved.',
      },
      defense: {
        uz: 'Sertifikat va HTTPS ogohlantirishini hech qachon oʻtkazib yubormang. Qurilma va routerni yangilab turing. Ishonchli tarmoqdan kiring.',
        en: 'Never click past a certificate or HTTPS warning. Keep your device and router updated. Use networks you trust.',
      },
      example: {
        uz: '«namuna-bank.xyz — manzil toʻgʻri, lekin brauzer “sertifikat ishonchsiz” deydi va sahifa rangi boshqacha.»',
        en: '"namuna-bank.xyz — the address is right, but the browser says the certificate is untrusted and the page looks different."',
      },
      address: { uz: 'namuna-bank.xyz', en: 'namuna-bank.xyz' },
      demoTitle: { uz: 'Manzil toʻgʻri, sayt notoʻgʻri', en: 'Right address, wrong site' },
      demoHint: {
        uz: 'Brauzer manzilni raqamga aylantiradi. Shu jadval buzilsa, siz nusxaga tushasiz.',
        en: 'The browser turns the address into a number. Tamper with that table and you land on the copy.',
      },
      bookLabel: { uz: 'Manzillar jadvali', en: 'Address table' },
      serverLabel: { uz: 'Qaysi serverga boradi', en: 'Where it goes' },
      serverReal: { uz: 'Bank serveri', en: 'Bank server' },
      serverFake: { uz: 'Firibgar serveri', en: 'Attacker server' },
      pageReal: { uz: 'Namuna Bank — haqiqiy sahifa', en: 'Namuna Bank — the real page' },
      pageClone: { uz: 'Namuna Bank — nusxa sahifa', en: 'Namuna Bank — the copy' },
      certWarn: { uz: 'Sertifikat ishonchsiz', en: 'Certificate not trusted' },
      retry: { uz: 'Manzilni qayta yozish', en: 'Type the address again' },
      retryNote: {
        uz: 'Qayta yozish yordam bermaydi: jadval buzilgan boʻlsa, natija oʻsha.',
        en: 'Retyping does not help: while the table is poisoned, the result is the same.',
      },
      mockNote: {
        uz: 'Bu soxta kirish oynasi — darsning bir qismi. Bu yerda hech narsa yozilmaydi va yuborilmaydi.',
        en: 'This login box is a prop for the lesson. Nothing can be typed here and nothing is sent.',
      },
      mockUser: { uz: 'Login', en: 'Username' },
      mockPass: { uz: 'Parol', en: 'Password' },
    },
    vishing: {
      name: { uz: 'Ovozli fishing', en: 'Vishing' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'vishing', en: 'vishing' },
      what: {
        uz: 'Telefon orqali hujum: qoʻngʻiroq qiluvchi bank yoki yordam xizmati nomidan kod soʻraydi.',
        en: 'The phone-call version: a caller poses as your bank or support and asks for a code.',
      },
      redFlag: {
        uz: 'Kutilmagan qoʻngʻiroq bir martalik kod, parol yoki masofaviy kirish soʻraydi. Shoshiltiradi va «hech kimga aytmang» deydi.',
        en: 'An inbound call asks for a one-time code, a password or remote access. It rushes you and asks you to keep quiet.',
      },
      defense: {
        uz: 'Goʻshakni qoʻying. Raqamni oʻzingiz tering: karta orqasidagi yoki rasmiy ilovadagi raqam. Bank bir martalik kodni hech qachon soʻramaydi.',
        en: 'Hang up. Dial the number yourself — the one on the back of your card or in the official app. A bank never asks for your one-time code.',
      },
      example: {
        uz: '«Xavfsizlik xizmati» deb qoʻngʻiroq qiladi, SMSdagi kodni aytishni soʻraydi va liniyada qolishni talab qiladi.',
        en: 'A caller says they are "the security team", asks you to read out the code from the SMS and to stay on the line.',
      },
      demoTitle: { uz: 'Qoʻngʻiroqni eshiting va belgilarni toping', en: 'Listen to the call and spot the signs' },
      demoHint: {
        uz: 'Bu sahna — matn bilan koʻrsatiladi. Mikrofon ishlatilmaydi, hech narsa yozilmaydi va yuborilmaydi.',
        en: 'This scene is played as text. No microphone is used, nothing is recorded and nothing is sent.',
      },
      callerName: { uz: 'NAMUNA BANK — XAVFSIZLIK', en: 'NAMUNA BANK — SECURITY' },
      callerNumber: { uz: '+000 00 123-45-67', en: '+000 00 123-45-67' },
      statusIncoming: { uz: 'Kiruvchi qoʻngʻiroq', en: 'Incoming call' },
      statusLive: { uz: 'Suhbat davom etmoqda', en: 'Call in progress' },
      statusEnded: { uz: 'Qoʻngʻiroq tugadi', en: 'Call ended' },
      statusCallback: { uz: 'Siz oʻzingiz qoʻngʻiroq qildingiz', en: 'You called back yourself' },
      callbackName: { uz: 'KARTA ORQASIDAGI RAQAM', en: 'THE NUMBER ON YOUR CARD' },
      replay: { uz: 'Qoʻngʻiroqni qayta eshitish', en: 'Play the call again' },
      hangup: { uz: 'Goʻshakni qoʻyish', en: 'Hang up' },
      line1: {
        uz: '«Bankdan qoʻngʻiroq qilyapmiz. Hisobingizda shubhali amaliyot.»',
        en: '"We are calling from the bank. There is suspicious activity on your account."',
      },
      flag1: { uz: 'Kutilmagan qoʻngʻiroq', en: 'An unexpected call' },
      line2: {
        uz: '«Pul yechilishini hozir toʻxtatamiz. Vaqt kam.»',
        en: '"We can stop the withdrawal right now. There is no time."',
      },
      flag2: { uz: 'Shoshiltirish', en: 'Urgency' },
      line3: {
        uz: '«Hech kimga aytmang va liniyada qoling.»',
        en: '"Do not tell anyone and stay on the line."',
      },
      flag3: { uz: 'Sir saqlashni talab qilish', en: 'Demanding secrecy' },
      line4: {
        uz: '«SMSdagi bir martalik kodni ayting.»',
        en: '"Read out the one-time code from the SMS."',
      },
      flag4: { uz: 'Bir martalik kod soʻrash', en: 'Asking for a one-time code' },
      flagsTitle: { uz: 'Ogohlantiruvchi belgilar', en: 'Warning signs' },
      outcomeTitle: { uz: 'Toʻgʻri javob', en: 'The right answer' },
      outcome: {
        uz: 'Goʻshakni qoʻydingiz va raqamni oʻzingiz terdingiz. Kod faqat sizda qoldi.',
        en: 'You hung up and dialled the number yourself. The code stayed with you.',
      },
    },
    trojan: {
      name: { uz: 'Troyan', en: 'Trojan' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'trojan', en: 'trojan' },
      what: {
        uz: 'Foydali koʻrinadigan dastur ichiga yashiringan zararli kod.',
        en: 'Malware hidden inside something that looks useful.',
      },
      redFlag: {
        uz: '«Bepul premium», buzilgan dastur, kutilmagan biriktirma, notanish havoladan yuklangan oʻrnatuvchi.',
        en: '"Free premium", a cracked app, an unexpected attachment, an installer from a link you do not know.',
      },
      defense: {
        uz: 'Faqat rasmiy doʻkondan va rasmiy saytdan oʻrnating. Juda shirin taklifga ishonmang. Himoya dasturini yoqiq saqlang. Ilovaga kerakmas ruxsat bermang.',
        en: 'Install only from the official store or the official site. Do not trust an offer that is too good. Keep your protection on. Give an app no more rights than it needs.',
      },
      example: {
        uz: '«Kino Plus Premium — bepul» deb tarqatilgan oʻrnatuvchi ichida yashirin dastur chiqadi.',
        en: 'An installer passed around as "Kino Plus Premium — free" turns out to carry a hidden program.',
      },
      demoTitle: { uz: 'Rentgenni yoqing', en: 'Turn on the X-ray' },
      demoHint: {
        uz: 'Lupani ilova ustiga olib boring yoki tugmani bosing — ichida nima borligi koʻrinadi.',
        en: 'Move the lens over an app or press the button, and you see what is inside.',
      },
      xray: { uz: 'Rentgen', en: 'X-ray' },
      sourceLabel: { uz: 'Manba', en: 'Source' },
      insideLabel: { uz: 'Ichida', en: 'Inside' },
      clean: { uz: 'Toza', en: 'Clean' },
      hidden: { uz: 'Yashirin dastur', en: 'Hidden program' },
      storeOfficial: { uz: 'Rasmiy doʻkon', en: 'Official store' },
      storeUnknown: { uz: 'Notanish havola', en: 'A link you do not know' },
      app1: { uz: 'Kino Plus — bepul premium', en: 'Kino Plus — free premium' },
      app2: { uz: 'Maktab Lugʻat', en: 'Maktab Dictionary' },
      app3: { uz: 'Qalqon Pay', en: 'Qalqon Pay' },
      installing: { uz: 'Oʻrnatilmoqda', en: 'Installing' },
      installed: { uz: 'Oʻrnatildi', en: 'Installed' },
      removed: { uz: 'Oʻchirildi', en: 'Removed' },
      defendNote: {
        uz: 'Rasmiy doʻkondan olingan ilovalar qoldi. Notanish manbadagisi oʻchirildi.',
        en: 'The apps from the official store stayed. The one from the unknown link was removed.',
      },
    },
    worm: {
      name: { uz: 'Qurt', en: 'Worm' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'worm', en: 'worm' },
      what: {
        uz: 'Hech kim bosmasa ham tarmoq boʻylab oʻzini oʻzi koʻchiradigan zararli dastur.',
        en: 'Malware that copies itself across a network with nobody clicking.',
      },
      redFlag: {
        uz: 'Juda tez tarqaladi. Bir vaqtning oʻzida koʻp qurilma ishdan chiqadi. Tizimlar yangilanmagan boʻladi.',
        en: 'It spreads fast. Many machines go down at once. The systems are behind on updates.',
      },
      defense: {
        uz: 'Yangilanishni kechiktirmang. Tarmoqni boʻlaklarga ajrating. Zaxira nusxani saqlab turing.',
        en: 'Patch without delay. Split the network into segments. Keep backups.',
      },
      example: {
        uz: 'WannaCry (2017): tuzatma chiqqanidan oylar oʻtgach ham yangilanmagan tizimlar boʻylab tarqaldi.',
        en: 'WannaCry (2017): it spread through systems that were still unpatched months after a fix existed.',
      },
      demoTitle: { uz: 'Qurtni qoʻyib yuboring', en: 'Release the worm' },
      demoHint: {
        uz: 'Har bir nuqta — bitta qurilma. Halqali nuqta — yangilangan qurilma.',
        en: 'Each dot is one machine. A ringed dot is a patched machine.',
      },
      patchLabel: { uz: 'Yangilangan qurilmalar', en: 'Patched machines' },
      release: { uz: 'Qurtni qoʻyib yuborish', en: 'Release the worm' },
      infectedLabel: { uz: 'Zararlandi', en: 'Infected' },
      heldLabel: { uz: 'Toʻxtatdi', en: 'Held' },
      resultOpen: {
        uz: 'Yangilanmagan tarmoq: qurt bir necha soniyada hamma yoqqa tarqaldi.',
        en: 'An unpatched network: the worm reached everything in seconds.',
      },
      resultHeld: {
        uz: 'Yangilangan qurilmalar qurtni toʻxtatdi — tarqalish uzildi.',
        en: 'The patched machines stopped the worm and the spread broke apart.',
      },
    },
    spyware: {
      name: { uz: 'Josuslik dasturi', en: 'Spyware' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'spyware', en: 'spyware' },
      what: {
        uz: 'Nima qilganingizni yashirin kuzatib, maʼlumotni chetga uzatadigan dastur.',
        en: 'Software that secretly watches what you do and reports it back.',
      },
      redFlag: {
        uz: 'Batareya va trafik sababsiz koʻpayadi. Yodingizda yoʻq ruxsatlar bor. Oʻzingiz oʻrnatmagan ilova turadi.',
        en: 'Battery and data use climb for no reason. There are permissions you do not remember giving. An app you did not install is sitting there.',
      },
      defense: {
        uz: 'Ilova ruxsatlarini koʻrib chiqing va keraksizini oʻchiring. Faqat ishonchli manbadan oʻrnating. Tizimni yangilang.',
        en: 'Review app permissions and switch off what is not needed. Install only from trusted sources. Keep the system updated.',
      },
      example: {
        uz: 'Oddiy fonar ilovasi joylashuv va kontaktlarga ruxsat soʻrasa — bu ortiqcha.',
        en: 'A plain torch app that asks for your location and contacts is asking for too much.',
      },
      demoTitle: { uz: 'Shu qutidagi harakatlaringiz', en: 'What you just did in this box' },
      demoHint: {
        uz: 'Quyida faqat shu quti ichida qilgan harakatlaringiz koʻrinadi. Hech narsa saqlanmaydi va hech qayerga yuborilmaydi. Yozgan matn olinmaydi.',
        en: 'Below you see only what you did inside this box. Nothing is stored and nothing is sent anywhere. No typed text is taken.',
      },
      targetImage: { uz: 'Rasm', en: 'Picture' },
      targetButton: { uz: 'Tugma', en: 'Button' },
      targetText: { uz: 'Matn', en: 'Text' },
      eventHover: { uz: 'ustida turdingiz', en: 'you hovered here' },
      eventClick: { uz: 'bosdingiz', en: 'you clicked' },
      eventPause: { uz: 'toʻxtab qoldingiz', en: 'you paused' },
      logTitle: { uz: 'Kuzatuv oynasi', en: 'The watch window' },
      logEmpty: { uz: 'Hozircha boʻsh. Quyidagi uchta katakka tegib koʻring.', en: 'Empty so far. Touch the three tiles below.' },
      permTitle: { uz: 'Olingan ruxsatlar', en: 'Permissions taken' },
      permLocation: { uz: 'Joylashuv', en: 'Location' },
      permContacts: { uz: 'Kontaktlar', en: 'Contacts' },
      permUsage: { uz: 'Ilova tarixi', en: 'App history' },
      permOn: { uz: 'yoqilgan', en: 'on' },
      permOff: { uz: 'oʻchirilgan', en: 'off' },
      wipe: { uz: 'Roʻyxatni oʻchirish', en: 'Wipe the list' },
      wiped: {
        uz: 'Roʻyxat oʻchirildi. Hech qayerda nusxa qolmadi.',
        en: 'The list is wiped. No copy was left anywhere.',
      },
    },
    rootkit: {
      name: { uz: 'Rutkit', en: 'Rootkit' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'rootkit', en: 'rootkit' },
      what: {
        uz: 'Tizim ichiga chuqur yashiringan va tekshiruv dasturlariga yolgʻon koʻrsatadigan zararli dastur.',
        en: 'Malware that buries itself deep in the system and lies to the tools looking for it.',
      },
      redFlag: {
        uz: 'Raqamlar toʻgʻri kelmaydi: umumiy yuk yuqori, roʻyxatda esa sabab yoʻq. Ichki tekshiruv «toza» deyaveradi.',
        en: 'The numbers do not add up: the total load is high and the list shows no reason for it. The scan from inside keeps saying "clean".',
      },
      defense: {
        uz: 'Xavfsiz yuklash va yaxlitlik tekshiruvini yoqing. Ishonchli tashqi vositadan skaner qiling. Shubha boʻlsa, tizimni toza nusxadan qayta oʻrnating.',
        en: 'Turn on secure boot and integrity checks. Scan from trusted media outside the system. When in doubt, rebuild from a clean image.',
      },
      example: {
        uz: 'Vazifalar menejeri 36% koʻrsatadi, lekin umumiy yuk 91% — farq yashirin jarayonniki.',
        en: 'The task manager adds up to 36% while the total load is 91% — the gap belongs to a hidden process.',
      },
      demoTitle: { uz: 'Ichkaridan koʻrinmaydi', en: 'Invisible from the inside' },
      demoHint: {
        uz: 'Roʻyxatdagi sonlarni qoʻshing va umumiy yuk bilan solishtiring.',
        en: 'Add up the numbers in the list and compare them with the total load.',
      },
      listLabel: { uz: 'Roʻyxatdagi jarayonlar', en: 'Processes listed' },
      totalLabel: { uz: 'Umumiy yuk', en: 'Total load' },
      sumLabel: { uz: 'Roʻyxat yigʻindisi', en: 'Sum of the list' },
      proc1: { uz: 'tizim', en: 'system' },
      proc2: { uz: 'brauzer', en: 'browser' },
      proc3: { uz: 'matn muharriri', en: 'text editor' },
      proc4: { uz: 'musiqa', en: 'music' },
      procHidden: { uz: 'yashirin jarayon', en: 'hidden process' },
      scanInside: { uz: 'Ichkaridan tekshirish', en: 'Scan from inside' },
      scanOutside: { uz: 'Tashqaridan tekshirish', en: 'Scan from outside' },
      insideResult: { uz: 'Ichki tekshiruv: hech narsa topilmadi.', en: 'Scan from inside: nothing found.' },
      outsideResult: { uz: 'Tashqi tekshiruv: yashirin jarayon topildi.', en: 'Scan from outside: the hidden process was found.' },
      cleanedResult: {
        uz: 'Tizim toza nusxadan tiklandi. Endi raqamlar toʻgʻri keladi.',
        en: 'The system was rebuilt from a clean image. Now the numbers add up.',
      },
    },
    adware: {
      name: { uz: 'Reklama dasturi', en: 'Adware' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'adware', en: 'adware' },
      what: {
        uz: 'Reklamani toʻxtovsiz koʻrsatadigan, baʼzan yonida battarini olib keladigan dastur.',
        en: 'Software that floods you with ads, sometimes bundling worse things.',
      },
      redFlag: {
        uz: 'Oynalar ketma-ket chiqadi. Soxta «yopish» tugmasi yangisini ochadi. Brauzer bosh sahifasi oʻzi oʻzgaradi.',
        en: 'Pop-ups come one after another. A fake "close" button opens a new one. The browser home page changes by itself.',
      },
      defense: {
        uz: 'Reklama bloklagichni yoqing. Notanish kengaytma va ilovalarni oʻchiring. Brauzer sozlamalarini tiklang.',
        en: 'Turn on an ad blocker. Remove extensions and apps you do not know. Reset the browser.',
      },
      example: {
        uz: '«Siz yutdingiz!» oynasi yopilmaydi: har bosganda yangisi chiqaveradi.',
        en: 'A "You won!" window will not close: every press brings another one.',
      },
      demoTitle: { uz: 'Oynalar toʻplanadi', en: 'The windows pile up' },
      demoHint: {
        uz: 'Soxta yopish tugmasini bosib koʻring. Keyin tozalashni bosing.',
        en: 'Try the fake close button. Then press the cleanup.',
      },
      ad1: { uz: 'Siz yutdingiz!', en: 'You won!' },
      ad2: { uz: 'Telefoningiz sekinlashdi', en: 'Your phone is slow' },
      ad3: { uz: 'Bepul sovgʻa', en: 'Free gift' },
      ad4: { uz: 'Hoziroq bosing', en: 'Press right now' },
      closeHint: { uz: 'Yopish tugmasi — yolgʻon', en: 'The close button is a lie' },
      cleanup: { uz: 'Tozalash', en: 'Clean up' },
      countLabel: { uz: 'Oynalar', en: 'Windows' },
      cleaned: {
        uz: 'Bloklagich yoqildi, notanish kengaytma oʻchirildi — oynalar yoʻqoldi.',
        en: 'The blocker is on, the unknown extension is gone, and the windows went with it.',
      },
    },
    ransomware: {
      name: { uz: 'Toʻlov talab qiluvchi dastur', en: 'Ransomware' },
      // the English term the class is learning, shown next to the name
      term: { uz: 'ransomware', en: 'ransomware' },
      what: {
        uz: 'Fayllaringizni qulflab, ochish uchun pul talab qiladigan zararli dastur.',
        en: 'Malware that locks your files and demands payment to release them.',
      },
      redFlag: {
        uz: 'Fayllar birdan ochilmay qoladi, nomi oʻzgaradi, ekranda toʻlov xati va taymer paydo boʻladi.',
        en: 'Files suddenly will not open, their names change, and a ransom note with a countdown appears.',
      },
      defense: {
        uz: 'Zaxira nusxani oflayn saqlang (3-2-1 qoidasi). Yangilanishni oʻrnating. Toʻlamang: toʻlov keyingi hujumni moliyalaydi va fayllar qaytishiga kafolat bermaydi. Xabar bering.',
        en: 'Keep offline backups (the 3-2-1 rule). Install updates. Do not pay: paying funds the next attack and does not guarantee your files back. Report it.',
      },
      example: {
        uz: 'Ish papkangizdagi fayllar nomi oʻzgaradi va ekranda taymerli xat chiqadi.',
        en: 'The files in your work folder get new names and a note with a timer takes over the screen.',
      },
      demoTitle: { uz: 'Soxta qulf', en: 'A fake lock' },
      demoHint: {
        uz: 'Bu yerda hech narsa shifrlanmaydi. Faqat shu qutidagi matn koʻrinishi oʻzgaradi. Qurilmangizga tegilmaydi.',
        en: 'Nothing here is encrypted. Only the look of the text in this box changes. Your device is not touched.',
      },
      backupQuestion: { uz: 'Zaxira nusxangiz bormi?', en: 'Do you have a backup?' },
      backupYes: { uz: 'Ha, zaxira nusxam bor', en: 'Yes, I have a backup' },
      backupNo: { uz: 'Yoʻq, zaxira nusxam yoʻq', en: 'No, I have no backup' },
      docTitle: { uz: 'Mening hujjatlarim', en: 'My documents' },
      doc1: { uz: 'Dars jadvali va uy vazifalari', en: 'Class timetable and homework' },
      doc2: { uz: 'Oilaviy suratlar roʻyxati', en: 'List of family photos' },
      doc3: { uz: 'Loyiha hisoboti — oxirgi variant', en: 'Project report — final version' },
      noteTitle: { uz: 'Fayllaringiz qulflandi', en: 'Your files are locked' },
      noteBody: {
        uz: 'Ekranda toʻlov talab qilinadi va taymer ketadi. Shu payt qaror zaxira nusxaga bogʻliq.',
        en: 'The screen demands payment while a timer runs. What happens next depends on your backup.',
      },
      timerLabel: { uz: 'Qolgan vaqt', en: 'Time left' },
      dontPay: { uz: 'Toʻlamang', en: 'Do not pay' },
      restoreFast: {
        uz: 'Zaxira nusxa bor edi: fayllar oflayn nusxadan tiklandi, toʻlov shart emas.',
        en: 'There was a backup: the files came back from the offline copy and no payment was needed.',
      },
      restoreSlow: {
        uz: 'Zaxira nusxa yoʻq edi: fayllar qaytmasligi mumkin. Baribir toʻlamang va xabar bering — bugundan zaxira nusxa oling.',
        en: 'There was no backup: the files may be gone. Still do not pay, report it, and start keeping backups today.',
      },
    },
  },
} satisfies StringTree;

/** Look up a dotted path, e.g. 'stages.phishing.redFlag'. Throws on a typo. */
export function lookup(path: string): Localized {
  const found = tryLookup(path);
  if (!found) throw new Error(`Missing string: ${path}`);
  return found;
}

/** Same lookup, but returns undefined for a key that is not written yet. */
export function tryLookup(path: string): Localized | undefined {
  const parts = path.split('.');
  let node: Localized | StringTree | undefined = strings as StringTree;
  for (const part of parts) {
    if (node === undefined || typeof node !== 'object') return undefined;
    node = (node as StringTree)[part];
  }
  if (!node || typeof (node as Localized).uz !== 'string') return undefined;
  return node as Localized;
}
