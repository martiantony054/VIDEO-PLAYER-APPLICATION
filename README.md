# 🎬 VidFlow – Mobile-First Video Player App

VidFlow is a **mobile-first video player application** inspired by the YouTube mobile experience.  
It focuses on smooth playback, gesture-based controls, and a persistent mini-player for seamless navigation.

This project was built to demonstrate **frontend architecture, media handling, and UI performance optimization** using React.

---

## 🚀 Features

### Home (Video Feed)
- Category-based video grouping
- Animated UI using Framer Motion
- Responsive two-column grid
- Optimized rendering with memoized data

### Full-Screen Video Player
- Custom video controls (Play / Pause / Seek)
- Skip forward & backward (±10s)
- Time indicator (current / total)
- Volume & brightness support
- Auto-hide controls
- Responsive for mobile & desktop

### Mini Player
- Persistent mini-player when returning to feed
- Seamless transition between full player and mini player
- Playback state & time stay in sync
- Expand / Close support

### Gesture Support
- Tap to toggle controls
- Double-tap to skip
- Swipe down to minimize
- Horizontal swipe for volume & brightness
- Supports both touch and mouse input

---

## 🧰 Tech Stack

- React
- Framer Motion
- Tailwind CSS
- Lucide Icons
- HTML5 Video API

---

## 🏗️ Project Structure

src/
├── Components/
│ ├── VideoPlayer.jsx
│ ├── MiniPlayer.jsx
│ ├── VideoCard.jsx
│ ├── GestureHandler.jsx
│
├── Pages/
│ └── Home.jsx
│
├── Data/
│ └── Videos.js
│
├── Utils/
│ └── formatTime.js
│
├── App.jsx
└── main.jsx


---

## 🛠️ Setup & Run

```bash
git clone https://github.com/your-username/vidflow.git
cd vidflow
npm install
npm run dev


