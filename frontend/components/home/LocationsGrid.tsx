import { Building2, Landmark, Mountain, MapPin, School, Castle } from "lucide-react";

const locations = [
    { name: "Bangalore", icon: Building2 },
    { name: "Delhi NCR", icon: Landmark },
    { name: "Pune", icon: School },
    { name: "Shillong", icon: Mountain },
    { name: "Guwahati", icon: Castle }, // Temple/Castle
    { name: "Jaipur", icon: Castle },
    { name: "Indore", icon: Building2 },
    { name: "Vadodara", icon: MapPin },
];

export default function LocationsGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-sky-600 font-extrabold text-sm uppercase tracking-[0.3em] mb-4 bg-sky-50 inline-block px-6 py-2 rounded-full">
                        Best Locations
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-dark">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Perfect Hub</span>
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {locations.map((loc) => (
                        <div
                            key={loc.name}
                            className="bg-white px-8 py-10 rounded-2xl soft-shadow hover:shadow-2xl hover:border-sky-100 transition-all duration-300 flex flex-col items-center justify-center gap-6 group cursor-pointer border border-slate-50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-sky-50/50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-sky-200/50 transition-colors duration-500" />
                            <loc.icon
                                strokeWidth={1.5}
                                className="w-14 h-14 text-slate-400 group-hover:text-sky-500 group-hover:scale-110 transition-all duration-500"
                            />
                            <span className="font-extrabold text-slate-700 text-lg group-hover:text-sky-600 transition-colors">
                                {loc.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
