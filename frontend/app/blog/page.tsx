import BlogCard from "@/components/blog/BlogCard";
import { api } from "@/lib/api";

// This is now a Server Component with ISR
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogListPage() {
    let blogs = [];
    let error = null;

    try {
        blogs = await api.blogs.getAll();
    } catch (err) {
        console.error("Error fetching blogs:", err);
        error = "Failed to load blogs";
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-20">
            {/* Header */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-sky-600 font-black tracking-[0.3em] text-xs uppercase mb-4 block">
                        Our Knowledge Hub
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-dark leading-tight mb-6 uppercase tracking-tight">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">SCHOLARSHIP</span> BLOG
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
                        Expert advice, success stories, and latest updates on scholarships from across the globe.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {error ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-rose-400">{error}</h3>
                        </div>
                    ) : blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                            {blogs.map((blog: any, index: number) => (
                                <BlogCard key={blog._id} blog={blog} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-slate-400">No blogs found.</h3>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
