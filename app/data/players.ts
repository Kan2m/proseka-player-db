export type TournamentKey =
  | "RAGE"
  | "cs21A"
  | "cs22S"
  | "cs22A"
  | "cs23S"
  | "wcs24"
  | "cs24A"
  | "cs25"
  | "cs26"
  | "white2025"
  | "white2026"

export type Achievement =
  | "個人優勝"
  | "ダブルス優勝"
  | "チーム優勝"
  | "個人準優勝"
  | "ダブルス準優勝"
  | "チーム準優勝"
  | "個人3位"
  | "個人4位"
  | "個人5位"
  | "準決勝進出"
  | "準々決勝進出";

export type Player = {
  id: string;
  name: string;
  twitter: string;
  appearances: number;
  result: string;
  achievements?: Achievement[];
  aliases?: string[];
  tournaments: Partial<Record<TournamentKey, boolean>>;
  notes?: string;
};

export const tournamentNames: Record<TournamentKey, string> = {
  RAGE: "RAGE プロジェクトセカイ 2020 Winter",
  cs21A: "プロセカChampionship 2021 Autumn",
  cs22S: "プロセカChampionship 2022 Spring",
  cs22A: "プロセカChampionship 2022 Autumn",
  cs23S: "プロセカChampionship 2023 Spring",
  wcs24: "プロセカWorldChampionship 2024 Spring",
  cs24A: "プロセカChampionship 2024 Autumn",
  cs25: "プロセカChampionship 2025 in プロセカ感謝祭",
  cs26: "プロセカChampionship 2026 in プロセカ感謝祭",
  white2025: "ほわいと杯2025 OFFLINE",
  white2026: "ほわいと杯2026 OFFLINE",
};

export const tournamentOrder: TournamentKey[] = [
  "RAGE",
  "cs21A",
  "cs22S",
  "cs22A",
  "cs23S",
  "wcs24",
  "cs24A",
  "cs25",
  "cs26",
  "white2025",
  "white2026",
];

export const players: Player[] = [
  {
    id: "kan",
    name: "かん",
    twitter: "@_Kan2M",
    appearances: 6,
    result: "優勝",
     achievements: [
    "個人優勝",
    "ダブルス準優勝",
  ],
    tournaments: {
      cs22S: true,
      cs22A: true,
      cs23S: true,
      wcs24: true,
      cs25: true,
      cs26: true,
      white2025: true,
    },
    notes: "2度の優勝(2022CS Spring 2023CS Spring) / ほわいと杯2025は個人戦4位、ダブルス部門準優勝",
  },
  {
    id: "hps",
    name: "HPS",
    twitter: "@nkqsh_hxpos1210",
    appearances: 6,
    result: "準優勝",
    achievements: [
    "個人準優勝",
    "個人3位",
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
      cs22S: true,
      cs22A: true,
      cs23S: true,
      wcs24: true,
      white2026: true,
    },
    notes: "RAGE2020で準優勝 / WCS2024で3位"
  },
  {
    id: "ren",
    name: "REN",
    twitter: "@RENo3o_",
    appearances: 6,
    result: "準優勝",
     achievements: [
    "個人3位",
    "個人4位",
    "ダブルス準優勝",
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
      wcs24: true,
      cs24A: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "CS2024 Autumnで3位 / ほわいと杯2025、2026共に両部門で出場、2025ではダブルス部門で準優勝 / 2026では個人戦で4位 / 第4回APマラソンで優勝"
  },
  {
    id: "reo",
    name: "れ",
    twitter: "@reo71784202",
    appearances: 5,
    result: "優勝",
    aliases: ["まろやかれおちゃ♪" ,"デーモンコアくん"],
     achievements: [
    "個人優勝",
    "個人準優勝",
  ],
    tournaments: {
      cs23S: true,
      wcs24: true,
      cs24A: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "唯一の個人戦二連覇(2024CS 2025CS) 2023CSはU-12部門出場。過去に「まろやかれおちゃ♪」「デーモンコアくん」名義で出場 / 第2回APマラソンで優勝",
  },
  {
    id: "temp",
    name: "temp",
    twitter: "@IoItemp",
    appearances: 5,
    result: "3位",
     achievements: [
    "個人3位",
  ],
    tournaments: {
      cs23S: true,
      wcs24: true,
      cs24A: true,
      cs25: true,
      cs26: true,
    },
    notes: "CS2023で3位"
  },
  {
    id: "nanase",
    name: "ななせ",
    twitter: "@7tokiwa7",
    appearances: 5,
    result: "準決勝",
    aliases: ["常磐#tok!wa"],
    achievements: [
      "準決勝進出",
    ],
    tournaments: {
      cs23S: true,
      wcs24: true,
      cs24A: true,
      cs25: true,
      cs26: true,
    },
    notes: "過去に「常盤 #tok!wa」名義で出場",
  },
  {
    id: "lily",
    name: "リリィ",
    twitter: "@RIALEYMX",
    appearances: 5,
    result: "準決勝",
    aliases: ["り"],
    achievements: [
    "準決勝進出",
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
      wcs24: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "過去に「り」名義で出場",
  },
  {
    id: "stk",
    name: "STK",
    twitter: "@STKo3o",
    appearances: 4,
    result: "優勝",
    achievements: [
    "個人優勝",
    "個人準優勝",
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
      wcs24: true,
      cs24A: true,
      white2025: true,
    },
    notes: "WCS2024で優勝",
  },
  {
    id: "takuan",
    name: "たくあん",
    twitter: "@Takuanhaumaiyo",
    appearances: 4,
    result: "優勝",
    achievements: [
    "個人優勝",
    "チーム優勝"
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
      cs22S: true,
      cs22A: true,
    },
    notes: "2度の優勝(2021CS 2022CS Spring)",
  },
  {
    id: "ruri",
    name: "瑠璃",
    twitter: "@rurichang_38M",
    appearances: 4,
    result: "優勝",
    achievements: [
    "個人優勝",
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
      cs22S: true,
      cs22A: true,
    },
    notes: "初代王者",
  },
  {
    id: "kai",
    name: "カイ",
    twitter: "@shoshin39633019",
    appearances: 4,
    result: "優勝",
    aliases: ["初心者"],
    achievements: [
    "個人優勝",
    "個人準優勝",
    "個人4位",
    "ダブルス優勝",
    "ダブルス準優勝",
  ],
    tournaments: {
      cs23S: true,
      wcs24: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "CS2023 SpringはU-12部門で出場し4位 / 過去に「初心者」名義で出場 / CS2025で準優勝 / ほわいと杯2025では両部門優勝 / ほわいと杯2026ではダブルスにて準優勝",
  },
  {
    id: "kanpari",
    name: "かんぱり",
    twitter: "@kwang8e_jp",
    appearances: 4,
    result: "4位",
    achievements: [
    "個人4位",
  ],
    tournaments: {
      cs22S: true,
      wcs24: true,
      cs24A: true,
      cs25: true,
      white2025: true,
    },
    notes: "2024CS Autumnで4位"
  },
  {
    id: "eff",
    name: "Eff",
    twitter: "@Eff_256",
    appearances: 4,
    result: "5位",
    achievements: [
    "個人5位",
  ],
    tournaments: {
      wcs24: true,
      cs24A: true,
      cs25: true,
      cs26: true,
    },
    notes: "2025CSで5位"
  },
  {
    id: "matezon",
    name: "matezon",
    twitter: "@matezon_touhu",
    appearances: 3,
    result: "優勝",
    achievements: [
    "個人準優勝",
    "チーム優勝"
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
      cs24A: true,
      white2025: true,
    },
    notes: "2022CS Autumn チーム「Unofficial Club」にて優勝 / 2023CS Springでは準優勝"
  },
  {
    id: "magisa",
    name: "マギサ",
    twitter: "@magisa_alfa",
    appearances: 3,
    result: "優勝",
    achievements: [
    "チーム優勝",
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
      cs22A: true,
    },
    notes: "2022CS Spring チーム「ちから」にて優勝"
  },
  {
    id: "koma",
    name: "Koma.",
    twitter: "@Koma_rhythm333",
    appearances: 3,
    result: "優勝",
    achievements: [
    "個人優勝",
    "個人準優勝"
  ],
    tournaments: {
      cs23S: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "2023CSはU-12部門で出場し優勝 / ほわいと杯2025では個人ダブルス両部門で出場、個人戦では準優勝 / ほわいと杯2026では個人戦で準優勝 / 第5回APマラソンで完走し優勝",
  },
  {
    id: "abeyu",
    name: "あべゆー",
    twitter: "@uuyeba",
    appearances: 3,
    result: "準優勝",
    achievements: [
    "個人準優勝",
  ],
    tournaments: {
      cs22S: true,
      cs23S: true,
      wcs24: true,
    },
    notes: "WCS2024で準優勝"
  },
  {
    id: "gau",
    name: "がう。",
    twitter: "@micon_mh",
    appearances: 3,
    result: "準優勝",
    achievements: [
    "チーム準優勝",
    "準決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
      cs22A: true,
    },
    notes: "2022CS Autumn チーム「QAP部」にて準優勝"
  },
  {
    id: "purin",
    name: "プリン",
    twitter: "@prin_pros",
    appearances: 3,
    result: "準優勝",
    achievements: [
    "チーム準優勝",
    "準々決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
      cs22A: true,
    },
    notes: "2022CS Autumn チーム「QAP部」にて準優勝"
  },
  {
    id: "fushoku",
    name: "腐食",
    twitter: "@MaengZombie",
    appearances: 3,
    result: "準決勝",
    achievements: [
    "準決勝進出",
  ],
    tournaments: {
      cs22S: true,
      cs22A: true,
      cs23S: true,
    },
  },
  {
    id: "carbo",
    name: "かるぼ",
    twitter: "@CARBO28473",
    appearances: 3,
    result: "優勝",
    achievements: [
    "ダブルス優勝",
    "準決勝進出",
  ],
    tournaments: {
      wcs24: true,
      cs25: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "ほわいと杯2025 ダブルス部門で優勝 / 過去に「カルボナーラ24時」名義で出場",
  },
  {
    id: "kiranyan",
    name: "きらにゃん",
    twitter: "@kiranyan0331",
    appearances: 3,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      wcs24: true,
      cs24A: true,
      cs26: true,
    },
  },
  {
    id: "kalriel",
    name: "かるりーる",
    twitter: "@kalriel_grmk",
    appearances: 3,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs22S: true,
      cs25: true,
      cs26: true,
      white2026: true,
    },
  },
  {
    id: "mirarii",
    name: "MiRaRii＊",
    twitter: "@unli_Rii",
    appearances: 3,
    result: "準々決勝",
    aliases:["MiRaRii*"],
    achievements: [
    "準々決勝進出",
  ],
    tournaments: {
      cs21A: true,
      cs22S: true,
      cs22A: true,
    },
  },
  {
    id: "shino",
    name: "しの",
    twitter: "@shino04200181",
    appearances: 3,
    result: "準々決勝",
    achievements: [
    "準々決勝進出",
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
      cs22A: true,
    },
  },
  {
    id: "glacia",
    name: "ぐれいしあ",
    twitter: "@glacia02x",
    appearances: 2,
    result: "優勝",
    achievements: [
    "チーム優勝",
    "準決勝進出"
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
    },
    notes: "2022CS Autumn チーム「Unofficial Club」にて優勝"
  },
  {
    id: "higllus",
    name: "ヒグルース",
    twitter: "@higllusMM",
    appearances: 2,
    result: "優勝",
    achievements: [
    "チーム優勝",
    "準決勝進出"
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
    },
    notes: "2022CS Autumn チーム「Unofficial Club」にて優勝"
  },
  {
    id: "hachimaru",
    name: "はちまるご",
    twitter: "@hcbtmn",
    appearances: 2,
    result: "準優勝",
    achievements: [
    "チーム準優勝",
    "準々決勝進出"
  ],
    tournaments: {
      cs21A: true,
      cs22S: true,
    },
    notes: "2022CS Spring チーム「ねてる」にて準優勝"
  },
  {
    id: "sprite",
    name: "sprite",
    twitter: "@sprite_tk",
    appearances: 2,
    result: "準優勝",
    achievements: [
    "チーム準優勝"
  ],
    tournaments: {
      cs22S: true,
      cs22A: true,
    },
    notes: "2022CS Autumn チーム「QAP部」にて準優勝"
  },
  {
    id: "hinata",
    name: "ひなたさん",
    twitter: "@3r_1na",
    appearances: 2,
    result: "準優勝",
    aliases: ["ひなた"],
    achievements: [
    "チーム準優勝",
    "準決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
    },
    notes: "2022CS Spring チーム「ねてる」にて準優勝 / 過去に「ひなた」名義で出場"
  },
  {
    id: "miino",
    name: "みーのくん",
    twitter: "@10krtn",
    appearances: 2,
    result: "準優勝",
     aliases: ["な～の"],
    achievements: [
    "チーム準優勝",
    "準決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs22S: true,
    },
    notes: "2022CS Spring チーム「ねてる」にて準優勝"
  },
  {
    id: "tsukuyomi",
    name: "月読",
    twitter: "@Futabasaki_12",
    appearances: 2,
    result: "4位",
    aliases: ["ふたばさき"],
    achievements: [
    "個人4位"
  ],
    tournaments: {
      cs21A: true,
      cs23S: true,
    },
    notes: "過去に「ふたばさき」名義で出場 CS2023 Springにて4位",
  },
  {
    id: "ku",
    name: "く。",
    twitter: "@_k_nek0_",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs21A: true,
      cs24A: true,
    },
  },
  {
    id: "mido",
    name: "Mido*",
    aliases: ["mido*"],
    twitter: "@mido0502star",
    appearances: 2,
    result: "優勝",
    achievements: [
    "ダブルス優勝",
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      cs25: true,
      white2025: true,
      white2026: true,
    },
    notes: "ほわいと杯2026 ダブルス部門で優勝 消息は不明"
  },
  {
    id: "sameshima",
    name: "アーリング鮫島",
    twitter: "@mikaku_bakemon",
    appearances: 2,
    result: "準決勝",
    aliases: ["な～の"],
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
    },
    notes: "過去に「な〜の」名義で出場",
  },
  {
    id: "tsukishiro",
    name: "つきしろ",
    twitter: "@tsukishiro_7",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs22A: true,
      cs24A: true,
    },
  },
  {
    id: "haku",
    name: "はく",
    twitter: "@whity_tab",
    appearances: 2,
    result: "準決勝",
　　aliases: ["HAKU"],
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs21A: true,
      cs22S: true,
    },
    notes: "過去に「HAKU」名義で出場",
  },
  {
    id: "rola",
    name: "ろら",
    twitter: "@rola_ch1",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
    },
  },
  {
    id: "kanen",
    name: "花念",
    twitter: "@L_F_Kanen",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs22A: true,
      cs23S: true,
      white2026: true,
    },
  },
  {
    id: "rinsan",
    name: "燐酸＊。",
    twitter: "@Mine2u39",
    appearances: 2,
    result: "準決勝",
    aliases: ["燐酸*。"],
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs21A: true,
      cs22S: true,
    },
  },
  {
    id: "tamago",
    name: "たまご",
    twitter: "@tamagokutta",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs25: true,
      cs26: true,
    },
  },
  {
    id: "mu2iic",
    name: "Mu2IIc",
    twitter: "@Mu2IIc_649",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      cs26: true,
    },
  },
  {
    id: "t",
    name: "T",
    twitter: "@T_main_1226",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      cs26: true,
    },
  },
  {
    id: "suigin",
    name: "水銀大塚",
    twitter: "@metalslime___",
    appearances: 2,
    result: "3位",
    achievements: [
    "個人3位",
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "ほわいと杯2026 個人戦部門で3位"
  },
  {
    id: "ykt",
    name: "ykt",
    twitter: "@ykt_mainacc",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs23S: true,
      cs26: true,
      white2025: true,
      white2026: true,
    },
    notes: "CS2023 SpringはU-12部門で出場 / 第7回、第8回APマラソンで2連覇",
  },
  {
    id: "kaya",
    name: "kaya",
    twitter: "@Kaya81249419",
    appearances: 2,
    result: "優勝",
    achievements: [
    "個人優勝",
    "ダブルス優勝",
    "準決勝進出"
  ],
    tournaments: {
      cs25: true,
      cs26: true,
      white2026: true,
    },
    notes: "ほわいと杯2026にて両部門で優勝"
  },
  {
    id: "lodge",
    name: "Lodge",
    twitter: "@Lodge_M82",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs22A: true,
      cs26: true,
    },
  },
  {
    id: "str",
    name: "str",
    twitter: "@kkrstrong0",
    appearances: 2,
    result: "準々決勝",
    aliases: ["すとら"],
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      cs22S: true,
      wcs24: true,
    },
    notes: "過去に「すとら」名義で出場",
  },
  {
    id: "sakamochamocha",
    name: "さかもちゃもちゃ！",
    twitter: "@sakamocya_mocya",
    aliases: ["ピジャも"],
    appearances: 2,
    result: "準々決勝",
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
    },
    notes: "過去に「ピジャも」名義で出場",
  },
  {
    id: "exnc",
    name: "ヱ*XnC",
    twitter: "@ErinNnG_X",
    aliases: ["ヱ"],
    appearances: 2,
    result: "準々決勝",
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs22A: true,
    },
  },
  {
    id: "gamma",
    name: "γ",
    twitter: "@gamma_music",
    appearances: 2,
    result: "準々決勝",
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      RAGE: true,
      cs21A: true,
    },
  },
    {
    id: "aoringo",
    name: "アオりんご",
    twitter: "@nwv_sw",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
    　cs26: true,
      white2026: true,
    },
  },
  {
    id: "paly",
    name: "ぱりぃ",
    twitter: "@Paly_4_game",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      white2026: true,
    },
  },
  {
    id: "okaeri",
    name: "おかえり",
    twitter: "@okaeri_astrv",
    appearances: 1,
    result: "準々決勝",
    notes: "ランクマッチ10000粒で一位。",
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      white2026: true,
    },
  },
  {
    id: "rsa",
    name: "RSA",
    twitter: "@RSA_3435",
    appearances: 2,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs24A: true,
      white2026: true,
    },
    notes: "第10回APマラソンで優勝"
  },
  {
    id: "kanaeru",
    name: "かなえる",
    twitter: "@Eluch1shama_K",
    appearances: 1,
    result: "準々決勝",
    aliases: ["えるち"],
    achievements: [
    "準々決勝進出"
  ],
    tournaments: {
      white2025: true,
      white2026: true,
    },
    notes: "過去に「えるち」名義で出場 / 第1回、第6回(ULTIMATE)APマラソンにて優勝",
  },
    {
    id: "hiwa",
    name: "ひゎ",
    twitter: "@Hiwa_otogame",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
  },
  {
    id: "daba",
    name: "だば～",
    twitter: "@daba_kasu",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
  },
  {
    id: "esto",
    name: "えすと",
    twitter: "@St_sfy",
    appearances: 2,
    result: "準決勝",
    notes: "ランクマッチで一位経験あり。",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
      white2025: true,
    },
  },
  {
    id: "kamibiki",
    name: "紙引き",
    twitter: "@kamibiki_ningen",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
  },
  {
    id: "tas123",
    name: "Tas123",
    twitter: "@Tas123_pjsk",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
  },
  {
    id: "Unknowm",
    name: "Unknowm",
    twitter: "",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
    notes: "ランクマッチでは「ミズゴロウファン」名義",
  },
  {
    id: "romein",
    name: "ろめいん",
    twitter: "@gray_high_iro",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs26: true,
    },
  },
    {
    id: "jakads",
    name: "Jakads",
    twitter: "@Jakads",
    appearances: 1,
    result: "3位",
    achievements: [
    "個人3位"
  ],
    tournaments: {
      cs25: true,
    },
  },
  {
    id: "minute3min",
    name: "3分待った麺",
    twitter: "@minute_3_min",
    appearances: 1,
    result: "4位",
    achievements: [
　　"個人4位"
  ],
    tournaments: {
      cs25: true,
    },
    notes: "第3回APマラソンで完走し優勝"
  },
  {
    id: "niiniin",
    name: "ニィニィです！",
    twitter: "@NiiNiin32",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs25: true,
    },
  },
  {
    id: "koh",
    name: "コウ_Koh",
    twitter: "@Koh114837",
    appearances: 1,
    result: "準決勝",
    achievements: [
    "準決勝進出"
  ],
    tournaments: {
      cs25: true,
    },
    notes: "第9回APマラソンで優勝"
  },
  {
  id: "morita",
  name: "もりた",
  twitter: "",
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    white2025: true,
  },
},

{
  id: "ryu",
  name: "Ryu",
  twitter: "@Ryu96499649",
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    white2025: true,
  },
  },
{
  id: "botty",
  name: "ぼってぃ",
  twitter: "@Dearmyfortune_",
  appearances: 1,
  result: "準決勝進出",
  notes: "ランクマッチ10000粒達成で一位。",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    white2026: true,
  },
},
{
  id: "howaito",
  name: "ほわいと",
  twitter:"@White_deemo",
  appearances: 1,
  result: "準々決勝進出",
  notes: "「ほわいと杯」のほわいととは別人。配信者であったが引退済み。元気です。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    white2025: true,
     },
  },
  {
  id: "ri",
  name: "り",
  twitter: "",
  aliases: ["り"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "okitotori",
  name: "おきとり",
  twitter: "",
  aliases: ["おきとり"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "aoren",
  name: "あおれん",
  twitter: "",
  aliases: ["あおれん"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "lewisi4",
  name: "Lewisi4",
  twitter: "",
  aliases: ["Lewisi4"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "774",
  name: "774",
  twitter: "",
  aliases: ["774"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "goroo",
  name: "ごろ〜",
  twitter: "",
  aliases: ["ごろ〜"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "usaki",
  name: "U咲",
  twitter: "",
  aliases: ["U咲"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "alpha-bimi",
  name: "α*Bimi",
  twitter: "",
  aliases: ["α*Bimi"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "koppe",
  name: "こっぺ",
  twitter: "",
  aliases: ["こっぺ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "eons",
  name: "Eons",
  twitter: "",
  aliases: ["Eons"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
},

{
  id: "ikacchi",
  name: "イカっち",
  twitter: "",
  aliases: ["イカっち"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    RAGE: true,
  },
  },
{
  id: "midotsuki",
  name: "みどつき",
  twitter: "",
  aliases: ["みどつき"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "ruin",
  name: "ruin",
  twitter: "",
  aliases: ["ruin"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
  },
{
  id: "hika",
  name: "ひか",
  twitter: "",
  aliases: ["ひか"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "f-shina",
  name: "F.紫菜",
  twitter: "",
  aliases: ["F.紫菜"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "urabe",
  name: "うらべ",
  twitter: "",
  aliases: ["うらべ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "poko-218",
  name: "poko_218",
  twitter: "",
  aliases: ["poko_218"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "yatogami",
  name: "やとがみ",
  twitter: "",
  aliases: ["やとがみ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "wak",
  name: "wak",
  twitter: "",
  aliases: ["wak"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "inumata",
  name: "いぬまた",
  twitter: "",
  aliases: ["いぬまた"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "shirasu",
  name: "しらす",
  twitter: "",
  aliases: ["しらす"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
},

{
  id: "chuto-hanpa",
  name: "中途半端",
  twitter: "",
  aliases: ["中途半端"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs21A: true,
  },
  },
{
  id: "mita-kosuke",
  name: "三田皓介",
  twitter: "",
  aliases: ["三田皓介"],
  appearances: 1,
  result: "準優勝",
  achievements: [
    "個人準優勝"
  ],
  tournaments: {
    cs21A: true,
  },
  },
{
  id: "age",
  name: "アージュ",
  twitter: "",
  aliases: ["アージュ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22S: true,
  },
},

{
  id: "warren",
  name: "warren",
  twitter: "",
  aliases: ["warren"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22S: true,
  },
},

{
  id: "hita",
  name: "ひた",
  twitter: "",
  aliases: ["ひた"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22S: true,
  },
  },
{
  id: "neko",
  name: "ねこ",
  twitter: "",
  aliases: ["ねこ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22A: true,
  },
},

{
  id: "kamome",
  name: "かもめ",
  twitter: "",
  aliases: ["かもめ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22A: true,
  },
},

{
  id: "michirumama",
  name: "みちるまま",
  twitter: "",
  aliases: ["みちるまま"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    cs22A: true,
  },
  },
{
  id: "neronene",
  name: "NERONENE",
  twitter: "",
  aliases: ["NERONENE"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "mitsuue",
  name: "みつうえ",
  twitter: "",
  aliases: ["みつうえ"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "sugaku",
  name: "数学",
  twitter: "",
  aliases: ["数学"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "5",
  name: "5",
  twitter: "",
  aliases: ["5"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "miso",
  name: "みそ",
  twitter: "",
  aliases: ["みそ"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "yukine",
  name: "ゆきーね",
  twitter: "",
  aliases: ["ゆきーね"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
  },
{
  id: "dgct",
  name: "DGCT",
  twitter: "",
  aliases: ["DGCT"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "ichigomilk",
  name: "いちごみるく",
  twitter: "",
  aliases: ["いちごみるく"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "arui",
  name: "あるい",
  twitter: "",
  aliases: ["あるい"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
},

{
  id: "biru",
  name: "びる",
  twitter: "",
  aliases: ["びる"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
  },
  {
  id: "san",
  name: "3",
  twitter: "",
  aliases: ["3"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs23S: true,
  },
  },
{
  id: "furandachu",
  name: "ふー乱打中",
  twitter: "",
  aliases: ["ふー乱打中"],
  appearances: 1,
  result: "3位",
  achievements: [
    "個人3位"
  ],
  tournaments: {
    cs23S: true,
  },
},
{
  id: "nexusdg",
  name: "nexusDG",
  twitter: "",
  aliases: ["nexusDG"],
  appearances: 1,
  result: "準決勝",
  notes: "WCS2024では繁体字版で予選突破。",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "echo",
  name: "Echo",
  twitter: "",
  aliases: ["Echo"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では英語版(グローバル版)で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "inf",
  name: "INF",
  twitter: "",
  aliases: ["INF"],
  appearances: 1,
  result: "準決勝",
  notes: "WCS2024では韓国語版で予選突破。",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    wcs24: true,
    cs24A: true,
  },
},

{
  id: "ci",
  name: "ci",
  twitter: "",
  aliases: ["ci"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では繁体字版で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "alfy",
  name: "alfy",
  twitter: "",
  aliases: ["alfy"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では英語版(グローバル版)で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "hyoukai",
  name: "氷塊",
  twitter: "",
  aliases: ["氷塊"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では繁体字版で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "niconi",
  name: "nico2/にこにー",
  twitter: "",
  aliases: ["にこにー"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "rein",
  name: "rein",
  twitter: "",
  aliases: ["rein"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では繁体字版で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "aplo",
  name: "aplo",
  twitter: "",
  aliases: ["aplo"],
  appearances: 1,
  result: "準々決勝",
  notes: "WCS2024では英語版(グローバル版)で予選突破。",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
},

{
  id: "nokonoko",
  name: "のこのこ",
  twitter: "",
  aliases: ["のこのこ"],
  appearances: 1,
  result: "準々決勝",
  achievements: [
    "準々決勝進出"
  ],
  tournaments: {
    wcs24: true,
  },
   },
  {
  id: "kyofu-no-hiratake",
  name: "恐怖のヒラタケ",
  twitter: "",
  aliases: ["恐怖のヒラタケ"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs24A: true,
  },
  },
{
  id: "005saikou",
  name: "005saikou",
  twitter: "",
  aliases: ["005saikou"],
  appearances: 1,
  result: "準決勝",
  achievements: [
    "準決勝進出"
  ],
  tournaments: {
    cs24A: true,
  },
  },
];

export function getPlayerById(id: string) {
  return players.find((player) => player.id === id);
}