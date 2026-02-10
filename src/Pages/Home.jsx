import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import VideoCard from "../Components/VideoCard";
import videoData from "../Data/Videos";
import { Sparkles, TrendingUp, Play, Search } from "lucide-react";

/* ---------------- Static Helpers ---------------- */

const getTotalVideos = (data) =>
  data.reduce((sum, cat) => sum + cat.contents.length, 0);

export function Home({ onVideoSelect, isMiniPlayerActive }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* -------------------- Derived Data -------------------- */

  const categories = useMemo(
    () => ["All", ...videoData.map((item) => item.category.name)],
    [],
  );

  const displayData = useMemo(() => {
    if (selectedCategory === "All") return videoData;
    return videoData.filter((item) => item.category.name === selectedCategory);
  }, [selectedCategory]);

  const totalVideos = useMemo(() => getTotalVideos(videoData), []);

  /* -------------------- Render -------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-2xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="px-5 py-5">
          {/* Branding */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-lg opacity-60"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-black text-white flex items-center gap-2">
                  VidFlow <Sparkles className="w-5 h-5 text-yellow-400" />
                </h1>
                <p className="text-slate-400 text-xs font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {totalVideos} videos 
                </p>
              </div>
            </motion.div>
          </div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-x-auto scrollbar-hide -mx-5 px-5"
          >
            <div className="flex gap-2 pb-1">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                    selectedCategory === category
                      ? "text-white shadow-lg shadow-red-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="categoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className={`px-5 pt-6 transition-all duration-300 ${
          isMiniPlayerActive ? "pb-40" : "pb-24"
        }`}
      >
        {displayData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
          >
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No videos found
            </h3>
          </motion.div>
        )}

        {selectedCategory === "All" ? (
          <div className="space-y-10">
            {displayData.map((group, groupIndex) => (
              <motion.div
                key={group.category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl text-2xl">
                    {group.category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {group.category.name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {group.contents.length} videos
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {group.contents.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                    >
                      <VideoCard
                        video={video}
                        index={index}
                        onClick={() => onVideoSelect(video)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          displayData[0] && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center text-4xl">
                    {displayData[0].category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {displayData[0].category.name}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {displayData[0].contents.length} videos in this category
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {displayData[0].contents.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                  >
                    <VideoCard
                      video={video}
                      index={index}
                      onClick={() => onVideoSelect(video)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
}
