'use client';

import { useState } from 'react';
import { updatePackage } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, ListChecks } from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  price: string;
  category: string;
  features: string[];
}

export default function EditPackageForm({ pkg }: { pkg: ServicePackage }) {
  const [features, setFeatures] = useState<string[]>(pkg.features);

  // =========================================
  // Feature Helpers
  // =========================================
  const addFeature = () => {
    setFeatures((prev) => [...prev, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? value : f))
    );
  };

  // Bind the id to the server action
  const updateWithId = updatePackage.bind(null, pkg.id);

  const inputClass =
    'w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/packages"
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Package</h1>
          <p className="text-sm text-gray-400">Update &quot;{pkg.title}&quot;</p>
        </div>
      </div>

      {/* Form */}
      <form action={updateWithId} className="space-y-8">
        {/* Hidden field for features array */}
        <input type="hidden" name="featuresData" value={JSON.stringify(features)} />

        {/* --- Basic Info Card --- */}
        <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-4">
            Package Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Package Title</label>
              <input
                name="title"
                required
                type="text"
                defaultValue={pkg.title}
                placeholder="e.g. Starter Package"
                className={inputClass}
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Price</label>
              <input
                name="price"
                required
                type="text"
                defaultValue={pkg.price}
                placeholder="e.g. 90,000 LKR"
                className={inputClass}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Category</label>
            <select
              name="category"
              required
              defaultValue={pkg.category}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="text-gray-500 bg-[#0f1115]">
                Select a category
              </option>
              <option value="Social Media Posters" className="bg-[#0f1115]">Social Media Posters</option>
              <option value="Logo Design" className="bg-[#0f1115]">Logo Design</option>
              <option value="Music Video Artworks" className="bg-[#0f1115]">Music Video Artworks</option>
              <option value="Event Artworks" className="bg-[#0f1115]">Event Artworks</option>
              <option value="Other" className="bg-[#0f1115]">Other</option>
            </select>
          </div>
        </div>

        {/* --- Features Card --- */}
        <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <ListChecks size={18} className="text-emerald-400" />
              <h3 className="text-lg font-medium text-white">Features / Benefits</h3>
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-1.5 text-sm bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg transition-all"
            >
              <Plus size={14} /> Add Feature
            </button>
          </div>

          {features.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4">
              No features added yet. Click &quot;Add Feature&quot; to begin.
            </p>
          )}

          {features.map((feature, fi) => (
            <div key={fi} className="flex gap-3 items-center">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-semibold">
                {fi + 1}
              </span>
              <input
                type="text"
                placeholder={`Feature #${fi + 1}`}
                value={feature}
                onChange={(e) => updateFeature(fi, e.target.value)}
                className={`${inputClass} text-sm`}
              />
              <button
                type="button"
                onClick={() => removeFeature(fi)}
                className="shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
