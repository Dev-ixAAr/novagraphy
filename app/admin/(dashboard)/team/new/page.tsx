'use client';

import { createTeamMember } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const CldUploadWidget = dynamic(() => import('next-cloudinary').then((mod) => mod.CldUploadWidget), { ssr: false, loading: () => <div className="h-48 w-full bg-slate-800 animate-pulse rounded-lg border-2 border-dashed border-slate-600"></div> });
import Image from 'next/image';

export default function NewTeamMemberPage() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/team" className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-white">Add Team Member</h1>
            <p className="text-sm text-gray-400">Add a new person to the organization.</p>
        </div>
      </div>

      <form action={createTeamMember} className="bg-[#161920] border border-gray-800 rounded-xl p-8 space-y-6">
        <input type="hidden" name="img" value={imageUrl} />
        
        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <input name="name" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Role / Position</label>
                <input name="role" required type="text" className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" placeholder="Senior Editor" />
            </div>
        </div>

        {/* --- Cloudinary Image Upload --- */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Profile Image</label>
            
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
                        <UploadCloud size={18} />
                        {imageUrl ? 'Change Image' : 'Upload Image'}
                    </button>
                )}
            </CldUploadWidget>
            {!imageUrl && <p className="text-xs text-red-400 mt-1">Image is required</p>}
        </div>

        <div className="grid grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sort Order</label>
                <input name="sortOrder" type="number" defaultValue={0} className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            </div>
            <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" id="isFounder" name="isFounder" className="w-5 h-5 rounded border-gray-700 bg-[#0f1115] text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="isFounder" className="text-sm text-gray-300 select-none cursor-pointer">Mark as Founder/Exec</label>
            </div>
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={!imageUrl}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
            >
                <Save size={18} /> Save Member
            </button>
        </div>

      </form>
    </div>
  );
}