import usePrayerTimes from "./hooks/usePrayerTimes";
import { getNextPrayer } from "./utils/getNextPrayer";
import Countdown from "./components/Countdown";
import HijriDate from "./components/HijriDate";
import RamadanCalendar from "./components/RamadanCalendar";
import useRamadanCalendar from "./hooks/useRamadanCalendar";
import { useState } from "react";
import { Calendar, CalendarOff } from "lucide-react";
import SplashScreen from "./components/SplashScreen";
import useLocationName from "./hooks/useLocationName";

function App() {
  const { timings, hijriDate, loading, gregorianDate, location } = usePrayerTimes();
  const hijriYear = hijriDate?.year;
  const latitude = location?.latitude;
  const longitude = location?.longitude;
  const { calendar } = useRamadanCalendar(hijriYear, latitude, longitude);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { locationName, loadingName } = useLocationName(latitude, longitude);
  
  if (loading || showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  // if (loading) return <p>Loading...</p>;
  if (!timings) return <p>Location permission required.</p>;
  const nextPrayer = getNextPrayer(timings);

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-slate-700 dark:text-gray-300">
      <button
        className={`lg:hidden bg-green-600 text-white px-4 py-2 rounded-lg mb-4 bottom-4 left-4 fixed z-10 ${showCalendar ? "opacity-30" : ""}`}
        onClick={() => setShowCalendar(!showCalendar)}
      >              
        {showCalendar ? <CalendarOff size={20}/> : <Calendar size={20}/>}
      </button>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-1/2">

            <h1 className="text-3xl font-bold text-center mb-6">
              🌙 Ramadan Planner
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-md mb-6 text-center dark:bg-slate-800">
              <h2 className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Time Until {nextPrayer.name}
              </h2>

              <Countdown targetTime={nextPrayer.time} />
              <HijriDate 
                hijriDate={hijriDate} 
                gregorianDate={gregorianDate} 
                loading={loading}
              />
                <span>📍</span>
                <span>
                  {loadingName ? "Detecting location…" : locationName}
                </span>

            </div>          

            {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
              <div
                key={prayer}
                className="bg-white p-4 rounded-xl shadow-md mb-3 flex justify-between dark:bg-slate-800 dark:text-gray-300"
              >
                <span>{prayer}</span>
                <span>{timings[prayer]}</span>
              </div>
            ))}
            </div>
            <div className="lg:w-1/2 max-lg:absolute max-lg:min-w-screen left-0">
              <div className={`${showCalendar ? "block" : "hidden"} lg:block`}>
                <RamadanCalendar 
                  calendar={calendar}
                  todayHijriDay={hijriDate?.day}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;