// diffTime.ts
export function diffTimeMinutesSeconds(start: string | Date, end: string | Date): string {
  const startDate = start instanceof Date ? start : new Date(start);
  const endDate = end instanceof Date ? end : new Date(end);

  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return '00:00';

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
