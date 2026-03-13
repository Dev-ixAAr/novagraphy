# NOVAGRAPHY Deployment Guide

This guide provides step-by-step instructions to take the **NOVAGRAPHY** Next.js project from local development to a fully hosted live site with a custom domain.

## 1. Version Control (GitHub)

First, push your local project to a remote GitHub repository.

1. **Create a new repository** on [GitHub](https://github.com/new) (e.g., named `novagraphy`). Do not initialize it with a README, .gitignore, or license.
2. **Open your terminal** in the root of your project (`c:\Users\root\Desktop\WS\novagraphy`) and run the following commands:

```bash
# Initialize a new Git repository (if not already done)
git init

# Add all files to the staging area
git add .

# Commit the changes
git commit -m "Initial commit for production deployment"

# Link your local repository to the remote GitHub repository
# Replace <YOUR_GITHUB_USERNAME> with your actual username
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/novagraphy.git

# Push the code to the main branch
git branch -M main
git push -u origin main
```

## 2. Database Setup (Supabase)

We need a live PostgreSQL database for the production environment.

1. **Create an account** on [Supabase](https://supabase.com/) if you haven't already.
2. **Create a new project**: Click "New Project", select your organization, name your project (e.g., "Novagraphy Prod"), generate a strong secure password for the database, and choose an appropriate region.
3. **Get the Connection String**:
   - Go to your Project Settings (gear icon) -> Database.
   - Under "Connection string" -> "URI", copy the connection string.
   - It will look something like this: `postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`
   - *Important:* Replace `[PASSWORD]` with the database password you created in step 2. This is your production `DATABASE_URL`.
4. **Update Prisma Schema** (Important):
   - In your local codebase, open `prisma/schema.prisma`.
   - Ensure the provider is set to `"postgresql"`. It should look like this:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Commit and push this change to GitHub if you had to modify it.
5. **Push the Schema**:
   - Temporarily update your local `.env` file with the production `DATABASE_URL` (or export it in your terminal).
   - Run the following command to push your schema or apply migrations to the Supabase database:
     ```bash
     npx prisma db push
     # Alternatively, if you use migrations: npx prisma migrate deploy
     ```
   - *Note: Don't forget to revert your local `.env` back to your local development database URLs afterward.*

## 3. Email Setup (Resend)

Set up a production email sending service.

1. **Create an account** on [Resend](https://resend.com/).
2. **Generate an API Key**:
   - Go to "API Keys" in the left sidebar and click "Create API Key".
   - Name it (e.g., "Novagraphy Prod"), give it "Sending access", and select your domain (or "All domains").
   - Copy the generated key. This is your `RESEND_API_KEY`.
3. **Verify your Custom Domain**:
   - Go to "Domains" -> "Add Domain".
   - Enter your custom domain (e.g., `novagraphy.com`) and an appropriate region.
   - Resend will provide DNS records (TXT/MX/CNAME). Add these records in your domain registrar's dashboard (e.g., GoDaddy, Namecheap, Cloudflare) to verify ownership and enable email sending.

## 4. Third-Party Services Check

Gather all your existing third-party API keys before deploying. Check your local `.env` file and prepare the production values for:

*   **Cloudinary**: Needed for image uploads.
    *   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
    *   `NEXT_PUBLIC_CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`
*   **PayHere**: Needed for payments/checkout.
    *   `NEXT_PUBLIC_PAYHERE_MERCHANT_ID`
    *   `PAYHERE_SECRET`
    *   *Note: Make sure you use production credentials (not sandbox) if this is the live site, and update the PayHere notify URL to point to your live domain.*
*   **Authentication/Security**:
    *   `JWT_SECRET` (Generate a new secure random string for production)
    *   Any NextAuth secrets or similar variables if used.

## 5. Deployment (Vercel)

Deploy the application using Vercel.

1. **Log in** to [Vercel](https://vercel.com/) (preferably using your GitHub account).
2. **Import Project**: Click "Add New..." -> "Project".
3. **Select Repository**: Find the `novagraphy` repository you pushed to GitHub and click "Import".
4. **Configure Project**:
   - **Framework Preset**: Vercel should automatically detect **Next.js**.
   - **Root Directory**: Leave as `./` (unless your app is in a subfolder).
   - **Build Command**: Leave default (`npm run build` or `npx prisma generate && next build` if you customized it in Package.json).
5. **Environment Variables**:
   - Expand the "Environment Variables" section.
   - **CRITICAL STEP**: Add **ALL** required variables from your `.env` file for the production environment.
   - **Checklist of common variables to add:**
     *   `DATABASE_URL` (Your Supabase connection string)
     *   `RESEND_API_KEY`
     *   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
     *   `NEXT_PUBLIC_CLOUDINARY_API_KEY`
     *   `CLOUDINARY_API_SECRET`
     *   `NEXT_PUBLIC_PAYHERE_MERCHANT_ID`
     *   `PAYHERE_SECRET`
     *   `JWT_SECRET`
     *   `NEXT_PUBLIC_APP_URL` (Set this to your intended production domain, e.g., `https://www.novagraphy.com`)
6. **Deploy**: Click the "Deploy" button. Wait for Vercel to build and start your application.

## 6. Custom Domain Setup

Finally, link your custom domain to your Vercel deployment.

1. **Go to Vercel Project Settings**: In Vercel, navigate to your newly deployed project and click on the "Settings" tab.
2. **Domains Section**: Click on "Domains" in the left sidebar.
3. **Add Domain**: Enter your custom domain (e.g., `novagraphy.com`) and click "Add".
4. **Configure DNS Records**:
   - Vercel will analyze your domain and provide DNS records that you need to add to your domain registrar's dashboard.
   - Typically, you will need to add:
     - An **A Record** pointing to `76.76.21.21` (for the apex domain `novagraphy.com`).
     - A **CNAME Record** for `www` pointing to `cname.vercel-dns.com` (for the subdomain `www.novagraphy.com`).
5. **Wait for Propagation**: It may take a few minutes to up to 48 hours for the DNS changes to propagate globally. Vercel will show a valid certificate and a green checkmark once the domain is properly configured and successfully verified.
