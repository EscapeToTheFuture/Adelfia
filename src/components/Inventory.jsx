import inventoryIcon from "@assets/images/zaino.png";
import { useState, useEffect } from "react";
import secchio from "@assets/images/oggetti/secchio.png";
import terra from "@assets/images/oggetti/terra.png";
import acqua from "@assets/images/oggetti/acqua.png";
import mattoni from "@assets/images/oggetti/mattoni.png";
import confetti from "canvas-confetti";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [points, setPoints] = useState(
    JSON.parse(localStorage.getItem("points")) || 0
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setInventory(JSON.parse(localStorage.getItem("inventory")) || []);
      setPoints(JSON.parse(localStorage.getItem("points")) || 0);
    };

    // Custom event for same-tab updates
    const customEventName = "inventoryUpdate";

    window.addEventListener(customEventName, handleStorageChange);

    // Patch localStorage.setItem to dispatch custom event (in modo asincrono)
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "inventory" || key === "points") {
        setTimeout(() => {
          window.dispatchEvent(new Event(customEventName));
        }, 0);
      }
    };

    // Initial load
    handleStorageChange();

    return () => {
      window.removeEventListener(customEventName, handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    if (points == 5) {
      window.location.hash = "/win";
    }
    if (points != 0) {
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };
      confetti({
        ...defaults,
        particleCount: 80,
        scalar: 1.2,
        shapes: ["star"],
        decay: 0.92,
        startVelocity: 20,
      });
    }
  }, [points]);

  const oggetti = [
    {
      id: 1,
      displayName: "Secchio vuoto",
      name: "secchio",
      img: secchio,
    },
    {
      id: 2,
      displayName: "Terra",
      name: "terra",
      img: terra,
    },
    {
      id: 3,
      displayName: "Secchio d'acqua",
      name: "acqua",
      img: acqua,
    },
    {
      id: 4,
      displayName: "Mattoni",
      name: "mattoni",
      img: mattoni,
    },
  ];
  return (
    <>
      <div className="absolute z-20 right-4 top-24 md:top-36 md:right-10 flex flex-col items-end">
        {!open && (
          <span className="bg-green-400 text-black font-bold rounded-full px-3 py-1 mb-2 shadow text-sm md:text-base">
            {points}/5 ⭐
          </span>
        )}
        {inventory.length > 0 && !open && (
          <button
            onClick={() => setOpen(true)}
            className="z-10 py-2 px-2 md:py-4 md:px-4 font-elite hover:-rotate-5 hover:scale-110 duration-600 transition-transform bg-gray-300 rounded-2xl"
          >
            <div className="flex gap-2 items-center justify-center text-sm md:text-xl">
              <img
                src={inventoryIcon}
                alt="Inventario"
                width={window.innerWidth < 800 ? 60 : 80}
              />
              {window.innerWidth > 800 && "Inventario"}
            </div>
          </button>
        )}
      </div>
      {open && (
        <section
          onClick={() => setOpen(false)}
          className="z-120 absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="w-1/3 h-1/3 bg-gray-800 text-white p-2 flex flex-col items-center justify-center rounded-2xl shadow-lg">
            <h2 className="text-4xl font-elite pb-3 underline">Inventario</h2>
            <h2 className="text-2xl font-elite pb-4">Punti: {points}/5</h2>
            <div className="flex flex-row">
              {inventory.map((item) => {
                const oggetto = oggetti.find((o) => o.name === item);
                if (!oggetto) return null;
                return (
                  <div
                    key={oggetto.id}
                    className="flex flex-col items-center justify-center bg-gray-700 text-white rounded-lg shadow-md w-32 h-32 m-2"
                  >
                    <img
                      src={oggetto.img}
                      alt={oggetto.displayName}
                      className="w-16 h-16 mb-2"
                    />
                    <span>{oggetto.displayName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Inventory;
