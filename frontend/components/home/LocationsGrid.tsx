import Image from "next/image";

const locations = [
    { name: "Bangalore", icon: "/icons/location_icons/bangalore.png" },
    { name: "Delhi NCR", icon: "/icons/location_icons/delhi.png" },
    { name: "Noida", icon: "/icons/location_icons/NOIDA.png" },
    { name: "Pune", icon: "/icons/location_icons/PUNA.png" },
    { name: "Shillong", icon: "/icons/location_icons/silong.png" },
    { name: "Guwahati", icon: "/icons/location_icons/guwahati.png" },
    { name: "Jaipur", icon: "/icons/location_icons/jaipur.png" },
    { name: "Indore", icon: "/icons/location_icons/INDORE.png" },
    { name: "Vadodara", icon: "/icons/location_icons/Vadodara.png" },
    { name: "Mohali", icon: "/icons/location_icons/MOHALI.png" },
    { name: "Patna", icon: "/icons/location_icons/PTNA.png" },
    { name: "Lucknow", icon: "/icons/location_icons/lucknow.png" },
];

export default function LocationsGrid() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-brand-magenta font-extrabold text-xs md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4 bg-brand-magenta/5 inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full">
                        Best Locations
                    </h2>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy">
                        Find Your <span className="text-brand-magenta">Perfect Hub</span>
                    </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {locations.map((loc) => (
                        <div
                            key={loc.name}
                            className="bg-white px-3 md:px-4 py-6 md:py-8 rounded-xl md:rounded-2xl soft-shadow hover:shadow-2xl hover:border-brand-magenta/10 transition-all duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 group cursor-pointer border border-slate-50 relative overflow-hidden text-center min-h-[120px] md:min-h-[140px]"
                        >
                            <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 bg-brand-magenta/5 rounded-full blur-2xl -mr-6 md:-mr-8 -mt-6 md:-mt-8 group-hover:bg-brand-magenta/10 transition-colors duration-500" />
                            <div className="relative w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                                <Image
                                    src={loc.icon}
                                    alt={loc.name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-extrabold text-slate-700 text-sm md:text-base group-hover:text-brand-magenta transition-colors">
                                {loc.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
