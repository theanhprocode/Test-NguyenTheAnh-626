'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoPlayer, VideoPlayerRef } from '@/components/VideoPlayer';
import { Navigation } from '@/components/Navigation';
import { mockVideos, Video } from '@/data/videos';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(VideoPlayerRef | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = (videoId: string) => {
    setVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === videoId 
          ? { ...video, isLiked: !video.isLiked }
          : video
      )
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          const videoRef = videoRefs.current[videoIndex];
          
          if (entry.isIntersecting) {
            setCurrentVideoIndex(videoIndex);
            videoRef?.play();
          } else {
            videoRef?.pause();
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    const videoElements = containerRef.current?.querySelectorAll('.video-container');
    videoElements?.forEach((element) => observer.observe(element));

    return () => {
      videoElements?.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <Navigation />
      
      {/* Main Content */}
      <div className="md:ml-64 pb-16 md:pb-0">
        <div 
          ref={containerRef}
          className="h-screen overflow-y-auto snap-y snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {videos.map((video, index) => (
            <div
              key={video.id}
              data-index={index}
              className="video-container snap-start"
            >
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
      </div>
    </div>
  );
}
