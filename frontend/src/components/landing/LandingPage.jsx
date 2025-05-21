import { Hero } from "./Hero";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { CallToAction } from "./CallToAction";

export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <Hero onGetStarted={onGetStarted} />
      <Features />
      <HowItWorks />
      <CallToAction onGetStarted={onGetStarted} />
    </div>
  );
};
