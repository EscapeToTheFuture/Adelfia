import { useEffect, useState } from "react";
import Button from "@components/Button";
import { useNavigate } from "react-router";

const Timer = ({ startTime, setStartTime }) => {
  const [timer, setTimer] = useState(10 * 60); // 10 minuti
  const navigate = useNavigate();
const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (timer <= 0) {
        setStartTime(false);
      navigate("/gameover");
      clearInterval(timer);
      localStorage.setItem("gameover_reason", "Tempo scaduto! L'attacco ha colpito il villaggio.");
    }
    if (timer <= 60) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [timer]);

useEffect(() => {
    if (window.location.pathname === "/gameover" || window.location.pathname === "/win") {
        setStartTime(false);
    }
}, [window.location.pathname]);

const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

return (
    <Button
        classes={`absolute top-3 right-5 ${animate ? "animate-pop-loop" : "animate-pop"}`}
    >
        {formatTime(timer)}
    </Button>
);
};

export default Timer;
