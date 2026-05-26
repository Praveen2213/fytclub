import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import BattleHistoryCard
from "../components/history/BattleHistoryCard";

import {
  getBattleHistory,
}
from "../services/historyService";

function BattleHistory() {

  // ======================
  // STATES
  // ======================

  const [battleHistory,
    setBattleHistory] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // ======================
  // FETCH HISTORY
  // ======================

  useEffect(() => {

    async function fetchBattleHistory() {

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        const data =
          await getBattleHistory(
            userId
          );

        setBattleHistory(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchBattleHistory();

  }, []);

  // ======================
  // LOADING UI
  // ======================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

        Loading Battle History...

      </div>
    );
  }

  // ======================
  // CURRENT USER
  // ======================

  const currentUser =
    Number(
      localStorage.getItem(
        "userId"
      )
    );

  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* ======================
            HEADER
        ====================== */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Battle History ⚔️

          </h1>

          <p className="text-slate-400 mt-2">

            Review all your fitness battles,
            scores, dares and results

          </p>

        </div>

        {/* ======================
            SUMMARY CARDS
        ====================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* TOTAL BATTLES */}

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Battles

            </h3>

            <p className="text-3xl font-bold mt-2">

              {battleHistory.length}

            </p>

          </div>

          {/* WINS */}

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Battles Won

            </h3>

            <p className="text-3xl font-bold mt-2 text-green-400">

             {
  battleHistory.filter(
    (battle) =>
      battle.status !== "draw" &&
      battle.winner_id === currentUser
  ).length
}

            </p>

          </div>

          {/* LOSSES */}

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Battles Lost

            </h3>

            <p className="text-3xl font-bold mt-2 text-red-400">

            {
  battleHistory.filter(
    (battle) =>

      battle.status !== "draw" &&
      battle.winner_id &&
      battle.winner_id !== currentUser

  ).length
}

            </p>

          </div>

        </div>
{/* DRAWS */}

<div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

  <h3 className="text-slate-400">

    Draw Battles

  </h3>

  <p className="text-3xl font-bold mt-2 text-yellow-400">

    {
      battleHistory.filter(
        (battle) =>
          battle.status === "draw"
      ).length
    }

  </p>

</div>
        {/* ======================
            BATTLE HISTORY
        ====================== */}

        <div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold">

              All Battles 📜

            </h2>

            <p className="text-slate-400 mt-2">

              Your complete battle records

            </p>

          </div>

          <div className="flex flex-col gap-6">

            {
              battleHistory.length === 0 ? (

                <div className="bg-slate-800 rounded-2xl p-10 text-center text-slate-400 border border-slate-700">

                  No battle history found

                </div>

              ) : (

                battleHistory.map(
                  (battle) => {

                    // ======================
                    // OPPONENT
                    // ======================

                    const opponentName =

                      battle.challenger_id === currentUser

                        ? battle.opponent_name

                        : battle.challenger_name;

                    // ======================
                    // SCORES
                    // ======================

                    const yourScore =

                      battle.challenger_id === currentUser

                        ? battle.challenger_score

                        : battle.opponent_score;

                    const opponentScore =

                      battle.challenger_id === currentUser

                        ? battle.opponent_score

                        : battle.challenger_score;

             // ======================
// RESULT
// ======================

let result = "Pending";

if (battle.status === "draw") {

  result = "Draw";

} else if (
  battle.winner_id === currentUser
) {

  result = "Won";

} else if (
  battle.winner_id &&
  battle.winner_id !== currentUser
) {

  result = "Lost";
}

                    return (

                      <BattleHistoryCard
                      winner_id={battle.winner_id}
                        key={battle.id}

                        battleId={battle.id}

                        opponent={opponentName}

                        result={result}

                        yourScore={yourScore}

                        opponentScore={opponentScore}

                        challengerDare={
                          battle.challenger_dare
                        }

                        opponentDare={
                          battle.opponent_dare
                        }

                        activityTypes={
                          battle.activity_types
                        }

                        status={battle.status}

                        startDate={
                          battle.start_date
                        }

                        endDate={
                          battle.end_date
                        }

                      />
                    );
                  }
                )
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default BattleHistory;