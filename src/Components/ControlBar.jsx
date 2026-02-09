import { useCallback } from "react";
import { Play, Pause, Volume2, Sun, Rewind, FastForward } from "lucide-react";
import { formatTime } from "../Utils/formatTime";

export function ControlBar({
  isPlaying,
  currentTime,
  duration,
  volume,
  brightness,
  onTogglePlay,
  onSeek,
  onSkip,
  onVolumeChange,
  onBrightnessChange,
}) {
  /* -------------------- Handlers -------------------- */

  const handleProgressChange = useCallback(
    (e) => {
      onSeek(parseFloat(e.target.value));
    },
    [onSeek],
  );

  const handleVolumeChange = useCallback(
    (e) => {
      onVolumeChange(parseFloat(e.target.value));
    },
    [onVolumeChange],
  );

  const handleBrightnessChange = useCallback(
    (e) => {
      onBrightnessChange(parseFloat(e.target.value));
    },
    [onBrightnessChange],
  );

  /* -------------------- Render -------------------- */

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="relative group">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleProgressChange}
          aria-label="Seek"
          className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:bg-red-500
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:group-hover:scale-125
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:bg-red-500
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:border-none"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
          {/* Rewind */}
          <button
            onClick={() => onSkip(-10)}
            aria-label="Rewind 10 seconds"
            className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95 group"
          >
            <div className="relative">
              <Rewind className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold">
                10
              </span>
            </div>
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="p-3 rounded-full bg-white hover:bg-white/90 transition-all active:scale-95 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black fill-black" />
            ) : (
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            )}
          </button>

          {/* Forward */}
          <button
            onClick={() => onSkip(10)}
            aria-label="Forward 10 seconds"
            className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95 group"
          >
            <div className="relative">
              <FastForward className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold">
                10
              </span>
            </div>
          </button>
        </div>

        {/* Time + Settings */}
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-end">
          {/* Time */}
          <span className="text-white text-sm font-medium font-mono min-w-[100px] text-center md:text-right">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:h-3
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          {/* Brightness */}
          <div className="hidden md:flex items-center gap-2">
            <Sun className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={brightness}
              onChange={handleBrightnessChange}
              aria-label="Brightness"
              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:h-3
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
