import { useEffect, useState } from "react";

const timeZones = [
  { label: "Canary Islands", zone: "Atlantic/Canary" },
  { label: "Lisbon", zone: "Europe/Lisbon" },
  { label: "London", zone: "Europe/London" },
  { label: "Madrid", zone: "Europe/Madrid" },
  { label: "New York", zone: "America/New_York" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "Denver", zone: "America/Denver" },
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Mexico City", zone: "America/Mexico_City" },
  { label: "Buenos Aires", zone: "America/Argentina/Buenos_Aires" },
  { label: "Sao Paulo", zone: "America/Sao_Paulo" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "Beijing", zone: "Asia/Shanghai" },
  { label: "Dubai", zone: "Asia/Dubai" },
  { label: "Sydney", zone: "Australia/Sydney" },
  { label: "Cape Verde", zone: "Atlantic/Cape_Verde" },
];

const Clock = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateClocks = () => {
      const newTimes = {};

      timeZones.forEach(({ label, zone }) => {
        newTimes[label] = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: isAMPM(zone),
          timeZone: zone,
        });
      });

      setTimes(newTimes);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {Object.entries(times).map(([label, time]) => (
        <div key={label}>
          <strong>{label}: </strong> {time}
        </div>
      ))}
    </div>
  );
};

 
function isAMPM(timeZone) {
  const locale = new Intl.Locale("en-US");
  const test = new Date().toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: undefined,
    timeZone,
  });

  return test.match(/AM|PM/i) !== null;
}

export default Clock;
