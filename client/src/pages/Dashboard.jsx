import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityForm from "../components/dashboard/ActivityForm";
import ActivityCard from "../components/dashboard/ActivityCard";
import MainLayout from "../layouts/MainLayout";
function Dashboard(){
    // TEMP MOCK USER
  // Later this will come from backend
  const user = {
    username: "Roshni",
  };
 return (
    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold">
              Welcome back, {user.username} 👋
            </h1>

            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Track your fitness journey and stay ahead in battles.
            </p>

          </div>

          {/* <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-semibold transition-all duration-300 w-full sm:w-fit">

            + Log Activity

          </button> */}

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatCard
            title="Total Activities"
            value="24"
            description="+5 this week"
            icon="🏋️"
          />

          <StatCard
            title="Calories Burned"
            value="3,240"
            description="+420 today"
            icon="🔥"
          />

          <StatCard
            title="Current Streak"
            value="7 Days"
            description="Personal best!"
            icon="⚡"
          />

          <StatCard
            title="Workout Hours"
            value="18 hrs"
            description="2 hrs today"
            icon="⏱️"
          />

          <StatCard
            title="Total Wins"
            value="12"
            description="Won this month"
            icon="🏆"
          />

          <StatCard
            title="Total Losses"
            value="3"
            description="Keep improving"
            icon="📉"
          />

          <StatCard
            title="Active Battles"
            value="4"
            description="2 ending soon"
            icon="🥊"
          />

          <StatCard
            title="Leaderboard Rank"
            value="#8"
            description="Top 10 this week"
            icon="📊"
          />

        </div>
        <ActivityForm />
        {/* RECENT ACTIVITIES */}

        <div className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-bold">
              Recent Activities
            </h2>

            <button className="text-blue-400 hover:text-blue-300 text-sm">
              View All
            </button>

          </div>

          <div className="flex flex-col gap-4">

            <ActivityCard
              type="run"
              value="5"
              unit="km"
              points="250"
              loggedAt="2 hours ago"
            />

            <ActivityCard
              type="gym"
              value="1"
              unit="session"
              points="100"
              loggedAt="Today"
            />

            <ActivityCard
              type="steps"
              value="8000"
              unit="steps"
              points="160"
              loggedAt="Yesterday"
            />

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <QuickActions />

      </div>

    </MainLayout>
  );
}

export default Dashboard;