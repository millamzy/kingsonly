
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function About() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-500/10 to-transparent"></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 italic">
                        Who We <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800">Are</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed uppercase tracking-widest font-medium border-l border-yellow-500 pl-6">
                        Kingsonly isn't just a brand. It's a statement. A declaration of sovereignty over your own style.
                        born in the heart of Nigeria, raised for the global stage.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 px-6">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[600px] w-full bg-gray-900 border border-white/10 group overflow-hidden">
                        <Image
                            src="/images/hero.png"
                            alt="Our Story"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div>
                        <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Origin</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                            Forged in <br /> African Soil
                        </h2>
                        <div className="space-y-6 text-gray-400 text-sm leading-7">
                            <p>
                                We started with a simple belief: Luxury knows no borders. From the vibrant streets of Nigeria to the runways of the world,
                                Kingsonly bridges the gap between raw, authentic culture and high-end streetwear.
                            </p>
                            <p>
                                Our designs are unapologetic. Bold cuts, premium fabrics, and a meticulous attention to detail that rivals the oldest fashion houses.
                                We don't chase trends; we set the pace for those who lead.
                            </p>
                            <p>
                                Every piece is a testament to resilience, creativity, and the power of self-expression. When you wear Kingsonly,
                                you aren't just wearing clothes—you are wearing a legacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values/Mission */}
            <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
                <div className="max-w-[1400px] mx-auto text-center">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16">The Code</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Sovereignty", desc: "Rule your own path. We create for the leaders, not followers." },
                            { title: "Quality", desc: "No compromises. Only the finest materials touch your skin." },
                            { title: "Legacy", desc: "Building something that outlasts the moment. Timeless style." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 border border-white/10 hover:border-yellow-500 transition-colors group">
                                <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                                <p className="text-gray-500 text-sm uppercase tracking-wider leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
