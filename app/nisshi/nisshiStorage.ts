// app/nisshi/nisshiStorage.ts

export interface NisshiRecord {
  id: string;
  date: string;
  character: string;
  weather: string;
  color: string;
  animal: string;
  note: string;
  aiResponse: string;
  // 追加：ここすこあ（サークル・メッセージ用）のデータ
  scoreData: {
    percentage: number; // 0〜100（サークルの円の満ち具合）
    message: string;    // 動物やカウンセラーからのショートメッセージ
  };
}

const STORAGE_KEY = 'coconisshi_records_v1';

export function getNisshiRecords(): NisshiRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load records', e);
    return [];
  }
}

// スコアとメッセージを自動で算出するヘルパー関数
function calculateScoreAndMessage(weather: string, color: string, animal: string, note: string) {
  let score = 70; // 基本ベース

  // 天気による調整
  if (weather === 'sunny') score += 20;
  else if (weather === 'cloudy') score += 10;
  else if (weather === 'rainy' || weather === 'snowy') score += 5;

  // 心の色による調整
  if (color === 'green' || color === 'yellow') score += 10;
  else score += 5;

  // 動物による調整（お疲れ系の動物は「自分を労わる日」としてあたたかく包み込むスコアに）
  let message = '';
  if (['hedgehog', 'sheep'].includes(animal)) {
    score = Math.max(score, 65); // 極端に低くせず、優しくケアできる点数に
    message = '今日はゆっくり充電してね。よく頑張ったよ！';
  } else if (animal === 'rabbit') {
    message = '繊細に感じる日だね。ご自身のペースでいこう。';
  } else if (animal === 'cat') {
    message = 'マイペースにのんびり過ごせた一日だね♪';
  } else if (animal === 'dog') {
    message = '元気いっぱい！素敵なエネルギーを感じるよ。';
  } else {
    message = 'まったり、おだやかな空気が流れているね。';
  }

  // メモに頑張りを肯定する要素や、文字数がある場合のボーナス
  if (note.trim().length > 0) {
    score += 5;
  }

  const percentage = Math.min(Math.max(score, 40), 100); // 40%〜100%の間で綺麗な円を描く
  return { percentage, message };
}

export function saveNisshiRecord(record: Omit<NisshiRecord, 'id' | 'date' | 'scoreData'>): NisshiRecord {
  const records = getNisshiRecords();
  const scoreData = calculateScoreAndMessage(record.weather, record.color, record.animal, record.note);
  
  const newRecord: NisshiRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    scoreData,
  };
  
  const updated = [newRecord, ...records];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save record', e);
  }
  return newRecord;
}