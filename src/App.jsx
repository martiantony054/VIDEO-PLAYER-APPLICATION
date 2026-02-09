// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Home } from "./Pages/Home";
// import { VideoPlayer } from "./Components/VideoPlayer";
// import { MiniPlayer } from "./Components/MiniPlayer";

// function App() {
//   const [currentView, setCurrentView] = useState("feed");
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   // Shared playback state for seamless transition
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);

//   const handleVideoSelect = (video) => {
//     setSelectedVideo(video);
//     setCurrentView("player");
//     setIsPlaying(true);
//     setCurrentTime(0);
//   };

//   const handleBack = () => {
//     // Keep video selected to show MiniPlayer
//     setCurrentView("feed");
//   };

//   const handleCloseMiniPlayer = () => {
//     setIsPlaying(false);
//     setSelectedVideo(null);
//   };

//   const handleTimeUpdate = (time) => {
//     setCurrentTime(time);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };
//   const setPlayState = (playing) => {
//     setIsPlaying(playing);
//   };
//   const getNextVideo = () => {
//     if (!selectedVideo) return null;

//     // flatten all videos
//     const allVideos = videoData.flatMap((cat) => cat.contents);

//     const currentIndex = allVideos.findIndex((v) => v.id === selectedVideo.id);

//     return allVideos[currentIndex + 1] || null;
//   };

//   const handleVideoEnded = () => {
//     const next = getNextVideo();
//     if (!next) return;

//     setSelectedVideo(next);
//     setCurrentTime(0);
//     setIsPlaying(true);
//   };

//   // Page transition variants
//   const pageVariants = {
//     enter: {
//       x: "100%",
//       opacity: 0,
//     },
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: {
//       x: "-30%",
//       opacity: 0,
//     },
//   };

//   const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.3,
//   };

//   return (
//     <div className="w-screen h-screen bg-slate-950 overflow-hidden text-white font-sans">
//       {/* Mini Player - Persists on top of the Feed */}
//       <AnimatePresence>
//         {selectedVideo && currentView === "feed" && (
//           <MiniPlayer
//             key="mini-player"
//             videoSrc={selectedVideo.mediaUrl}
//             title={selectedVideo.title}
//             initialTime={currentTime}
//             isPlaying={isPlaying}
//             onExpand={() => setCurrentView("player")}
//             onClose={handleCloseMiniPlayer}
//             onTimeUpdate={handleTimeUpdate}
//             onTogglePlay={togglePlayPause}
//           />
//         )}
//       </AnimatePresence>

//       {/* Main Views Transition */}
//       <AnimatePresence mode="popLayout" initial={false}>
//         {currentView === "feed" && (
//           <motion.div
//             key="feed"
//             variants={pageVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={pageTransition}
//             className="absolute inset-0"
//           >
//             <Home onVideoSelect={handleVideoSelect} />
//           </motion.div>
//         )}

//         {currentView === "player" && selectedVideo && (
//           <motion.div
//             key="player"
//             variants={pageVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={pageTransition}
//             className="absolute inset-0"
//           >
//             <VideoPlayer
//               video={selectedVideo}
//               onBack={handleBack}
//               initialTime={currentTime}
//               isPlaying={isPlaying}
//               onTimeUpdate={handleTimeUpdate}
//               onPlayPause={setPlayState}
//               onVideoEnded={handleVideoEnded} // 👈 ADD
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home } from "./Pages/Home";
import { VideoPlayer } from "./Components/VideoPlayer";
import { MiniPlayer } from "./Components/MiniPlayer";
import videoData from "./Data/mockVideos";

/* ---------------- Animation Configs (static) ---------------- */

const pageVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-30%", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

/* ---------------- App ---------------- */

function App() {
  const [currentView, setCurrentView] = useState("feed");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Shared playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  /* ---------- Handlers ---------- */

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setCurrentView("player");
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleBack = () => {
    setCurrentView("feed");
  };

  const handleCloseMiniPlayer = () => {
    setIsPlaying(false);
    setSelectedVideo(null);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  /* ---------- Auto-play next ---------- */

  const getNextVideo = () => {
    if (!selectedVideo) return null;

    const allVideos = videoData.flatMap((cat) => cat.contents);
    const currentIndex = allVideos.findIndex(
      (v) => v.id === selectedVideo.id
    );

    return allVideos[currentIndex + 1] || null;
  };

  const handleVideoEnded = () => {
    const next = getNextVideo();
    if (!next) return;

    setSelectedVideo(next);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  /* ---------- Render ---------- */

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden text-white font-sans">
      {/* Mini Player */}
      <AnimatePresence>
        {selectedVideo && currentView === "feed" && (
          <MiniPlayer
            key="mini-player"
            videoSrc={selectedVideo.mediaUrl}
            title={selectedVideo.title}
            initialTime={currentTime}
            isPlaying={isPlaying}
            onExpand={() => setCurrentView("player")}
            onClose={handleCloseMiniPlayer}
            onTimeUpdate={handleTimeUpdate}
            onTogglePlay={togglePlayPause}
          />
        )}
      </AnimatePresence>

      {/* Main Views */}
      <AnimatePresence mode="popLayout" initial={false}>
        {currentView === "feed" && (
          <motion.div
            key="feed"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <Home onVideoSelect={handleVideoSelect} />
          </motion.div>
        )}

        {currentView === "player" && selectedVideo && (
          <motion.div
            key="player"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <VideoPlayer
              video={selectedVideo}
              onBack={handleBack}
              initialTime={currentTime}
              isPlaying={isPlaying}
              onTimeUpdate={handleTimeUpdate}
              onPlayPause={setIsPlaying}
              onVideoEnded={handleVideoEnded}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
