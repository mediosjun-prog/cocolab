// app/kokokoe/kokokoeStorage.ts

export interface KokokoeRecord {
  id: string;
  date: string;
  desires: string[];
  customDesire: string;
  attribute: string;
  durationMinutes: number;
}

const STORAGE_KEY = 'kokurabo_kokokoe_records';

export function getKokokoeRecords(): KokokoeRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load kokokoe records', e);
    return [];
  }
}

export function saveKokokoeRecord(record: Omit<KokokoeRecord, 'id' | 'date'>): KokokoeRecord {
  const records = getKokokoeRecords();
  const newRecord: KokokoeRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  const updated = [newRecord, ...records];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newRecord;
}

export function deleteKokokoeRecord(id: string) {
  const records = getKokokoeRecords();
  const updated = records.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}