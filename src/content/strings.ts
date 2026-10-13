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
      what: {
        uz: 'Telefon orqali hujum: qoʻngʻiroq qiluvchi bank yoki yordam xizmati nomidan kod soʻraydi.',
        en: 'The phone-call version: a caller poses as your bank or support and asks for a code.',
      },
    },
    trojan: {
      name: { uz: 'Troyan', en: 'Trojan' },
      what: {
        uz: 'Foydali koʻrinadigan dastur ichiga yashiringan zararli kod.',
        en: 'Malware hidden inside something that looks useful.',
      },
    },
    worm: {
      name: { uz: 'Qurt', en: 'Worm' },
      what: {
        uz: 'Hech kim bosmasa ham tarmoq boʻylab oʻzini oʻzi koʻchiradigan zararli dastur.',
        en: 'Malware that copies itself across a network with nobody clicking.',
      },
    },
    spyware: {
      name: { uz: 'Josuslik dasturi', en: 'Spyware' },
      what: {
        uz: 'Nima qilganingizni yashirin kuzatib, maʼlumotni chetga uzatadigan dastur.',
        en: 'Software that secretly watches what you do and reports it back.',
      },
    },
    rootkit: {
      name: { uz: 'Rutkit', en: 'Rootkit' },
      what: {
        uz: 'Tizim ichiga chuqur yashiringan va tekshiruv dasturlariga yolgʻon koʻrsatadigan zararli dastur.',
        en: 'Malware that buries itself deep in the system and lies to the tools looking for it.',
      },
    },
    adware: {
      name: { uz: 'Reklama dasturi', en: 'Adware' },
      what: {
        uz: 'Reklamani toʻxtovsiz koʻrsatadigan, baʼzan yonida battarini olib keladigan dastur.',
        en: 'Software that floods you with ads, sometimes bundling worse things.',
      },
    },
    ransomware: {
      name: { uz: 'Toʻlov talab qiluvchi dastur', en: 'Ransomware' },
      what: {
        uz: 'Fayllaringizni qulflab, ochish uchun pul talab qiladigan zararli dastur.',
        en: 'Malware that locks your files and demands payment to release them.',
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
