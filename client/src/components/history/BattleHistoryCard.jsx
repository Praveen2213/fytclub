function BattleHistoryCard({

  opponent,
  result,
  yourScore,
  opponentScore,
  completedAt,

}) {

  return (

    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg">

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div>

          <h3 className="text-xl font-bold text-white">

            VS {opponent}

          </h3>



          <p
            className={`mt-2 font-semibold
            ${
              result === "Won"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {result}

          </p>

        </div>



        {/* RIGHT */}

        <div className="text-right">

          <p className="text-orange-400 font-bold text-lg">

            {yourScore}
            {" "}
            -
            {" "}
            {opponentScore}

          </p>



          <p className="text-slate-500 text-sm mt-1">

            {
              new Date(
                completedAt
              ).toLocaleDateString()
            }

          </p>

        </div>

      </div>

    </div>
  );
}



export default BattleHistoryCard;