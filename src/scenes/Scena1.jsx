import { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import casa from "@assets/images/Casa.png";
import pergamena from "@assets/images/Pergamena.png";
import Button from "@components/Button";
import Dialogue from "@components/Dialogue";
import { useNavigate } from "react-router";

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
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
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
    </section>
  );
};

export default Scena1;
