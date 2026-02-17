import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseContext from "~/Context";
import "~/styles/spinning-cat.css";

function SpinningCat() {
  const [escBtn, setEscBtn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { runCatVideo, setRunCatVideo } = useContext(UseContext);

  // Show ESC hint briefly
  useEffect(() => {
    if (escBtn) {
      const timer = setTimeout(() => setEscBtn(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [escBtn]);

  // 🔥 FULLSCREEN + PLAY VIDEO TOGETHER
  useEffect(() => {
    const startVideo = async () => {
      if (!runCatVideo || !containerRef.current || !videoRef.current) return;

      try {
        await containerRef.current.requestFullscreen();
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (err) {
        console.log("Playback issue:", err);
      }
    };

    if (runCatVideo) {
      startVideo();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [runCatVideo]);

  // ESC button + keyboard ESC
  useEffect(() => {
    const escListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEscape();
    };

    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, []);

  const handleContainerClick = () => {
    setEscBtn(true);
  };

  const handleEscape = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setRunCatVideo(false);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {runCatVideo && (
        <motion.div
          ref={containerRef}
          className="cat_container"
          onClick={handleContainerClick}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <div
            className={`exit_btn ${escBtn ? "" : "hide"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleEscape();
            }}
          >
            <span>ESC</span>
          </div>

          <video
            ref={videoRef}
            src="/music/catvideo.mp4"
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            onEnded={handleEscape}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpinningCat;
