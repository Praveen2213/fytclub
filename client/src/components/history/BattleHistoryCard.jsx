import { Link } from "react-router-dom";

function BattleHistoryCard({

  battleId,

  opponent,

  result,

  yourScore,

  opponentScore,

  challengerDare,

  opponentDare,

  activityTypes,

  status,

  startDate,

  endDate,
  winner_id,

}) {

  // RESULT COLORS
const currentUserId =
  Number(
    localStorage.getItem("userId")
  );
let resultColor = "";

if (status === "pending") {

  result = "Pending";
  resultColor =
    "bg-yellow-500/20 text-yellow-300";

}

else if (status === "active") {

  result = "Active";
  resultColor =
    "bg-blue-500/20 text-blue-300";

}
// DRAW CONDITION
else if (status === "draw") {

  result = "Draw";

  resultColor =
    "bg-purple-500/20 text-purple-300 border border-purple-500/30";

}
else if (
  winner_id === currentUserId
) {

  result = "Won";
  resultColor =
    "bg-green-500/20 text-green-300";

}

else if (
winner_id &&
 winner_id !== currentUserId
) {

  result = "Lost";
  resultColor =
    "bg-red-500/20 text-red-300";

}

else {

  result = "Completed";
  resultColor =
    "bg-slate-500/20 text-slate-300";
}
 

  return (

    <Link
      to={`/battle-report/${battleId}`}
    >

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:border-orange-500 hover:scale-[1.01] transition-all duration-300">

        {/* TOP */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

          {/* LEFT */}

          <div>

            <h2 className="text-3xl font-bold">

              You vs {opponent} ⚔️

            </h2>

            <p className="text-slate-400 mt-2">

              Battle #{battleId}

            </p>

          </div>

          {/* STATUS */}

          <div
            className={`px-5 py-3 rounded-2xl font-bold text-lg ${resultColor}`}
          >

            {result}

          </div>

        </div>

        {/* SCORES */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          {/* YOUR SCORE */}

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700">

            <p className="text-slate-400">

              Your Score

            </p>

            <h3 className="text-4xl font-bold text-orange-400 mt-3">

              {yourScore || 0}

            </h3>

          </div>

          {/* OPPONENT SCORE */}

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700">

            <p className="text-slate-400">

              Opponent Score

            </p>

            <h3 className="text-4xl font-bold text-blue-400 mt-3">

              {opponentScore || 0}

            </h3>

          </div>

        </div>

        {/* DARES */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

          {/* YOUR DARE */}

          <div className="bg-orange-500/10 border border-orange-500 rounded-2xl p-5">

            <h3 className="text-orange-300 font-bold mb-3">

              Your Dare 🎯

            </h3>

            <p className="text-slate-300">

              {opponentDare || "No dare"}

            </p>

          </div>

          {/* OPPONENT DARE */}

          <div className="bg-blue-500/10 border border-blue-500 rounded-2xl p-5">

            <h3 className="text-blue-300 font-bold mb-3">

              Opponent Dare 🔥

            </h3>

            <p className="text-slate-300">

              {challengerDare || "No dare"}

            </p>

          </div>

        </div>

        {/* ACTIVITIES */}

        <div className="mb-6">

          <h3 className="text-xl font-bold mb-4">

            Battle Activities 📈

          </h3>

          <div className="flex gap-3 flex-wrap">

            {
              activityTypes?.map((type) => (

                <div
                  key={type}

                  className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl capitalize"
                >

                  {type}

                </div>
              ))
            }

          </div>

        </div>

        {/* BOTTOM */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* STATUS */}

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-slate-400 text-sm">

              Battle Status

            </p>

            <h3 className="text-xl font-bold mt-2 capitalize">

              {status}

            </h3>

          </div>

          {/* START DATE */}

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-slate-400 text-sm">

              Start Date

            </p>

            <h3 className="text-xl font-bold mt-2">

              {
                startDate
                  ? new Date(
                      startDate
                    ).toLocaleDateString()

                  : "N/A"
              }

            </h3>

          </div>

          {/* END DATE */}

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="text-slate-400 text-sm">

              End Date

            </p>

            <h3 className="text-xl font-bold mt-2">

              {
                endDate
                  ? new Date(
                      endDate
                    ).toLocaleDateString()

                  : "Ongoing"
              }

            </h3>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default BattleHistoryCard;