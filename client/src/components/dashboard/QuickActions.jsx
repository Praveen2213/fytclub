import { useNavigate } from "react-router-dom";
function QuickActions() {
  const navigate = useNavigate();
 const actions = [
  {
    title: "Log Activity",
    icon: "➕",
    description: "Track your workout",
    path: "/log-activity",
    color:
      "bg-slate-800 hover:bg-slate-700",
  },

  {
    title: "Start Battle",
    icon: "⚔️",
    description:
      "Challenge another player",
    path: "/create-battle",
    color:
      "bg-orange-500 hover:bg-orange-600",
  },

  {
    title: "Activity History",
    icon: "📜",
    description:
      "View past activities",
    path: "/activity-history",
    color:
      "bg-slate-800 hover:bg-slate-700",
  },

  {
    title: "Leaderboard",
    icon: "🏆",
    description:
      "See top rankings",
    path: "/leaderboard",
    color:
      "bg-slate-800 hover:bg-slate-700",
  },
];


  return (

    <div>

      <h2 className="text-2xl font-bold mb-5">

        Quick Actions

      </h2>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {
          actions.map((action) => (

            <button
              key={action.title}

              onClick={() =>
                navigate(action.path)
              }

              className="bg-slate-800 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5 text-left shadow-lg border border-slate-700 hover:border-blue-500"
            >

              <div className="text-4xl mb-4">

                {action.icon}

              </div>



              <h3 className="text-lg font-semibold">

                {action.title}

              </h3>



              <p className="text-slate-400 text-sm mt-2">

                {action.description}

              </p>

            </button>
          ))
        }

      </div>

    </div>
  );
}



export default QuickActions;