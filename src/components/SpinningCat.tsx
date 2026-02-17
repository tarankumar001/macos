import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseContext from "~/Context";
import "~/styles/spinning-cat.css";

function SpinningCat() {
  const [escBtn, setEscBtn] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { runCatVideo, setRunCatVideo } = useContext(UseContext);

  useEffect(() => {
    if (escBtn) {
      const timer = setTimeout(() => {
        setEscBtn(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [escBtn]);

  // Play video and request fullscreen
  useEffect(() => {
    if (runCatVideo && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else if (!runCatVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [runCatVideo]);

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
            src="/music/catvideo.mp4"
            ref={videoRef}
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            autoPlay
            onEnded={() => setRunCatVideo(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpinningCat;
