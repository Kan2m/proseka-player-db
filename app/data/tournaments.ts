import { TournamentKey } from "./players";

export type TournamentResult = {
  rank: string;
  players: string[];
};

export type DoublesResult = {
  rank: string;
  team: string[];
};

export type Tournament = {
  id: TournamentKey;
  name: string;
  date: string;
  category: string;
  description: string;
  results?: TournamentResult[];
  doublesResults?: DoublesResult[];
};

export const tournaments: Tournament[] = [
{
  id: "RAGE",
  name: "RAGE プロジェクトセカイ 2020 Winter",
  date: "2020年",
  category: "個人戦",
  description:
    "プロセカ初の公式大会。唯一ChampionShipではない。決勝初見曲は「千本桜」。",
  results: [
    {
      rank: "優勝",
      players: ["瑠璃"],
    },
    {
      rank: "準優勝",
      players: ["HPS"],
    },
    {
      rank: "準決勝出場",
      players: [
        "り",
        "がう。",
        "ひなた",
        "な～の",
        "ろら",
        "おきとり",
        "みーのくん",
        "たくあん",
      ],
    },
    {
      rank: "準々決勝出場",
      players: [
        "ピジャも",
        "あおれん",
        "しの",
        "Lewisi4",
        "774",
        "ごろ〜",
        "プリン",
        "U咲",
        "α*Bimi",
        "γ",
        "こっぺ",
        "マギサ",
        "Eons",
        "ヱ",
        "イカっち",
      ],
    },
  ],
},
 {
  id: "cs21A",
  name: "プロセカChampionship 2021 Autumn",
  date: "2021年",
  category: "個人戦",
  description:
    "プロセカで最初のCS。有観客で実施された。決勝初見曲は「ロストワンの号哭」。",
  results: [
    {
      rank: "優勝",
      players: ["たくあん"],
    },
    {
      rank: "準優勝",
      players: ["三田皓介"],
    },
    {
      rank: "準決勝出場",
      players: [
        "みどつき",
        "ruin",
        "瑠璃",
        "HPS",
        "アーリング鮫島",
        "ふたばさき",
        "さかもちゃもちゃ！",
        "燐酸*。",
      ],
    },
    {
      rank: "準々決勝出場",
      players: [
        "ろら",
        "ひか",
        "F.紫菜",
        "γ",
        "うらべ",
        "poko_218",
        "はちまるご",
        "HAKU",
        "やとがみ",
        "wak",
        "く。",
        "MiRaRii*",
        "いぬまた",
        "しらす",
        "中途半端",
      ],
    },
  ],
},
  {
  id: "cs22S",
  name: "プロセカChampionship 2022 Spring",
  date: "2022年",
  category: "チーム戦",
  description:
    "プロセカ初のチーム戦、BAN PICK方式も初採用。決勝初見曲は「脳漿炸裂ガール」。",
  results: [
    {
      rank: "優勝",
      players: [
        "かん",
        "たくあん",
        "マギサ",
      ],
    },
    {
      rank: "準優勝",
      players: [
        "はちまるご",
        "ひなたさん",
        "みーのくん",
      ],
    },
    {
      rank: "準決勝出場",
      players: [
        "HPS",
        "腐食",
        "瑠璃",
        "かんぱり",
        "きゃいと",
        "はく",
      ],
    },
    {
      rank: "準々決勝出場",
      players: [
        "アージュ",
        "あべゆー",
        "すとら",
        "sprite",
        "がう。",
        "プリン",
        "warren",
        "かるりーる",
        "ひた",
        "MiRaRii*",
        "しの",
        "燐酸*。",
      ],
    },
  ],
},
 {
  id: "cs22A",
  name: "プロセカChampionship 2022 Autumn",
  date: "2022年",
  category: "チーム戦",
  description:
    "2度目のチーム戦。決勝初見曲は「腐れ外道とチョコレゐト」。",
  results: [
    {
      rank: "優勝",
      players: [
        "matezon",
        "ヒグルース",
        "ぐれいしあ",
      ],
    },
    {
      rank: "準優勝",
      players: [
        "sprite",
        "プリン",
        "がう。",
      ],
    },
    {
      rank: "準決勝出場",
      players: [
        "たくあん",
        "マギサ",
        "かん",
        "HPS",
        "腐食",
        "瑠璃",
      ],
    },
    {
      rank: "準々決勝出場",
      players: [
        "ヱ*XnC",
        "つきしろ",
        "り",
        "ねこ",
        "Lodge",
        "かもめ",
        "REN",
        "花念",
        "STK",
        "しの",
        "MiRaRii*",
        "みちるまま",
      ],
    },
  ],
},
  {
  id: "cs23S",
  name: "プロセカChampionship 2023 Spring",
  date: "2023年",
  category: "個人戦",
  description:
    "2年ぶりの個人戦であり、4つの部門に分けられた唯一の大会。決勝初見曲は「セツナトリップ」。",
  results: [
    {
      rank: "優勝",
      players: ["かん"],
    },
    {
      rank: "準優勝",
      players: ["matezon"],
    },
    {
      rank: "3位",
      players: ["temp"],
    },
    {
      rank: "4位",
      players: ["月読"],
    },
    {
      rank: "準決勝出場",
      players: [
        "リリィ",
        "NERONENE",
        "REN",
        "HPS",
        "常磐#tok!wa",
        "みつうえ",
        "数学",
        "あべゆー",
        "花念",
        "腐食",
        "5",
        "ヒグルース",
        "みそ",
        "ゆきーね",
        "STK",
        "ぐれいしあ",
      ],
    },
    {
      rank: "U-12 優勝",
      players: ["Koma."],
    },
    {
      rank: "U-12 準優勝",
      players: ["まろやかれおちゃ♪"],
    },
    {
      rank: "U-12 3位",
      players: ["ふー乱打中"],
    },
    {
      rank: "U-12 4位",
      players: ["初心者"],
    },
    {
      rank: "U-12 準決勝出場",
      players: [
        "ykt",
        "DGCT",
        "いちごみるく",
        "あるい",
        "びる",
        "3",
      ],
    },
  ],
},
{
  id: "wcs24",
  name: "プロセカWorldChampionship 2024 Spring",
  date: "2024年",
  category: "個人戦",
  description:
    "プロセカ初の公式世界大会。予選も4カ国に分かれて実施。決勝初見曲は「東京テディベア」。",
  results: [
    {
      rank: "優勝",
      players: ["STK"],
    },
    {
      rank: "準優勝",
      players: ["あべゆー"],
    },
    {
      rank: "3位",
      players: ["HPS"],
    },
    {
      rank: "4位",
      players: ["かんぱり"],
    },
    {
      rank: "5位",
      players: ["Eff"],
      },
    {
      rank: "準決勝進出",
      players: [
        "temp",
        "ななせ",
        "リリィ",
        "REN",
        "nexusDG",
         ],
       },
    {

      rank: "準々決勝進出",
      players: [
        "Echo",
        "きらにゃん",
        "初心者",
        "INF",
        "str",
        "ci",
        "alfy",
        "かるぼ",
        "氷塊",
        "にこにー",
        "れ",
        "rein",
        "aplo",
        "かん",
        "のこのこ",
      ],
    },
  ],
},
 {
  id: "cs24A",
  name: "プロセカChampionship 2024 Autumn",
  date: "2024年",
  category: "個人戦",
  description:
    "初の準決勝での初見曲採用。準決勝の初見曲は「snooze」「混沌ブギ」「アンヘル」「のだ」、決勝初見曲は「プロトディスコ」。",
  results: [
    {
      rank: "優勝",
      players: ["れ"],
    },
    {
      rank: "準優勝",
      players: ["STK"],
    },
    {
      rank: "3位",
      players: ["REN"],
    },
    {
      rank: "4位",
      players: ["かんぱり"],
    },
    {
      rank: "準決勝出場",
      players: [
        "INF.",
        "恐怖のヒラタケ",
        "きらにゃん",
        "mido*",
        "水銀大塚",
        "つきしろ",
        "temp",
        "ぱりぃ",
        "Eff",
        "005saikou",
        "matezon",
        "Mu2IIc",
        "RSA",
        "く。",
        "T",
        "ななせ",
      ],
    },
  ],
},
 {
  id: "cs25",
  name: "プロセカChampionship 2025 in プロセカ感謝祭",
  date: "2025年",
  category: "個人戦",
  description:
    "4年ぶりの有観客開催。決勝初見曲は2曲あり「IMAWANOKIWA」、「怪獣になりたい」",
  results: [
    {
      rank: "優勝",
      players: ["れ"],
    },
    {
      rank: "準優勝",
      players: ["カイ"],
    },
    {
      rank: "3位",
      players: ["Jakads"],
    },
    {
      rank: "4位",
      players: ["3分待った麺"],
    },
    {
      rank: "準決勝出場",
      players: [
        "INF.",
        "かるりーる",
        "temp",
        "リリィ",
        "かん",
        "たまご",
        "ニィニィです！",
        "REN",
        "kaya",
        "かんぱり",
        "ななせ",
        "Mido*",
        "Eff",
        "かるぼ",
        "コウ_Koh",
        "Koma.",
      ],
    },
  ],
},
 {
  id: "cs26",
  name: "プロセカChampionship 2026 in プロセカ感謝祭",
  date: "2026年",
  category: "チーム戦",
  description:
    "4年ぶりのチーム戦。",
  results: [
    {
      rank: "準決勝出場",
      players: [
        "Mu2IIc",
        "きらにゃん",
        "水銀大塚",
        "カイ",
        "ykt",
        "えすと",
        "T",
        "Koma.",
        "kaya",
        "かるりーる",
        "れ",
        "Lodge",
        "アオりんご",
        "紙引き",
        "ろめいん",
        "ひゎ",
        "Unknowm",
        "Tas123",
        "Eff",
        "リリィ",
        "たまご",
        "temp",
        "だば～",
        "ななせ",
        "かるぼ",
        "かん",
        "REN",
      ],
    },
  ],
},
  
 {
  id: "white2025",
  name: "ほわいと杯2025 OFFLINE",
  date: "2025年",
  category: "個人戦・ダブルス",
  description:
    "初の大型オフライン大会。個人戦とダブルス部門の2部門で開催。",
  results: [
    {
      rank: "優勝",
      players: ["初心者"],
    },
    {
      rank: "準優勝",
      players: ["Koma."],
    },
    {
      rank: "3位",
      players: ["ykt"],
    },
    {
      rank: "4位",
      players: ["かん"],
    },
    {
      rank: "準決勝進出",
      players: [
        "STK",
        "Ryu",
        "水銀大塚",
        "REN",
      ],
    },
    {
      rank: "準々決勝進出",
      players: [
        "かんぱり",
        "えるち",
        "RSA",
        "もりた",
        "ぱりぃ",
        "ほわいと",
        "えすと",
        "リリィ",
      ],
    },
  ],
  doublesResults: [
    {
      rank: "優勝",
      team: ["初心者", "かるぼ"],
    },
    {
      rank: "準優勝",
      team: ["REN", "かん"],
    },
    {
      rank: "準決勝進出",
      team: ["Mido*", "水銀大塚"],
    },
    {
      rank: "準決勝進出",
      team: ["Koma.", "ykt"],
    },
  ],
},
{
  id: "white2026",
  name: "ほわいと杯2026 OFFLINE",
  date: "2026年",
  category: "個人戦・ダブルス",
  description:
    "2回目の非公式大型オフライン大会。個人戦とダブルス部門の2部門で開催。",
  results: [
    { rank: "優勝", players: ["kaya"] },
    { rank: "準優勝", players: ["Koma."] },
    { rank: "3位", players: ["水銀大塚"] },
    { rank: "4位", players: ["REN"] },
    {
      rank: "準決勝進出",
      players: ["ykt", "RSA", "リリィ", "カイ"],
    },
    {
      rank: "準々決勝進出",
      players: [
        "アオりんご",
        "ぱりぃ",
        "おかえり",
        "花念",
        "かるりーる",
        "デーモンコアくん",
        "かなえる",
        "HPS",
      ],
    },
  ],
  doublesResults: [
    {
      rank: "優勝",
      team: ["Mido*", "kaya"],
    },
    {
      rank: "準優勝",
      team: ["かるぼ", "初心者"],
    },
    {
      rank: "準決勝進出",
      team: ["れ", "REN"],
    },
    {
      rank: "準決勝進出",
      team: ["おかえり", "ぼってぃ"],
    },
  ],
},
];

export function getTournamentById(id: string) {
  return tournaments.find((tournament) => tournament.id === id);
}