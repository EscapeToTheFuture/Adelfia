import { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import casa from "@assets/images/Casa.png";
import pergamena from "@assets/images/Pergamena.png";
import Button from "@components/Button";
import Dialogue from "@components/Dialogue";
import { useNavigate } from "react-router";
import aperturaPergamena from "@assets/sounds/aperturaPergamena.mp3";
import { Howl } from "howler";
import pop from "@assets/sounds/pop.mp3";
import runningScene from "@assets/sounds/ost/runningScena1.mp3";

const Scena1 = ({ setTimer }) => {
  const [load, setLoad] = useState([false, false]);
  const [scene, setScene] = useState(1);
  const [hint, setHint] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    
    const handleActivity = () => {
      setHint(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setHint(true);
      }, 5000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  const [noAudioPermission, setNoAudioPermission] = useState(false);
  const [playedPergamena, setPlayedPergamena] = useState(false);

  useEffect(() => {
    if (scene === 1 && load[1] && !playedPergamena && !noAudioPermission) {
      const sound = new Howl({
      src: [aperturaPergamena],
      volume: 1,
      html5: true,
      onplayerror: () => {
        setNoAudioPermission(true);
      },
      onloaderror: () => {
        setNoAudioPermission(true);
      },
      onend: () => {
        sound.unload();
      }
      });
      try {
      sound.play();
      setPlayedPergamena(true);
      } catch {
      setNoAudioPermission(true);
      }
    }

    let bgm;
    if (scene >= 2) {
      if (!window.__scena1_bgm) {
      bgm = new Howl({
        src: [runningScene],
        volume: 0.2,
        loop: true,
        html5: true,
      });
      bgm.play();
      window.__scena1_bgm = bgm;
      }
      if (noAudioPermission) {
      setNoAudioPermission(false);
      }
    } else {
      if (window.__scena1_bgm) {
      window.__scena1_bgm.stop();
      window.__scena1_bgm.unload();
      window.__scena1_bgm = null;
      }
    }

  }, [scene, load, playedPergamena, noAudioPermission]);

  const dialogues = [
    {
      speaker: "Padre",
      text: "Carla, devi ascoltarmi. Non posso muovermi con questa ferita, ma i contadini devono sapere del pericolo.",
    },
    {
      speaker: "Padre",
      text: "Se non rientrano nelle mura prima che cali la notte, saranno in grave pericolo.",
    },
    {
      speaker: "Carla",
      text: "Papà, non preoccuparti. Ce la farò. Avviserò tutti e assicurerò che siano al sicuro",
    },
    {
      speaker: "Padre",
      text: "Brava ragazza. Ma sbrigati, c'è poco tempo..",
    },
    {
      speaker: "Narratore",
      text: "Hai solo 10 minuti per preparare il villaggio. Ogni secondo conta.",
      type: "hint",
    },
  ];



  const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches 
    || window.navigator.standalone === true;
  const margin = !isAppInstalled && window.innerWidth <= 768 ? Math.round(window.innerWidth * 0.05) : 0;

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      {scene == 1 && (
        <img
          src={pergamena}
          alt="Pergamena"
          onLoad={() => setLoad((prev) => [true, prev[1]])}
          className={"absolute z-10 animate-unroll select-none w-full"}
        />
      )}

      <ImageMapper
        src={casa}
        name="Casa di Carla"
        natural
        imgWidth={1920}
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth - margin}
        responsive={true}
        disabled={scene != dialogues.length + 2}
        containerProps={{
          className: `transition-opacity duration-4000 ${
            load[0] && scene <= 1 ? "opacity-10" : ""
          }`,
        }}
        areas={[
          {
            id: "porta",
            shape: "poly",
            coords: [1707, 1950, 1714, 1448, 1799, 1448, 1795, 2035],
            fillColor: "rgba(237, 20, 61, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(237, 20, 61, 0.5)",
          },
          {
            id: "fuori",
            shape: "poly",
            coords: [
              2018, 2243, 2000, 1257, 2074, 1243, 2078, 1187, 1802, 579, 1816,
              7, 3996, 4, 3982, 2246,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
        ]}
        onChange={() => {
          navigate("/scena2");
          if (window.__scena1_bgm) {
            window.__scena1_bgm.stop();
            window.__scena1_bgm.unload();
            window.__scena1_bgm = null;
          }
          Howler.stop();
        }}
        isMulti={false}
        onLoad={() => setLoad((prev) => [prev[0], true])}
      />

      {!load[1] && (
        <img
          src={casa}
          alt="Casa di Carla"
          className={`absolute h-full select-none transition-opacity duration-4000 ${
            load[0] && scene <= 1 ? "opacity-10" : ""
          }`}
        />
      )}

      {scene == 1 && (
        <Button
          classes="absolute bottom-2 right-4"
          onClick={() => {
            const sound = new Howl({
              src: [pop],
              volume: 1,
              html5: true,
            });
            sound.play();
            setScene(2);
          }}
        >
          Avanti
        </Button>
      )}

      {hint && scene == dialogues.length +2 && (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Narratore",
            text: "Non c'è tempo da perdere! Muoviti!",
            type: "hint",
          }}
          onClose={() => setHint(false)}
        />
      )}

      {dialogues.map(
        (dialog, index) =>
          scene == index + 2 && (
            <Dialogue
              key={"dialogue-" + index}
              absolute
              classes="bottom-10"
              dialogue={dialog}
              onClose={() => {
                setScene((prev) => prev + 1);
                if (index == dialogues.length - 1) {
                  setTimer(true);
                }
              }}
            />
          )
      )}
       {noAudioPermission && (
        <Button
          classes="absolute bottom-2 left-2"
          onClick={() => {
            setNoAudioPermission(false);
          }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-16 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 5.25L6.75 9H4.5a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h2.25l4.5 3.75V5.25z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 8.25a6.75 6.75 0 010 9.5m2.25-11.75a9.75 9.75 0 010 13.75"
                />
              </svg>
          </Button>
      )}
    </section>
  );
};

export default Scena1;
