'use client';

import { createEvent } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function NewEventPage() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add New Event</h1>
            <p className="text-sm text-gray-400">Schedule an upcoming event.</p>
        </div>
      </div>

      <form action={createEvent} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        <input type="hidden" name="image" value={imageUrl} />
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Event Title</label>
            <input name="title" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Annual Exhibition" />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date/Time</label>
                <input name="date" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Oct 24, 2024 - 10:00 AM" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Location</label>
                <input name="location" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Convention Center" />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {/* Category is auto-set to 'events' in the server action */}
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
                <Save size={18} /> Save Event
            </button>
        </div>

      </form>
    </div>
  );
}