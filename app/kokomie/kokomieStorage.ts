export interface KokomieRecord {
  id: string;
  date: string;
  question: string;
  selectedChoice: string;
  message: string;
}

const STORAGE_KEY = 'kokomie_history_v1';

export function getKokomieRecords(): KokomieRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveKokomieRecord(record: Omit<KokomieRecord, 'id' | 'date'>): KokomieRecord[] {
  if (typeof window === 'undefined') return [];
  const current = getKokomieRecords();
  const newRecord: KokomieRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save record', e);
  }
  return updated;
}

export function deleteKokomieRecord(id: string): KokomieRecord[] {
  if (typeof window === 'undefined') return [];
  const current = getKokomieRecords();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete record', e);
  }
  return updated;
}