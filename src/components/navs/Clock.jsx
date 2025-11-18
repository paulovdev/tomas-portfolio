import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");
  const [time2, setTime2] = useState("");

  const userLocale = navigator.language || "en-US";
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();

      const formatted = date.toLocaleTimeString(userLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: userTimeZone,
        hour12: false, // força **sempre** formato 24h pra evitar AM/PM oculto
      });

      const hours = new Date().toLocaleString("en-US", {
        hour: "2-digit",
        hour12: false,
        timeZone: userTimeZone,
      });

      setTime2(Number(hours) >= 12 ? "PM" : "AM");
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userLocale, userTimeZone]);

  return <div>{time + " " + time2}</div>;
};

export default Clock;
