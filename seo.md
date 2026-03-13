# 🔍 NOVAGRAPHY — SEO Checklist

> This document lists **every placeholder** in the codebase you need to replace with your actual SEO content.  
> Use **Ctrl+Shift+F** (or Cmd+Shift+F) in your editor to search for these placeholders.

---

## 📌 Step 0: Place Your Image Files

Before updating any code, place the following image files inside the `app/` directory:

| File | Location | Purpose |
|------|----------|---------|
| `icon.png` | `app/icon.png` | **Favicon** — Already exists ✅ |
| `opengraph-image.png` | `app/opengraph-image.png` | Default OG image for social sharing (1200×630px recommended) |
| `apple-icon.png` | `app/apple-icon.png` | Apple Touch Icon (180×180px recommended) |

> Next.js automatically detects `icon.png`, `opengraph-image.png`, and `apple-icon.png` inside the `app/` directory.

---

## 📌 Step 1: Global Metadata — `app/layout.tsx`

These are the **site-wide defaults** that apply to every page unless overridden.

| Placeholder | What to Insert |
|-------------|---------------|
| `TODO: [INSERT_SITE_URL]` | Your production URL — currently set to `https://novagraphy.com`. Search for `TODO: [INSERT_SITE_URL]` to find all locations. |
| `[INSERT_GLOBAL_TITLE_HERE]` | Default title, e.g. `NOVAGRAPHY — Premium Digital Design Agency` |
| `[INSERT_GLOBAL_DESCRIPTION]` | Site-wide meta description (150–160 chars) |
| `[INSERT_KEYWORD_1]` through `[INSERT_KEYWORD_5]` | Primary SEO keywords |
| `[INSERT_AUTHOR_NAME]` | e.g. `Akash Hewarthna` |
| `[INSERT_CREATOR_NAME]` | e.g. `NOVAGRAPHY` |
| `[INSERT_OG_GLOBAL_TITLE]` | Open Graph title |
| `[INSERT_OG_GLOBAL_DESCRIPTION]` | Open Graph description |
| `[INSERT_OG_IMAGE_URL]` | URL or path to OG image, e.g. `/opengraph-image.png` |
| `[INSERT_OG_IMAGE_ALT]` | Alt text for OG image |
| `[INSERT_TWITTER_GLOBAL_TITLE]` | Twitter card title |
| `[INSERT_TWITTER_GLOBAL_DESCRIPTION]` | Twitter card description |
| `[INSERT_TWITTER_IMAGE_URL]` | Twitter card image URL |
| `[INSERT_TWITTER_HANDLE]` | Your Twitter handle, e.g. `@novagraphy` |

---

## 📌 Step 2: Home Page — `app/page.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_HOME_TITLE]` | Page title (becomes `"[title] \| NOVAGRAPHY"` via template) |
| `[INSERT_HOME_DESCRIPTION]` | Meta description for Homepage |
| `[INSERT_HOME_OG_TITLE]` | OG title for Homepage |
| `[INSERT_HOME_OG_DESCRIPTION]` | OG description for Homepage |
| `[INSERT_HOME_OG_IMAGE_URL]` | OG image URL (or use default) |
| `[INSERT_HOME_OG_IMAGE_ALT]` | Alt text for Home OG image |

---

## 📌 Step 3: About Page — `app/about/layout.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_ABOUT_TITLE]` | Page title |
| `[INSERT_ABOUT_DESCRIPTION]` | Meta description |
| `[INSERT_ABOUT_OG_TITLE]` | OG title |
| `[INSERT_ABOUT_OG_DESCRIPTION]` | OG description |
| `[INSERT_ABOUT_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_ABOUT_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 4: Careers Page — `app/careers/layout.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_CAREERS_TITLE]` | Page title |
| `[INSERT_CAREERS_DESCRIPTION]` | Meta description |
| `[INSERT_CAREERS_OG_TITLE]` | OG title |
| `[INSERT_CAREERS_OG_DESCRIPTION]` | OG description |
| `[INSERT_CAREERS_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_CAREERS_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 5: Contact Page — `app/contact/layout.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_CONTACT_TITLE]` | Page title |
| `[INSERT_CONTACT_DESCRIPTION]` | Meta description |
| `[INSERT_CONTACT_OG_TITLE]` | OG title |
| `[INSERT_CONTACT_OG_DESCRIPTION]` | OG description |
| `[INSERT_CONTACT_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_CONTACT_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 6: Portfolio Page — `app/portfolio/page.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_PORTFOLIO_TITLE]` | Page title |
| `[INSERT_PORTFOLIO_DESCRIPTION]` | Meta description |
| `[INSERT_PORTFOLIO_OG_TITLE]` | OG title |
| `[INSERT_PORTFOLIO_OG_DESCRIPTION]` | OG description |
| `[INSERT_PORTFOLIO_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_PORTFOLIO_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 7: Shop Page — `app/shop/page.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_SHOP_TITLE]` | Page title |
| `[INSERT_SHOP_DESCRIPTION]` | Meta description |
| `[INSERT_SHOP_OG_TITLE]` | OG title |
| `[INSERT_SHOP_OG_DESCRIPTION]` | OG description |
| `[INSERT_SHOP_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_SHOP_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 8: Nova 2.0 Page — `app/nova2.0/layout.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_NOVA2_TITLE]` | Page title |
| `[INSERT_NOVA2_DESCRIPTION]` | Meta description |
| `[INSERT_NOVA2_OG_TITLE]` | OG title |
| `[INSERT_NOVA2_OG_DESCRIPTION]` | OG description |
| `[INSERT_NOVA2_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_NOVA2_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 9: NovaStudio Page — `app/novastudio/layout.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_NOVASTUDIO_TITLE]` | Page title |
| `[INSERT_NOVASTUDIO_DESCRIPTION]` | Meta description |
| `[INSERT_NOVASTUDIO_OG_TITLE]` | OG title |
| `[INSERT_NOVASTUDIO_OG_DESCRIPTION]` | OG description |
| `[INSERT_NOVASTUDIO_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_NOVASTUDIO_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 10: Start Project Page — `app/start-project/page.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_START_PROJECT_TITLE]` | Page title |
| `[INSERT_START_PROJECT_DESCRIPTION]` | Meta description |
| `[INSERT_START_PROJECT_OG_TITLE]` | OG title |
| `[INSERT_START_PROJECT_OG_DESCRIPTION]` | OG description |
| `[INSERT_START_PROJECT_OG_IMAGE_URL]` | OG image URL |
| `[INSERT_START_PROJECT_OG_IMAGE_ALT]` | OG image alt text |

---

## 📌 Step 11: Dynamic Product Pages — `app/shop/[id]/page.tsx` & `app/product/[id]/page.tsx`

These use `generateMetadata` and auto-populate from the database. Update the **prefix text**:

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_SHOP_PRODUCT_DESCRIPTION_PREFIX]` | Text before product name, e.g. `Shop` |
| `[INSERT_SHOP_PRODUCT_OG_DESCRIPTION_PREFIX]` | OG text before product name, e.g. `Get` |
| `[INSERT_PRODUCT_DESCRIPTION_PREFIX]` | Description prefix, e.g. `Explore` |
| `[INSERT_PRODUCT_OG_DESCRIPTION_PREFIX]` | OG description prefix, e.g. `Check out` |

---

## 📌 Step 12: Dynamic Service Package Pages — `app/start-project/[id]/page.tsx`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_PACKAGE_DESCRIPTION_PREFIX]` | Text before package name, e.g. `Start your project with` |
| `[INSERT_PACKAGE_OG_DESCRIPTION_PREFIX]` | OG text before package name |

---

## 📌 Step 13: Sitemap — `app/sitemap.ts`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_SITE_URL]` | Your production URL (same as layout.tsx) |

---

## 📌 Step 14: Robots — `app/robots.ts`

| Placeholder | What to Insert |
|-------------|---------------|
| `[INSERT_SITE_URL]` | Your production URL (same as layout.tsx) |

---

## ✅ Final Verification

After replacing all placeholders:

1. **Build**: Run `npx next build` — ensure zero errors.
2. **Local test**: Run `npm run dev`, inspect `<head>` tags in browser DevTools.
3. **OG debugger**: Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator).
4. **Sitemap**: Visit `/sitemap.xml` to verify all URLs are listed.
5. **Robots**: Visit `/robots.txt` to confirm allowed/disallowed paths.
