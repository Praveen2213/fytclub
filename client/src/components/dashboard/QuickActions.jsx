function QuickActions() {
  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold text-white mb-5">
        Quick Actions
      </h2>

      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* ADD ACTIVITY */}

        <button className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-all duration-300 text-left shadow-lg">

          <h3 className="text-xl font-semibold text-white mb-2">
            ➕ Add Activity
          </h3>

          <p className="text-slate-400">
            Log your workout and earn points.
          </p>

        </button>

        {/* JOIN BATTLE */}

        <button className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-all duration-300 text-left shadow-lg">

          <h3 className="text-xl font-semibold text-white mb-2">
            🥊 Join Battle
          </h3>

          <p className="text-slate-400">
            Compete with friends and climb rankings.
          </p>

        </button>

        {/* UPDATE PROFILE */}

        <button className="bg-slate-800 p-6 rounded-2xl hover:bg-slate-700 transition-all duration-300 text-left shadow-lg">

          <h3 className="text-xl font-semibold text-white mb-2">
            👤 Update Profile
          </h3>

          <p className="text-slate-400">
            Customize your fitness profile settings.
          </p>

        </button>

      </div>

    </div>
  );
}

export default QuickActions;