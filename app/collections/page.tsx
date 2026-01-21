
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Collections() {
    const collections = [
        {
            id: "season-04",
            title: "Season 04: Eclipse",
            description: "Inspired by the darkness before the dawn. Stark contrasts, heavy fabrics, and silhouettes that swallow the light.",
            image: "/images/hero.png",
            year: "2026",
        },
        {
            id: "minimalist",
            title: "The Minimalist",
            description: "Stripping back to the essential. No logos, just cut and form. Pure architectural streetwear.",
            image: "/images/jacket.png",
            year: "2025",
        },
        {
            id: "techwear",
            title: "Urban Tech",
            description: "Function meets form. Waterproof materials, multiple pockets, and straps for the urban nomad.",
            image: "/images/sneakers.png",
            year: "2025",
        },
        {
            id: "heritage",
            title: "Royal Heritage",
            description: "A nod to the kings of old. Gold accents, velvet textures, and regal cuts updated for the modern era.",
            image: "/images/hero.png",
            year: "2024",
        },
    ];

    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10">
                <div className="max-w-[1400px] mx-auto">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 italic">
                        Archives & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-600">Series</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed uppercase tracking-widest font-medium border-l border-white/20 pl-6">
                        Explore our defining moments. Each collection is a chapter in our legacy.
                        Curated narratives of style and dominance.
                    </p>
                </div>
            </section>

            {/* Collections List */}
            <section className="px-6 py-20">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-32">
                    {collections.map((collection, idx) => (
                        <div key={collection.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-[70vh] overflow-hidden bg-gray-900 border border-white/10">
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                    {collection.year}
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
                                <span className="text-yellow-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Collection {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all">
                                    {collection.title}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-10">
                                    {collection.description}
                                </p>
                                <Link href="/shop" className="group/btn flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors">
                                    View Products <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* Experimental Bottom Area */}
            <section className="py-32 px-6 bg-white text-black relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">Never Miss a Drop</h2>
                    <p className="max-w-lg mx-auto mb-10 font-medium uppercase tracking-widest text-xs text-gray-600">
                        Join the inner circle. Get early access to future collections and limited edition pieces.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-transparent border-b-2 border-black px-4 py-2 outline-none font-bold uppercase text-xs tracking-widest placeholder:text-gray-400 w-full" />
                        <button className="bg-black text-white px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-yellow-500 hover:text-black transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
