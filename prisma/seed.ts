import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding Novagraphy database...\n");

  // 🧹 Clean
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productDisplay.deleteMany();
  await prisma.event.deleteMany();
  await prisma.mvArtwork.deleteMany();
  await prisma.logoWork.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.timelineEntry.deleteMany();
  await prisma.philosophy.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.perk.deleteMany();
  await prisma.job.deleteMany();
  await prisma.evolutionPoint.deleteMany();
  await prisma.studioFeature.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.servicePackage.deleteMany(); // 🟢 අලුතින් එකතු කළ කොටස

  console.log("  ✓ Cleared existing data");

  // 🛍️ PRODUCTS
  const bomber = await prisma.product.create({
    data: {
      title: "CYBERPUNK BOMBER",
      basePrice: 250.0,
      category: "OUTERWEAR",
      description: "Ballistic nylon construction with adaptive thermal lining.",
      image: "/products/bomber-black-1.jpg",
      status: "BESTSELLER",
      featured: true,
      colors: {
        create: [
          {
            name: "Void Black",
            hex: "#111111",
            images: [
              "/products/bomber-black-1.jpg",
              "/products/bomber-black-2.jpg",
              "/products/bomber-black-3.jpg",
            ],
            sortOrder: 0,
          },
          {
            name: "Electric Blue",
            hex: "#2DE1FC",
            images: [
              "/products/bomber-blue-1.jpg",
              "/products/bomber-blue-2.jpg",
            ],
            sortOrder: 1,
          },
        ],
      },
      sizes: {
        create: [
          { label: "S", priceMod: 0, sortOrder: 0 },
          { label: "M", priceMod: 0, sortOrder: 1 },
          { label: "L", priceMod: 10, sortOrder: 2 },
          { label: "XL", priceMod: 20, sortOrder: 3 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      title: "VOID RUNNER CAP",
      basePrice: 35.0,
      category: "ACCESSORIES",
      description: "5-panel construction with reflective brim details.",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936",
      colors: {
        create: [
          {
            name: "Black",
            hex: "#000000",
            images: [
              "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936",
            ],
            sortOrder: 0,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      title: "TECH UTILITY VEST",
      basePrice: 180.0,
      category: "OUTERWEAR",
      description: "Modular attachment system with magnetic fidlock buckles.",
      image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=2660",
      sizes: {
        create: [
          { label: "S/M", priceMod: 0, sortOrder: 0 },
          { label: "L/XL", priceMod: 0, sortOrder: 1 },
        ],
      },
    },
  });

  console.log("  ✓ Products seeded");

  // 🖼️ PRODUCT DISPLAYS
  await prisma.productDisplay.createMany({
    data: [
      { title: "OVERSIZED TEE", price: "$45.00", status: "NEW DROP", image: "/products/1.jpg", className: "md:col-span-1 md:row-span-2", sortOrder: 0 },
      { title: "CYBER HOODIE", price: "$80.00", status: "BESTSELLER", image: "/products/2.jpg", className: "md:col-span-1", sortOrder: 1 },
      { title: "TECH CAP", price: "$30.00", image: "/products/3.jpg", className: "md:col-span-1", sortOrder: 2 },
      { title: "ACCESSORY PACK", price: "$25.00", status: "LIMITED", image: "/products/4.jpg", className: "md:col-span-2", sortOrder: 3 },
    ],
  });

  console.log("  ✓ Product displays seeded");

  // 📸 EVENTS
  await prisma.event.createMany({
    data: [
      { title: "ALUTH KALAWA", date: "OCT 12, 2024", location: "TOKYO, JP", image: "/events/kalawa.jpg", category: "LIVE SHOW", sortOrder: 0 },
      { title: "AFROSAFARI", date: "NOV 05, 2024", location: "BERLIN, DE", image: "/events/AFROSAFARI.jpg", category: "LIVE SHOW", sortOrder: 1 },
      { title: "YAGA", date: "DEC 31, 2024", location: "NEW YORK, US", image: "/events/yaga.jpg", category: "LIVE SHOW", sortOrder: 2 },
    ],
  });

  console.log("  ✓ Events seeded");

  // 🎬 MV ARTWORKS
  await prisma.mvArtwork.createMany({
    data: [
      { title: "GASSEENA", artist: "Nova Collective", img: "/mv/mv1.jpg", sortOrder: 0 },
      { title: "ECHO CHAMBER", artist: "The Architect", img: "/mv/mv2.jpg", sortOrder: 1 },
      { title: "CHROMATIC", artist: "Prism Labs", img: "/mv/mv3.jpg", sortOrder: 2 },
      { title: "DEEP DIVE", artist: "Oceanic", img: "/mv/mv4.jpg", sortOrder: 3 },
      { title: "SYNTH WAVE", artist: "Retro Future", img: "/mv/mv5.jpg", sortOrder: 4 },
    ],
  });

  console.log("  ✓ MV Artworks seeded");

  // 🏷️ LOGO WORKS
  await prisma.logoWork.createMany({
    data: [
      { title: "NEBULA SYSTEMS", category: "Brand Identity", image: "/logos/logo1.jpg", className: "md:col-span-2", sortOrder: 0 },
      { title: "APEX DYNAMICS", category: "Vector Art", image: "/logos/logo2.jpg", className: "md:col-span-1", sortOrder: 1 },
      { title: "ZENITH AI", category: "Minimalist", image: "/logos/logo3.jpg", className: "md:col-span-1", sortOrder: 2 },
      { title: "ECHO LABS", category: "Typography", image: "/logos/logo4.jpg", className: "md:col-span-2", sortOrder: 3 },
    ],
  });

  console.log("  ✓ Logo works seeded");

  // 📋 PORTFOLIO ITEMS
  await prisma.portfolioItem.createMany({
    data: [
      { title: "ALUTH KALAWA", subtitle: "TOKYO, JP", image: "/events/kalawa.jpg", category: "events", date: "OCT 12, 2024", sortOrder: 0 },
      { title: "AFROSAFARI", subtitle: "BERLIN, DE", image: "/events/AFROSAFARI.jpg", category: "events", date: "NOV 05, 2024", sortOrder: 1 },
      { title: "YAGA", subtitle: "NEW YORK, US", image: "/events/yaga.jpg", category: "events", date: "DEC 31, 2024", sortOrder: 2 },
      { title: "GASSEENA", subtitle: "Nova Collective", image: "/mv/mv1.jpg", category: "mv-artworks", sortOrder: 3 },
      { title: "ECHO CHAMBER", subtitle: "The Architect", image: "/mv/mv2.jpg", category: "mv-artworks", sortOrder: 4 },
      { title: "CHROMATIC", subtitle: "Prism Labs", image: "/mv/mv3.jpg", category: "mv-artworks", sortOrder: 5 },
      { title: "DEEP DIVE", subtitle: "Oceanic", image: "/mv/mv4.jpg", category: "mv-artworks", sortOrder: 6 },
      { title: "SYNTH WAVE", subtitle: "Retro Future", image: "/mv/mv5.jpg", category: "mv-artworks", sortOrder: 7 },
      { title: "NEBULA SYSTEMS", subtitle: "Brand Identity", image: "/logos/logo1.jpg", category: "identity", className: "md:col-span-2", sortOrder: 8 },
      { title: "APEX DYNAMICS", subtitle: "Vector Art", image: "/logos/logo2.jpg", category: "identity", sortOrder: 9 },
      { title: "ZENITH AI", subtitle: "Minimalist", image: "/logos/logo3.jpg", category: "identity", sortOrder: 10 },
      { title: "ECHO LABS", subtitle: "Typography", image: "/logos/logo4.jpg", category: "identity", className: "md:col-span-2", sortOrder: 11 },
    ],
  });

  console.log("  ✓ Portfolio items seeded");

  // 📅 TIMELINE
  await prisma.timelineEntry.createMany({
    data: [
      { year: "2020", title: "THE SPARK", desc: "Started in a garage with one laptop and a vision to disrupt the digital space.", sortOrder: 0 },
      { year: "2021", title: "FIRST CLIENT", desc: "Landed our first international project in Tokyo, setting our global standard.", sortOrder: 1 },
      { year: "2022", title: "SCALING UP", desc: "Moved into our first physical studio and hired the core engineering team.", sortOrder: 2 },
      { year: "2023", title: "EXPANSION", desc: "Opened the Colombo headquarters and launched the Graphy digital product line.", sortOrder: 3 },
      { year: "2024", title: "AWWWARDS", desc: "Won Site of the Day for three consecutive projects, cementing our status.", sortOrder: 4 },
      { year: "2025", title: "FUTURE", desc: "Launching our own AI-driven design tools. The revolution continues.", sortOrder: 5 },
    ],
  });

  console.log("  ✓ Timeline seeded");

  // 💡 PHILOSOPHY
  await prisma.philosophy.createMany({
    data: [
      { title: "Obsession", desc: "We don't just design; we obsess over every pixel until it bleeds perfection.", color: "bg-blue-600", sortOrder: 0 },
      { title: "Innovation", desc: "If it's been done before, we are not interested. We chase the unseen.", color: "bg-purple-600", sortOrder: 1 },
      { title: "Humanity", desc: "Technology is cold. We inject soul into code to make it feel alive.", color: "bg-orange-500", sortOrder: 2 },
    ],
  });

  console.log("  ✓ Philosophy seeded");

  // 👥 TEAM
  await prisma.teamMember.createMany({
    data: [
      { name: "ALEX NOVA", role: "FOUNDER & CREATIVE DIRECTOR", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887", isFounder: true, sortOrder: 0 },
      { name: "SARA JIN", role: "ART DIRECTOR", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887", isFounder: false, sortOrder: 1 },
      { name: "KAITO M.", role: "TECH LEAD", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887", isFounder: false, sortOrder: 2 },
      { name: "ELENA R.", role: "3D ARTIST", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964", isFounder: false, sortOrder: 3 },
    ],
  });

  console.log("  ✓ Team seeded");

  // 🎁 PERKS
  await prisma.perk.createMany({
    data: [
      { title: "Global Freedom", desc: "Work from anywhere. 15+ timezones.", icon: "globe", sortOrder: 0 },
      { title: "Creative Autonomy", desc: "Lead your craft. No micromanagement.", icon: "zap", sortOrder: 1 },
      { title: "Premium Gear", desc: "Top-tier M3 Max MacBooks provided.", icon: "cpu", sortOrder: 2 },
    ],
  });

  console.log("  ✓ Perks seeded");

  // 💼 JOBS
  await prisma.job.createMany({
    data: [
      { title: "SENIOR UI ENGINEER", salary: "$120k - $160k", type: "FULL-TIME", location: "REMOTE", dept: "ENGINEERING" },
      { title: "3D MOTION ARTIST", salary: "$90k - $130k", type: "CONTRACT", location: "HYBRID", dept: "DESIGN" },
      { title: "BRAND STRATEGIST", salary: "$110k - $150k", type: "FULL-TIME", location: "NEW YORK", dept: "STRATEGY" },
    ],
  });

  console.log("  ✓ Jobs seeded");

  // 🚀 EVOLUTION
  await prisma.evolutionPoint.createMany({
    data: [
      { title: "AI INTEGRATION", desc: "We are fusing our creative processes with advanced, custom-trained AI models.", number: "01", sortOrder: 0 },
      { title: "SPATIAL WEB", desc: "Preparing for the 3D internet. NOVA2.0 embraces WebGL, WebXR natively.", number: "02", sortOrder: 1 },
      { title: "SUSTAINABLE CODE", desc: "Optimized performance, lower carbon footprint.", number: "03", sortOrder: 2 },
    ],
  });

  console.log("  ✓ Evolution points seeded");

  // 🏢 STUDIO
  await prisma.studioFeature.createMany({
    data: [
      { title: "CREATIVE HUB", desc: "Where ideas collide and become reality.", icon: "lightbulb", sortOrder: 0 },
      { title: "HIGH-END GEAR", desc: "Equipped with the latest in digital production.", icon: "zap", sortOrder: 1 },
      { title: "COLLABORATION SPACE", desc: "Open plan seating, quiet pods, and a cafe.", icon: "layers", sortOrder: 2 },
    ],
  });

  console.log("  ✓ Studio features seeded");

  // ⚙️ SETTINGS
  await prisma.siteSetting.createMany({
    data: [
      { key: "bgImage", value: "/logo/gojo.png" },
      { key: "heroTitle", value: "NOVAGRAPHY" },
      { key: "heroSubtitle", value: "Digital Design Agency" },
    ],
  });

  console.log("  ✓ Site settings seeded");

  // 🛒 SAMPLE ORDER
  await prisma.order.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Cyber Street",
      city: "Neo Tokyo",
      state: "NT",
      postalCode: "10001",
      country: "US",
      subtotal: 290.0,
      shipping: 15.0,
      tax: 24.4,
      totalAmount: 329.4,
      status: "CONFIRMED",
      items: {
        create: [
          {
            productId: bomber.id,
            name: "CYBERPUNK BOMBER",
            color: "Void Black",
            size: "L",
            price: 260.0,
            quantity: 1,
            image: "/products/bomber-black-1.jpg",
          },
        ],
      },
    },
  });

  console.log("  ✓ Sample order seeded");

  // 📦 SERVICE PACKAGES (🟢 අලුතින් එකතු කළ කොටස)
  const eventPackages = [
    {
      title: 'Starter Package',
      price: '90,000 LKR',
      category: 'Events Artwork',
      features: ['Mother Art Work', 'Ticket Design', '2 Size Banner Design', 'X Banner Design', 'Facebook Cover', 'Facebook Event Cover'],
    },
    {
      title: 'Top Selling Package',
      price: '160,000 LKR',
      category: 'Events Artwork',
      features: ['Mother Art Work', 'Ticket Design', '3 Flyer Designs', '2 Size Banner Designs', 'X Banner', 'Facebook Cover', 'Fb Event Cover', 'Count Down (5 day)'],
    },
    {
      title: 'Premium Package',
      price: '300,000 LKR',
      category: 'Events Artwork',
      features: ['UNLIMITED POSTS', 'UNLIMITED BANNERS', 'Valid for 1 Month', 'Content plan required before starting'],
    },
  ];

  const musicVideoPackages = [
    {
      title: 'Starter Package',
      price: '30,000 LKR',
      category: 'Music Video Artwork',
      features: ['Mother Art Work'],
    },
    {
      title: 'Top Selling Package',
      price: '50,000 LKR',
      category: 'Music Video Artwork',
      features: ['Main Art Work', 'Fb Cover', 'Profile Pictures', 'Youtube Thumbnail', 'Youtube Cover'],
    },
    {
      title: 'Premium Package',
      price: '90,000 LKR',
      category: 'Music Video Artwork',
      features: ['Main Art Work', 'Fb Cover', 'Profile Pictures', 'Youtube Thumbnail', 'Youtube Cover', 'Flyer Animation', 'Logo Animation'],
    },
  ];

  const logoPackages = [
    {
      title: 'Starter Package',
      price: '50,000 LKR',
      category: 'Logo Design',
      features: ['Source File', 'Logo Transparency', 'High Resolution', '01 Initial Concept Included', '03 Revisions', 'Creative Design on a Budget'],
    },
    {
      title: 'Top Selling Package',
      price: '100,000 LKR',
      category: 'Logo Design',
      features: ['Source File', 'Logo Transparency', 'High Resolution', '3D Mockup', 'Social Media Kit', '02 Initial Concepts Included', '07 Revisions', 'Best Value for Money'],
    },
    {
      title: 'Premium Branding Package',
      price: '150,000 LKR',
      category: 'Logo Design',
      features: ['Source File', 'Logo Transparency', 'High Resolution', '3D Mockup', 'Stationery Designs', 'Social Media Kit', 'Professional Presentation', '04 Initial Concepts Included', 'Unlimited Revisions', 'Work only with the best'],
    },
  ];

  const animationPackages = [
    {
      title: 'Event Trailer',
      price: '50,000 LKR',
      category: 'Event Video Animation',
      features: ['Standard Event Trailer', 'Add Dubbing for extra 10,000 LKR (Total 60,000 LKR)'],
    },
    {
      title: 'Motion Flyer',
      price: '25,000 LKR',
      category: 'Event Video Animation',
      features: ['Custom Motion Flyer Animation'],
    },
  ];

  const allPackages = [...eventPackages, ...musicVideoPackages, ...logoPackages, ...animationPackages];

  for (const pkg of allPackages) {
    await prisma.servicePackage.create({
      data: pkg,
    });
  }

  console.log("  ✓ Service Packages seeded");

  console.log("\n✅ Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });