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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-brand-magenta font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-brand-magenta/5 inline-block px-6 py-2 rounded-full">
                        Best Locations
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
                        Find Your <span className="text-brand-magenta">Perfect Hub</span>
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {locations.map((loc) => (
                        <div
                            key={loc.name}
                            className="bg-white px-4 py-8 rounded-2xl soft-shadow hover:shadow-2xl hover:border-brand-magenta/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 group cursor-pointer border border-slate-50 relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-magenta/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-brand-magenta/10 transition-colors duration-500" />
                            <div className="relative w-16 h-16 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                                <Image
                                    src={loc.icon}
                                    alt={loc.name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-extrabold text-slate-700 text-base group-hover:text-brand-magenta transition-colors">
                                {loc.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
