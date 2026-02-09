import { useRef, useEffect } from "react";

export function GestureHandler({
  containerRef,
  onToggleControls,
  onSkip,
  volume,
  brightness,
  onVolumeChange,
  onBrightnessChange,
  onShowControls,
  onDragToMinimize,
}) {
  const touchStartRef = useRef(null);
  const lastTapRef = useRef(0);
  const initialVolumeRef = useRef(volume);
  const initialBrightnessRef = useRef(brightness);
  const dragDistanceRef = useRef(0);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragging = false;

    /* ---------- Helpers ---------- */

    const getCoords = (e) => {
      if (e.touches?.length) {
        return {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
      return { x: e.clientX, y: e.clientY };
    };

    const reset = () => {
      touchStartRef.current = null;
      dragDistanceRef.current = 0;
      hasMovedRef.current = false;

      container.style.transform = "";
      container.style.borderRadius = "";
      container.style.opacity = "";
    };

    /* ---------- Handlers ---------- */

    const handleStart = (e) => {
      if (e.type === "mousedown" && e.button !== 0) return;

      const { x, y } = getCoords(e);

      touchStartRef.current = { x, y, time: Date.now() };
      dragDistanceRef.current = 0;
      hasMovedRef.current = false;
      isDragging = false;

      initialVolumeRef.current = volume;
      initialBrightnessRef.current = brightness;
    };

    const handleMove = (e) => {
      if (!touchStartRef.current) return;

      const { x, y } = getCoords(e);
      const deltaX = x - touchStartRef.current.x;
      const deltaY = y - touchStartRef.current.y;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      dragDistanceRef.current = Math.max(dragDistanceRef.current, absY);

      if (absX > 5 || absY > 5) {
        hasMovedRef.current = true;
      }

      // 🔽 Drag down → minimize
      if (deltaY > 50 && absY > absX) {
        isDragging = true;
        e.preventDefault();

        const progress = Math.min(deltaY / 300, 1);
        container.style.transform = `translateY(${deltaY}px) scale(${1 - progress * 0.3})`;
        container.style.borderRadius = `${progress * 24}px`;
        container.style.opacity = `${1 - progress * 0.3}`;
        return;
      }

      // 🔁 Horizontal swipe → volume / brightness
      if (absX > 20 && !isDragging) {
        onShowControls();

        const screenWidth = window.innerWidth;
        const isLeftSide = touchStartRef.current.x < screenWidth / 2;
        const change = deltaX / screenWidth;

        if (isLeftSide) {
          onVolumeChange(
            Math.max(0, Math.min(1, initialVolumeRef.current + change)),
          );
        } else {
          onBrightnessChange(
            Math.max(0.5, Math.min(1.5, initialBrightnessRef.current + change)),
          );
        }
      }
    };

    const handleEnd = (e) => {
      if (!touchStartRef.current) return;

      let clientX, clientY;
      if (e.changedTouches?.length) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const deltaY = clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // ✅ Drag-to-minimize
      if (deltaY > 150 && dragDistanceRef.current > 100) {
        onDragToMinimize?.();
        reset();
        return;
      }

      // ✅ Tap / Double-tap
      if (!hasMovedRef.current && deltaTime < 300) {
        const now = Date.now();

        if (now - lastTapRef.current < 300) {
          const isLeft = clientX < window.innerWidth / 2;
          onSkip(isLeft ? -10 : 10);
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
          setTimeout(() => {
            if (Date.now() - lastTapRef.current >= 300) {
              onToggleControls();
            }
          }, 300);
        }
      }

      reset();
    };

    /* ---------- Event Listeners ---------- */

    container.addEventListener("touchstart", handleStart, { passive: true });
    container.addEventListener("touchmove", handleMove, { passive: false });
    container.addEventListener("touchend", handleEnd, { passive: true });

    container.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    return () => {
      container.removeEventListener("touchstart", handleStart);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleEnd);

      container.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [
    containerRef,
    volume,
    brightness,
    onToggleControls,
    onSkip,
    onVolumeChange,
    onBrightnessChange,
    onShowControls,
    onDragToMinimize,
  ]);

  return null;
}
