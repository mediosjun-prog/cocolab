export interface Expert {
  id: string;
  name: string;
  title: string;
  specialty: string;
  price: string;
  imagePath: string;
  experience: string[];
  message: string;
  bookingUrl: string;
  sns?: {
    x?: string;
    instagram?: string;
    youtube?: string;
    note?: string;
    website?: string;
    };
}

export const expertsData: Expert[] = [ // 👈 ここを expertsData にする
  {
    id: 'minami',
    name: 'カウンセラー・安江',
    title: '臨床心理士 / 認定心理士',
    specialty: '不安型ケア・人間関係のモヤモヤ解消',
    price: '60分 / 8,000円（税込）',
    imagePath: '/images/ex1.png',
    experience: [
      '心理相談窓口にて通算1,000件以上のカウンセリングを実施',
      '愛着障害・対人不安に特化したセッションを提供',
    ],
    message: '見捨てられ不安や顔色を伺ってしまう気持ちに寄り添い、安心感を取り戻すお手伝いをします。',
    bookingUrl: 'https://example.com/booking/minami',
    sns: {
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      note: 'https://note.com',
    },
  },
  {
    id: 'sora',
    name: 'カウンセラー・高木',
    title: '公認心理師',
    specialty: '恐れ・回避型ケア・自己肯定感の醸成',
    price: '60分 / 8,500円（税込）',
    imagePath: '/images/ex2.png',
    experience: [
      '医療機関およびメンタルヘルス支援センター勤務歴10年',
      '人との距離感に悩む方へのトラウマケア・傾聴サポート',
    ],
    message: 'どんな感情も否定せず、100%安全な場所であなたのお話をお聴きします。',
    bookingUrl: 'https://example.com/booking/sora',
      sns: {
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      note: 'https://note.com',
    },
  },
  {
    id: 'ren',
    name: 'カウンセラー・成田',
    title: '産業カウンセラー',
    specialty: '回避型ケア・職場や恋愛の距離感整理',
    price: '60分 / 7,500円（税込）',
    imagePath: '/images/ex3.png',
    experience: [
      '企業内メンタルヘルス相談員として勤務',
      '感情表現の苦手さやパートナーシップの悩み解決に対応',
    ],
    message: '一人で悩みを抱え込まず、境界線の引き方や無理のない関係作りを一緒に考えていきましょう。',
    bookingUrl: 'https://example.com/booking/ren',
      sns: {
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      note: 'https://note.com',
    },
  },
  {
    id: 'hana',
    name: 'カウンセラー・榊原',
    title: 'メンタルケア心理士',
    specialty: '安定型への導き・自己対話とセルフケア',
    price: '60分 / 8,000円（税込）',
    imagePath: '/images/ex4.png',
    experience: [
      'オンライン心理カウンセリングを中心に活動',
      '愛着理論に基づいた感情ログの活用・マインドフルネス指導',
    ],
    message: '自分らしさを大切にしながら、より穏やかで満たされた人間関係を育むサポートをします。',
    bookingUrl: 'https://example.com/booking/hana',
      sns: {
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      note: 'https://note.com',
    },
  },
];