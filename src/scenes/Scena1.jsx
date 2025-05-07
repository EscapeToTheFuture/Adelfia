import { useState } from "react";
import ImageMapper from "react-img-mapper";
import casa from "@assets/images/Casa.png";
import pergamena from "@assets/images/Pergamena.png";

const Scena1 = () => {
  const [load, setLoad] = useState([false, false]);
  const [cliccable, setCliccable] = useState(false);

  return (
    <>
      <ImageMapper
        src={casa}
        name="Casa di Carla"
        natural
        imgWidth={1920}
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
        responsive={true}
        disabled={!cliccable}
        areas={null}
        //imgProps={}
        //canvasProps={}
        onChange={() => {}}
        isMulti={false}
        onLoad={() => setLoad([true, true])}
      />
      {!load[1] && (
        <img src={casa} alt="Casa di Carla" className={"select-none "} />
      )}
    </>
  );
};

export default Scena1;
