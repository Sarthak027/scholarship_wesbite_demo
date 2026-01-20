import AboutHero from "@/components/about/AboutHero";
import JourneySection from "@/components/home/JourneySection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AboutStats from "@/components/about/AboutStats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/shared/CTASection";

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
