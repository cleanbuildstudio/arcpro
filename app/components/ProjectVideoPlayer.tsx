import React from "react";

interface ProjectVideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function ProjectVideoPlayer({
  youtubeId,
  title,
}: ProjectVideoPlayerProps) {
  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden shadow-xl rounded-sm">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={`${title.replace("\n", " ")} Video Tour`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}
