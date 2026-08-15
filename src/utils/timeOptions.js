// Generates every 30-minute time of day as {value, label} pairs for a <select>.
// value is 24-hour "HH:MM" (easy to store/sort/compare), label is a
// 12-hour display string like "12:30 PM" (easy for clients to read).
export function buildTimeOptions() {
  const options = [];
  for (let m = 0; m < 24 * 60; m += 30) {
    const hours24 = Math.floor(m / 60);
    const minutes = m % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const displayHour = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const value = `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const label = `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
    options.push({ value, label });
  }
  return options;
}

export const timeOptions = buildTimeOptions();