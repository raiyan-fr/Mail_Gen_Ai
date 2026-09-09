const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
