"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, RefreshCw, AlertCircle, Check } from "lucide-react";
import { api } from "@/lib/api";

interface Bracket {
    minPercentile: number;
    maxPercentile: number;
    rewardAmount: number;
    label: string;
}

interface CourseBracket {
    _id: string;
    course: string;
    year: number;
    brackets: Bracket[];
    isActive: boolean;
}

const courseLabels: Record<string, string> = {
    mba: "MBA",
    pgdm: "PGDM",
    btech: "B.Tech",
    bba: "BBA",
    bca: "BCA",
    mca: "MCA"
};

interface ScholarshipBracketsTabProps {
    onRefresh: () => void;
}

export default function ScholarshipBracketsTab({ onRefresh }: ScholarshipBracketsTabProps) {
    const [brackets, setBrackets] = useState<CourseBracket[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("mba");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingBrackets, setEditingBrackets] = useState<Bracket[]>([]);
    const [editingYear, setEditingYear] = useState(2026);

    useEffect(() => {
        fetchBrackets();
    }, []);

    useEffect(() => {
        const courseBracket = brackets.find(b => b.course === selectedCourse);
        if (courseBracket) {
            setEditingBrackets([...courseBracket.brackets]);
            setEditingYear(courseBracket.year);
        }
    }, [selectedCourse, brackets]);

    const fetchBrackets = async () => {
        try {
            setLoading(true);
            const data = await api.brackets.getAll();
            setBrackets(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch brackets:", err);
            setError("Failed to load brackets");
            setLoading(false);
        }
    };

    const handleBracketChange = (index: number, field: keyof Bracket, value: string | number) => {
        const updated = [...editingBrackets];
        if (field === "label") {
            updated[index][field] = value as string;
        } else {
            updated[index][field] = Number(value);
        }
        setEditingBrackets(updated);
    };

    const addBracket = () => {
        setEditingBrackets([
            ...editingBrackets,
            { minPercentile: 0, maxPercentile: 100, rewardAmount: 0, label: "New Range" }
        ]);
    };

    const removeBracket = (index: number) => {
        setEditingBrackets(editingBrackets.filter((_, i) => i !== index));
    };

    const saveBrackets = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await api.brackets.update(selectedCourse, {
                brackets: editingBrackets,
                year: editingYear
            }, token);

            setSuccess("Brackets saved successfully!");
            fetchBrackets();
            onRefresh();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Failed to save brackets:", err);
            setError("Failed to save brackets. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const initializeAllBrackets = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        if (!confirm("This will reset ALL course brackets to default values. Are you sure?")) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            await api.brackets.initialize(token);
            setSuccess("All brackets reset to default!");
            fetchBrackets();
            onRefresh();
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Failed to initialize brackets:", err);
            setError("Failed to reset brackets. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Scholarship Brackets</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage scholarship reward percentages for each course
                    </p>
                </div>
                <button
                    onClick={initializeAllBrackets}
                    disabled={saving}
                    className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all w-full md:w-auto disabled:opacity-50"
                >
                    <RefreshCw size={18} className={saving ? "animate-spin" : ""} />
                    Reset All to Default
                </button>
            </div>

            {/* Alerts */}
            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <Check size={20} />
                    {success}
                </div>
            )}

            {/* Course Tabs */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(courseLabels).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedCourse(key)}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${selectedCourse === key
                            ? "bg-sky-primary text-white shadow-lg"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-sky-primary"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Year Setting */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <label className="text-sm font-bold text-slate-600">Scholarship Year:</label>
                    <input
                        type="number"
                        value={editingYear}
                        onChange={(e) => setEditingYear(Number(e.target.value))}
                        className="px-4 py-2 border border-slate-200 rounded-lg w-32 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        min="2020"
                        max="2030"
                    />
                </div>

                <h3 className="font-bold text-lg mb-4 text-slate-800">
                    {courseLabels[selectedCourse]} Brackets
                </h3>

                {/* Brackets Table */}
                <div className="overflow-x-auto -mx-4 md:mx-0">
                    <div className="inline-block min-w-full align-middle p-2">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-2 md:px-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Label</th>
                                    <th className="text-left py-3 px-2 md:px-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Min %</th>
                                    <th className="text-left py-3 px-2 md:px-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Max %</th>
                                    <th className="text-left py-3 px-2 md:px-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Reward (₹)</th>
                                    <th className="text-right py-3 px-2 md:px-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editingBrackets.map((bracket, index) => (
                                    <tr key={index} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="py-3 px-2 md:px-4">
                                            <input
                                                type="text"
                                                value={bracket.label}
                                                onChange={(e) => handleBracketChange(index, "label", e.target.value)}
                                                className="w-full min-w-[100px] px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-sm"
                                                placeholder="e.g., 95 - 100%"
                                            />
                                        </td>
                                        <td className="py-3 px-2 md:px-4">
                                            <input
                                                type="number"
                                                value={bracket.minPercentile}
                                                onChange={(e) => handleBracketChange(index, "minPercentile", e.target.value)}
                                                className="w-16 md:w-20 px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-sm"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                            />
                                        </td>
                                        <td className="py-3 px-2 md:px-4">
                                            <input
                                                type="number"
                                                value={bracket.maxPercentile}
                                                onChange={(e) => handleBracketChange(index, "maxPercentile", e.target.value)}
                                                className="w-16 md:w-20 px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-sm"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                            />
                                        </td>
                                        <td className="py-3 px-2 md:px-4">
                                            <input
                                                type="number"
                                                value={bracket.rewardAmount}
                                                onChange={(e) => handleBracketChange(index, "rewardAmount", e.target.value)}
                                                className="w-24 md:w-32 px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-brand-magenta text-sm"
                                                min="0"
                                                step="1000"
                                            />
                                        </td>
                                        <td className="py-3 px-2 md:px-4 text-right">
                                            <button
                                                onClick={() => removeBracket(index)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Bracket Button */}
                <button
                    onClick={addBracket}
                    className="mt-4 flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm"
                >
                    <Plus size={18} />
                    Add New Bracket
                </button>
            </div>

            {/* Save Button */}
            <button
                onClick={saveBrackets}
                disabled={saving}
                className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
            >
                {saving ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save size={18} />
                        Save {courseLabels[selectedCourse]} Brackets
                    </>
                )}
            </button>

            {/* Preview */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="font-bold text-slate-700 mb-4">Preview (How it will appear to users)</h4>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden max-w-md">
                    <div className="bg-slate-100 px-6 py-3 border-b">
                        <h5 className="font-black text-center">Scholarship Brackets {editingYear}</h5>
                    </div>
                    <div className="grid grid-cols-2 bg-slate-50 px-6 py-3 border-b">
                        <span className="text-xs font-bold text-slate-500 uppercase">Range</span>
                        <span className="text-xs font-bold text-slate-500 uppercase text-right">Reward</span>
                    </div>
                    {editingBrackets.map((bracket, index) => (
                        <div key={index} className="grid grid-cols-2 px-6 py-3 border-b last:border-0">
                            <span className="flex items-center gap-2 text-slate-700 font-medium">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                                {bracket.label}
                            </span>
                            <span className="text-right font-black text-slate-900">
                                ₹{bracket.rewardAmount.toLocaleString('en-IN')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
