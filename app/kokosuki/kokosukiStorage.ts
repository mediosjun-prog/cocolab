// app/kokosuki/kokosukiStorage.ts

export interface KokosukiRecord {
  id: string;
  date: string;
  negatives: string[];
  customNegative: string;
  positiveMessage: string;
}

const STORAGE_KEY = 'kokurabo_kokosuki_records';

export function getKokosukiRecords(): KokosukiRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load kokosuki records', e);
    return [];
  }
}

export function saveKokosukiRecord(record: Omit<KokosukiRecord, 'id' | 'date'>): KokosukiRecord {
  const records = getKokosukiRecords();
  const newRecord: KokosukiRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  const updated = [newRecord, ...records];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newRecord;
}

export function deleteKokosukiRecord(id: string) {
  const records = getKokosukiRecords();
  const updated = records.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}