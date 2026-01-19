import AboutHero from "@/components/AboutHero";
import JourneySection from "@/components/JourneySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutStats from "@/components/AboutStats";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
export default function AboutPage() {
    return (
        <div className="flex flex-col gap-0">
            <AboutHero />
            <JourneySection />
            <WhyChooseUs />
            <AboutStats />
            <Testimonials />
            <CTASection />
        </div>
    );
}
