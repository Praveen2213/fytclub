function ActiveBattleCard({

  opponent,

  yourPoints,

  opponentPoints,

  daysLeft,

}) {

  const winning =
    yourPoints >= opponentPoints;



  return (

    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 hover:border-blue-500 transition-all duration-300">

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



      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-slate-400 text-sm">

            Your Points

          </p>

          <h3 className="text-2xl font-bold mt-1">

            {yourPoints}

          </h3>

        </div>



        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-slate-400 text-sm">

            Opponent

          </p>

          <h3 className="text-2xl font-bold mt-1">

            {opponentPoints}

          </h3>

        </div>

      </div>



      <div className="flex items-center justify-between mt-6">

        <p className="text-sm text-slate-400">

          {daysLeft} days remaining

        </p>



        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            winning
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >

          {
            winning
              ? "Leading"
              : "Behind"
          }

        </span>

      </div>

    </div>
  );
}



export default ActiveBattleCard;