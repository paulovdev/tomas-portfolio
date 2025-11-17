import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const updateClock = () => {
      const formatted = new Date().toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: usesAMPM(userTimeZone),
        timeZone: userTimeZone,
      });

      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userTimeZone]);

  return <div>{time}</div>;
};

// Detecta se o timezone usa AM/PM
function usesAMPM(zone) {
  const test = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: undefined,
    timeZone: zone,
  });

  return /AM|PM/i.test(test);
}

export default Clock;
