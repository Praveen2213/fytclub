import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import HistoryCard from "../components/history/HistoryCard";

import axios from "axios";

function ActivityHistory() {

  const [activities, setActivities] =
    useState([]);

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchData() {

      try {

        const token =
          localStorage.getItem("token");

        const userId =
          localStorage.getItem("userId");

        // ======================
        // FETCH ACTIVITY HISTORY
        // ======================

        const historyRes =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/history/${userId}/activity_history`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setActivities(
          historyRes.data
        );

        // ======================
        // FETCH DASHBOARD STATS
        // ======================

        const dashboardRes =
          await axios.get(

           `${import.meta.env.VITE_API_URL}/api/dashboard`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setDashboardData(
          dashboardRes.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchData();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

        Loading Activity History...

      </div>
    );
  }

  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Activity History 📈

          </h1>

          <p className="text-slate-400 mt-2">

            Track all your fitness progress

          </p>

        </div>

        {/* DASHBOARD STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Activities

            </h3>

            <p className="text-3xl font-bold mt-2">

              {dashboardData?.totalActivities}

            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Points

            </h3>

            <p className="text-3xl font-bold mt-2 text-orange-400">

              {dashboardData?.totalPoints}

            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Calories Burned

            </h3>

            <p className="text-3xl font-bold mt-2 text-red-400">

              {dashboardData?.calories}

            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Total Run Distance

            </h3>

            <p className="text-3xl font-bold mt-2 text-green-400">

              {dashboardData?.totalRunDistance} km

            </p>

          </div>

        </div>

        {/* STREAK + BATTLES */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Current Streak

            </h3>

            <p className="text-3xl font-bold mt-2">

              🔥 {dashboardData?.streak} days

            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-slate-400">

              Active Battles

            </h3>

            <p className="text-3xl font-bold mt-2">

              ⚔️ {dashboardData?.activeBattles}

            </p>

          </div>

        </div>

        {/* ACTIVITY LIST */}

        <div>

          <h2 className="text-3xl font-bold mb-6">

            Logged Activities 🏃

          </h2>

          <div className="flex flex-col gap-5">

            {
              activities.length === 0 ? (

                <div className="bg-slate-800 rounded-2xl p-8 text-center text-slate-400">

                  No activities found

                </div>

              ) : (

                activities.map((activity) => (

                  <HistoryCard
                    key={activity.id}

                    type={activity.type}

                    value={activity.value}

                    unit={activity.unit}

                    points={activity.points}

                    loggedAt={activity.logged_at}
                  />
                ))
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ActivityHistory;