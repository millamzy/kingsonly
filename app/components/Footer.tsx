import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-4xl font-black tracking-tighter text-white uppercase italic">
                            Kings<span className="text-yellow-500">only</span>.
                        </Link>
                        <p className="mt-6 text-gray-400 max-w-md text-sm leading-relaxed">
                            Defining the future of luxury streetwear. We don't just sell clothes; we crown kings. Wear the legacy. Designed in the shadows, worn in the spotlight.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-xs">Shop</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/new-arrivals" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">New Arrivals</Link></li>
                            <li><Link href="/collections" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Collections</Link></li>
                            <li><Link href="/shop" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Best Sellers</Link></li>
                            <li><Link href="/shop" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Sale</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-xs">Support</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">FAQ</a></li>
                            <li><a href="#" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Shipping & Returns</a></li>
                            <li><Link href="/contact" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Contact Us</Link></li>
                            <li><a href="#" className="hover:text-yellow-500 transition-colors uppercase tracking-wide">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs uppercase tracking-wider">
                    <p>&copy; 2026 AGSTYLES Technology Limited. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">TikTok</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
