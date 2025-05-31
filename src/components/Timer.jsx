import { useEffect, useState } from "react";
import { Howl } from "howler";
import { useLocation, useNavigate } from "react-router";
import alarm from "@assets/sounds/alarm.mp3";
import pop from "@assets/sounds/pop.mp3";
import orologio from "@assets/sounds/orologio.mp3";

const Timer = ({ startTime, setStartTime }) => {
  const [timer, setTimer] = useState(parseInt(localStorage.getItem("saved_timer"), 10) || 10 * 60); // 10 minuti
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (startTime) {
      const newSound = new Howl({
        src: [orologio],
        volume: 0.3,
        html5: true,
        loop: true,
        onplayerror: () => {
          console.error("Errore durante la riproduzione del suono dell'orologio.");
        },
        onloaderror: () => {
          console.error("Errore durante il caricamento del suono dell'orologio.");
        },
      });
      setSound(newSound);
      newSound.play();
      return () => {
        newSound.stop();
        newSound.unload();
      };
    } else if (sound) {
      sound.stop();
      sound.unload();
      setSound(null);
    }
  }, [location, startTime]);

  useEffect(() => {
    if (startTime && timer % 60 === 0 && timer !== 0) {
      const alarmSound = new Howl({
        src: [alarm],
        volume: 0.7,
        html5: true,
      });
      alarmSound.play();
    }
  }, [timer, startTime]);


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
    if(location.pathname == '/scena2' || location.pathname == '/scena3') {
      setStartTime(true);
    }else if(location.pathname == '/gameover' || location.pathname == '/win') {
      setStartTime(false);
    }else if(location.pathname == '/') {
      setStartTime(false);
    }
  }, [location]);
  
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
