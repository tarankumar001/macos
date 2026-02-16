import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseContext from "~/Context";
import "~/styles/spinning-cat.css";

function SpinningCat() {
  const [escBtn, setEscBtn] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const oiiaRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { runCatVideo, setRunCatVideo } = useContext(UseContext);

  useEffect(() => {
    if (escBtn) {
      const timer = setTimeout(() => {
        setEscBtn(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [escBtn]);

  useEffect(() => {
    const img = new Image();
    img.src = "/cat.gif";
  }, []);

  const handleEscape = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (oiiaRef.current) oiiaRef.current.currentTime = 0;
    setRunCatVideo(false);
  };

  const handleStartSound = () => {
    if (oiiaRef.current) {
      oiiaRef.current.volume = 0.25;
      oiiaRef.current.play();
    }
  };

  const handleAnimationEnd = () => {
    setTimeout(() => {
      if (videoRef.current && audioRef.current) {
        audioRef.current.volume = 0.25;

        Promise.all([audioRef.current.play(), videoRef.current.play()]).catch((error) => {
          console.error("Playback failed:", error);
        });

        timeoutRef.current = setTimeout(() => {
          setRunCatVideo(false);
          if (oiiaRef.current) oiiaRef.current.currentTime = 0;
        }, 64000);
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {runCatVideo && (
        <motion.div
          className="cat_container"
          onClick={() => setEscBtn(true)}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <div
            className={`exit_btn ${escBtn ? "" : "hide"}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleEscape();
            }}
          >
            <span>ESC</span>
          </div>

          <video
            src="/catvideo.mp4"
            ref={videoRef}
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
          />

          <img
            src="/cat.gif"
            alt=""
            className="catgif"
            onAnimationStart={handleStartSound}
            onAnimationEnd={handleAnimationEnd}
          />

          <audio ref={audioRef} src="/music/sunflower.mp3" />
          <audio ref={oiiaRef} src="/music/sunflower.mp3" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpinningCat;
