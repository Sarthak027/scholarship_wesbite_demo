import OnlineCourses from "@/components/home/OnlineCourses";
import OnlineCourseHero from "@/components/home/OnlineCourseHero";

export const metadata = {
    title: "Online Courses | Confirm Scholarship",
    description: "Explore online business and technology degrees from top universities.",
};

export default function OnlineCoursesPage() {
    return (
        <div className="pt-0">
            <OnlineCourseHero />
            <div className="-mt-24 relative z-20">
                <OnlineCourses />
            </div>
        </div>
    );
}
