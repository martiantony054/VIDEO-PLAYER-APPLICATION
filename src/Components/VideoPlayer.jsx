// import { useRef, useState, useEffect } from "react";
// import {
//   Play,
//   Pause,
//   Volume2,
//   Sun,
//   Maximize2,
//   RotateCcw,
//   RotateCw,
// } from "lucide-react";
// import { GestureHandler } from "./GestureHandler";
// import { formatTime } from "../Utils/formatTime";

// export function VideoPlayer({
//   video,
//   onBack,
//   initialTime = 0,
//   isPlaying: externalPlaying,
//   onPlayPause,
//   onTimeUpdate,
//   onVideoEnded, // 👈 NEW
// }) {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const progressRef = useRef(null);

//   // Local state for UI controls
//   const [isControlsVisible, setIsControlsVisible] = useState(true);
//   const [currentTime, setCurrentTime] = useState(initialTime);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [brightness, setBrightness] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);

//   // Sync external play state
//   useEffect(() => {
//     if (videoRef.current) {
//       if (externalPlaying) {
//         videoRef.current.play().catch(console.error);
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [externalPlaying]);

//   // Sync initial time
//   useEffect(() => {
//     if (
//       videoRef.current &&
//       Math.abs(videoRef.current.currentTime - initialTime) > 1
//     ) {
//       videoRef.current.currentTime = initialTime;
//     }
//   }, [initialTime]);

//   // Auto-hide controls
//   useEffect(() => {
//     let timeout;
//     if (isControlsVisible && !isDragging) {
//       timeout = setTimeout(() => {
//         setIsControlsVisible(false);
//       }, 3000);
//     }
//     return () => clearTimeout(timeout);
//   }, [isControlsVisible, isDragging]);

//   useEffect(() => {
//     if (!videoRef.current) return;

//     videoRef.current.volume = volume; // 0 → 1
//     videoRef.current.muted = volume === 0;
//   }, [volume]);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (videoRef.current.paused) {
//         videoRef.current.play();
//         onPlayPause(true);
//       } else {
//         videoRef.current.pause();
//         onPlayPause(false);
//       }
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       const time = videoRef.current.currentTime;
//       setCurrentTime(time);
//       onTimeUpdate(time);
//     }
//   };

//   const handleSeek = (e) => {
//     const time = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.currentTime = time;
//       setCurrentTime(time);
//     }
//   };

//   const handleSkip = (seconds) => {
//     if (videoRef.current) {
//       videoRef.current.currentTime += seconds;
//     }
//   };

//   const handleMinimizeClick = () => {
//     onBack();
//   };

//   // Apply brightness filter to video
//   const brightnessStyle = {
//     filter: `brightness(${brightness})`,
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
//     >
//       {/* Video Container */}
//       <div className="relative w-full h-full max-h-screen">
//         <video
//           ref={videoRef}
//           src={video.mediaUrl}
//           className="w-full h-full object-contain"
//           style={brightnessStyle}
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
//           onEnded={() => {
//             onPlayPause(false);
//             onVideoEnded?.();
//           }}
//           playsInline
//         />

//         {/* Gesture Handler Overlay */}
//         <GestureHandler
//           containerRef={containerRef}
//           onToggleControls={() => setIsControlsVisible(!isControlsVisible)}
//           onSkip={handleSkip}
//           volume={volume}
//           brightness={brightness}
//           onVolumeChange={setVolume}
//           onBrightnessChange={setBrightness}
//           onShowControls={() => setIsControlsVisible(true)}
//           onDragToMinimize={handleMinimizeClick}
//         />

//         {/* Controls Overlay */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-300 ${
//             isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           {/* Top Bar */}
//           <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleMinimizeClick}
//                 className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//                 aria-label="Minimize"
//               >
//                 <Maximize2 className="w-5 h-5 rotate-180" />
//               </button>
//               <h2 className="text-white font-medium text-sm truncate max-w-[200px]">
//                 {video.title}
//               </h2>
//             </div>
//           </div>

//           {/* Center Play Button (Large) */}
//           {!externalPlaying && isControlsVisible && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <button
//                 onClick={togglePlay}
//                 className="p-4 bg-white/10 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-white/20 transition-colors"
//               >
//                 <Play className="w-12 h-12 fill-white text-white" />
//               </button>
//             </div>
//           )}

//           {/* Bottom Controls */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
//             {/* Progress Bar */}
//             <div className="relative group">
//               <input
//                 ref={progressRef}
//                 type="range"
//                 min="0"
//                 max={duration || 0}
//                 step="0.1"
//                 value={currentTime}
//                 onChange={handleSeek}
//                 onMouseDown={() => setIsDragging(true)}
//                 onMouseUp={() => setIsDragging(false)}
//                 onTouchStart={() => setIsDragging(true)}
//                 onTouchEnd={() => setIsDragging(false)}
//                 className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
//               />
//             </div>

//             {/* Controls Row */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={togglePlay}
//                   className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//                 >
//                   {externalPlaying ? (
//                     <Pause className="w-6 h-6" />
//                   ) : (
//                     <Play className="w-6 h-6 fill-white" />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleSkip(-10)}
//                     className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//                   >
//                     <RotateCcw className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleSkip(10)}
//                     className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//                   >
//                     <RotateCw className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <span className="text-white text-sm font-medium">
//                   {formatTime(currentTime)} / {formatTime(duration)}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* Volume/Brightness Indicators */}
//                 <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
//                   <Volume2 className="w-4 h-4 text-white" />
//                   <span className="text-white text-xs w-8">
//                     {Math.round(volume * 100)}%
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
//                   <Sun className="w-4 h-4 text-white" />
//                   <span className="text-white text-xs w-8">
//                     {Math.round(brightness * 100)}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useRef, useState, useEffect } from "react";
// import {
//   Play,
//   Pause,
//   Volume2,
//   Sun,
//   Maximize2,
//   RotateCcw,
//   RotateCw,
// } from "lucide-react";
// import { GestureHandler } from "./GestureHandler";
// import { formatTime } from "../Utils/formatTime";

// export function VideoPlayer({
//   video,
//   onBack,
//   initialTime = 0,
//   isPlaying: externalPlaying,
//   onPlayPause,
//   onTimeUpdate,
// }) {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const progressRef = useRef(null);

//   /* -------------------- UI State -------------------- */
//   const [isControlsVisible, setIsControlsVisible] = useState(true);
//   const [currentTime, setCurrentTime] = useState(initialTime);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [brightness, setBrightness] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);

//   /* -------------------- Sync Play State -------------------- */
//   useEffect(() => {
//     if (!videoRef.current) return;

//     if (externalPlaying) {
//       videoRef.current.play().catch(console.error);
//     } else {
//       videoRef.current.pause();
//     }
//   }, [externalPlaying]);

//   /* -------------------- Sync Initial Time -------------------- */
//   useEffect(() => {
//     if (
//       videoRef.current &&
//       Math.abs(videoRef.current.currentTime - initialTime) > 1
//     ) {
//       videoRef.current.currentTime = initialTime;
//     }
//   }, [initialTime]);

//   /* -------------------- Auto Hide Controls -------------------- */
//   useEffect(() => {
//     if (!isControlsVisible || isDragging) return;

//     const timeout = setTimeout(() => {
//       setIsControlsVisible(false);
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, [isControlsVisible, isDragging]);

//   /* -------------------- Sync Volume -------------------- */
//   useEffect(() => {
//     if (!videoRef.current) return;

//     videoRef.current.volume = volume;
//     videoRef.current.muted = volume === 0;
//   }, [volume]);

//   /* -------------------- Handlers -------------------- */
//   const togglePlay = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       onPlayPause(true);
//     } else {
//       videoRef.current.pause();
//       onPlayPause(false);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (!videoRef.current) return;

//     const time = videoRef.current.currentTime;
//     setCurrentTime(time);
//     onTimeUpdate(time);
//   };

//   const handleSeek = (e) => {
//     const time = parseFloat(e.target.value);
//     if (!videoRef.current) return;

//     videoRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   const handleSkip = (seconds) => {
//     if (!videoRef.current) return;
//     videoRef.current.currentTime += seconds;
//   };

//   const handleMinimizeClick = () => {
//     onBack();
//   };

//   /* -------------------- Styles -------------------- */
//   const brightnessStyle = {
//     filter: `brightness(${brightness})`,
//   };

//   /* -------------------- Render -------------------- */
//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
//     >
//       <div className="relative w-full h-full max-h-screen">
//         <video
//           ref={videoRef}
//           src={video.mediaUrl}
//           className="w-full h-full object-contain"
//           style={brightnessStyle}
//           playsInline
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={() =>
//             setDuration(videoRef.current?.duration || 0)
//           }
//         />

//         {/* Gesture Overlay */}
//         <GestureHandler
//           containerRef={containerRef}
//           onToggleControls={() =>
//             setIsControlsVisible((prev) => !prev)
//           }
//           onSkip={handleSkip}
//           volume={volume}
//           brightness={brightness}
//           onVolumeChange={setVolume}
//           onBrightnessChange={setBrightness}
//           onShowControls={() => setIsControlsVisible(true)}
//           onDragToMinimize={handleMinimizeClick}
//         />

//         {/* Controls Overlay */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-300 ${
//             isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           {/* Top Bar */}
//           <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3">
//             <button
//               onClick={handleMinimizeClick}
//               aria-label="Minimize"
//               className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//             >
//               <Maximize2 className="w-5 h-5 rotate-180" />
//             </button>
//             <h2 className="text-white font-medium text-sm truncate max-w-[200px]">
//               {video.title}
//             </h2>
//           </div>

//           {/* Center Play */}
//           {!externalPlaying && isControlsVisible && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <button
//                 onClick={togglePlay}
//                 className="p-4 bg-white/10 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-white/20 transition-colors"
//               >
//                 <Play className="w-12 h-12 fill-white text-white" />
//               </button>
//             </div>
//           )}

//           {/* Bottom Controls */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
//             {/* Progress */}
//             <div className="relative">
//               <input
//                 ref={progressRef}
//                 type="range"
//                 min="0"
//                 max={duration || 0}
//                 step="0.1"
//                 value={currentTime}
//                 onChange={handleSeek}
//                 onMouseDown={() => setIsDragging(true)}
//                 onMouseUp={() => setIsDragging(false)}
//                 onTouchStart={() => setIsDragging(true)}
//                 onTouchEnd={() => setIsDragging(false)}
//                 className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full"
//               />
//             </div>

//             {/* Controls */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={togglePlay}
//                   className="p-2 text-white hover:bg-white/10 rounded-full"
//                 >
//                   {externalPlaying ? (
//                     <Pause className="w-6 h-6" />
//                   ) : (
//                     <Play className="w-6 h-6 fill-white" />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleSkip(-10)}
//                     className="p-2 text-white hover:bg-white/10 rounded-full"
//                   >
//                     <RotateCcw className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleSkip(10)}
//                     className="p-2 text-white hover:bg-white/10 rounded-full"
//                   >
//                     <RotateCw className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <span className="text-white text-sm">
//                   {formatTime(currentTime)} / {formatTime(duration)}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
//                   <Volume2 className="w-4 h-4 text-white" />
//                   <span className="text-white text-xs w-8">
//                     {Math.round(volume * 100)}%
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
//                   <Sun className="w-4 h-4 text-white" />
//                   <span className="text-white text-xs w-8">
//                     {Math.round(brightness * 100)}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Sun,
  Maximize2,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { GestureHandler } from "./GestureHandler";
import { formatTime } from "../Utils/formatTime";

export function VideoPlayer({
  video,
  onBack,
  initialTime = 0,
  isPlaying: externalPlaying,
  onPlayPause,
  onTimeUpdate,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  /* -------------------- UI State -------------------- */
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  /* -------------------- Sync Play State -------------------- */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    externalPlaying
      ? videoEl.play().catch(console.error)
      : videoEl.pause();
  }, [externalPlaying]);

  /* -------------------- Sync Initial Time -------------------- */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (Math.abs(videoEl.currentTime - initialTime) > 1) {
      videoEl.currentTime = initialTime;
    }
  }, [initialTime]);

  /* -------------------- Auto Hide Controls -------------------- */
  useEffect(() => {
    if (!isControlsVisible || isDragging) return;

    const timeoutId = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isControlsVisible, isDragging]);

  /* -------------------- Sync Volume -------------------- */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.volume = volume;
    videoEl.muted = volume === 0;
  }, [volume]);

  /* -------------------- Handlers -------------------- */
  const togglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      onPlayPause(true);
    } else {
      videoEl.pause();
      onPlayPause(false);
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const time = videoEl.currentTime;
    setCurrentTime(time);
    onTimeUpdate(time);
  };

  const handleSeek = (e) => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const time = parseFloat(e.target.value);
    videoEl.currentTime = time;
    setCurrentTime(time);
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  /* -------------------- Styles -------------------- */
  const brightnessStyle = {
    filter: `brightness(${brightness})`,
  };

  /* -------------------- Render -------------------- */
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full max-h-screen">
        <video
          ref={videoRef}
          src={video.mediaUrl}
          className="w-full h-full object-contain"
          style={brightnessStyle}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() =>
            setDuration(videoRef.current?.duration || 0)
          }
        />

        {/* Gesture Layer */}
        <GestureHandler
          containerRef={containerRef}
          onToggleControls={() =>
            setIsControlsVisible((v) => !v)
          }
          onSkip={handleSkip}
          volume={volume}
          brightness={brightness}
          onVolumeChange={setVolume}
          onBrightnessChange={setBrightness}
          onShowControls={() => setIsControlsVisible(true)}
          onDragToMinimize={onBack}
        />

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-300 ${
            isControlsVisible
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Minimize"
              className="p-2 text-white hover:bg-white/10 rounded-full"
            >
              <Maximize2 className="w-5 h-5 rotate-180" />
            </button>
            <h2 className="text-white text-sm font-medium truncate max-w-[200px]">
              {video.title}
            </h2>
          </div>

          {/* Center Play */}
          {!externalPlaying && isControlsVisible && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={togglePlay}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full pointer-events-auto hover:bg-white/20"
              >
                <Play className="w-12 h-12 fill-white text-white" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Progress */}
            <input
              ref={progressRef}
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-red-500
                [&::-webkit-slider-thumb]:rounded-full"
            />

            {/* Control Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:bg-white/10 rounded-full"
                >
                  {externalPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 fill-white" />
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSkip(-10)}
                    className="p-2 text-white hover:bg-white/10 rounded-full"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleSkip(10)}
                    className="p-2 text-white hover:bg-white/10 rounded-full"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
                  <Volume2 className="w-4 h-4 text-white" />
                  <span className="text-xs text-white w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
                  <Sun className="w-4 h-4 text-white" />
                  <span className="text-xs text-white w-8">
                    {Math.round(brightness * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
