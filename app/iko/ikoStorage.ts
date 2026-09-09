// app/iko/ikoStorage.ts
export interface IkoRecord {
  id: string;
  date: string;
  myGender: string;
  myAge: string;
  targetGender: string;
  targetAge: string;
  relation: string;
  situation: string;
  score: number;
  totalEvaluation: string;
}

export const saveIkoRecord = (record: Omit<IkoRecord, 'id' | 'date'>) => {
  if (typeof window === 'undefined') return;
  const records = getIkoRecords();
  const newRecord: IkoRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  localStorage.setItem('iko_records', JSON.stringify([newRecord, ...records]));
};

export const getIkoRecords = (): IkoRecord[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('iko_records');
  return data ? JSON.parse(data) : [];
};