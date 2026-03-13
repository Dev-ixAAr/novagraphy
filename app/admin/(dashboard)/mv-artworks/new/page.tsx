'use client';

import { createMvArtwork } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const CldUploadWidget = dynamic(() => import('next-cloudinary').then((mod) => mod.CldUploadWidget), { ssr: false, loading: () => <div className="h-64 w-full bg-slate-800 animate-pulse rounded-lg border-2 border-dashed border-slate-600"></div> });
import Image from 'next/image';

export default function NewMvArtworkPage() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/mv-artworks" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add MV Artwork</h1>
            <p className="text-sm text-gray-400">Add a new music video cover.</p>
        </div>
      </div>

      <form action={createMvArtwork} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        <input type="hidden" name="img" value={imageUrl} />
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Artwork Title</label>
            <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Song Name" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Artist Name</label>
            <input name="artist" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Artist" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Image</label>
            
            {imageUrl && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-800 mb-2">
                    <Image 
                        src={imageUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-md text-white transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "novagraphy"}
                onSuccess={(result: any) => {
                    if (result.info?.secure_url) {
                        setImageUrl(result.info.secure_url);
                    }
                }}
            >
                {({ open }) => (
                    <button 
                        type="button" 
                        onClick={() => open()}
                        className="w-full flex items-center justify-center gap-2 bg-[#252a35] hover:bg-[#2f3542] border border-gray-700 rounded-lg px-4 py-3 text-gray-300 transition-colors"
                    >
                        <UploadCloud size={20} />
                        {imageUrl ? 'Change Image' : 'Upload Image'}
                    </button>
                )}
            </CldUploadWidget>
            {!imageUrl && <p className="text-xs text-red-400 mt-1">Image is required</p>}
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={!imageUrl}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
            >
                <Save size={18} /> Save Artwork
            </button>
        </div>

      </form>
    </div>
  );
}