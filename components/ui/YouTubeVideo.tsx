"use client";

import { useState } from "react";

interface YouTubeVideoProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

export function YouTubeVideo({
  videoUrl,
  title = "YouTube Video",
  className = "",
}: YouTubeVideoProps) {
  const [videoError, setVideoError] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.pathname.includes("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1].split("?")[0];
      } else if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v") || "";
      } else if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?mute=1&controls=1&rel=0&modestbranding=1`;
      }
    } catch (error) {
      console.error("Invalid video URL:", error);
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (videoError || !embedUrl) {
    return null;
  }

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setVideoError(true)}
          style={{
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
