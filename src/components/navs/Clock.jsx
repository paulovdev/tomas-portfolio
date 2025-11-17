import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const updateClock = () => {
      let formatted = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: usesAMPM(userTimeZone),
        timeZone: userTimeZone,
      });

      // Remove pontos no AM/PM (a.m. → AM / p.m. → PM)
      formatted = formatted
        .replace(/a\.?m\.?/i, "AM")
        .replace(/p\.?m\.?/i, "PM");

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userTimeZone]);

  return <div>{time}</div>;
};

function usesAMPM(zone) {
  const test = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: undefined,
    timeZone: zone,
  });

  return /AM|PM|a\.?m\.?|p\.?m\.?/i.test(test);
}

export default Clock;
