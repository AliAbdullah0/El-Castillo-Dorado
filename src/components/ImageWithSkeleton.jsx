import React, { useState } from "react";

const ImageWithSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-400 animate-pulse rounded-lg"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover object-center rounded-lg ${loaded ? "block" : "hidden"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
