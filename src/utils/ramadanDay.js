export function getRamadanDay(startDate, currentDate) {
  const diff =
    (currentDate - startDate) / (1000 * 60 * 60 * 24);
  return Math.floor(diff) + 1;
}