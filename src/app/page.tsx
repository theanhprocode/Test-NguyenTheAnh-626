'use client';

import { useEffect, useRef, useState } from 'react';
import { VideoPlayer, VideoPlayerRef } from '@/components/VideoPlayer';
import { Navigation } from '@/components/Navigation';
import { mockVideos, Video } from '@/data/videos';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(VideoPlayerRef | null)[]>([]);

  const handleLike = (videoId: string) => {
    setVideos(prev =>
      prev.map(v => (v.id === videoId ? { ...v, isLiked: !v.isLiked } : v))
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt(entry.target.getAttribute('data-index') || '0');
          const ref = videoRefs.current[idx];
          if (entry.isIntersecting) {
            setCurrentVideoIndex(idx);
            ref?.play();
          } else {
            ref?.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    const els = document.querySelectorAll('.feed-item');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="app">
      <Navigation />

      <main className="main">
        <div className="feed">
          {videos.map((video, index) => (
            <div key={video.id} data-index={index} className="feed-item">
              <VideoPlayer
                ref={(ref) => {
                  videoRefs.current[index] = ref;
                }}
                video={video}
                isVisible={index === currentVideoIndex}
                onLike={handleLike}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
