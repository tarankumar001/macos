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
    if (!escBtn) return;
    const timer = setTimeout(() => setEscBtn(false), 3000);
    return () => clearTimeout(timer);
  }, [escBtn]);

  // 🔥 FULLSCREEN + SAFE AUTOPLAY (PRODUCTION SAFE)
  useEffect(() => {
    if (!runCatVideo || !containerRef.current || !videoRef.current) return;

    let cancelled = false;
    const video = videoRef.current;

    const startVideo = async () => {
      try {
        // Enter fullscreen
        await containerRef.current!.requestFullscreen();

        // Wait until video is actually playable (VERY IMPORTANT for Vercel)
        if (video.readyState < 3) {
          await new Promise<void>((resolve) => {
            video.oncanplay = () => resolve();
          });
        }

        if (cancelled) return;

        video.currentTime = 0;
        await video.play();
      } catch (err) {
        console.log("Video playback blocked:", err);
      }
    };

    startVideo();

    return () => {
      cancelled = true;
    };
  }, [runCatVideo]);

  // Keyboard ESC support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
            crossOrigin="anonymous"
            onEnded={handleEscape}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpinningCat;
