import { useEffect, useState } from "react";
import Button from "@components/Button";
import { useLocation, useNavigate } from "react-router";

const Timer = ({ startTime, setStartTime }) => {
  const [timer, setTimer] = useState(parseInt(localStorage.getItem("saved_timer"), 10) || 10 * 60); // 10 minuti
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
      localStorage.setItem(
        "gameover_reason",
        "Tempo scaduto! L'attacco ha colpito il villaggio."
      );
    }
    if (timer <= 60) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
    if(timer % 60 === 0 && timer !== 0) {
      setAnimate(true);
    }
  }, [timer]);

  useEffect(() => {
    if (
      window.location.hash === "'#/gameover'" ||
      window.location.hash === "'#/win'"
    ) {
      setStartTime(false);
    } else {     
      setStartTime(true);
    }
  }, [window.location.hash]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("saved_timer", timer);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timer]);


  return (
    <div
      style={{ backgroundSize: "100% auto" }}
      className={`z-10 bg-[url(../images/generic/cerchio.png)] font-elite w-fit flex bg-center bg-no-repeat select-none text-black font-bold text-2xl xl:text-4xl py-6 xl:py-10 px-12 xl:px-20 absolute top-6 right-5 ${
        animate ? "animate-pop-loop" : "animate-pop"
      } duration-1000 text-white`}
    >
      {formatTime(timer)}
    </div>
  );
};

export default Timer;
