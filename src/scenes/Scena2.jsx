import piazza from "@assets/images/Piazza.png";
import ImageMapper from "react-img-mapper";
import { useState } from "react";
import Button from "../components/Button";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";

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
  ];
  const [scene, setScene] = useState(-1);
  const [hint, setHint] = useState("Parla con i cittadini");
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("inventory")) || []
  );
  const [interactions, setInteractions] = useState(
    JSON.parse(localStorage.getItem("interactions")) || []
  );
  const navigate = useNavigate();

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      <Button classes="absolute top-2" noAnimation stretch>
        {hint}
      </Button>
      <ImageMapper
        src={piazza}
        name="Piazza di Adelfia"
        natural
        imgWidth={1920}
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
        responsive={true}
        areas={[
          {
            id: "francesca",
            shape: "poly",
            coords: [
              116, 2190, 180, 1861, 190, 1777, 159, 1798, 187, 1727, 215, 1678,
              190, 1671, 155, 1628, 166, 1597, 127, 1551, 166, 1491, 229, 1445,
              222, 1374, 265, 1325, 328, 1314, 378, 1342, 399, 1395, 402, 1459,
              402, 1484, 364, 1508, 389, 1533, 406, 1593, 403, 1646, 403, 1692,
              410, 1745, 431, 1869, 456, 1971, 459, 2208, 420, 2208, 382, 2208,
              332, 2222, 279, 2208, 240, 2193, 226, 2211, 194, 2215, 148, 2215,
            ],
            fillColor: "rgba(237, 20, 61, 0.5)",
            lineWidth: 0,
            strokeColor: "rgba(237, 20, 61, 0.5)",
          },
          {
            id: "officina",
            shape: "poly",
            coords: [
              3219, 1316, 3243, 1118, 3296, 966, 3342, 941, 3385, 955, 3420,
              994, 3445, 1086, 3469, 1206, 3473, 1326, 3321, 1323,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
          {
            id: "campagne",
            shape: "poly",
            coords: [
              3335, 2193, 3314, 1989, 3840, 1960, 3982, 2049, 3858, 2144, 3655,
              2169, 3655, 2247, 3599, 2243, 3601, 2165,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
          {
            id: "ignazio",
            shape: "poly",
            coords: [
              958, 1441, 958, 1402, 954, 1356, 961, 1229, 943, 1212, 890, 1183,
              894, 1162, 922, 1187, 982, 1166, 986, 1127, 965, 1113, 986, 1091,
              1014, 1088, 1046, 1109, 1046, 1141, 1060, 1162, 1081, 1176, 1092,
              1204, 1071, 1254, 1071, 1314, 1067, 1399, 1074, 1445,
            ],
            fillColor: "rgba(255, 255, 255, 0.3)",
            lineWidth: 0,
            strokeColor: "rgba(255, 255, 255, 0)",
          },
        ]}
        onChange={(selectedArea) => {
          if (selectedArea.id == "ignazio") {
            if (inventory.includes("mattoni")) {
              setScene(1);
              setInventory((prev) => prev.filter((item) => item != "mattoni"));
              localStorage.setItem(
                "inventory",
                JSON.stringify(inventory.filter((item) => item !== "mattoni"))
              );
            } else {
              setScene(0);
            }
          } else if (selectedArea.id == "officina") {
            navigate("/scena3");
          } else if (selectedArea.id == "campagne") {
            navigate("/scena4");
          } else if (selectedArea.id == "francesca") {
            navigate("/gameover");
          }
        }}
        isMulti={false}
        onLoad={() => setLoad((prev) => [true, prev[1]])}
      />

      {!load[0] && (
        <img
          src={piazza}
          alt="Piazza di Adelfia"
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
                  setScene(2);
                } else if (scene == 2) {
                  setHint("Cerca Gino nell'officina");
                  setScene(-1);
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

export default Scena2;
