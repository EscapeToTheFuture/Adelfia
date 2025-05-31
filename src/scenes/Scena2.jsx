import piazza from "@assets/images/Piazza.png";
import ImageMapper from "react-img-mapper";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import { Howl } from "howler";
import medievalOst from "@assets/sounds/ost/medieval.mp3";

const Scena2 = () => {
  const [load, setLoad] = useState([false]);
  const dialogues = [
    {
      speaker: "Ignazio",
      text: "Non posso riparare queste mura senza mattoni. Puoi aiutarmi?",
    },
    {
      speaker: "Ignazio",
      text: "Ottimo lavoro, Carla. Ora posso finire le riparazioni. Grazie mille!",
    },
    {
      speaker: "Ignazio",
      text: "Cerca Gino nell'officina e vedi se può aiutarti.",
    },
    {
      speaker: "Francesca",
      text: "Lasciami stare! Voglio starmene per conto mio. Dovrei nascondermi meglio...",
    },
    {
      speaker: "Carla",
      text: "Francesca, tuo padre ti sta cercando. È molto preoccupato, devi tornare da lui",
    },
    {
      speaker: "Francesca",
      text: "Oddio! Va bene, torno subito! Grazie Carla",
    },
    {
      speaker: "Fabrizia",
      text: "Sono assetata, non riesco a concentrarmi senza un po' d'acqua. Portamene, per favore",
    },
    {
      speaker: "Fabrizia",
      text: "Cosa me ne faccio di un secchio vuoto? Riempiamolo di acqua, per favore!",
    },
    {
      speaker: "Fabrizia",
      text: "Grazie per il tuo aiuto, Carla. Ora siamo pronti a resistere.",
    },
  ];

  useEffect(() => {
    let timeout;

    const handleActivity = () => {
      sethintDialogue(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sethintDialogue(true);
      }, 6000);
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  const [scene, setScene] = useState(-1);
  const [hint, setHint] = useState("Parla con i cittadini");
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("inventory")) || []
  );
  const [interactions, setInteractions] = useState(
    JSON.parse(localStorage.getItem("interactions")) || []
  );
  const [points, setPoints] = useState(
    JSON.parse(localStorage.getItem("points")) || 0
  );
  const [hintDialogue, sethintDialogue] = useState(false);
  const navigate = useNavigate();

  const game = (selectedArea) => {
    if (selectedArea.id == "ignazio") {
      if (inventory.includes("mattoni")) {
        setScene(1);
        setInventory((prev) => prev.filter((item) => item != "mattoni"));
        localStorage.setItem(
          "inventory",
          JSON.stringify(inventory.filter((item) => item !== "mattoni"))
        );
        setInteractions((prev) => {
          const newInteractions = [...prev, "ignazio"];
          localStorage.setItem("interactions", JSON.stringify(newInteractions));
          return newInteractions;
        });
        setPoints((prev) => {
          const newPoints = prev + 1;
          localStorage.setItem("points", JSON.stringify(newPoints));
          return newPoints;
        });
      } else {
        setScene(0);
      }
    } else if (selectedArea.id == "officina") {
      navigate("/scena3");
    } else if (selectedArea.id == "campagne") {
      navigate("/scena4");
    } else if (selectedArea.id == "francesca") {
      if (
        interactions.includes("contadino3") &&
        !interactions.includes("francesca")
      ) {
        setScene(4);
      } else {
        setScene(3);
      }
    } else if (selectedArea.id == "fabrizia") {
      if (inventory.includes("acqua")) {
        setScene(8);
        setPoints((prev) => {
          const newPoints = prev + 1;
          localStorage.setItem("points", JSON.stringify(newPoints));
          return newPoints;
        });
        setInventory((prev) => {
          const newInventory = [
            ...prev.filter((item) => item !== "acqua"),
            "secchio",
          ];
          localStorage.setItem("inventory", JSON.stringify(newInventory));
          return newInventory;
        });
        setInteractions((prev) => {
          const newInteractions = [...prev, "fabrizia"];
          localStorage.setItem("interactions", JSON.stringify(newInteractions));
          return newInteractions;
        });
      } else if (inventory.includes("secchio")) {
        setScene(7);
        setHint("Porta dell'acqua a Fabrizia");
      } else {
        setScene(6);
        setHint("Porta dell'acqua a Fabrizia");
      }
    }
  };

  const [noAudioPermission, setNoAudioPermission] = useState(false);

  useEffect(() => {
    let sound;
    if (load[0]) {
      const playMusic = async () => {
        try {
          sound = new Howl({
            src: [medievalOst],
            volume: 0.15,
            loop: true,
            html5: true,
            onplayerror: () => {
              setNoAudioPermission(true);
            },
            onloaderror: () => {
              setNoAudioPermission(true);
            },
          });
          sound.play();
        } catch {
          setNoAudioPermission(true);
        }
      };
      playMusic();
    }
    return () => {
      if (sound) sound.unload();
    };
  }, [load, noAudioPermission]);


  const windowHeight = window.innerHeight;
  const imgWidth = 1920;
  const imgHeight = 1080;
  const scaledWidth = Math.round((windowHeight / imgHeight) * imgWidth);

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      <Button classes="absolute top-2 sm:text-[1rem]" noAnimation stretch>
        {hint}
      </Button>
      <ImageMapper
        src={piazza}
        name="Piazza di Adelfia"
        natural
        imgWidth={imgWidth}
        parentWidth={
          scaledWidth
        }
        responsive={true}
        areas={[
          {
            id: "fabrizia",
            shape: "poly",
            coords: [
              51, 1053, 67, 1012, 82, 944, 90, 825, 100, 807, 78, 788, 77, 768,
              128, 724, 112, 707, 100, 685, 102, 652, 129, 635, 153, 632, 184,
              646, 185, 676, 187, 695, 189, 720, 172, 702, 158, 719, 180, 729,
              187, 749, 192, 783, 194, 814, 194, 836, 206, 883, 219, 978, 217,
              1054, 180, 1056, 168, 1058, 155, 1064, 133, 1059, 121, 1049, 107,
              1059, 89, 1061,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
            disabled: interactions.includes("fabrizia"),
          },
          {
            id: "ignazio",
            shape: "poly",
            coords: [
              456, 692, 472, 678, 468, 644, 468, 578, 449, 587, 427, 563, 439,
              558, 451, 565, 472, 553, 463, 536, 473, 526, 492, 524, 500, 537,
              502, 549, 511, 559, 524, 578, 504, 598, 504, 671, 512, 683, 521,
              690,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
            disabled: interactions.includes("ignazio"),
          },
          {
            id: "officina",
            shape: "poly",
            coords: [
              1549, 631, 1554, 578, 1564, 532, 1571, 488, 1588, 458, 1603, 446,
              1621, 449, 1632, 458, 1659, 536, 1666, 583, 1667, 624, 1671, 634,
              1610, 632,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
          {
            id: "campagne",
            shape: "poly",
            coords: [
              1595, 1044, 1588, 953, 1729, 944, 1727, 919, 1614, 910, 1595, 892,
              1558, 860, 1629, 821, 1719, 829, 1724, 812, 1738, 809, 1741, 826,
              1877, 846, 1867, 938, 1744, 922, 1744, 936, 1853, 939, 1902, 985,
              1855, 1027, 1743, 1038, 1741, 1078, 1726, 1077, 1724, 1041,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
          {
            id: "francesca",
            shape: "poly",
            coords: [
              840, 800, 823, 783, 821, 751, 812, 714, 807, 678, 818, 649, 845,
              639, 867, 643, 887, 666, 887, 710, 889, 744, 885, 775, 863, 805,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
            disabled: interactions.includes("francesca"),
          },
        ]}
        onChange={(selectedArea) => game(selectedArea)}
        isMulti={false}
        onLoad={() => setLoad((prev) => [true, prev[1]])}
      />

      {!load[0] && (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white">
          <h3>Caricamento...</h3>
        </div>
      )}
      {dialogues.map(
        (dialog, index) =>
          scene == index && (
            <Dialogue
              key={"dialogue-" + index}
              absolute
              classes="bottom-10"
              dialogue={dialog}
              onClose={() => {
                if (scene == 0) {
                  setScene(2);
                } else if (scene == 2) {
                  setHint("Cerca Gino nell'officina");
                  setScene(-1);
                } else if (scene == 4) {
                  setScene(5);
                } else if (scene == 5) {
                  setPoints((prev) => {
                    const newPoints = prev + 1;
                    localStorage.setItem("points", JSON.stringify(newPoints));
                    return newPoints;
                  });

                  setInteractions((prev) => {
                    const newInteractions = [...prev, "francesca"];
                    localStorage.setItem(
                      "interactions",
                      JSON.stringify(newInteractions)
                    );
                    return newInteractions;
                  });
                } else {
                  setScene(-1);
                }
              }}
            />
          )
      )}
      {hintDialogue && scene == -1 && (
        <Dialogue
          absolute
          classes="bottom-10"
          dialogue={{
            speaker: "Narratore",
            text: "Parla con i cittadini, per salvare la città!",
            type: "hint",
          }}
          onClose={() => sethintDialogue(false)}
        />
      )}
      {noAudioPermission && (
        <Button
          classes="absolute bottom-2 left-2"
          onClick={() => {
            setNoAudioPermission(false);
          }}
        >
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

export default Scena2;
