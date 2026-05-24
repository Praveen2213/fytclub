import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import HistoryCard from "../components/history/HistoryCard";

import BattleHistoryCard from "../components/history/BattleHistoryCard";

import { getHistory } from "../services/historyService";
import { getActivities }
from "../services/activityService";



function History() {

  // ======================
  // STATES
  // ======================

const [activities, setActivities] =
  useState([]);

const [battleHistory,
  setBattleHistory] =
  useState([]);

  const [loading, setLoading] =
    useState(true);
  // ======================
  // FETCH HISTORY
  // ======================

  useEffect(() => {

  async function fetchHistory() {

    try {

      // TEMP USER ID

      const userId = 6;



      // ======================
      // FETCH ACTIVITIES
      // ======================

      const activityData =
        await getActivities();

      setActivities(
        activityData
      );



      // ======================
      // FETCH BATTLE HISTORY
      // ======================

      const battleData =
        await getHistory(userId);

      setBattleHistory(
        battleData
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  fetchHistory();

}, []);


  // ======================
  // LOADING UI
  // ======================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

        Loading History...

      </div>
    );
  }



  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* ======================
            HEADER
        ====================== */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            History 📜

          </h1>

          <p className="text-slate-400 mt-2">

            Track your activities and battle performance

          </p>

        </div>



        {/* ======================
            SUMMARY CARDS
        ====================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Activities

            </h3>

            <p className="text-3xl font-bold mt-2">

              {activities.length}

            </p>

          </div>



          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Points

            </h3>

            <p className="text-3xl font-bold mt-2 text-orange-400">

              {
                activities.reduce(

                  (sum, activity) =>

                    sum + activity.points,

                  0
                )
              }

            </p>

          </div>



          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Battles Played

            </h3>

            <p className="text-3xl font-bold mt-2">

              {battleHistory.length}

            </p>

          </div>

        </div>



        {/* ======================
            ACTIVITY HISTORY
        ====================== */}

        <div>

          <div className="mb-6">

            <h2 className="text-3xl font-bold">

              Activity History 🏃

            </h2>

            <p className="text-slate-400 mt-2">

              Your logged fitness activities

            </p>

          </div>



          <div className="flex flex-col gap-5">

            {
              activities.length === 0 ? (

                <div className="bg-slate-800 rounded-2xl p-8 text-center text-slate-400">

                  No activity history found

                </div>

              ) : (

                activities.map(
                  (activity) => (

                    <HistoryCard
                      key={activity.id}

                      type={activity.type}
                      value={activity.value}
                      unit={activity.unit}
                      points={activity.points}
                      loggedAt={
                        activity.logged_at
                      }
                    />
                  )
                )
              )
            }

          </div>

        </div>



        {/* ======================
            BATTLE HISTORY
        ====================== */}

        <div className="mt-14">

          <div className="mb-6">

            <h2 className="text-3xl font-bold">

              Battle History ⚔️

            </h2>

            <p className="text-slate-400 mt-2">

              Your completed fitness battles

            </p>

          </div>



          <div className="flex flex-col gap-5">

            {
              battleHistory.length === 0 ? (

                <div className="bg-slate-800 rounded-2xl p-8 text-center text-slate-400">

                  No battle history found

                </div>

              ) : (

                battleHistory.map(
                  (battle) => (

                    <BattleHistoryCard
                      key={battle.id}

                      opponent={battle.opponent}

                      result={battle.result}

                      yourScore={battle.yourScore}

                      opponentScore={
                        battle.opponentScore
                      }

                      completedAt={
                        battle.completedAt
                      }
                    />
                  )
                )
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}



export default History;