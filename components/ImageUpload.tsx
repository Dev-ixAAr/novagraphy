'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useState, useEffect } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  disabled
}: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = useCallback((result: any) => {
    // secure_url is the standard HTTPS link to the image
    onChange(result.info.secure_url);
  }, [onChange]);

  if (!mounted) return null;

  return (
    <div className="mb-4 flex flex-col items-start gap-4">
      {/* 1. PREVIEW STATE: If an image exists, show it */}
      {value && (
        <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border border-slate-700">
          <div className="z-10 absolute top-2 right-2">
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full shadow-sm transition"
              title="Remove Image"
            >
              {/* Simple X Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
          <Image
            fill
            className="object-cover"
            alt="Image Upload"
            src={value}
          />
        </div>
      )}

      {/* 2. UPLOAD BUTTON / WIDGET */}
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          maxFiles: 1,
          resourceType: "image",
          // Optional: Add styling to the cloudinary modal itself if needed
        }}
      >
        {({ open }) => {
          const onClick = () => {
            if (disabled) return;
            open();
          };

          return (
            <button
              type="button"
              disabled={disabled}
              onClick={onClick}
              className={`
                relative flex flex-col items-center justify-center gap-4 p-10 transition
                border-2 border-dashed rounded-lg
                ${value ? 'w-auto px-6 py-3 border-slate-700 bg-transparent' : 'w-full h-64 border-slate-700 bg-[#0f1115] hover:border-blue-500 hover:bg-[#151920]'}
              `}
            >
              {value ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>Change Image</span>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-slate-800 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <div className="font-semibold text-lg text-slate-200">
                    Upload an Image
                  </div>
                  <div className="text-slate-500 text-sm">
                    Click here to upload product image
                  </div>
                </>
              )}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}