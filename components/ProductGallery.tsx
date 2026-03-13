'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  images: string[];
}

interface ProductGalleryProps {
  colors: ColorVariant[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function ProductGallery({ colors }: ProductGalleryProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(colors[0]);
  const [mainImage, setMainImage] = useState<string>(colors[0]?.images[0] ?? '');
  const [isZoomed, setIsZoomed] = useState(false);

  // Fail-safe for products with no colors
  if (!colors.length) {
    return (
      <div className="aspect-[4/5] w-full rounded-2xl bg-[#161920] border border-gray-800 flex items-center justify-center">
        <p className="text-gray-500 text-sm">No images available</p>
      </div>
    );
  }

  const handleColorSelect = (color: ColorVariant) => {
    setSelectedColor(color);
    setMainImage(color.images[0] ?? '');
  };

  return (
    <div className="space-y-5">
      {/* ───────────── Main Image ───────────── */}
      <div
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0f1115] border border-gray-800/60 cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={selectedColor.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className={`object-cover transition-transform duration-700 ease-out ${
              isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-600 text-sm">No image</p>
          </div>
        )}

        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Color label badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 pointer-events-none">
          <span
            className="w-3 h-3 rounded-full ring-1 ring-white/20"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="text-xs font-medium text-white/90 tracking-wide">
            {selectedColor.name}
          </span>
        </div>
      </div>

      {/* ───────────── Thumbnail Strip ───────────── */}
      {selectedColor.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {selectedColor.images.map((img, idx) => {
            const isActive = img === mainImage;
            return (
              <button
                key={`${selectedColor.id}-thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className={`relative shrink-0 w-[72px] h-[72px] md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02]'
                    : 'border-gray-800 hover:border-gray-600 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${selectedColor.name} view ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ───────────── Color Swatches ───────────── */}
      {colors.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
              Color
            </span>
            <span className="text-xs text-gray-400">— {selectedColor.name}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const isActive = color.id === selectedColor.id;
              return (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color)}
                  title={color.name}
                  className={`group/swatch relative w-10 h-10 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0a0b0e] scale-110'
                      : 'ring-1 ring-gray-700 hover:ring-gray-500 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Active checkmark */}
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 drop-shadow-md"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke={isLightColor(color.hex) ? '#000' : '#fff'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="5 10 9 14 15 6" />
                      </svg>
                    </span>
                  )}

                  {/* Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-400 bg-[#161920] border border-gray-800 rounded-md px-2 py-0.5 opacity-0 group-hover/swatch:opacity-100 transition-opacity pointer-events-none">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Helper: decide if we need dark or light check
// ─────────────────────────────────────────────
function isLightColor(hex: string): boolean {
  const cleaned = hex.replace('#', '');
  if (cleaned.length < 6) return false;
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  // Perceived brightness (ITU-R BT.709)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
