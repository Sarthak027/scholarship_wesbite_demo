import ScholarshipHero from "@/components/scholarships/ScholarshipHero";
import ScholarshipCards from "@/components/scholarships/ScholarshipCards";

export const metadata = {
    title: "Scholarships | Confirm Scholarship",
    description: "Explore a wide range of scholarships for Management, Engineering, Computer Application, and more.",
};

export default function ScholarshipsPage() {
    return (
        <div className="pt-20">
            <ScholarshipHero />
            <ScholarshipCards />
        </div>
    );
}
