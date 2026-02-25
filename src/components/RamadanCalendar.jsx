import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown } from "lucide-react";

export default function RamadanCalendar({ calendar, todayHijriDay }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    const tableData = calendar.map(day => [
      `${day.date.hijri.day} Ramadan`,
      day.date.gregorian.date,
      day.timings.Imsak,
      day.timings.Fajr,
      day.timings.Dhuhr,
      day.timings.Asr,
      day.timings.Maghrib,
      day.timings.Isha
    ]);

    autoTable(doc, {
      head: [["Hijri", "Gregorian", "Imsak", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]],
      body: tableData,
    });

    window.open(doc.output("bloburl"), "_blank");
  };
  if (!calendar.length) return null;

  return (
    <div className="bg-white h-[95vh] p-4 rounded-xl shadow-md overflow-y-auto dark:bg-slate-800 dark:text-gray-300 no-scrollbar">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">
          🌙 Full Ramadan Calendar
        </h2>
        <button
          onClick={exportPDF}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg mb-4"
        >
          <FileDown size={20}/>
        </button>
      </div>
      <table className="min-w-full text-sm">
        <thead className="bg-green-100 dark:bg-green-700 sticky top-10 shadow">
          <tr>
            <th className="p-2">Ramadan</th>
            <th className="p-2">Gregorian</th>
            <th className="p-2">Imsak</th>
            <th className="p-2">Maghrib</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((day, index) => {
            const isToday = 
              day.date.hijri.day === todayHijriDay;

            return (
            <tr key={index} className={`text-center
              ${index % 2 === 0 ? "" : "bg-emerald-50 dark:bg-slate-700"}
              ${
                isToday
                  ? "bg-green-200 dark:bg-green-400 font-bold"
                  : ""
              }`}
            >
              <td className="p-2">
                { day.date.hijri.day}
              </td>
              <td className="p-2">
                {day.date.gregorian.weekday.en } , { day.date.gregorian.date}
              </td>
              <td className="p-2">
                {day.timings.Imsak}
              </td>
              <td className="p-2">
                {day.timings.Maghrib}
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}