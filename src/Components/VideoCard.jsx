
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

function VideoCard({ video, onClick, index }) {
  return (
    <motion.div
      initial={cardVariants.initial}
      animate={cardVariants.animate}
      transition={{ delay: index * 0.05 }}
      whileHover={cardVariants.hover}
      whileTap={cardVariants.tap}
      onClick={onClick}
      className="cursor-pointer group"
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video mb-3 shadow-lg shadow-black/20">
        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1" />
          </div>
        </div>

        {/* YouTube Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md">
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
        {video.title}
      </h3>
    </motion.div>
  );
}

export default VideoCard;
