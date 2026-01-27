"use client";

import { useState, useEffect } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

const DEFAULT_FALLBACK = "/images/product-404.jpg";

export default function ProductImage({
  src,
  alt,
  fallback = DEFAULT_FALLBACK,
  className = "",
}: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback);

  useEffect(() => {
    if (!src) {
      setImageSrc(fallback);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
    img.onerror = () => setImageSrc(fallback);
  }, [src, fallback]);

  return (
    <div className="relative aspect-square w-full bg-[#FFF9F2]">
      <img src={imageSrc} alt={alt} className={`w-full h-full object-cover ${className}`} />
    </div>
  );
}
