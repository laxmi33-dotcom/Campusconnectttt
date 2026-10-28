import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Code2,
  CheckCircle,
  ExternalLink,
  Layers,
  GraduationCap,
  Users,
  Settings,
} from 'lucide-react';
import { VIDEO_URL, VIDEO_POSTER, VIDEO_METADATA } from '../../config/videoConfig';

interface ProjectVideoSectionProps {
  onQuickExplore?: () => void;
}

export const ProjectVideoSection: React.FC<ProjectVideoSectionProps> = ({ onQuickExplore }) => {
  // Support runtime preview if user wants to test a video link directly on screen
  const [activeUrl, setActiveUrl] = useState<string>(VIDEO_URL);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [showConfigHelper, setShowConfigHelper] = useState<boolean>(false);
  const [customInputUrl, setCustomInputUrl] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper to test if URL is a YouTube link
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
      } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
    }
    return null;
  };

  const isYouTube = !!getYouTubeEmbedUrl(activeUrl);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeUrl);
  const hasDirectVideo = !!activeUrl && !isYouTube;

  const handlePlayToggle = () => {
    if (hasDirectVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const playerContainer = document.getElementById('project-video-container');
    if (playerContainer) {
      if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen().catch((err) => console.log(err));
      }
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      setActiveUrl(customInputUrl.trim());
      setIsPlaying(true);
      setShowConfigHelper(false);
    }
  };

  return (
    <section id="project-demo" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Project Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-white">
            See CampusConnect in Action
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover how CampusConnect simplifies college management through one smart, connected student portal.
          </p>
        </div>

        {/* Video Player Box with 16:9 aspect ratio */}
        <div
          id="project-video-container"
          className="relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-950 shadow-2xl shadow-blue-950/50 overflow-hidden"
        >
          {/* Top Title Bar of the Video Player */}
          <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              </div>
              <span className="font-medium text-slate-300 ml-1">
                {VIDEO_METADATA.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-mono text-cyan-400 text-[11px]">
                1080p · Presentation Mode
              </span>
              <button
                onClick={() => setShowConfigHelper(!showConfigHelper)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 transition-colors cursor-pointer"
                title="Change or configure video source"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Configure Source</span>
              </button>
            </div>
          </div>

          {/* 16:9 Aspect Ratio Frame */}
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* 1. YOUTUBE EMBED SOURCE */}
            {isYouTube && youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title="CampusConnect Project Walkthrough"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : hasDirectVideo ? (
              /* 2. DIRECT MP4 / LOCAL FILE HTML5 VIDEO */
              <video
                ref={videoRef}
                src={activeUrl}
                poster={VIDEO_POSTER}
                controls
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              /* 3. ATTRACTIVE VIDEO PLACEHOLDER & INTERACTIVE WALKTHROUGH */
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-radial from-slate-900 to-slate-950">
                {/* Poster Background with Overlay */}
                {VIDEO_POSTER && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay filter blur-[1px]"
                    style={{ backgroundImage: `url(${VIDEO_POSTER})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

                {/* Center Content */}
                <div className="relative z-10 max-w-lg space-y-4">
                  {/* Big Play Button */}
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                    }}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 transform hover:scale-105 active:scale-95 transition-all mx-auto cursor-pointer group"
                    aria-label="Play Project Walkthrough"
                  >
                    <Play className="w-8 h-8 fill-current ml-1 text-white group-hover:scale-110 transition-transform" />
                  </button>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      College Project Video Presentation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-normal max-w-md mx-auto">
                      Click play to preview the interactive system walkthrough or connect your own video file via <span className="font-mono text-cyan-400">src/config/videoConfig.ts</span>.
                    </p>
                  </div>

                  {/* Chapter Quick Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {VIDEO_METADATA.chapters.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentChapter(idx)}
                        className={`px-3 py-1 text-[11px] rounded-full transition-all cursor-pointer font-medium ${
                          currentChapter === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                        }`}
                      >
                        <span className="text-blue-300 font-mono mr-1.5">{ch.time}</span>
                        <span>{ch.title.split(' ')[0]} {ch.title.split(' ')[1] || ''}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Chapter Card */}
                  <div className="mt-2 text-left bg-slate-900/90 border border-slate-800 rounded-xl p-3 max-w-md mx-auto text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-semibold text-white">
                        {VIDEO_METADATA.chapters[currentChapter].title}
                      </span>
                      <span className="font-mono text-cyan-400">
                        {VIDEO_METADATA.chapters[currentChapter].time}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {VIDEO_METADATA.chapters[currentChapter].description}
                    </p>
                  </div>
                </div>

                {/* Native-style Control Bar at bottom of the preview frame */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayToggle}
                      className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={handleMuteToggle}
                      className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs font-mono text-slate-400">
                      {isPlaying ? '01:24' : '00:00'} / {VIDEO_METADATA.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Helper Panel (Collapsible or directly accessible) */}
        {showConfigHelper && (
          <div className="max-w-4xl mx-auto mt-4 p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-300 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white text-sm">
                  How to Insert Your Project Explanation Video
                </span>
              </div>
              <button
                onClick={() => setShowConfigHelper(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60">
                <div className="font-semibold text-white mb-1">Option 1: Local MP4 File</div>
                <p className="text-[11px] text-slate-400 mb-2">
                  Place your video in the <code className="text-cyan-400">public/</code> directory and set:
                </p>
                <pre className="font-mono text-[10px] bg-slate-950 p-2 rounded text-emerald-400 overflow-x-auto">
                  VIDEO_URL = "/campusconnect-demo.mp4"
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60">
                <div className="font-semibold text-white mb-1">Option 2: Direct MP4 URL</div>
                <p className="text-[11px] text-slate-400 mb-2">
                  Point to any hosted video server or cloud storage bucket:
                </p>
                <pre className="font-mono text-[10px] bg-slate-950 p-2 rounded text-emerald-400 overflow-x-auto">
                  VIDEO_URL = "https://example.com/demo.mp4"
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60">
                <div className="font-semibold text-white mb-1">Option 3: YouTube URL</div>
                <p className="text-[11px] text-slate-400 mb-2">
                  Paste standard or short YouTube video links:
                </p>
                <pre className="font-mono text-[10px] bg-slate-950 p-2 rounded text-emerald-400 overflow-x-auto">
                  VIDEO_URL = "https://youtube.com/watch?v=..."
                </pre>
              </div>
            </div>

            {/* Live URL Input for testing in evaluation */}
            <form onSubmit={handleApplyCustomUrl} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Paste video URL to preview instantly (YouTube link or .mp4 URL)..."
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap cursor-pointer"
              >
                Preview Live Link
              </button>
              {activeUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveUrl('');
                    setCustomInputUrl('');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs cursor-pointer"
                >
                  Reset
                </button>
              )}
            </form>
          </div>
        )}

        {/* Short Description below the player explaining project purpose */}
        <div className="mt-8 text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {VIDEO_METADATA.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Full-Stack Role Architecture</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Real-Time Attendance Calculator</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Audited Faculty Grading Flow</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
