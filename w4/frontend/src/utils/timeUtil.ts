export function nextDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

export function nextMonth(date: Date): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
}

export function prevMonth(date: Date): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
}

export function getDayMonth(date: Date): Date[] {
    const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    const nextMonthDate: Date = nextMonth(firstDayOfMonth);
    const dates: Date[] = [];

    let tempDate: Date = new Date(firstDayOfMonth);

    while (tempDate < nextMonthDate) {
        dates.push(new Date(tempDate));
        tempDate = nextDay(tempDate);
    }

    return dates;
}

export function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
