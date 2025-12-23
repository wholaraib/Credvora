import HeroSection from "@/components/Hero/hero";
import StatisticsSection from "@/components/Statistics/statistics";
import FeaturesSection from "@/components/Features/features";
import HowItWorksSection from "@/components/StepsGuide/stepsGuide";
import TestimonialsSection from "@/components/Testimonials/testimonials";
import CallToAction from "@/components/CallToAction/cta";

export default function LandingPage() {
  return (
    <div className="mt-30 text-foreground">
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <HowItWorksSection/>
      <TestimonialsSection/>
      <CallToAction/>
    </div>
  );
}

