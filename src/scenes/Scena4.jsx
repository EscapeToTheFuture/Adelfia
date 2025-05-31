import campagna from "@assets/images/Campagna.png";
import ImageMapper from "react-img-mapper";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import { Howl } from "howler";
import campagneOst from "@assets/sounds/ost/campagne.mp3";
import riempiAcqua from "@assets/sounds/riempiAcqua.mp3";

const Scena4 = () => {
  const [load, setLoad] = useState([false]);
  const dialogues = [
    {
      speaker: "Cartello",
      text: "Non lanciare monete, abbiamo terminato i desideri",
    },
    {
      speaker: "Carla",
      text: "Mi serve un secchio per prendere l’acqua",
    },
    {
      speaker: "Carla",
      text: "Pesa un pò, ma devo portarlo subito a Gino.",
    },
    {
      speaker: "Contadino #1",
      text: "Ok, tornerà subito a casa. Grazie per avermi avvisato",
    },
    {
      speaker: "Contadino #2",
      text: "Torno immediatamente, potrebbero aver bisogno di me",
    },
    {
      speaker: "Carla",
      text: "Pesa un pò, ma sicuramente mi servirà per qualcosa",
    },
    {
      speaker: "Contadino #3",
      text: "Non posso tornare a casa finché non trovo mia figlia Francesca.",
    },
    {
      speaker: "Contadino #3",
      text: "Grazie di aver trovato mia figlia, mia moglie sarà in pensiero per entrambi.",
    },
    {
      speaker: "Contadino #3",
      text: "Sono molto preoccupato, si diverte sempre a nascondersi... Puoi aiutarmi?",
    },
    {
      speaker: "Carla",
      text: "Non voglio sporcarmi",
    },
    {
      speaker: "Carla",
      text: "Ecco la terra, potrebbe essere utile a Gino",
    },
  ];
  const [scene, setScene] = useState(-1);
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("inventory")) || []
  );
  const [interactions, setInteractions] = useState(
    JSON.parse(localStorage.getItem("interactions")) || []
  );
  const [points, setPoints] = useState(
    JSON.parse(localStorage.getItem("points")) || 0
  );

  const navigate = useNavigate();

  const game = (selectedArea) => {
    if (selectedArea.id == "uscita") {
      navigate("/scena2");
    } else if (selectedArea.id == "pozzo") {
      if (inventory.includes("secchio")) {
        setInventory((prev) => {
            const newInventory = [
            ...prev.filter((item) => item !== "secchio"),
            "acqua",
            ];
            localStorage.setItem("inventory", JSON.stringify(newInventory));
            try {
            const waterSound = new Howl({
              src: [riempiAcqua],
              volume: 0.5,
            });
            waterSound.play();
            } catch {}
            return newInventory;
        });
        if (interactions.includes("ginoMattoni")) {
          setScene(2);
        } else {
          setScene(5);
        }
      } else {
        setScene(0);
      }
    } else if (selectedArea.id == "contadino1") {
      setScene(3);
      setInteractions((prev) => {
        const newInteractions = [...prev, "contadino1"];
        localStorage.setItem("interactions", JSON.stringify(newInteractions));
        return newInteractions;
      });
      if (interactions.includes("contadino2")) {
        setPoints((prev) => {
          const newPoints = prev + 1;
          localStorage.setItem("points", JSON.stringify(newPoints));
          return newPoints;
        });
      }
    } else if (selectedArea.id == "contadino2") {
      setScene(4);
      setInteractions((prev) => {
        const newInteractions = [...prev, "contadino2"];
        localStorage.setItem("interactions", JSON.stringify(newInteractions));
        return newInteractions;
      });
      if (interactions.includes("contadino1")) {
        setPoints((prev) => {
          const newPoints = prev + 1;
          localStorage.setItem("points", JSON.stringify(newPoints));
          return newPoints;
        });
      }
    } else if (selectedArea.id == "contadino3") {
      if (interactions.includes("francesca")) {
        setScene(7);
        if (!interactions.includes("risoltoFrancesca")) {
          setPoints((prev) => {
            const newPoints = prev + 1;
            localStorage.setItem("points", JSON.stringify(newPoints));
            return newPoints;
          });
          setInteractions((prev) => {
            const newInteractions = [...prev, "risoltoFrancesca"];
            localStorage.setItem(
              "interactions",
              JSON.stringify(newInteractions)
            );
            return newInteractions;
          });
        }
      } else {
        setScene(6);
        setInteractions((prev) => {
          const newInteractions = [...prev, "contadino3"];
          localStorage.setItem("interactions", JSON.stringify(newInteractions));
          return newInteractions;
        });
      }
    } else if (selectedArea.id == "terra") {
      if (interactions.includes("ginoMattoni")) {
        setScene(10);
        setInventory((prev) => {
          const newInventory = [...prev, "terra"];
          localStorage.setItem("inventory", JSON.stringify(newInventory));
          return newInventory;
        });
      } else {
        setScene(9);
      }
    }
  };

  const [noAudioPermission, setNoAudioPermission] = useState(false);

  useEffect(() => {
    let sound;
    if (load[0] && !noAudioPermission) {
      try {
        sound = new Howl({
          src: [campagneOst],
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
        sound.play();
      } catch {
        setNoAudioPermission(true);
      }
      return () => {
        if (sound) sound.unload();
      };
    }
  }, [load, noAudioPermission]);

  const imgWidth = 1920;
  const imgHeight = 1080;
  const scaledWidth = Math.round((windowHeight / imgHeight) * imgWidth);

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      <Button classes="absolute top-2" noAnimation stretch>
        Campagne di Adelfia
      </Button>
      <ImageMapper
        src={campagna}
        name="Campagna di Adelfia"
        natural
        imgWidth={imgWidth}
        parentWidth={scaledWidth}
        responsive={true}
        areas={[
          {
            id: "pozzo",
            shape: "poly",
            coords: [
              1930, 1830, 1930, 1551, 1898, 1512, 1894, 1441, 1958, 1399, 1969,
              1370, 1951, 1091, 1813, 1070, 2000, 827, 2633, 855, 2820, 1046,
              2668, 1074, 2671, 1204, 2728, 1229, 2756, 1286, 2841, 1318, 2837,
              1353, 2707, 1328, 2693, 1254, 2664, 1250, 2675, 1388, 2760, 1448,
              2767, 1515, 2739, 1547, 2717, 1865, 2640, 1893, 2519, 1907, 2385,
              1911, 2230, 1911, 2078, 1886, 1958, 1847,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
            disabled: inventory.includes("acqua"),
          },
          {
            id: "uscita",
            shape: "poly",
            coords: [
              3625, 1904, 3618, 1321, 3417, 1325, 3466, 1275, 3413, 1229, 3618,
              1222, 3629, 1183, 3664, 1180, 3668, 1222, 3869, 1219, 3965, 1279,
              3876, 1328, 3668, 1325, 3650, 1883,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
          },
          {
            id: "contadino1",
            shape: "poly",
            coords: [
              191, 2027, 187, 1929, 166, 1820, 70, 1809, 49, 1636, 42, 1593, 35,
              1530, 67, 1544, 88, 1565, 109, 1516, 95, 1350, 130, 1173, 141,
              1117, 204, 1078, 229, 1050, 229, 1018, 190, 1025, 151, 1007, 162,
              968, 194, 944, 212, 922, 261, 898, 300, 915, 349, 922, 360, 940,
              346, 972, 296, 1011, 289, 1042, 307, 1071, 374, 1092, 413, 1170,
              420, 1216, 445, 1166, 469, 1120, 501, 1103, 523, 1103, 537, 1124,
              540, 1148, 516, 1169, 456, 1265, 424, 1325, 382, 1303, 382, 1395,
              406, 1491, 424, 1660, 449, 1777, 481, 1854, 505, 1911, 502, 2024,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
            disabled: interactions.includes("contadino1"),
          },
          {
            id: "contadino2",
            shape: "poly",
            coords: [
              1124, 2197, 1159, 2113, 1138, 1986, 1141, 1865, 1081, 1855, 1131,
              1544, 1113, 1470, 1046, 1523, 894, 1424, 905, 1371, 1025, 1435,
              1071, 1364, 1131, 1314, 1141, 1244, 1106, 1191, 1138, 1138, 1194,
              1145, 1230, 1141, 1261, 1170, 1283, 1194, 1311, 1261, 1304, 1403,
              1357, 1406, 1403, 1449, 1385, 1502, 1350, 1575, 1300, 1589, 1307,
              1844, 1293, 1900, 1276, 2035, 1247, 2133, 1314, 2186, 1300, 2201,
              1216, 2155, 1166, 2201,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
            disabled: interactions.includes("contadino2"),
          },
          {
            id: "contadino3",
            shape: "poly",
            coords: [
              2886, 1891, 2918, 1841, 2901, 1739, 2901, 1629, 2922, 1527, 2901,
              1456, 2876, 1382, 2933, 1226, 2986, 1173, 3021, 1117, 3038, 1085,
              3113, 1096, 3127, 1138, 3137, 1181, 3208, 1212, 3240, 1336, 3229,
              1474, 3187, 1559, 3219, 1668, 3236, 1714, 3279, 1721, 3279, 1767,
              3272, 1880, 3226, 1915, 3108, 1908,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
            disabled: interactions.includes("risoltoFrancesca"),
          },
          {
            id: "terra",
            shape: "poly",
            coords: [
              401, 2239, 415, 2080, 436, 1992, 432, 1953, 471, 1953, 496, 1953,
              507, 1883, 623, 1879, 701, 1879, 708, 1946, 736, 2038, 736, 2123,
              768, 2088, 835, 2052, 895, 2091, 955, 2112, 980, 2109, 1026, 2137,
              1090, 2197, 1136, 2218, 1083, 2243,
            ],
            fillColor: "rgba(255, 255, 255, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0.5)",
            disabled: inventory.includes("terra"),
          },
        ]}
        onChange={(selectedArea) => game(selectedArea)}
        isMulti={false}
        onLoad={() => setLoad((prev) => [true, prev[1]])}
      />

      {!load[0] && (
        <img
          src={campagna}
          alt="Campagna di Adelfia"
          className={`absolute h-full select-none transition-opacity duration-4000`}
        />
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
                  setScene(1);
                } else if (scene == 6) {
                  setScene(8);
                } else {
                  setScene(-1);
                }
              }}
            />
          )
      )}
    </section>
  );
};

export default Scena4;
