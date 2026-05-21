'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Video } from '@/data/videos';

interface VideoPlayerProps {
  video: Video;
  isVisible: boolean;
  onLike: (videoId: string) => void;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ video, isVisible, onLike }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
    }));

    const handleVideoClick = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
      }
    };

    const formatLikes = (count: number) => {
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
      }
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
      }
      return count.toString();
    };

    return (
      <div className="relative h-screen w-full bg-black flex items-center justify-center snap-start">
        {/* Video Container */}
        <div className="relative w-full h-full md:w-[360px] md:h-[640px] md:rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            muted
            playsInline
            loop
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-20 left-4 right-20 h-1 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Video Info */}
          <div className="absolute bottom-4 left-4 right-20 text-white">
            <h3 className="font-semibold text-lg mb-1">{video.authorName}</h3>
            <p className="text-sm opacity-90 overflow-hidden text-ellipsis line-clamp-2">{video.description}</p>
          </div>

          {/* Interaction Buttons */}
          <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-6">
            {/* Like Button */}
            <button
              onClick={() => onLike(video.id)}
              className="flex flex-col items-center space-y-1 group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                video.isLiked ? 'bg-red-500' : 'bg-white/20 group-hover:bg-white/30'
              }`}>
                <svg
                  className={`w-7 h-7 ${video.isLiked ? 'text-white' : 'text-white'}`}
                  fill={video.isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="text-xs text-white font-semibold">
                {formatLikes(video.likesCount + (video.isLiked ? 1 : 0))}
              </span>
            </button>

            {/* Comment Button */}
            <button className="flex flex-col items-center space-y-1 group">
              <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xs text-white font-semibold">142</span>
            </button>

            {/* Share Button */}
            <button className="flex flex-col items-center space-y-1 group">
              <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <span className="text-xs text-white font-semibold">89</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);