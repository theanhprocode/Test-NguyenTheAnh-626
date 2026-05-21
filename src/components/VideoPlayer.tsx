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

const formatCount = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ video, onLike }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
        setIsPlaying(true);
      },
      pause: () => {
        videoRef.current?.pause();
        setIsPlaying(false);
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
    }));

    const togglePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      if (isPlaying) {
        v.pause();
        setIsPlaying(false);
      } else {
        v.play();
        setIsPlaying(true);
      }
    };

    const handleTime = () => {
      const v = videoRef.current;
      if (!v || !v.duration) return;
      setProgress((v.currentTime / v.duration) * 100);
    };

    return (
      <div className="video-row">
        {/* Thẻ video dọc 9:16 */}
        <div className="video-card">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="video-el"
            onClick={togglePlay}
            onTimeUpdate={handleTime}
            onEnded={() => setIsPlaying(false)}
            muted
            playsInline
            loop
          />

          {!isPlaying && (
            <div className="video-play-overlay">
              <div className="video-play-btn">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          <div className="video-progress">
            <div className="video-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="video-info">
            <h3 className="video-info-author">{video.authorName}</h3>
            <p className="video-info-desc">{video.description}</p>
          </div>
        </div>

        {/* Cột nút bên phải (TikTok: Tim, Bình luận, Chia sẻ) */}
        <div className="action-rail">
          <button
            onClick={() => onLike(video.id)}
            className={`action-btn${video.isLiked ? ' liked' : ''}`}
            aria-label="Thích"
          >
            <span className="action-icon">
              <svg
                fill={video.isLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </span>
            <span>{formatCount(video.likesCount + (video.isLiked ? 1 : 0))}</span>
          </button>

          <button className="action-btn" aria-label="Bình luận">
            <span className="action-icon">
              <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            <span>2</span>
          </button>

          <button className="action-btn" aria-label="Chia sẻ">
            <span className="action-icon">
              <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </span>
            <span>1</span>
          </button>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
