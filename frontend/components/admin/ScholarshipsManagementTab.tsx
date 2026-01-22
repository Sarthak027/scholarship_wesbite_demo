"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Edit2,
    X,
    Check,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    FolderOpen,
    Search
} from "lucide-react";
import { api } from "@/lib/api";
import ImageUploader from "@/components/shared/ImageUploader";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    banner: string;
    order: number;
    isActive: boolean;
}

interface Scholarship {
    _id: string;
    college: string;
    location: string;
    scholarship: string;
    course: string;
    image: string;
    categorySlug: string;
    sectionTitle: string;
    order: number;
    isActive: boolean;
}

interface Props {
    onRefresh: () => void;
}

export default function ScholarshipsManagementTab({ onRefresh }: Props) {
    const [activeView, setActiveView] = useState<'categories' | 'scholarships'>('categories');
    const [categories, setCategories] = useState<Category[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Modal states
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showScholarshipModal, setShowScholarshipModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);

    // Form states
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        slug: '',
        description: '',
        banner: '',
        order: 0,
        isActive: true
    });

    const [scholarshipForm, setScholarshipForm] = useState({
        college: '',
        location: '',
        scholarship: '',
        course: '',
        image: '',
        categorySlug: '',
        sectionTitle: '',
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const [catData, schData] = await Promise.all([
                api.categories.getAllAdmin(token),
                api.scholarships.getAllAdmin(token)
            ]);
            setCategories(catData);
            setScholarships(schData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    // Category handlers
    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            if (editingCategory) {
                await api.categories.update(editingCategory._id, categoryForm, token);
            } else {
                await api.categories.create(categoryForm, token);
            }
            setShowCategoryModal(false);
            resetCategoryForm();
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error saving category");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Delete this category? All scholarships in this category will also be deleted!")) return;

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.categories.delete(id, token);
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category");
        }
    };

    const openEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryForm({
            name: category.name,
            slug: category.slug,
            description: category.description,
            banner: category.banner,
            order: category.order,
            isActive: category.isActive
        });
        setShowCategoryModal(true);
    };

    const resetCategoryForm = () => {
        setEditingCategory(null);
        setCategoryForm({
            name: '',
            slug: '',
            description: '',
            banner: '',
            order: 0,
            isActive: true
        });
    };

    // Scholarship handlers
    const handleScholarshipSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            if (editingScholarship) {
                await api.scholarships.update(editingScholarship._id, scholarshipForm, token);
            } else {
                await api.scholarships.create(scholarshipForm, token);
            }
            setShowScholarshipModal(false);
            resetScholarshipForm();
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error saving scholarship:", error);
            alert("Error saving scholarship");
        }
    };

    const handleDeleteScholarship = async (id: string) => {
        if (!confirm("Delete this scholarship?")) return;

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.scholarships.delete(id, token);
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error deleting scholarship:", error);
            alert("Error deleting scholarship");
        }
    };

    const openEditScholarship = (scholarship: Scholarship) => {
        setEditingScholarship(scholarship);
        setScholarshipForm({
            college: scholarship.college,
            location: scholarship.location,
            scholarship: scholarship.scholarship,
            course: scholarship.course,
            image: scholarship.image,
            categorySlug: scholarship.categorySlug,
            sectionTitle: scholarship.sectionTitle,
            order: scholarship.order,
            isActive: scholarship.isActive
        });
        setShowScholarshipModal(true);
    };

    const resetScholarshipForm = () => {
        setEditingScholarship(null);
        setScholarshipForm({
            college: '',
            location: '',
            scholarship: '',
            course: '',
            image: '',
            categorySlug: categories[0]?.slug || '',
            sectionTitle: '',
            order: 0,
            isActive: true
        });
    };

    // Filter scholarships
    const filteredScholarships = scholarships.filter(s => {
        const matchesSearch = s.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || s.categorySlug === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Scholarships Management</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        {categories.length} Categories • {scholarships.length} Scholarships
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                    <button
                        onClick={() => setActiveView('categories')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeView === 'categories'
                            ? 'bg-white text-sky-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <FolderOpen size={18} />
                        Categories
                    </button>
                    <button
                        onClick={() => setActiveView('scholarships')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeView === 'scholarships'
                            ? 'bg-white text-sky-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <GraduationCap size={18} />
                        Scholarships
                    </button>
                </div>
            </div>

            {/* Categories View */}
            {activeView === 'categories' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => { resetCategoryForm(); setShowCategoryModal(true); }}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                        >
                            <Plus size={20} />
                            Add Category
                        </button>
                    </div>

                    <div className="grid gap-4">
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-slate-800">{category.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${category.isActive
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-2">{category.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span>Slug: <code className="bg-slate-100 px-1.5 py-0.5 rounded">{category.slug}</code></span>
                                            <span>Order: {category.order}</span>
                                            <span>
                                                Scholarships: {scholarships.filter(s => s.categorySlug === category.slug).length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEditCategory(category)}
                                            className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category._id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Scholarships View */}
            {activeView === 'scholarships' && (
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-grow w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search scholarships..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                                />
                            </div>
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => { resetScholarshipForm(); setShowScholarshipModal(true); }}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all w-full md:w-auto justify-center"
                        >
                            <Plus size={20} />
                            Add Scholarship
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[900px]">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-600">College</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Course</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Scholarship</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Category</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                                        <th className="px-6 py-4 font-bold text-slate-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredScholarships.length > 0 ? (
                                        filteredScholarships.map((scholarship) => (
                                            <tr key={scholarship._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-800">{scholarship.college}</p>
                                                    <p className="text-xs text-slate-400">{scholarship.location}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-lg">
                                                        {scholarship.course}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{scholarship.scholarship}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-slate-500">
                                                        {categories.find(c => c.slug === scholarship.categorySlug)?.name || scholarship.categorySlug}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${scholarship.isActive
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {scholarship.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditScholarship(scholarship)}
                                                            className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteScholarship(scholarship._id)}
                                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                                No scholarships found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={categoryForm.slug}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <ImageUploader
                                    label="Banner Image"
                                    value={categoryForm.banner}
                                    onChange={(url) => setCategoryForm({ ...categoryForm, banner: url })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={categoryForm.order}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-8">
                                    <input
                                        type="checkbox"
                                        id="categoryActive"
                                        checked={categoryForm.isActive}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300"
                                    />
                                    <label htmlFor="categoryActive" className="text-sm font-semibold text-slate-700">Active</label>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all"
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Scholarship Modal */}
            {showScholarshipModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
                            </h3>
                            <button
                                onClick={() => setShowScholarshipModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleScholarshipSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">College Name</label>
                                <input
                                    type="text"
                                    value={scholarshipForm.college}
                                    onChange={(e) => setScholarshipForm({ ...scholarshipForm, college: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={scholarshipForm.location}
                                    onChange={(e) => setScholarshipForm({ ...scholarshipForm, location: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    placeholder="City, India"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                                    <input
                                        type="text"
                                        value={scholarshipForm.course}
                                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, course: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                        placeholder="MBA, B.Tech, etc."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                    <select
                                        value={scholarshipForm.categorySlug}
                                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, categorySlug: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                                <input
                                    type="text"
                                    value={scholarshipForm.sectionTitle}
                                    onChange={(e) => setScholarshipForm({ ...scholarshipForm, sectionTitle: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    placeholder="MBA Scholarships, B.Tech Scholarships, etc."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Scholarship Amount</label>
                                <input
                                    type="text"
                                    value={scholarshipForm.scholarship}
                                    onChange={(e) => setScholarshipForm({ ...scholarshipForm, scholarship: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    placeholder="Scholarship- Guaranteed ₹50,000*"
                                    required
                                />
                            </div>
                            <div>
                                <ImageUploader
                                    label="Scholarship Image"
                                    value={scholarshipForm.image}
                                    onChange={(url) => setScholarshipForm({ ...scholarshipForm, image: url })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={scholarshipForm.order}
                                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-8">
                                    <input
                                        type="checkbox"
                                        id="scholarshipActive"
                                        checked={scholarshipForm.isActive}
                                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300"
                                    />
                                    <label htmlFor="scholarshipActive" className="text-sm font-semibold text-slate-700">Active</label>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowScholarshipModal(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all"
                                >
                                    {editingScholarship ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
