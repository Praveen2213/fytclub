import { useEffect, useState } from "react";
import ActiveBattleCard from "../components/dashboard/ActiveBattleCard";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityCard from "../components/dashboard/ActivityCard";
import { getActivities } from "../services/activityService";
import { getDashboardStats } from "../services/dashboardService";
import { useNavigate }
from "react-router-dom";
import {
  getActiveBattles
} from "../services/battleService";
function Dashboard() {
const navigate = useNavigate();
  // ======================
  // STATES
  // ======================

  const [activities, setActivities] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

const [activeBattles, setActiveBattles] =
  useState([]);

  // ======================
  // FETCH DATA
  // ======================

  useEffect(() => {

    async function fetchDashboardData() {
    const userId =
  localStorage.getItem("userId");

const battleData =
  await getActiveBattles(userId);
console.log(battleData);
setActiveBattles(
  Array.isArray(battleData)
    ? battleData
    : []
);
      try {

        // FETCH ACTIVITIES

        const activitiesData =
          await getActivities();

        setActivities(
          activitiesData
        );



        // FETCH STATS

        const statsData =
          await getDashboardStats();

        setStats(statsData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }



    fetchDashboardData();
  }, []);



  // ======================
  // LOADING UI
  // ======================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-semibold">

        Loading Dashboard...

      </div>
    );
  }



  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* ======================
            HEADER
        ====================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold">

              Welcome back,
              {" "}
              {stats?.username}
              {" "}
              👋

            </h1>

            <p className="text-slate-400 mt-2 text-sm sm:text-base">

              Track your fitness journey
              and improve every day.

            </p>

          </div>

        </div>
      {/* ======================
    ACTIVE BATTLES
====================== */}

<div className="mt-8">

  <div className="flex items-center justify-between mb-5">

    <h2 className="text-2xl font-bold">

      Active Battles

    </h2>

    <button
  onClick={() =>
    navigate("/battles")
  }

  className="text-blue-400 hover:text-blue-300 text-sm"
>

  See All

</button>

  </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

  {
    activeBattles.length === 0 ? (

      <div className="bg-slate-800 rounded-2xl p-6 text-slate-400">

        No active battles

      </div>

    ) : (

      activeBattles.map((battle) => (

        <div
          key={battle.id}

          onClick={() =>
            navigate(
              `/battle/${battle.id}`
            )
          }

          className="cursor-pointer"
        >

          <ActiveBattleCard
            opponent={
              battle.opponent_name
            }

            daysLeft={7}
          />

        </div>
      ))
    )
  }

</div>
</div>

{/* ======================
    QUICK STATS
====================== */}

<div className="mt-10 mb-5">

  <h2 className="text-2xl font-bold">

    Quick Stats

  </h2>

</div>
        {/* ======================
            STAT CARDS
        ====================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          <StatCard
            title="Total Activities"
            value={stats?.totalActivities}
            description="Activities completed"
            icon="🏋️"
          />

          <StatCard
            title="Total Points"
            value={stats?.totalPoints}
            description="Fitness points earned"
            icon="🔥"
          />

          <StatCard
            title="Current Streak"
            value={`${stats?.streak} Days`}
            description="Stay consistent"
            icon="⚡"
          />

          <StatCard
            title="Run Distance"
            value={`${stats?.totalRunDistance} km`}
            description="Total running"
            icon="🏃"
          />

          <StatCard
            title="Total Wins"
            value={stats?.totalWins}
            description="Battles won"
            icon="🏆"
          />

          <StatCard
            title="Total Losses"
            value={stats?.totalLosses}
            description="Keep improving"
            icon="📉"
          />

          <StatCard
            title="Active Battles"
            value={stats?.activeBattles}
            description="Challenges ongoing"
            icon="🥊"
          />

          <StatCard
            title="Calories Burned"
            value={stats?.calories}
            description="Estimated burn"
            icon="🔥"
          />

        </div>

        {/* ======================
            RECENT ACTIVITIES
        ====================== */}

        <div className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold">

              Recent Activities

            </h2>

            <button className="text-blue-400 hover:text-blue-300 text-sm">

              View All

            </button>

          </div>



          {/* EMPTY STATE */}

          {
            activities.length === 0 ? (

              <div className="bg-slate-800 rounded-2xl p-6 text-slate-400 text-center">

                No activities logged yet

              </div>

            ) : (

              <div className="flex flex-col gap-4">

                {
                  activities.slice(0,3).map(
                    (activity) => (

                      <ActivityCard
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
                }

              </div>
            )
          }

        </div>



        {/* ======================
            QUICK ACTIONS
        ====================== */}

        <div className="mt-12">

          <QuickActions />

        </div>

      </div>

    </MainLayout>
  );
}



export default Dashboard;