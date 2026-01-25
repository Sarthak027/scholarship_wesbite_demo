import ScholarshipHero from "@/components/scholarships/ScholarshipHero";
import ScholarshipCards from "@/components/scholarships/ScholarshipCards";

export const metadata = {
    title: "Scholarships | Confirm Scholarship",
    description: "Explore a wide range of scholarships for Management, Engineering, Computer Application, and more.",
};

export default function ScholarshipsPage() {
    return (
        <div className="pt-0">
            <ScholarshipHero />
            <div className="-mt-24 relative z-20">
                <ScholarshipCards />
            </div>
        </div>
    );
}
