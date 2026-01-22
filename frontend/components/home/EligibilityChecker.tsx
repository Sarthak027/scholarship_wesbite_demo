"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Award,
    GraduationCap,
    Calculator,
    User,
    AlertCircle
} from "lucide-react";
import { api } from "@/lib/api";

// Course options
const courseOptions = [
    { id: "mba", label: "MBA" },
    { id: "pgdm", label: "PGDM" },
    { id: "btech", label: "B.Tech" },
    { id: "bba", label: "BBA" },
    { id: "bca", label: "BCA" },
    { id: "mca", label: "MCA" }
];

// Entrance exams by course
const entranceExamsByCourse: Record<string, string[]> = {
    mba: ["CAT", "MAT", "XAT", "CMAT", "ATMA", "GMAT", "Direct Admission"],
    pgdm: ["CAT", "MAT", "XAT", "CMAT", "ATMA", "GMAT", "Direct Admission"],
    btech: ["JEE Main", "JEE Advanced", "State CET", "BITSAT", "Direct Admission"],
    bba: ["IPMAT", "SET", "NPAT", "CUET", "Direct Admission"],
    bca: ["CUET", "State CET", "Direct Admission"],
    mca: ["NIMCET", "CUET PG", "State MCA CET", "Direct Admission"]
};

// Bracket type interface
interface Bracket {
    minPercentile: number;
    maxPercentile: number;
    rewardAmount: number;
    label: string;
}

interface CourseBracket {
    course: string;
    year: number;
    brackets: Bracket[];
}

// Default scholarship brackets (fallback)
const defaultBrackets: Bracket[] = [
    { minPercentile: 95, maxPercentile: 100, rewardAmount: 600000, label: "95 - 100%" },
    { minPercentile: 90, maxPercentile: 94.99, rewardAmount: 400000, label: "90 - 94.99%" },
    { minPercentile: 85, maxPercentile: 89.99, rewardAmount: 250000, label: "85 - 89.99%" },
    { minPercentile: 75, maxPercentile: 84.99, rewardAmount: 100000, label: "75 - 84.99%" },
    { minPercentile: 0, maxPercentile: 74.99, rewardAmount: 50000, label: "Below 75%" }
];

// Calculate scholarship based on exam score and brackets
const calculateScholarshipFromBrackets = (score: number, brackets: Bracket[]): number => {
    for (const bracket of brackets) {
        if (score >= bracket.minPercentile && score <= bracket.maxPercentile) {
            return bracket.rewardAmount;
        }
    }
    return 50000; // Default minimum
};

// Generate motivational message
const generateMotivationalMessage = (score: number, course: string, reward: number): string => {
    const courseLabel = courseOptions.find(c => c.id === course)?.label || course.toUpperCase();
    const rewardFormatted = reward.toLocaleString('en-IN');

    if (score >= 90) {
        return `Congratulations on your impressive ${score} score and ₹${rewardFormatted} scholarship! Your academic excellence sets a strong foundation for ${courseLabel === 'B.Tech' ? 'an engineering career' : `an ${courseLabel}`}. By choosing our program, you will leverage an industry-aligned curriculum that bridges the gap between theory and practice. Their robust placement support ensures you transition smoothly into high-impact roles. Focus on networking and specialized skill development to maximize this opportunity and accelerate your journey toward becoming a visionary business leader. Your potential is limitless; keep striving for excellence.`;
    } else if (score >= 80) {
        return `Great job on achieving a ${score} score! With your ₹${rewardFormatted} scholarship for ${courseLabel}, you're well-positioned for success. Our comprehensive curriculum and industry partnerships will help you develop the skills needed for your dream career. Stay focused, engage with mentors, and make the most of every opportunity that comes your way.`;
    } else {
        return `Your ${score} score has earned you a ₹${rewardFormatted} scholarship for ${courseLabel}! This is a fantastic start to your academic journey. Our program offers excellent faculty, practical learning experiences, and career guidance to help you excel. Embrace this opportunity to grow and achieve your goals.`;
    }
};

export default function EligibilityChecker() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        course: "",
        tenthMarks: "",
        twelfthMarks: "",
        graduationMarks: "",
        entranceExam: "",
        examScore: "",
        fullName: "",
        mobileNumber: "",
        email: ""
    });

    const [calculatedReward, setCalculatedReward] = useState(0);
    const [courseBrackets, setCourseBrackets] = useState<Bracket[]>(defaultBrackets);
    const [bracketYear, setBracketYear] = useState(2026);
    const [allBrackets, setAllBrackets] = useState<CourseBracket[]>([]);

    // Fetch all brackets on mount
    useEffect(() => {
        const fetchBrackets = async () => {
            try {
                const data = await api.brackets.getAll();
                setAllBrackets(data);
            } catch (error) {
                console.error("Failed to fetch brackets:", error);
            }
        };
        fetchBrackets();
    }, []);

    // Update brackets when course changes
    useEffect(() => {
        if (formData.course && allBrackets.length > 0) {
            const courseBracketData = allBrackets.find(b => b.course === formData.course);
            if (courseBracketData) {
                setCourseBrackets(courseBracketData.brackets);
                setBracketYear(courseBracketData.year);
            }
        }
    }, [formData.course, allBrackets]);

    // Calculate reward when exam score or course brackets change
    useEffect(() => {
        if (formData.examScore) {
            const score = parseFloat(formData.examScore);
            if (!isNaN(score)) {
                setCalculatedReward(calculateScholarshipFromBrackets(score, courseBrackets));
            }
        }
    }, [formData.examScore, courseBrackets]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSubmitError("");
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 1:
                return !!formData.course;
            case 2:
                return !!formData.tenthMarks && !!formData.twelfthMarks;
            case 3:
                return !!formData.entranceExam && !!formData.examScore;
            case 4:
                return true;
            case 5:
                return !!formData.fullName && !!formData.mobileNumber && !!formData.email;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (canProceed() && currentStep < 6) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!canProceed()) return;

        setIsSubmitting(true);
        setSubmitError("");

        try {
            await api.eligibility.submit({
                fullName: formData.fullName,
                mobileNumber: formData.mobileNumber,
                email: formData.email,
                course: formData.course,
                tenthMarks: parseFloat(formData.tenthMarks),
                twelfthMarks: parseFloat(formData.twelfthMarks),
                graduationMarks: formData.graduationMarks ? parseFloat(formData.graduationMarks) : undefined,
                entranceExam: formData.entranceExam,
                examScore: parseFloat(formData.examScore),
                calculatedReward: calculatedReward
            });

            setIsSubmitted(true);
            setCurrentStep(6);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {/* Step 1: Course Selection */}
                {currentStep === 1 && (
                    <StepContainer key="step1">
                        <StepHeader
                            step={1}
                            title="Academic Profile"
                            subtitle={`Select your course category to find eligible scholarships for ${bracketYear}.`}
                        />

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {courseOptions.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => handleInputChange("course", course.id)}
                                    className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${formData.course === course.id
                                        ? "bg-brand-deep-navy text-white shadow-lg"
                                        : "bg-white text-slate-700 border-2 border-slate-200 hover:border-brand-navy"
                                        }`}
                                >
                                    {course.label}
                                </button>
                            ))}
                        </div>

                        <NavigationButtons
                            onNext={handleNext}
                            canProceed={canProceed()}
                            showBack={false}
                        />
                    </StepContainer>
                )}

                {/* Step 2: Academic Marks */}
                {currentStep === 2 && (
                    <StepContainer key="step2">
                        <StepHeader
                            step={2}
                            title="Enter Your Marks"
                            subtitle="Provide your academic scores for eligibility assessment."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    10th Marks (%) *
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 85"
                                    value={formData.tenthMarks}
                                    onChange={(e) => handleInputChange("tenthMarks", e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    12th Marks (%) *
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 82"
                                    value={formData.twelfthMarks}
                                    onChange={(e) => handleInputChange("twelfthMarks", e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Graduation (%)
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 78"
                                    value={formData.graduationMarks}
                                    onChange={(e) => handleInputChange("graduationMarks", e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>

                        <NavigationButtons
                            onNext={handleNext}
                            onBack={handleBack}
                            canProceed={canProceed()}
                        />
                    </StepContainer>
                )}

                {/* Step 3: Entrance Exam Details */}
                {currentStep === 3 && (
                    <StepContainer key="step3">
                        <div className="bg-brand-deep-navy rounded-xl p-6 mb-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                                Entrance Exam Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Select Exam
                                    </label>
                                    <select
                                        value={formData.entranceExam}
                                        onChange={(e) => handleInputChange("entranceExam", e.target.value)}
                                        className="w-full px-4 py-3 bg-white text-slate-800 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-brand-magenta"
                                    >
                                        <option value="">Select Exam</option>
                                        {(entranceExamsByCourse[formData.course] || []).map((exam) => (
                                            <option key={exam} value={exam}>{exam}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        {formData.entranceExam ? `${formData.entranceExam} Score/Percentile` : "Score/Percentile"}
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={formData.examScore}
                                        onChange={(e) => handleInputChange("examScore", e.target.value)}
                                        className="w-full px-4 py-3 bg-white text-slate-800 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-brand-magenta"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                            className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${canProceed()
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-brand-deep-navy shadow-lg hover:shadow-xl"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            View Scholarship Reward
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <button
                            onClick={handleBack}
                            className="w-full mt-3 py-2 text-slate-500 font-medium text-sm hover:text-brand-navy transition-colors"
                        >
                            ← Go Back
                        </button>
                    </StepContainer>
                )}

                {/* Step 4: Reward Display */}
                {currentStep === 4 && (
                    <StepContainer key="step4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-emerald-600" />
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 mb-2">Your Calculated Reward</h2>
                            <p className="text-slate-500 mb-8">Based on your academic & {formData.entranceExam} profile</p>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="bg-gradient-to-r from-brand-deep-navy to-slate-900 rounded-2xl p-8 mb-6"
                            >
                                <div className="text-5xl md:text-6xl font-black text-white mb-3">
                                    ₹{calculatedReward.toLocaleString('en-IN')}
                                </div>
                                <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Scholarship Approved
                                </span>
                            </motion.div>

                            <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-yellow-400 text-brand-deep-navy text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        💡 Career Insight
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed italic">
                                    "{generateMotivationalMessage(parseFloat(formData.examScore), formData.course, calculatedReward)}"
                                </p>
                                <div className="flex gap-2 mt-4">
                                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">#Explore</span>
                                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">#Engage</span>
                                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">#Prepare</span>
                                </div>
                            </div>

                            <motion.button
                                onClick={handleNext}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-brand-deep-navy text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                Claim This Scholarship
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            <button
                                onClick={handleBack}
                                className="w-full mt-4 py-2 text-slate-400 font-medium text-sm hover:text-brand-magenta transition-colors underline"
                            >
                                Wait, I made a mistake in my scores
                            </button>
                        </div>
                    </StepContainer>
                )}

                {/* Step 5: User Details Form */}
                {currentStep === 5 && (
                    <StepContainer key="step5">
                        <div className="text-center mb-8">
                            <span className="inline-block bg-yellow-400 text-brand-deep-navy text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                                Verification Required
                            </span>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Lock Your Reward</h2>
                            <p className="text-slate-500 text-sm">
                                Enter your details to generate your official scholarship certificate and start your application.
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Mobile Number
                                </label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-lg text-slate-500 font-medium">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="XXXXX XXXXX"
                                        value={formData.mobileNumber}
                                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-r-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Official Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-navy focus:outline-none transition-colors font-medium"
                                />
                            </div>
                        </div>

                        {submitError && (
                            <div className="flex items-center gap-2 text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                {submitError}
                            </div>
                        )}

                        <motion.button
                            onClick={handleSubmit}
                            disabled={!canProceed() || isSubmitting}
                            whileHover={{ scale: canProceed() && !isSubmitting ? 1.02 : 1 }}
                            whileTap={{ scale: canProceed() && !isSubmitting ? 0.98 : 1 }}
                            className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${canProceed() && !isSubmitting
                                ? "bg-brand-deep-navy text-white shadow-lg hover:shadow-xl"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Apply Now & Get Certificate
                                </>
                            )}
                        </motion.button>

                        <p className="text-xs text-slate-400 text-center mt-4">
                            By applying, you agree to receive scholarship alerts and admission guidance via WhatsApp, Email & Calls.
                        </p>

                        <button
                            onClick={handleBack}
                            className="w-full mt-3 py-2 text-slate-500 font-medium text-sm hover:text-brand-navy transition-colors"
                        >
                            ← Go Back
                        </button>
                    </StepContainer>
                )}

                {/* Step 6: Scholarship Brackets (Success) */}
                {currentStep === 6 && (
                    <StepContainer key="step6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Application Submitted!</h2>
                            <p className="text-slate-500 text-sm">
                                Your scholarship of <span className="font-bold text-brand-magenta">₹{calculatedReward.toLocaleString('en-IN')}</span> has been confirmed.
                            </p>
                        </div>

                        {/* Scholarship Brackets */}
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-center mb-2">Scholarship Brackets {bracketYear}</h3>
                            <p className="text-slate-500 text-sm text-center mb-6">
                                We reward academic excellence. Check the criteria for your specific field of study.
                            </p>

                            {/* Course Tabs */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {courseOptions.map((course) => (
                                    <span
                                        key={course.id}
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${formData.course === course.id
                                            ? "bg-brand-deep-navy text-white"
                                            : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {course.label}
                                    </span>
                                ))}
                            </div>

                            {/* Brackets Table */}
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <div className="grid grid-cols-2 bg-slate-50 px-6 py-3 border-b">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Percentile Range</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Scholarship Reward</span>
                                </div>
                                {courseBrackets.map((bracket, index) => (
                                    <div
                                        key={index}
                                        className={`grid grid-cols-2 px-6 py-4 border-b last:border-0 ${calculatedReward === bracket.rewardAmount ? "bg-yellow-50" : ""
                                            }`}
                                    >
                                        <span className="flex items-center gap-2 text-slate-700 font-medium">
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                                            {bracket.label}
                                        </span>
                                        <span className={`text-right font-black ${calculatedReward === bracket.rewardAmount ? "text-brand-magenta" : "text-slate-900"
                                            }`}>
                                            ₹{bracket.rewardAmount.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Urgency Banner */}
                            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 mt-4 text-center">
                                <p className="text-brand-deep-navy font-bold text-sm">🔥 Seats are filling fast!</p>
                                <p className="text-brand-deep-navy/70 text-xs">
                                    Scholarships are awarded on a first-come, first-served basis. Secure your spot today.
                                </p>
                            </div>
                        </div>

                        {/* Future Support Section */}
                        <div className="bg-slate-900 rounded-xl p-8 text-center">
                            <h3 className="text-2xl font-black text-white mb-3">Your Future, Our Support!</h3>
                            <p className="text-slate-400 text-sm max-w-md mx-auto">
                                Don't let financial barriers stop you from achieving your dreams. Join over 10,000+ students who have transformed their careers with us.
                            </p>
                        </div>
                    </StepContainer>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper Components
function StepContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 border border-slate-100"
        >
            {children}
        </motion.div>
    );
}

function StepHeader({ step, title, subtitle }: { step: number; title: string; subtitle: string }) {
    return (
        <div className="text-center mb-8">
            <span className="inline-block text-brand-magenta text-xs font-bold uppercase tracking-wider mb-2">
                Step {step}: {title}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Check Your Worth</h2>
            <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
    );
}

function NavigationButtons({
    onNext,
    onBack,
    canProceed,
    showBack = true
}: {
    onNext: () => void;
    onBack?: () => void;
    canProceed: boolean;
    showBack?: boolean;
}) {
    return (
        <div className="flex gap-3">
            {showBack && onBack && (
                <button
                    onClick={onBack}
                    className="flex-1 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            )}
            <motion.button
                onClick={onNext}
                disabled={!canProceed}
                whileHover={{ scale: canProceed ? 1.02 : 1 }}
                whileTap={{ scale: canProceed ? 0.98 : 1 }}
                className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${canProceed
                    ? "bg-brand-deep-navy text-white shadow-lg hover:shadow-xl"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
            >
                Continue
                <ArrowRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
}
