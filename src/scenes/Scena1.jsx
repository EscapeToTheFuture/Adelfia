import { useState } from "react";
import ImageMapper from "react-img-mapper";
import casa from "@assets/images/Casa.png";
import pergamena from "@assets/images/Pergamena.png";
import Button from "@components/Button";

const Scena1 = () => {
  const [load, setLoad] = useState([false, false]);
  const [cliccable, setCliccable] = useState(false);
  const [scene, setScene] = useState(1);

  return (
    <section className="w-full h-svh flex flex-col items-center justify-center relative">
      {scene == 1 && 
      <img
        src={pergamena}
        alt="Pergamena"
        onLoad={() => setLoad(prev => [true, prev[1]])}
        className={"absolute z-10 animate-unroll select-none h-full"}
      />}

      <img src={casa} alt="Casa di Carla" className={`absolute h-full select-none ${load[0] && scene <= 1 ? "opacity-10" : ""}`} />
      
      <Button classes="absolute bottom-2 right-4" onClick={()=>{setScene(2)}}>Avanti</Button>
    </section>
  );
};

export default Scena1;
