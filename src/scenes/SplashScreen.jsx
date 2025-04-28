import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@components/Button";

import backgroundImage from "@assets/images/Piazza.png";

const SplashScreen = ({ title, location }) => {
  const [hasRequestedFullscreen, setHasRequestedFullscreen] = useState(false);
  const navigate = useNavigate();
  localStorage.clear();

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setHasRequestedFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [hasRequestedFullscreen]);

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-2 md:gap-10 h-svh bg-center bg-clip-border bg-cover bg-origin-border bg-no-repeat gap-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <h1 className="2xl:w-1/2 md:w-2/3 w-2/3 text-5xl md:text-5xl xl:text-8xl font-bold text-center select-none font-elite text-green-600 z-1">
        {title}
      </h1>
      <div className="flex items-end justify-center gap-1">
        <h3 className="font-elite text-3xl md:text-3xl xl:text-6xl z-1 text-white select-none">
          {location}
        </h3>
        {/* <img
          onClick={async () => {
            if (!playing["bubbles"].playing) {
              const bubbles = playing["bubbles"].player;
              bubbles.play();
              setPlaying((prev) => ({
                ...prev,
                bubbles: { ...prev["bubbles"], playing: true },
              }));
              setTimeout(() => {
                bubbles.pause();
                setPlaying((prev) => ({
                  ...prev,
                  bubbles: { ...prev["bubbles"], playing: false },
                }));
              }, 3000);
            }
          }}
          src={ampolla}
          alt="ampolla"
          className="select-none h-10 xl:h-16 z-1 transition-transform duration-300 ease-in-out transform hover:scale-120 animate-shake"
        /> */}
      </div>
      <Button
        onClick={async () => {
  

          if (!hasRequestedFullscreen) {
            try {
              await document.body.requestFullscreen();
            } catch (err) {
              console.error(err.name, err.message);
            }
          }
          navigate("/scena1");
        }}
      >
        INIZIA
      </Button>
    </div>
  );
};

export default SplashScreen;
