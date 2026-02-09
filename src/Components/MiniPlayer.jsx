// import { useRef, useEffect, useState } from "react";
// import { Play, Pause,X } from "lucide-react";

// export function MiniPlayer({
//   videoSrc,
//   title,
//   initialTime,
//   isPlaying, 
//   onTogglePlay, 
//   onExpand,
//   onClose,
//   onTimeUpdate,
// }) {
//   const videoRef = useRef(null);

//   const [currentTime, setCurrentTime] = useState(initialTime);
//   const [duration, setDuration] = useState(0);

//   // Sync time when mini player mounts / updates
//   useEffect(() => {
//   if (videoRef.current) {
//     videoRef.current.currentTime = initialTime;
//   }
  
// }, []);


//   // Sync play / pause from parent
//   useEffect(() => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//   }, [isPlaying]);

//   const handleTimeUpdate = () => {
//     const time = videoRef.current.currentTime;
//     setCurrentTime(time);
//     onTimeUpdate?.(time);
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(videoRef.current.duration || 0);
//   };

//   const formatTime = (time = 0) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-80 bg-black rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-800">
//       {/* Video Preview */}
//       <div
//         className="relative aspect-video bg-black cursor-pointer"
//         onClick={onExpand}
//       >
//         <video
//           ref={videoRef}
//           src={videoSrc}
//           className="w-full h-full object-contain"
//           playsInline
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={handleLoadedMetadata}
//         />

//         {!isPlaying && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//             <Play className="w-10 h-10 text-white fill-white" />
//           </div>
//         )}
//       </div>

//       {/* Controls */}
//       <div className="bg-zinc-900 p-3 flex items-center justify-between gap-3">
//         {/* Info */}
//         <div className="flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
//           <h3 className="text-white text-sm font-medium truncate">
//             {title || "Unknown Video"}
//           </h3>
//           <p className="text-zinc-400 text-xs">
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center gap-1">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onTogglePlay(); // 👈 tell parent
//             }}
//             className="p-2 text-white hover:bg-zinc-800 rounded-full"
//           >
//             {isPlaying ? (
//               <Pause className="w-5 h-5" />
//             ) : (
//               <Play className="w-5 h-5 fill-white" />
//             )}
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onClose();
//             }}
//             className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useRef, useEffect, useState } from "react";
// import { Play, Pause, X } from "lucide-react";

// export function MiniPlayer({
//   videoSrc,
//   title,
//   initialTime,
//   isPlaying,
//   onTogglePlay,
//   onExpand,
//   onClose,
//   onTimeUpdate,
// }) {
//   const videoRef = useRef(null);

//   const [currentTime, setCurrentTime] = useState(initialTime);
//   const [duration, setDuration] = useState(0);

//   /* -------------------- Sync Initial Time -------------------- */
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = initialTime;
//     }
//   }, []);

//   /* -------------------- Sync Play / Pause -------------------- */
//   useEffect(() => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//   }, [isPlaying]);

//   /* -------------------- Video Handlers -------------------- */
//   const handleTimeUpdate = () => {
//     const time = videoRef.current.currentTime;
//     setCurrentTime(time);
//     onTimeUpdate?.(time);
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(videoRef.current.duration || 0);
//   };

//   /* -------------------- Utils -------------------- */
//   const formatTime = (time = 0) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   /* -------------------- Render -------------------- */
//   return (
//     <div className="fixed bottom-4 right-4 w-80 bg-black rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-800">
//       {/* Video Preview */}
//       <div
//         className="relative aspect-video bg-black cursor-pointer"
//         onClick={onExpand}
//       >
//         <video
//           ref={videoRef}
//           src={videoSrc}
//           className="w-full h-full object-contain"
//           playsInline
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={handleLoadedMetadata}
//         />

//         {!isPlaying && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//             <Play className="w-10 h-10 text-white fill-white" />
//           </div>
//         )}
//       </div>

//       {/* Controls */}
//       <div className="bg-zinc-900 p-3 flex items-center justify-between gap-3">
//         {/* Info */}
//         <div className="flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
//           <h3 className="text-white text-sm font-medium truncate">
//             {title || "Unknown Video"}
//           </h3>
//           <p className="text-zinc-400 text-xs">
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-1">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onTogglePlay();
//             }}
//             className="p-2 text-white hover:bg-zinc-800 rounded-full"
//           >
//             {isPlaying ? (
//               <Pause className="w-5 h-5" />
//             ) : (
//               <Play className="w-5 h-5 fill-white" />
//             )}
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onClose();
//             }}
//             className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useRef, useEffect, useState } from "react";
import { Play, Pause, X } from "lucide-react";

export function MiniPlayer({
  videoSrc,
  title,
  initialTime,
  isPlaying,
  onTogglePlay,
  onExpand,
  onClose,
  onTimeUpdate,
}) {
  const videoRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);

  /* -------------------- Sync Initial Time (once) -------------------- */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.currentTime = initialTime;
  }, []); // intentional: only on mount

  /* -------------------- Sync Play / Pause -------------------- */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    isPlaying ? videoEl.play() : videoEl.pause();
  }, [isPlaying]);

  /* -------------------- Video Handlers -------------------- */
  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const time = videoEl.currentTime;
    setCurrentTime(time);
    onTimeUpdate?.(time);
  };

  const handleLoadedMetadata = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setDuration(videoEl.duration || 0);
  };

  /* -------------------- Utils -------------------- */
  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-800">
      {/* Video Preview */}
      <div
        className="relative aspect-video bg-black cursor-pointer"
        onClick={onExpand}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-10 h-10 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-zinc-900 p-3 flex items-center justify-between gap-3">
        {/* Info */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
          <h3 className="text-white text-sm font-medium truncate">
            {title || "Unknown Video"}
          </h3>
          <p className="text-zinc-400 text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className="p-2 text-white hover:bg-zinc-800 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 fill-white" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
