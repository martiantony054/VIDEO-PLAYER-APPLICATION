const videoData = [
  {
    category: {
      id: "open-movies",
      name: "Open Source Movies",
      icon: "🎬",
    },
    contents: [
      {
        id: 1,
        title: "Sintel – Open Movie",
        channel: "Blender Foundation",
        duration: "0:52",
        mediaUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        thumbnail:
          "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
      },
      {
        id: 2,
        title: "Big Buck Bunny – Trailer",
        channel: "Blender Foundation",
        duration: "0:10",
        mediaUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4",
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg",
      },
      {
        id: 3,
        title: "Elephants Dream – Short Clip",
        channel: "Orange Open Movie",
        duration: "0:11",
        mediaUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
        thumbnail:
          "https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg",
      },
      {
        id: 4,
        title: "Tears of Steel – Trailer",
        channel: "Blender Foundation",
        duration: "0:20",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      },
    ],
  },

  {
    category: {
      id: "nature",
      name: "Nature & Relaxation",
      icon: "🌿",
    },
    contents: [
      {
        id: 5,
        title: "Nature Scenery – 4K",
        channel: "Nature Relaxation",
        duration: "0:15",
        mediaUrl:
          "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1501854140884-074cf2b21d44?w=800",
      },
      {
        id: 6,
        title: "Ocean Waves – Calming",
        channel: "Relax Daily",
        duration: "0:20",
        mediaUrl:
          "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
      },
      {
        id: 7,
        title: "Forest Walk – Peaceful",
        channel: "Daily Calm",
        duration: "0:25",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      },
      {
        id: 8,
        title: "Mountain Timelapse",
        channel: "Nature World",
        duration: "0:30",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      },
    ],
  },

  {
    category: {
      id: "tech-demos",
      name: "Tech Demos",
      icon: "💻",
    },
    contents: [
      {
        id: 9,
        title: "Big Buck Bunny – Full HD",
        channel: "Demo Videos",
        duration: "0:10",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      },
      {
        id: 10,
        title: "Sintel – Sample Clip",
        channel: "Demo Videos",
        duration: "0:15",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      },
      {
        id: 11,
        title: "For Bigger Blazes",
        channel: "Google Demo",
        duration: "0:15",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      },
      {
        id: 12,
        title: "Subaru Outback – Demo",
        channel: "Google Demo",
        duration: "0:30",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        thumbnail:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
      },
    ],
  },

  {
    category: {
      id: "lifestyle",
      name: "Lifestyle & Travel",
      icon: "✈️",
    },
    contents: [
      {
        id: 13,
        title: "City Timelapse",
        channel: "Urban Life",
        duration: "0:25",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
      },
      {
        id: 14,
        title: "Travel Moments",
        channel: "Wanderlust",
        duration: "0:30",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        id: 15,
        title: "Morning Coffee Routine",
        channel: "Daily Vlogs",
        duration: "0:20",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800",
      },
      {
        id: 16,
        title: "Sunset Walk",
        channel: "Calm Living",
        duration: "0:18",
        mediaUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=800",
      },
    ],
  },
];

export default videoData;
