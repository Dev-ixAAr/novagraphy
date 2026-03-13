'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ------------------------------------
// Types for parsed nested data
// ------------------------------------
interface ColorInput {
  name: string;
  hex: string;
  images: string[];
}

interface SizeInput {
  label: string;
  priceMod: number;
}

// =============================================
// CREATE PRODUCT (with nested relations)
// =============================================
export async function createProduct(formData: FormData) {
  // --- Basic fields ---
  const title = formData.get('title') as string;
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  const status = formData.get('status') as string;
  const featured = formData.get('featured') === 'on';

  // --- Parse nested JSON data ---
  const colorsRaw = formData.get('colorsData') as string | null;
  const sizesRaw = formData.get('sizesData') as string | null;

  const parsedColors: ColorInput[] = colorsRaw ? JSON.parse(colorsRaw) : [];
  const parsedSizes: SizeInput[] = sizesRaw ? JSON.parse(sizesRaw) : [];

  // --- Prisma nested write ---
  await prisma.product.create({
    data: {
      title,
      basePrice,
      category,
      description,
      image,
      status,
      featured,

      // Nested create for ProductVariant (Colors)
      colors: {
        create: parsedColors.map((color, index) => ({
          name: color.name,
          hex: color.hex || null,
          images: color.images.filter((url) => url.trim() !== ''), // remove empty strings
          sortOrder: index,
        })),
      },

      // Nested create for ProductSize (Sizes)
      sizes: {
        create: parsedSizes.map((size, index) => ({
          label: size.label,
          priceMod: Number(size.priceMod) || 0, // ensure Float
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// =============================================
// UPDATE PRODUCT (with nested relations refresh)
// =============================================
export async function updateProduct(id: string, formData: FormData) {
  // --- Basic fields ---
  const title = formData.get('title') as string;
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  const status = formData.get('status') as string;
  const featured = formData.get('featured') === 'on';

  // --- Parse nested JSON data ---
  const colorsRaw = formData.get('colorsData') as string | null;
  const sizesRaw = formData.get('sizesData') as string | null;

  const parsedColors: ColorInput[] = colorsRaw ? JSON.parse(colorsRaw) : [];
  const parsedSizes: SizeInput[] = sizesRaw ? JSON.parse(sizesRaw) : [];

  // --- Prisma nested update: deleteMany → create ---
  await prisma.product.update({
    where: { id },
    data: {
      title,
      basePrice,
      category,
      description,
      image,
      status,
      featured,

      // Wipe existing colors, then re-create from form state
      colors: {
        deleteMany: {},
        create: parsedColors.map((color, index) => ({
          name: color.name,
          hex: color.hex || null,
          images: color.images.filter((url) => url.trim() !== ''),
          sortOrder: index,
        })),
      },

      // Wipe existing sizes, then re-create from form state
      sizes: {
        deleteMany: {},
        create: parsedSizes.map((size, index) => ({
          label: size.label,
          priceMod: Number(size.priceMod) || 0,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// =============================================
// DELETE PRODUCT
// =============================================
export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
}