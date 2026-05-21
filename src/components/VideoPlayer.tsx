'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Video } from '@/data/videos';

interface VideoPlayerProps {
  video: Video;
  isVisible: boolean;
  onVote: (videoId: string, dir: 'up' | 'down') => void;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

const formatCount = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (abs >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ video, onVote }, ref) => {
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

    const upActive = video.userVote === 'up';
    const downActive = video.userVote === 'down';

    return (
      <div className="video-row">
        {/* Thẻ video dọc (TikTok) */}
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

        {/* Cột nút bên phải */}
        <div className="action-rail">
          {/* Vote cụm Reddit: up → score → down */}
          <div
            className={`vote-group${upActive ? ' up' : ''}${downActive ? ' down' : ''}`}
          >
            <button
              className={`vote-btn up${upActive ? ' active' : ''}`}
              onClick={() => onVote(video.id, 'up')}
              aria-label="Thích"
            >
              <svg
                viewBox="0 0 24 24"
                fill={upActive ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 22V11m0 0L11 2a2 2 0 0 1 2 2v5h6a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 1H7M3 11h4v11H3a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"
                />
              </svg>
            </button>
            <span className="vote-score">{formatCount(video.score)}</span>
            <button
              className={`vote-btn down${downActive ? ' active' : ''}`}
              onClick={() => onVote(video.id, 'down')}
              aria-label="Không thích"
            >
              <svg
                viewBox="0 0 24 24"
                fill={downActive ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 2v11m0 0l-4 9a2 2 0 0 1-2-2v-5H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-1h10M21 13h-4V2h4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1z"
                />
              </svg>
            </button>
          </div>

          <button className="action-btn" aria-label="Bình luận">
            <span className="action-icon">
              <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            <span>142</span>
          </button>

          <button className="action-btn" aria-label="Chia sẻ">
            <span className="action-icon">
              <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </span>
            <span>89</span>
          </button>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
