export function getNextPrayer(timings) {
  const now = new Date();

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (let prayer of prayers) {
    const [hour, minute] = timings[prayer].split(":");
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(hour), parseInt(minute), 0);

    if (prayerTime > now) {
      return { name: prayer, time: prayerTime };
    }
  }

  // If all prayers passed, return Fajr for next day
  const [hour, minute] = timings["Fajr"].split(":");
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(parseInt(hour), parseInt(minute), 0);

  return { name: "Fajr", time: nextDay };
}