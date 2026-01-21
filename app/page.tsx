import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import Image from "next/image";
import { Lock, User, Scissors, Zap, Repeat, Clock, ChevronLeft, ChevronRight, Play } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    include: {
      category: true,
    }
  });

  const features = [
    { icon: Lock, label: "Top Selected Colors" },
    { icon: User, label: "Wear Patient Cuts" },
    { icon: Scissors, label: "Free Carving" },
    { icon: Zap, label: "Charge Cards" },
    { icon: Repeat, label: "Rate Try Coats" },
    { icon: Clock, label: "Keep Try Cohort" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen selection:bg-yellow-500 selection:text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col pt-32 lg:pt-0 lg:flex-row items-center overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Angled Divider */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-[#0a0a0a] -skew-x-12 translate-x-32 hidden lg:block"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 w-full lg:w-1/2 px-6 lg:pl-32 flex flex-col justify-center h-full pt-32 lg:pt-32">
          <h1 className="text-7xl lg:text-[9rem] leading-[0.85] font-black text-white uppercase italic tracking-tighter mb-6 relative">
            Street
            <br />
            Wear
            <div className="w-24 h-1 bg-white mt-8 hidden lg:block"></div>
          </h1>
          <p className="text-gray-400 text-sm lg:text-base max-w-md mb-10 leading-relaxed uppercase tracking-widest font-medium">
            Define your altitude. This is what we do when we replace the standard.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              Shop Shops
            </button>
            <button className="px-8 py-4 bg-yellow-500 text-black rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all flex items-center gap-2">
              Shop Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slider Dots */}
          <div className="flex gap-2 mt-16">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative z-10 w-full lg:w-1/2 h-[50vh] lg:h-screen flex items-end justify-end lg:justify-center">
          <div className="relative w-full h-full lg:w-[80%] lg:h-[90%] grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="/images/hero.png" // Using existing asset
              alt="Hero"
              fill
              className="object-cover object-center lg:object-top"
              priority
            />
            {/* Floating Label */}
            <div className="absolute bottom-20 right-10 bg-black/80 backdrop-blur-md p-4 rounded-xl text-white hidden lg:block border border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">New Drop</p>
              <p className="text-xl font-bold uppercase">Phantom Series</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-black border-y border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="p-4 rounded-full border border-white/10 group-hover:border-yellow-500 group-hover:text-yellow-500 text-white transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Split Section: Collection Highlight */}
      <section className="bg-black py-32 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-20">
          {/* Text Side */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
              Your Upto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Minimalist</span> <br />
              Collection
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
              Every cut feels like a revelation. Define a new era of style with our exclusive minimalist drops.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-white uppercase tracking-widest text-xs font-bold hover:text-yellow-500 transition-colors">
              Explore Collection <span className="w-8 h-[1px] bg-yellow-500"></span>
            </a>
          </div>

          {/* Images Grid Side */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Image 1 */}
            <div className="relative h-[400px] group overflow-hidden">
              <Image src="/images/hero.png" alt="Col 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Sale</div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="uppercase font-bold text-sm">Hoodies</p>
              </div>
            </div>
            {/* Image 2 - Center Focus */}
            <div className="relative h-[400px] md:-mt-12 group overflow-hidden border border-white/10">
              <Image src="/images/jacket.png" alt="Col 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
            {/* Image 3 */}
            <div className="relative h-[400px] group overflow-hidden">
              <Image src="/images/sneakers.png" alt="Col 3" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase">New</div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="uppercase font-bold text-sm">Techwear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Section: Product Grid */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter mb-4">
            Collections Grind
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {/* Using the updated ProductCard with light variant */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images || '/images/jacket.png'}
              title={product.name}
              price={`$${Number(product.price).toFixed(2)}`}
              category={product.category?.name || 'Uncategorized'}
              variant="light"
            />
          ))}
          {/* Duplicate for demo filling */}
          {products.map((product) => (
            <ProductCard
              key={`dup-${product.id}`} // Ensure unique keys
              id={product.id}
              image={product.images || '/images/jacket.png'}
              title={product.name}
              price={`$${Number(product.price).toFixed(2)}`}
              category={product.category?.name || 'Uncategorized'}
              variant="light"
            />
          ))}
        </div>
      </section>

      {/* Footer is already dark, matching the layout flow usually, or we can invert it. Keeping it dark as per standard. */}
      <Footer />
    </main>
  );
}
