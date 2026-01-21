
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black">
            <Navbar />

            <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center">
                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Contact Info Side */}
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic">
                                Get In <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Touch</span>
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed uppercase tracking-widest font-medium border-l border-white/20 pl-6 mb-16">
                                Questions, collaborations, or just want to say hello? We are listening.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Phone</h3>
                                        <p className="text-xl font-bold font-display tracking-wide">+234 706 116 1980</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email</h3>
                                        <p className="text-xl font-bold font-display tracking-wide">agozilim.ndefo@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Location</h3>
                                        <p className="text-xl font-bold font-display tracking-wide">Nigeria</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <p className="text-gray-600 text-xs uppercase tracking-widest">
                                Support Available: Mon - Fri, 9am - 6pm WAT
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] pointer-events-none"></div>

                        <h3 className="text-2xl font-bold uppercase tracking-widest mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                                    <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors uppercase text-sm tracking-wider" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                                    <input type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors uppercase text-sm tracking-wider" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                                <select className="w-full bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors uppercase text-sm tracking-wider appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Wholesale</option>
                                    <option>Collaboration</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                                <textarea rows={5} className="w-full bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors uppercase text-sm tracking-wider" placeholder="Write your message here..."></textarea>
                            </div>

                            <button type="button" className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors mt-4">
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
