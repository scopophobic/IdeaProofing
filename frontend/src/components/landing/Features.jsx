import {
  SparklesIcon,
  ChartBarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Analysis",
    description:
      "Leverage advanced AI to evaluate your idea's uniqueness and potential impact.",
    comingSoon: false,
  },
  {
    icon: ChartBarIcon,
    title: "Market Potential Assessment",
    description:
      "Get insights into market size, competition, and growth opportunities.",
    comingSoon: false,
  },
  {
    icon: LightBulbIcon,
    title: "Idea Enhancement Suggestions",
    description:
      "Receive actionable recommendations to improve and strengthen your concept.",
    comingSoon: false,
  },
  {
    icon: RocketLaunchIcon,
    title: "Competitor Analysis",
    description:
      "Identify similar ideas and understand your competitive advantage.",
    comingSoon: false,
  },
  {
    icon: UserGroupIcon,
    title: "User Feedback Integration",
    description:
      "Gather and analyze user feedback to refine your idea (Coming Soon).",
    comingSoon: true,
  },
  {
    icon: ShieldCheckIcon,
    title: "Intellectual Property Check",
    description:
      "Verify idea uniqueness and potential IP conflicts (Coming Soon).",
    comingSoon: true,
  },
];

export const Features = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-thistle/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-prussian-blue mb-4">
            Powerful Features to{" "}
            <span className="bg-gradient-to-r from-royal-purple to-amethyst bg-clip-text text-transparent">
              Validate Your Ideas
            </span>
          </h2>
          <p className="text-xl text-prussian-blue/80 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you evaluate and refine your
            ideas with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card backdrop-blur-sm bg-white/90 border border-thistle/50 transform hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="bg-gradient-to-br from-amethyst to-royal-purple p-3 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-prussian-blue mb-2">
                {feature.title}
                {feature.comingSoon && (
                  <span className="ml-2 text-sm font-normal text-royal-purple/60">
                    (Coming Soon)
                  </span>
                )}
              </h3>
              <p className="text-prussian-blue/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
