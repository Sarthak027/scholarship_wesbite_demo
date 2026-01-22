"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Edit2,
    X,
    Search,
    GraduationCap,
    Building2
} from "lucide-react";
import { api } from "@/lib/api";
import ImageUploader from "@/components/shared/ImageUploader";

interface University {
    _id: string;
    name: string;
    slug: string;
    availableCourses: string[];
    priceRange: string;
    bannerImage: string;
    order: number;
    isActive: boolean;
}

interface Course {
    _id: string;
    title: string;
    degree: string;
    specializations: string;
    scholarship: string;
    duration: string;
    image: string;
    universitySlug: string;
    order: number;
    isActive: boolean;
}

interface Props {
    onRefresh: () => void;
}

export default function OnlineCoursesManagementTab({ onRefresh }: Props) {
    const [activeView, setActiveView] = useState<'universities' | 'courses'>('universities');
    const [universities, setUniversities] = useState<University[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState<string>('all');

    // Modal states
    const [showUniversityModal, setShowUniversityModal] = useState(false);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    // Form states
    const [universityForm, setUniversityForm] = useState({
        name: '',
        slug: '',
        availableCourses: '',
        priceRange: '',
        bannerImage: '',
        order: 0,
        isActive: true
    });

    const [courseForm, setCourseForm] = useState({
        title: '',
        degree: '',
        specializations: '',
        scholarship: '',
        duration: '',
        image: '',
        universitySlug: '',
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
            const [uniData, courseData] = await Promise.all([
                api.onlineUniversities.getAllAdmin(token),
                api.onlineCourses.getAllAdmin(token)
            ]);
            setUniversities(uniData);
            setCourses(courseData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    // University handlers
    const handleUniversitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const formData = {
                ...universityForm,
                availableCourses: universityForm.availableCourses.split(',').map(c => c.trim()).filter(c => c)
            };

            if (editingUniversity) {
                await api.onlineUniversities.update(editingUniversity._id, formData, token);
            } else {
                await api.onlineUniversities.create(formData, token);
            }
            setShowUniversityModal(false);
            resetUniversityForm();
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error saving university:", error);
            alert("Error saving university");
        }
    };

    const handleDeleteUniversity = async (id: string) => {
        if (!confirm("Delete this university? All courses from this university will also be deleted!")) return;

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.onlineUniversities.delete(id, token);
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error deleting university:", error);
            alert("Error deleting university");
        }
    };

    const openEditUniversity = (university: University) => {
        setEditingUniversity(university);
        setUniversityForm({
            name: university.name,
            slug: university.slug,
            availableCourses: university.availableCourses.join(', '),
            priceRange: university.priceRange,
            bannerImage: university.bannerImage,
            order: university.order,
            isActive: university.isActive
        });
        setShowUniversityModal(true);
    };

    const resetUniversityForm = () => {
        setEditingUniversity(null);
        setUniversityForm({
            name: '',
            slug: '',
            availableCourses: '',
            priceRange: '',
            bannerImage: '',
            order: 0,
            isActive: true
        });
    };

    // Course handlers
    const handleCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            if (editingCourse) {
                await api.onlineCourses.update(editingCourse._id, courseForm, token);
            } else {
                await api.onlineCourses.create(courseForm, token);
            }
            setShowCourseModal(false);
            resetCourseForm();
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error saving course:", error);
            alert("Error saving course");
        }
    };

    const handleDeleteCourse = async (id: string) => {
        if (!confirm("Delete this course?")) return;

        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            await api.onlineCourses.delete(id, token);
            fetchData();
            onRefresh();
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Error deleting course");
        }
    };

    const openEditCourse = (course: Course) => {
        setEditingCourse(course);
        setCourseForm({
            title: course.title,
            degree: course.degree,
            specializations: course.specializations,
            scholarship: course.scholarship,
            duration: course.duration,
            image: course.image,
            universitySlug: course.universitySlug,
            order: course.order,
            isActive: course.isActive
        });
        setShowCourseModal(true);
    };

    const resetCourseForm = () => {
        setEditingCourse(null);
        setCourseForm({
            title: '',
            degree: '',
            specializations: '',
            scholarship: '',
            duration: '',
            image: '',
            universitySlug: universities[0]?.slug || '',
            order: 0,
            isActive: true
        });
    };

    // Filter courses
    const filteredCourses = courses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.degree.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUniversity = selectedUniversity === 'all' || c.universitySlug === selectedUniversity;
        return matchesSearch && matchesUniversity;
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
                    <h2 className="text-2xl md:text-3xl font-bold">Online Courses Management</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        {universities.length} Universities • {courses.length} Courses
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                    <button
                        onClick={() => setActiveView('universities')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeView === 'universities'
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <Building2 size={18} />
                        Universities
                    </button>
                    <button
                        onClick={() => setActiveView('courses')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeView === 'courses'
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <GraduationCap size={18} />
                        Courses
                    </button>
                </div>
            </div>

            {/* Universities View */}
            {activeView === 'universities' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => { resetUniversityForm(); setShowUniversityModal(true); }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                        >
                            <Plus size={20} />
                            Add University
                        </button>
                    </div>

                    <div className="grid gap-4">
                        {universities.map((university) => (
                            <div
                                key={university._id}
                                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-slate-800">{university.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${university.isActive
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {university.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-2">
                                            Price Range: <span className="font-semibold text-purple-600">{university.priceRange}</span>
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            {university.availableCourses.map((course, idx) => (
                                                <span key={idx} className="bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded-lg">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span>Slug: <code className="bg-slate-100 px-1.5 py-0.5 rounded">{university.slug}</code></span>
                                            <span>Courses: {courses.filter(c => c.universitySlug === university.slug).length}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEditUniversity(university)}
                                            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUniversity(university._id)}
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

            {/* Courses View */}
            {activeView === 'courses' && (
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-grow w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                />
                            </div>
                            {/* University Filter */}
                            <select
                                value={selectedUniversity}
                                onChange={(e) => setSelectedUniversity(e.target.value)}
                                className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            >
                                <option value="all">All Universities</option>
                                {universities.map(uni => (
                                    <option key={uni._id} value={uni.slug}>{uni.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => { resetCourseForm(); setShowCourseModal(true); }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all w-full md:w-auto justify-center"
                        >
                            <Plus size={20} />
                            Add Course
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[900px]">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-600">Course</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Degree</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Scholarship</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">University</th>
                                        <th className="px-6 py-4 font-bold text-slate-600">Status</th>
                                        <th className="px-6 py-4 font-bold text-slate-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredCourses.length > 0 ? (
                                        filteredCourses.map((course) => (
                                            <tr key={course._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-800">{course.title}</p>
                                                    <p className="text-xs text-slate-400">{course.duration}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-lg">
                                                        {course.degree}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{course.scholarship}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-slate-500">
                                                        {universities.find(u => u.slug === course.universitySlug)?.name || course.universitySlug}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${course.isActive
                                                        ? 'bg-emerald-50 text-emerald-600'
                                                        : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {course.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openEditCourse(course)}
                                                            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCourse(course._id)}
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
                                                No courses found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* University Modal */}
            {showUniversityModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                {editingUniversity ? 'Edit University' : 'Add New University'}
                            </h3>
                            <button
                                onClick={() => setShowUniversityModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUniversitySubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={universityForm.name}
                                    onChange={(e) => setUniversityForm({ ...universityForm, name: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={universityForm.slug}
                                    onChange={(e) => setUniversityForm({ ...universityForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Available Courses (comma separated)</label>
                                <input
                                    type="text"
                                    value={universityForm.availableCourses}
                                    onChange={(e) => setUniversityForm({ ...universityForm, availableCourses: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="MBA, BBA, MCA, BCA"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Price Range</label>
                                <input
                                    type="text"
                                    value={universityForm.priceRange}
                                    onChange={(e) => setUniversityForm({ ...universityForm, priceRange: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="₹ 20,000 - 65,000"
                                    required
                                />
                            </div>
                            <div>
                                <ImageUploader
                                    label="Banner Image"
                                    value={universityForm.bannerImage}
                                    onChange={(url) => setUniversityForm({ ...universityForm, bannerImage: url })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={universityForm.order}
                                        onChange={(e) => setUniversityForm({ ...universityForm, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-8">
                                    <input
                                        type="checkbox"
                                        id="universityActive"
                                        checked={universityForm.isActive}
                                        onChange={(e) => setUniversityForm({ ...universityForm, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300"
                                    />
                                    <label htmlFor="universityActive" className="text-sm font-semibold text-slate-700">Active</label>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowUniversityModal(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
                                >
                                    {editingUniversity ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Course Modal */}
            {showCourseModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                {editingCourse ? 'Edit Course' : 'Add New Course'}
                            </h3>
                            <button
                                onClick={() => setShowCourseModal(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCourseSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                                <input
                                    type="text"
                                    value={courseForm.title}
                                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="ONLINE | MBA"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Degree</label>
                                    <input
                                        type="text"
                                        value={courseForm.degree}
                                        onChange={(e) => setCourseForm({ ...courseForm, degree: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="MBA, BBA, MCA..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={courseForm.duration}
                                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="2 YEARS"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">University</label>
                                <select
                                    value={courseForm.universitySlug}
                                    onChange={(e) => setCourseForm({ ...courseForm, universitySlug: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    required
                                >
                                    <option value="">Select University</option>
                                    {universities.map(uni => (
                                        <option key={uni._id} value={uni.slug}>{uni.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Specializations</label>
                                <input
                                    type="text"
                                    value={courseForm.specializations}
                                    onChange={(e) => setCourseForm({ ...courseForm, specializations: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Finance, Marketing, HR..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Scholarship</label>
                                <input
                                    type="text"
                                    value={courseForm.scholarship}
                                    onChange={(e) => setCourseForm({ ...courseForm, scholarship: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Scholarship- Guaranteed ₹50,000*"
                                    required
                                />
                            </div>
                            <div>
                                <ImageUploader
                                    label="Course Image"
                                    value={courseForm.image}
                                    onChange={(url) => setCourseForm({ ...courseForm, image: url })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Order</label>
                                    <input
                                        type="number"
                                        value={courseForm.order}
                                        onChange={(e) => setCourseForm({ ...courseForm, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-8">
                                    <input
                                        type="checkbox"
                                        id="courseActive"
                                        checked={courseForm.isActive}
                                        onChange={(e) => setCourseForm({ ...courseForm, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300"
                                    />
                                    <label htmlFor="courseActive" className="text-sm font-semibold text-slate-700">Active</label>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCourseModal(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
                                >
                                    {editingCourse ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
