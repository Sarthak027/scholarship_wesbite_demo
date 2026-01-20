import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import CollegeCarousel from "@/components/home/CollegeCarousel";
import NewsSection from "@/components/home/NewsSection";
import PopularPrograms from "@/components/home/PopularPrograms";
import JourneySection from "@/components/home/JourneySection";
import PromoBanner from "@/components/home/PromoBanner";
import LocationsGrid from "@/components/home/LocationsGrid";
import ScholarshipCards from "@/components/scholarships/ScholarshipCards";
import OnlineCourses from "@/components/home/OnlineCourses";
import BTechBanner from "@/components/home/BTechBanner";
import GovtScholarships from "@/components/home/GovtScholarships";
import AboutSectionHome from "@/components/home/AboutSectionHome";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/shared/CTASection";
import BlogSection from "@/components/home/BlogSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <StatsSection />
      <CollegeCarousel />
      <NewsSection />
      <PopularPrograms />
      <JourneySection />
      <PromoBanner />
      <LocationsGrid />
      <ScholarshipCards />
      <OnlineCourses />
      <BTechBanner />
      <GovtScholarships />
      <AboutSectionHome />
      <Testimonials />
      <CTASection />
      <BlogSection />

      {/* Floating WhatsApp Button (Fixed) */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>
  );
}
