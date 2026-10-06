import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  LockKeyhole,
  Sparkles,
  ArrowLeft,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import "./index.css";

function App() {
  /* =========================================
     PAGE STATES
  ========================================= */

  const [showBirthday, setShowBirthday] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  /* =========================================
     PASSWORD
  ========================================= */

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* STATIC NAME */

  const name = "Uthara UK";

  /* =========================================
     VIDEO SYSTEM
  ========================================= */

  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
  ];

  /* =========================================
     BACKGROUND MUSIC
  ========================================= */

  const audioRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  /* =========================================
     NO BUTTON ESCAPE
  ========================================= */

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  /* =========================================
     MUSIC SETUP
  ========================================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;
  }, []);

  /* =========================================
     START MUSIC
  ========================================= */

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();

      setMusicStarted(true);
    } catch (error) {
      console.log("Music waiting for user interaction.");
    }
  };

  /* =========================================
     MUTE / UNMUTE
  ========================================= */

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;

    setIsMuted(audio.muted);

    if (!audio.paused) {
      return;
    }

    startMusic();
  };

  /* =========================================
     OPEN HEART
  ========================================= */

  const handleOpen = () => {
    if (password !== "keecha") {
      setError("Wrong secret name... try again ❤️");
      return;
    }

    setError("");

    // Start background music
    startMusic();

    setShowBirthday(true);
  };

  /* =========================================
     BIRTHDAY → QUESTION
  ========================================= */

  const handleContinue = () => {
    setShowQuestion(true);
  };

  /* =========================================
     YES
  ========================================= */

  const handleYes = () => {
    setCurrentVideo(0);
    setShowVideos(true);
  };

  /* =========================================
     NEXT VIDEO
  ========================================= */

  const handleNextVideo = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  /* =========================================
     BACK BUTTONS
  ========================================= */

  // Birthday → Invitation
  const backToInvitation = () => {
    setShowBirthday(false);
    setShowQuestion(false);
    setShowVideos(false);
  };

  // Question → Birthday
  const backToBirthday = () => {
    setShowQuestion(false);
    setShowVideos(false);

    // Reset NO button position
    setNoPosition({
      x: 0,
      y: 0,
    });
  };

  // Videos → Question
  const backToQuestion = () => {
    setShowVideos(false);
    setCurrentVideo(0);
  };

  /* =========================================
     MOVE NO BUTTON
     MOUSE + TOUCH
  ========================================= */

  const moveNoButton = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    /*
      Keep the button inside a safe area.

      Desktop:
      larger movement

      Mobile:
      smaller movement so the button
      doesn't disappear outside the screen.
    */

    const maxX =
      width <= 600
        ? Math.min(105, Math.max(65, width * 0.25))
        : Math.min(180, Math.max(110, width * 0.18));

    const maxY =
      width <= 600
        ? Math.min(130, Math.max(70, height * 0.12))
        : Math.min(180, Math.max(90, height * 0.18));

    let x = Math.random() * (maxX * 2) - maxX;
    let y = Math.random() * (maxY * 2) - maxY;

    /*
      Avoid almost-zero movement.
      Otherwise sometimes the button looks like
      it didn't escape.
    */

    if (Math.abs(x) < 45) {
      x = x < 0 ? -65 : 65;
    }

    if (Math.abs(y) < 35) {
      y = y < 0 ? -55 : 55;
    }

    setNoPosition({
      x,
      y,
    });
  };

  /* =========================================
     RESET NO BUTTON WHEN QUESTION OPENS
  ========================================= */

  useEffect(() => {
    if (showQuestion) {
      setNoPosition({
        x: 0,
        y: 0,
      });
    }
  }, [showQuestion]);

  return (
    <main className="birthday-page">

      {/* =========================================
          BACKGROUND MUSIC
      ========================================= */}

      <audio
        ref={audioRef}
        src="/music/love-song.mp3"
        preload="auto"
      />

      {/* =========================================
          MUSIC CONTROL
      ========================================= */}

      <motion.button
        className="music-control"
        onClick={toggleMute}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.92,
        }}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX size={19} />
        ) : (
          <Volume2 size={19} />
        )}

        <span>
          {isMuted ? "MUTED" : "MUSIC"}
        </span>
      </motion.button>

      {/* MUSIC STATUS */}

      {musicStarted && !isMuted && (
        <motion.div
          className="music-playing"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Music size={13} />
          <span>Playing our song...</span>
        </motion.div>
      )}

      {/* =========================================
          FLOATING HEARTS
      ========================================= */}

      <div className="floating-hearts">
        <Heart
          className="heart heart-1"
          fill="currentColor"
        />

        <Heart
          className="heart heart-2"
          fill="currentColor"
        />

        <Heart
          className="heart heart-3"
          fill="currentColor"
        />

        <Heart
          className="heart heart-4"
          fill="currentColor"
        />
      </div>

      {/* =========================================
          VIDEO PAGE
      ========================================= */}

      {showVideos ? (

        <motion.div
          className="video-gallery"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotateY: 90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            duration: 1,
          }}
        >

          {/* BACK */}

          <motion.button
            className="page-back-button"
            onClick={backToQuestion}
            whileHover={{
              scale: 1.05,
              x: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <ArrowLeft size={18} />
            BACK
          </motion.button>

          <p className="video-small">
            A LITTLE SOMETHING FOR YOU ❤️
          </p>

          <h2 className="video-title">
            OUR
            <span>MEMORIES</span>
          </h2>

          <p className="video-name">
            {name}, watch this... 💕
          </p>

          {/* VIDEO */}

          <motion.div
            className="video-card"
            key={currentVideo}
            initial={{
              opacity: 0,
              rotateY: 90,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="video-number">
              {currentVideo + 1} / {videos.length}
            </div>

            <video
              className="memory-video"
              src={videos[currentVideo]}
              controls
              autoPlay
              playsInline
              onEnded={handleNextVideo}
            />

          </motion.div>

          <p className="video-hint">
            {currentVideo < videos.length - 1
              ? "Next memory will appear after this video ❤️"
              : "That's all... but our memories never end ❤️"}
          </p>

          {currentVideo < videos.length - 1 && (
            <motion.button
              className="next-video-button"
              onClick={handleNextVideo}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              NEXT MEMORY ❤️
            </motion.button>
          )}

        </motion.div>

      ) : showQuestion ? (

        /* =========================================
           LOVE QUESTION
        ========================================= */

        <motion.div
          className="love-question-card"
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: 90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            duration: 1.1,
          }}
        >

          {/* BACK */}

          <motion.button
            className="page-back-button"
            onClick={backToBirthday}
            whileHover={{
              scale: 1.05,
              x: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <ArrowLeft size={18} />
            BACK
          </motion.button>

          <motion.div
            className="question-heart"
            animate={{
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>

          <p className="question-small">
            ONE LAST QUESTION...
          </p>

          <h2>
            DO YOU
            <span>LOVE ME?</span>
          </h2>

          <p className="question-name">
            {name}, be honest... 👀
          </p>

          <div className="love-buttons">

            {/* YES */}

            <motion.button
              className="yes-button"
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={handleYes}
            >
              ❤️ YES
            </motion.button>

            {/* NO - ESCAPING BUTTON */}

            <motion.button
              className="no-button"
              animate={{
                x: noPosition.x,
                y: noPosition.y,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 22,
                mass: 0.6,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onMouseEnter={moveNoButton}
              onTouchStart={(event) => {
                event.preventDefault();
                moveNoButton();
              }}
              onPointerDown={(event) => {
                if (event.pointerType === "touch") {
                  event.preventDefault();
                  moveNoButton();
                }
              }}
              onClick={moveNoButton}
            >
              🙈 NO
            </motion.button>

          </div>

          <p className="question-footer">
            Wrong answer detected... try again 😜❤️
          </p>

        </motion.div>

      ) : showBirthday ? (

        /* =========================================
           BIRTHDAY PAGE
        ========================================= */

        <motion.div
          className="birthday-reveal"
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: 90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            duration: 1.2,
          }}
        >

          {/* BACK */}

          <motion.button
            className="page-back-button"
            onClick={backToInvitation}
            whileHover={{
              scale: 1.05,
              x: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <ArrowLeft size={18} />
            BACK
          </motion.button>

          <motion.div
            className="birthday-heart"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            ❤️
          </motion.div>

          <p className="birthday-small">
            TODAY IS YOUR SPECIAL DAY
          </p>

          <h2>
            HAPPY BIRTHDAY
            <span>MY DEAR</span>
          </h2>

          <motion.h3
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
            }}
          >
            {name} ❤️
          </motion.h3>

          <motion.p
            className="birthday-message"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.2,
            }}
          >
            Today isn't just another day...
            <br />
            it's the day someone very special was born. 💕
          </motion.p>

          {/* PREMIUM CONTINUE */}

          <motion.button
            className="romantic-continue-button"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
            }}
            whileHover={{
              scale: 1.06,
              y: -3,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={handleContinue}
          >
            <span className="button-shine"></span>

            <Heart
              size={19}
              fill="currentColor"
            />

            CONTINUE OUR STORY

            <Heart
              size={19}
              fill="currentColor"
            />
          </motion.button>

        </motion.div>

      ) : (

        /* =========================================
           INVITATION
        ========================================= */

        <motion.div
          className="invitation-card"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotateX: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}
          transition={{
            duration: 1.2,
          }}
        >

          <motion.div
            className="heart-logo"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Heart
              fill="currentColor"
              size={42}
            />
          </motion.div>

          <div className="sparkle-title">

            <Sparkles size={18} />

            <span>
              A LITTLE SURPRISE FOR YOU
            </span>

            <Sparkles size={18} />

          </div>

          <h1>
            Birthday
            <span>Invitation</span>
          </h1>

          <p className="subtitle">
            Someone special has prepared something
            <br />
            very special for you... ❤️
          </p>

          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Secret Password
            </label>

            <div className="input-wrapper">

              <LockKeyhole size={19} />

              <input
                type="password"
                placeholder="His secret name?"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOpen();
                  }
                }}
              />

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <motion.p
              className="error-message"
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {error}
            </motion.p>
          )}

          {/* OPEN */}

          <motion.button
            className="open-button"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={handleOpen}
          >
            <Heart
              size={20}
              fill="currentColor"
            />

            OPEN MY HEART

            <Heart
              size={20}
              fill="currentColor"
            />
          </motion.button>

          <p className="bottom-text">
            Made with ❤️ just for you
          </p>

        </motion.div>

      )}

    </main>
  );
}

export default App;