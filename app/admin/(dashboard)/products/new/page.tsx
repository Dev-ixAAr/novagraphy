'use client';

import { useState } from 'react';
import { createProduct } from '../actions';
import Link from 'next/link';
import { ArrowLeft, Save, DollarSign, Plus, Trash2, Palette, Ruler } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

// ------------------------------------
// Types for our dynamic state
// ------------------------------------
interface ColorVariant {
  name: string;
  hex: string;
  images: string[];
}

interface SizeOption {
  label: string;
  priceMod: number;
}

export default function NewProductPage() {
  // Main image state
  const [imageUrl, setImageUrl] = useState('');

  // --- Colors / Variants State ---
  const [colors, setColors] = useState<ColorVariant[]>([]);

  // --- Sizes State ---
  const [sizes, setSizes] = useState<SizeOption[]>([]);

  // =========================================
  // Color Helpers
  // =========================================
  const addColor = () => {
    setColors((prev) => [...prev, { name: '', hex: '#000000', images: [] }]);
  };

  const removeColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, field: keyof Omit<ColorVariant, 'images'>, value: string) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addImageToColor = (colorIndex: number) => {
    setColors((prev) =>
      prev.map((c, i) =>
        i === colorIndex ? { ...c, images: [...c.images, ''] } : c
      )
    );
  };

  const removeImageFromColor = (colorIndex: number, imageIndex: number) => {
    setColors((prev) =>
      prev.map((c, i) =>
        i === colorIndex
          ? { ...c, images: c.images.filter((_, j) => j !== imageIndex) }
          : c
      )
    );
  };

  const updateImageInColor = (colorIndex: number, imageIndex: number, value: string) => {
    setColors((prev) =>
      prev.map((c, i) =>
        i === colorIndex
          ? {
              ...c,
              images: c.images.map((img, j) => (j === imageIndex ? value : img)),
            }
          : c
      )
    );
  };

  // =========================================
  // Size Helpers
  // =========================================
  const addSize = () => {
    setSizes((prev) => [...prev, { label: '', priceMod: 0 }]);
  };

  const removeSize = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof SizeOption, value: string | number) => {
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  // =========================================
  // Shared input classes
  // =========================================
  const inputClass =
    'w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Product</h1>
          <p className="text-sm text-gray-400">Add merchandise (Shirts, Caps, etc.)</p>
        </div>
      </div>

      {/* Form */}
      <form action={createProduct} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ======== Hidden fields for nested data ======== */}
        <input type="hidden" name="colorsData" value={JSON.stringify(colors)} />
        <input type="hidden" name="sizesData" value={JSON.stringify(sizes)} />

        {/* ================================================ */}
        {/* LEFT COLUMN */}
        {/* ================================================ */}
        <div className="lg:col-span-2 space-y-6">
          {/* --- Basic Info Card --- */}
          <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Product Title</label>
              <input
                name="title"
                required
                type="text"
                placeholder="e.g. Novagraphy Official T-Shirt"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                name="description"
                required
                rows={6}
                className={inputClass}
                placeholder="Material, Size guide, details..."
              />
            </div>
          </div>

          {/* --- Product Image Card --- */}
          <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-4">
            <label className="text-sm font-medium text-slate-300">Product Image</label>
            <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
            <input type="hidden" name="image" value={imageUrl} />
          </div>

          {/* ================================================ */}
          {/* COLORS / VARIANTS SECTION */}
          {/* ================================================ */}
          <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-indigo-400" />
                <h3 className="text-lg font-medium text-white">Product Colors / Variants</h3>
              </div>
              <button
                type="button"
                onClick={addColor}
                className="flex items-center gap-1.5 text-sm bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg transition-all"
              >
                <Plus size={14} /> Add Color
              </button>
            </div>

            {colors.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No color variants added yet. Click &quot;Add Color&quot; to begin.
              </p>
            )}

            {colors.map((color, ci) => (
              <div
                key={ci}
                className="bg-[#0f1115] border border-gray-800 rounded-xl p-5 space-y-4"
              >
                {/* Color header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">
                    Color #{ci + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeColor(ci)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>

                {/* Color name + hex */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">Color Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Midnight Black"
                      value={color.name}
                      onChange={(e) => updateColor(ci, 'name', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400">Hex Code</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(ci, 'hex', e.target.value)}
                        className="w-10 h-10 rounded-lg border border-gray-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="#000000"
                        value={color.hex}
                        onChange={(e) => updateColor(ci, 'hex', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Color images */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-400">Image URLs</label>
                    <button
                      type="button"
                      onClick={() => addImageToColor(ci)}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Plus size={12} /> Add Image
                    </button>
                  </div>

                  {color.images.length === 0 && (
                    <p className="text-xs text-gray-600 italic">No images added for this color.</p>
                  )}

                  {color.images.map((img, ii) => (
                    <div key={ii} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={img}
                        onChange={(e) => updateImageInColor(ci, ii, e.target.value)}
                        className={`${inputClass} text-sm`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImageFromColor(ci, ii)}
                        className="shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ================================================ */}
          {/* SIZES SECTION */}
          {/* ================================================ */}
          <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <Ruler size={18} className="text-emerald-400" />
                <h3 className="text-lg font-medium text-white">Product Sizes</h3>
              </div>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-1.5 text-sm bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg transition-all"
              >
                <Plus size={14} /> Add Size
              </button>
            </div>

            {sizes.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No sizes added yet. Click &quot;Add Size&quot; to begin.
              </p>
            )}

            {sizes.map((size, si) => (
              <div
                key={si}
                className="bg-[#0f1115] border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-end gap-4"
              >
                <div className="flex-1 w-full space-y-1.5">
                  <label className="text-xs text-gray-400">Size Label</label>
                  <input
                    type="text"
                    placeholder="e.g. XL, 12×18, A3"
                    value={size.label}
                    onChange={(e) => updateSize(si, 'label', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="flex-1 w-full space-y-1.5">
                  <label className="text-xs text-gray-400">Price Modifier ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={size.priceMod}
                    onChange={(e) => updateSize(si, 'priceMod', parseFloat(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeSize(si)}
                  className="shrink-0 p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================ */}
        {/* RIGHT COLUMN — Settings */}
        {/* ================================================ */}
        <div className="space-y-6">
          <div className="bg-[#161920] border border-gray-800 rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-4">
              Settings
            </h3>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select
                name="status"
                className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              >
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full bg-[#0f1115] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              >
                <option value="" disabled>Select Category</option>
                <option value="Shirts">Shirts / T-Shirts</option>
                <option value="Banners">Banners</option>
                <option value="Caps">Caps / Hats</option>
                <option value="Bangles">Bangles / Wristbands</option>
                <option value="Other">Other Accessories</option>
              </select>
            </div>

            {/* Base Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Base Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 text-gray-500 w-4 h-4" />
                <input
                  name="basePrice"
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-[#0f1115] border border-gray-800 rounded-lg pl-9 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="pt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="w-4 h-4 rounded border-gray-700 bg-[#0f1115] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-300 select-none cursor-pointer">
                Mark as Featured
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
              >
                <Save size={18} /> Publish Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}