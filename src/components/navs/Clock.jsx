import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState("");
  const [time2, setTime2] = useState("");
  const userLocale = navigator.language || "en-US";
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const updateClock = () => {
      const formatted = new Date().toLocaleTimeString(userLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: userTimeZone,
      });

      if (formatted >= "12:00:00") {
        setTime2("PM");
      } else {
        setTime2("AM");
      }
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [userLocale, userTimeZone]);

  return <div>{time + " " + time2}</div>;
};

export default Clock;
