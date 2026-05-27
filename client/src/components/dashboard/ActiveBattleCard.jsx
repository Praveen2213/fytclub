function ActiveBattleCard({

  opponent,

  yourPoints,

  opponentPoints,

  daysLeft,

}) {

  // ======================
  // SAFE NUMBER CONVERSION
  // ======================

  const yourScore =
    Number(yourPoints || 0);

  const opponentScore =
    Number(opponentPoints || 0);

  // ======================
  // RESULT LOGIC
  // ======================

  const winning =
    yourScore > opponentScore;

  const draw =
    yourScore === opponentScore;

  // ======================
  // STATUS STYLES
  // ======================

  let statusText = "Behind";

  let statusStyle =
    "bg-red-500/20 text-red-400";

  if (draw) {

    statusText = "Draw";

    statusStyle =
      "bg-yellow-500/20 text-yellow-400";

  } else if (winning) {

    statusText = "Leading";

    statusStyle =
      "bg-green-500/20 text-green-400";
  }

  return (

    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 hover:border-blue-500 transition-all duration-300">

      {/* ======================
          HEADER
      ====================== */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            You vs {opponent}

          </h2>

          <p className="text-slate-400 mt-1">

            Active Battle

          </p>

        </div>

        <div className="text-4xl">

          🥊

        </div>

      </div>

      {/* ======================
          SCORES
      ====================== */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        {/* YOUR SCORE */}

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-slate-400 text-sm">

            Your Points

          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">

            {yourScore}

          </h3>

        </div>

        {/* OPPONENT SCORE */}

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-slate-400 text-sm">

            Opponent Points

          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">

            {opponentScore}

          </h3>

        </div>

      </div>

      {/* ======================
          FOOTER
      ====================== */}

      <div className="flex items-center justify-between mt-6">

        <p className="text-sm text-slate-400">

          {daysLeft} days remaining

        </p>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyle}`}
        >

          {statusText}

        </span>

      </div>

    </div>
  );
}

export default ActiveBattleCard;