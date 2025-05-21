import {
  DocumentTextIcon,
  SparklesIcon,
  ChartBarIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: DocumentTextIcon,
    title: "Describe Your Idea",
    description:
      "Enter your idea in detail, including the problem it solves and your proposed solution.",
  },
  {
    icon: SparklesIcon,
    title: "AI Analysis",
    description:
      "Our AI analyzes your idea for novelty, market potential, and competitive landscape.",
  },
  {
    icon: ChartBarIcon,
    title: "Get Insights",
    description:
      "Receive comprehensive analysis with scores, explanations, and recommendations.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Take Action",
    description:
      "Use the insights to refine your idea and make informed decisions about next steps.",
  },
];

export const HowItWorks = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-thistle/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-prussian-blue mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-prussian-blue/80 max-w-3xl mx-auto">
            Get from idea to insights in minutes with our simple, four-step
            process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-royal-purple/50 to-amethyst/50" />
              )}

              <div className="card backdrop-blur-sm bg-white/90 border border-thistle/50 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-amethyst to-royal-purple p-4 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-royal-purple/10 text-royal-purple rounded-full px-4 py-1 text-sm font-medium mb-4">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-prussian-blue mb-2">
                    {step.title}
                  </h3>
                  <p className="text-prussian-blue/70">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
