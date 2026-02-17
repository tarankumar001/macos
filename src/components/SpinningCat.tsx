import { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseContext from "~/Context";
import "~/styles/spinning-cat.css";

function SpinningCat() {
  const [escBtn, setEscBtn] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const spinningAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  useEffect(() => {
    const img = new Image();
    img.src = "/music/cat.gif";
  }, []);

  useEffect(() => {
    if (runCatVideo && containerRef.current) {
      // Request fullscreen when cat video starts
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    }
  }, [runCatVideo]);

  const handleEscape = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (spinningAudioRef.current) {
      spinningAudioRef.current.pause();
      spinningAudioRef.current.currentTime = 0;
    }
    setRunCatVideo(false);

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  const handleStartSound = () => {
    // Play spinning animation audio
    if (spinningAudioRef.current) {
      spinningAudioRef.current.currentTime = 0;
      spinningAudioRef.current.volume = 1;
      spinningAudioRef.current.play().catch((error) => {
        console.error("Spinning audio playback failed:", error);
      });
    }
  };

  const handleAnimationEnd = () => {
    // Stop spinning audio and play video with cat audio
    if (spinningAudioRef.current) {
      spinningAudioRef.current.pause();
      spinningAudioRef.current.currentTime = 0;
    }

    if (videoRef.current && audioRef.current) {
      // Set up listener for when video finishes
      const handleVideoEnd = () => {
        setRunCatVideo(false);

        // Exit fullscreen when video ends
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((err) => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`);
          });
        }
        videoRef.current?.removeEventListener("ended", handleVideoEnd);
      };

      videoRef.current.addEventListener("ended", handleVideoEnd);

      // Play video and audio together
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error);
      });

      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
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
          />

          <img
            src="/music/cat.gif"
            alt=""
            className="catgif"
            onAnimationStart={handleStartSound}
            onAnimationEnd={handleAnimationEnd}
          />

          <audio ref={audioRef} src="/music/cataudio.mp3" />
          <audio ref={spinningAudioRef} src="/music/oiia.mp3" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpinningCat;
