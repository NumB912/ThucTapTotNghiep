import { useEffect, useState } from "react";

function useCountdown(targetDateStr: string) {
  const [timeLeft, setTimeLeft] = useState("00:00");

  useEffect(() => {
    const targetDate = new Date(targetDateStr);

    const intervalId = setInterval(() => {
      const now = new Date();
      let diffMs = targetDate.getTime() - now.getTime();

      if (diffMs <= 0) {
        diffMs = 0;
        clearInterval(intervalId); // dừng khi về 0
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDateStr]);

  return timeLeft;
}

export default useCountdown;
