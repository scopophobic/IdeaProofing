import { Hero } from "./Hero";
import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { CallToAction } from "./CallToAction";

export const LandingPage = ({ onGetStarted, isSignedIn = false }) => {
  return (
    <div className="min-h-screen">
      <Hero onGetStarted={onGetStarted} isSignedIn={isSignedIn} />
      <Features />
      <HowItWorks />
      <CallToAction onGetStarted={onGetStarted} isSignedIn={isSignedIn} />
    </div>
  );
};
