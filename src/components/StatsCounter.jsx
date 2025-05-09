import { useState, useEffect } from 'react';
import { UsersIcon, HeartIcon, CheckCircleIcon, CloudIcon } from '@heroicons/react/solid';

const StatsCounter = () => {
  // Example stats with icons
  const stats = [
    { label: "Total Donors", value: 1500, icon: <UsersIcon className="w-12 h-12 text-red-600" /> },
    { label: "Donations Made", value: 5000, icon: <HeartIcon className="w-12 h-12 text-red-600" /> },
    { label: "Requests Fulfilled", value: 1200, icon: <CheckCircleIcon className="w-12 h-12 text-red-600" /> },
    { label: "Active Blood Drives", value: 10, icon: <CloudIcon className="w-12 h-12 text-red-600" /> },
  ];

  const [countedStats, setCountedStats] = useState(
    stats.map(stat => ({ ...stat, count: 0 }))
  );

  useEffect(() => {
    const intervalDuration = 4000; // 4 seconds
    const interval = setInterval(() => {
      setCountedStats(prevStats => prevStats.map(stat => {
        if (stat.count < stat.value) {
          return { ...stat, count: Math.min(stat.count + Math.ceil(stat.value / 100), stat.value) }; // Increment count smoothly
        }
        return stat;
      }));
    }, intervalDuration / 100);

    // Clear the interval after reaching the target values
    if (countedStats.every(stat => stat.count >= stat.value)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countedStats]);

  return (
    <section className="bg-red-600 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-semibold mb-8">Our Achievements</h2>
      </div>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {countedStats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center p-6 bg-white text-gray-800 rounded-lg shadow-lg transition-all transform hover:scale-105">
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-semibold mb-2">{stat.count}{stat.count >= 1000 ? "+" : ""}</h3>
            <p className="text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
