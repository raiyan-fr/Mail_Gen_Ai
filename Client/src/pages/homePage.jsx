import {
  ArrowRightIcon,
  SparklesIcon,
  EnvelopeIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/authContext.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { Link } from "react-router";

const Homepage = () => {
  const { user } = useAuth();
  const features = [
    {
      title: "AI Cold Emails",
      description:
        "Generate concise and persuasive cold emails tailored to your target recipient.",
      icon: EnvelopeIcon,
    },
    {
      title: "LinkedIn Messages",
      description:
        "Turn your outreach idea into a short, natural LinkedIn DM without sounding like a sales bot.",
      icon: LinkIcon,
    },
    {
      title: "Follow-up Emails",
      description:
        "Never wonder what to send next. Generate professional follow-ups that continue the conversation.",
      icon: ClockIcon,
    },
    {
      title: "Personalization",
      description:
        "Generate relevant messaging based on the context and details you provide.",
      icon: SparklesIcon,
    },
    {
      title: "Fast Generation",
      description:
        "Turn a simple idea into complete outreach content in just a few seconds.",
      icon: BoltIcon,
    },
    {
      title: "Your History",
      description:
        "Keep your generated outreach organized and access previous generations from your account.",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <EnvelopeIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">
              Mail<span className="text-red-400">Gen</span> AI
            </span>
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:block"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {/* ==================== MAIN ==================== */}
      <main>
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:py-32">
            {/* Badge */}
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm text-red-300">
              <SparklesIcon className="h-4 w-4" /> AI-powered outreach
            </div>
            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              Write better cold emails.
              <span className="block text-red-400">Get more responses.</span>
            </h1>
            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Generate personalized cold emails, LinkedIn messages, and
              follow-ups in seconds using AI. Spend less time writing and more
              time connecting.
            </p>
            {/* CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={user ? "/dashboard" : "/sign-up"}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
              >
                Start Generating <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-lg border border-white/10 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                See How It Works
              </a>
            </div>
            {/* Trust */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <CheckCircleIcon className="h-4 w-4" /> Simple. Fast. AI-powered.
            </div>
          </div>
        </section>

        {/* ==================== STATS ==================== */}
        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            <div className="px-6 py-8 text-center">
              <p className="text-3xl font-bold">10x</p>
              <p className="mt-1 text-sm text-slate-400">Faster writing</p>
            </div>
            <div className="px-6 py-8 text-center">
              <p className="text-3xl font-bold">3</p>
              <p className="mt-1 text-sm text-slate-400">Outreach formats</p>
            </div>
            <div className="px-6 py-8 text-center">
              <p className="text-3xl font-bold">AI</p>
              <p className="mt-1 text-sm text-slate-400">Personalization</p>
            </div>
            <div className="px-6 py-8 text-center">
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-1 text-sm text-slate-400"> Availability </p>
            </div>
          </div>
        </section>
        {/* ==================== FEATURES ==================== */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-400">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need for better outreach
            </h2>

            <p className="mt-4 text-slate-400">
              One prompt gives you multiple pieces of personalized outreach
              content.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section
          id="how-it-works"
          className="border-y border-white/10 bg-slate-900/40"
        >
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-400">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From idea to outreach in three steps
              </h2>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <Step
                number="1"
                title="Describe your goal"
                description="Tell the AI who you're contacting and what you want to achieve."
              />
              <Step
                number="2"
                title="Let AI write"
                description="Our AI generates your email, LinkedIn DM, and follow-up message."
              />
              <Step
                number="3"
                title="Start connecting"
                description="Review your messages, make adjustments, and start your outreach."
              />
            </div>
          </div>
        </section>
        {/* ==================== CTA ==================== */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-24">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-16 text-center sm:px-12">
            <SparklesIcon className="mx-auto h-8 w-8 text-red-400" />
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Ready to write your next cold email?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Stop staring at a blank email. Give the AI your idea and let it
              handle the writing.
            </p>
            <Link
              to={user ? "/dashboard" : "/sign-up"}
              className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
            >
              Create a Free Account <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
                <EnvelopeIcon className="h-4 w-4" />
              </div>
              <span className="font-bold">
                Mail<span className="text-red-400">Gen</span> AI
              </span>
            </Link>
            <p className="mt-2 text-sm text-slate-500">
              AI-powered cold outreach, made simple.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white">
              How it works
            </a>
            <a href="#about" className="hover:text-white">
              About
            </a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Cold GenAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ==================== STEP ==================== */ const Step = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-bold">
        {number}
      </div>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-400">{description}</p>
    </div>
  );
};

export default Homepage;
