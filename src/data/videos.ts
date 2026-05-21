export type Vote = 'up' | 'down' | null;

export interface Video {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  score: number;
  userVote: Vote;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    authorName: '@bigbuckbunny',
    description: 'Big Buck Bunny - A beautiful animated short film about a rabbit and his adventures!',
    score: 12400,
    userVote: null,
  },
  {
    id: '2',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4',
    authorName: '@fridayvibes',
    description: 'Friday night vibes! Check out this amazing Friday-themed video',
    score: 8750,
    userVote: null,
  },
  {
    id: '3',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    authorName: '@sintelstudio',
    description: 'Sintel - Epic fantasy trailer! A girl, a dragon, and an incredible adventure awaits',
    score: 15600,
    userVote: null,
  },
  {
    id: '4',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    authorName: '@naturelover',
    description: 'Nature is amazing! Enjoy the peaceful moments and beautiful scenery',
    score: 6200,
    userVote: null,
  },
  {
    id: '5',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4',
    authorName: '@techguru',
    description: 'Amazing video content that showcases the beauty of technology and creativity!',
    score: 9800,
    userVote: null,
  },
];
