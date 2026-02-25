
export default function HijriDate({ hijriDate, gregorianDate, loading }) {

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading Hijri date…
      </div>
    );
  }

  if (!hijriDate || !gregorianDate ) {
    return (
      <div className="text-sm text-red-500">
        Hijri date unavailable
      </div>
    );
  }
  return (
    <div className="bg-green-50 dark:bg-slate-700 p-3 my-3 rounded-lg text-center">
      <p className="text-lg font-semibold text-green-700 dark:text-green-500">
        {hijriDate.day} {hijriDate.month.en} {hijriDate.year} H
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {gregorianDate.weekday.en},{" "}
        {gregorianDate.day}{" "}
        {gregorianDate.month.en}{" "}
        {gregorianDate.year}
      </p>     
    </div>
  );
}