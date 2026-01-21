import Image from "next/image";

interface ProductCardProps {
    image: string;
    title: string;
    price: string;
    category: string;
    variant?: 'dark' | 'light';
}

export default function ProductCard({ image, title, price, category, variant = 'dark' }: ProductCardProps) {
    const textColor = variant === 'dark' ? 'text-white' : 'text-black';
    const subTextColor = variant === 'dark' ? 'text-gray-500' : 'text-gray-600';
    const buttonBorder = variant === 'dark' ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white';

    return (
        <div className="group relative">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-none bg-gray-200 relative">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="absolute top-4 left-4 bg-yellow-500 px-3 py-1 text-[10px] font-black text-black uppercase tracking-widest">
                    {category}
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-bold uppercase tracking-tighter ${textColor}`}>
                        {title}
                    </h3>
                    <p className="text-lg font-mono text-yellow-500">{price}</p>
                </div>
                <p className={`text-xs uppercase tracking-widest ${subTextColor}`}>Limited Edition</p>
            </div>
            <button className={`mt-4 w-full border py-4 font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 ${buttonBorder}`}>
                Add to Cart
            </button>
        </div>
    );
}
