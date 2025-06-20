import officina from "@assets/images/OfficinaFabbro.png";
import officinaNOSecchio from "@assets/images/OfficinaFabbro-NOSecchio.png";
import ImageMapper from "react-img-mapper";
import Button from "../components/Button";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import { Howl } from "howler";
import { useEffect, useState } from "react";
import fabbroOst1 from "@assets/sounds/ost/fabbro.mp3";
import fabbroOst2 from "@assets/sounds/ost/fabbro2.mp3";

const Scena3 = () => {
  const [load, setLoad] = useState([false]);
  const dialogues = [
    {
      speaker: "Gino",
      text: "Non posso fare mattoni dal nulla. Portami terra e acqua, poi vediamo cosa si può fare.",
    },
    {
      speaker: "Gino",
      text: "Perfetto! Ecco i mattoni che mi avevi chiesto.",
    },
  ];
  const [scene, setScene] = useState(-1);
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("inventory")) || []
  );
  const [interactions, setInteractions] = useState(
    JSON.parse(localStorage.getItem("interactions")) || []
  );
  const navigate = useNavigate();

  const game = (selectedArea) => {
    if (selectedArea.id == "uscita") {
      navigate("/scena2");
    } else if (selectedArea.id == "secchio") {
      setInventory((prev) => {
        const newInventory = [...prev, "secchio"];
        localStorage.setItem("inventory", JSON.stringify(newInventory));
        return newInventory;
      });
    } else if (selectedArea.id == "gino") {
      if (inventory.includes("acqua") && inventory.includes("terra")) {
        setScene(1);
        setInventory((prev) => {
          const newInventory = prev
            .filter((item) => item !== "acqua" && item !== "terra")
            .concat("mattoni", "secchio");
          localStorage.setItem("inventory", JSON.stringify(newInventory));
          return newInventory;
        });
      } else {
        setScene(0);
      }
      if (!interactions.includes("ginoMattoni")) {
        setInteractions((prev) => {
          const newInteraction = [...prev, "ginoMattoni"];
          localStorage.setItem("interactions", JSON.stringify(newInteraction));
          return newInteraction;
        });
      }
    }
  };
  const [noAudioPermission, setNoAudioPermission] = useState(false);

  useEffect(() => {
    let sound;
    if (load[0] && !noAudioPermission) {
      let sound1, sound2;
      const playMusic = async () => {
      try {
        sound1 = new Howl({
        src: [fabbroOst1],
        volume: 0.5,
        loop: true,
        html5: true,
        onplayerror: () => {
          setNoAudioPermission(true);
        },
        onloaderror: () => {
          setNoAudioPermission(true);
        },
        });
        sound2 = new Howl({
        src: [fabbroOst2],
        volume: 0.5,
        loop: true,
        html5: true,
        onplayerror: () => {
          setNoAudioPermission(true);
        },
        onloaderror: () => {
          setNoAudioPermission(true);
        },
        });
        sound1.play();
        sound2.play();
      } catch {
        setNoAudioPermission(true);
      }
      };
      playMusic();
      return () => {
      if (sound1) sound1.unload();
      if (sound2) sound2.unload();
      };
    }
  }, [load, noAudioPermission]);



  const windowHeight = window.innerHeight;
  const imgWidth = 1920;
  const imgHeight = 1080;
  const scaledWidth = Math.round((windowHeight / imgHeight) * imgWidth);

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative bg-black">
      <Button classes="absolute top-2" noAnimation stretch>
        Officina di Gino
      </Button>
      {!inventory.includes("secchio") && !inventory.includes("acqua") ? (
        <ImageMapper
          src={officina}
          name="Officina di Gino"
          natural
          imgWidth={imgWidth}
          parentWidth={scaledWidth}
          responsive={true}
          areas={[
            {
              id: "secchio",
              shape: "poly",
              coords: [
                962, 1066, 938, 946, 968, 922, 1004, 922, 1040, 921, 1070, 931,
                1084, 946, 1074, 982, 1062, 1070, 1031, 1075, 999, 1077,
              ],
              fillColor: "rgba(255, 255, 255, 0.5)",
              lineWidth: 0,
              strokeColor: "rgba(255, 255, 255, 0.5)",
            },
            {
              id: "gino",
              shape: "poly",
              coords: [
                1556, 1068, 1581, 1049, 1590, 1019, 1571, 899, 1557, 892, 1542,
                699, 1520, 700, 1505, 676, 1512, 648, 1539, 639, 1551, 637,
                1566, 507, 1518, 454, 1503, 375, 1510, 337, 1551, 290, 1617,
                278, 1596, 264, 1603, 254, 1634, 271, 1642, 263, 1661, 266,
                1671, 285, 1696, 293, 1717, 303, 1722, 290, 1744, 297, 1724,
                337, 1705, 332, 1712, 312, 1652, 292, 1615, 336, 1608, 366,
                1618, 385, 1630, 361, 1638, 351, 1666, 358, 1684, 359, 1705,
                376, 1713, 398, 1708, 432, 1713, 459, 1740, 476, 1766, 504,
                1755, 532, 1747, 614, 1739, 671, 1755, 717, 1771, 760, 1783,
                807, 1796, 843, 1806, 895, 1815, 946, 1832, 997, 1845, 1039,
                1864, 1061, 1886, 1066,
              ],
              fillColor: "rgba(255, 255, 255, 0.5)",
              lineWidth: 0,
              strokeColor: "rgba(255, 255, 255, 0.5)",
              disabled: inventory.includes("mattoni"),
            },
            {
              id: "uscita",
              shape: "poly",
              coords: [
                7, 1073, 8, 1005, 32, 709, 73, 495, 102, 397, 153, 264, 210,
                186, 266, 146, 327, 134, 393, 158, 438, 210, 539, 463, 604, 848,
                626, 1055, 628, 1077,
              ],
              fillColor: "rgba(255, 255, 255, 0.5)",
              lineWidth: 0,
              strokeColor: "rgba(255, 255, 255, 0.5)",
            },
          ]}
          onChange={(selectedArea) => game(selectedArea)}
          isMulti={false}
          onLoad={() => setLoad((prev) => [true, prev[1]])}
        />
      ) : (
        <ImageMapper
          src={officinaNOSecchio}
          name="Officina di Gino"
          natural
          imgWidth={imgWidth}
          parentWidth={scaledWidth}
          responsive={true}
          areas={[
            {
              id: "uscita",
              shape: "poly",
              coords: [
                0, 2215, 50, 1491, 78, 1332, 110, 1173, 180, 859, 297, 559, 424,
                393, 544, 308, 664, 290, 799, 329, 894, 424, 1071, 834, 1205,
                1409, 1322, 2247, 11, 2246,
              ],
              fillColor: "rgba(255, 255, 255, 0.5)",
              lineWidth: 0,
              strokeColor: "rgba(255, 255, 255, 0.5)",
            },
            {
              id: "gino",
              shape: "poly",
              coords: [
                3222, 2211, 3303, 2183, 3271, 1911, 3261, 1851, 3232, 1851,
                3215, 1473, 3144, 1459, 3116, 1431, 3144, 1342, 3218, 1321,
                3239, 1049, 3155, 911, 3123, 795, 3137, 703, 3204, 615, 3370,
                576, 3292, 547, 3321, 537, 3398, 551, 3430, 555, 3462, 576,
                3455, 600, 3405, 643, 3352, 731, 3363, 788, 3378, 763, 3399,
                739, 3445, 728, 3487, 749, 3519, 770, 3554, 806, 3544, 862,
                3540, 933, 3565, 986, 3597, 997, 3650, 1018, 3671, 1085, 3653,
                1226, 3618, 1374, 3664, 1484, 3692, 1547, 3660, 1558, 3798,
                2042, 3841, 2190, 3894, 2215, 3833, 2239, 3759, 2126, 3526,
                1858, 3428, 1876, 3350, 2169, 3336, 2232, 3272, 2246,
              ],
              fillColor: "rgba(255, 255, 255, 0.5)",
              lineWidth: 0,
              strokeColor: "rgba(255, 255, 255, 0.5)",
              disabled: inventory.includes("mattoni"),
            },
          ]}
          onChange={(selectedArea) => game(selectedArea)}
          isMulti={false}
          onLoad={() => setLoad((prev) => [true, prev[1]])}
        />
      )}

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
                setScene(-1);
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

export default Scena3;
