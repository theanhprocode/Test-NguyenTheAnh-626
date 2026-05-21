export interface Video {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  isLiked: boolean;
}

export const mockVideos: Video[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "@bigbuckbunny",
    description: "Big Buck Bunny - A beautiful animated short film about a rabbit and his adventures! 🐰✨ #animation #cute",
    likesCount: 12400,
    isLiked: false,
  },
  {
    id: "2", 
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "@fridayvibes",
    description: "Friday night vibes! Check out this amazing Friday-themed video 🎉 #friday #weekend #vibes",
    likesCount: 8750,
    isLiked: false,
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4", 
    authorName: "@sintelstudio",
    description: "Sintel - Epic fantasy trailer! A girl, a dragon, and an incredible adventure awaits 🐉⚔️ #fantasy #trailer #epic",
    likesCount: 15600,
    isLiked: false,
  },
  {
    id: "4",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "@naturelover",
    description: "Nature is amazing! Enjoy the peaceful moments and beautiful scenery 🌿🌸 #nature #peaceful #relaxing",
    likesCount: 6200,
    isLiked: false,
  },
  {
    id: "5",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "@techguru",
    description: "Amazing video content that showcases the beauty of technology and creativity! 💻✨ #tech #creative #amazing",
    likesCount: 9800,
    isLiked: false,
  },
];