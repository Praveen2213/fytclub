import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
function BattleDetails(){
    //get battle id
    const {id} = useParams();
  // ======================
  // TEMP DATA
  // LATER FROM BACKEND
  // ======================

  const battle = {

    id,

    opponent: "Praveen",

    yourScore: 520,

    opponentScore: 470,

    daysLeft: 2,

    yourDare:
      "Run 5km daily",

    opponentDare:
      "100 pushups daily",

    activityFeed: [

      {
        id: 1,
        user: "Roshni",
        activity: "Run",
        points: 50,
      },

      {
        id: 2,
        user: "Praveen",
        activity: "Gym",
        points: 100,
      },

      {
        id: 3,
        user: "Roshni",
        activity: "Steps",
        points: 30,
      },
    ],
  };
  //SCORE %
  const totalScore= battle.yourScore + battle.opponentScore;
  const yourPercentage = (battle.yourScore/totalScore)*100;
  return(
    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* ======================
            HEADER
        ====================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold">

              You vs
              {" "}
              {battle.opponent}
              {" "}
              ⚔️

            </h1>



            <p className="text-slate-400 mt-2">

              Battle ID:
              {" "}
              #{battle.id}

            </p>

          </div>



          <div className="bg-orange-500 px-5 py-3 rounded-2xl font-semibold">

            {battle.daysLeft}
            {" "}
            days left

          </div>

        </div>



        {/* ======================
            LIVE SCORE
        ====================== */}

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-10">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-slate-400">

                Your Score

              </p>

              <h2 className="text-5xl font-bold text-orange-400 mt-2">

                {battle.yourScore}

              </h2>

            </div>



            <div className="text-5xl">

              ⚔️

            </div>



            <div className="text-right">

              <p className="text-slate-400">

                Opponent Score

              </p>

              <h2 className="text-5xl font-bold text-blue-400 mt-2">

                {battle.opponentScore}

              </h2>

            </div>

          </div>



          {/* PROGRESS BAR */}

          <div className="mt-6">

            <div className="flex justify-between mb-2 text-sm">

              <span>

                You Leading

              </span>

              <span>

                {Math.round(
                  yourPercentage
                )}%

              </span>

            </div>



            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

              <div
                className="bg-orange-500 h-full rounded-full"

                style={{
                  width:
                    `${yourPercentage}%`,
                }}
              />

            </div>

          </div>

        </div>



        {/* ======================
            DARES
        ====================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold mb-4">

              Your Dare 🎯

            </h2>

            <p className="text-slate-300">

              {battle.yourDare}

            </p>

          </div>



          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold mb-4">

              Opponent Dare 🔥

            </h2>

            <p className="text-slate-300">

              {battle.opponentDare}

            </p>

          </div>

        </div>



        {/* ======================
            LIVE ACTIVITY FEED
        ====================== */}

        <div>

          <h2 className="text-3xl font-bold mb-6">

            Live Activity Feed 📈

          </h2>



          <div className="flex flex-col gap-4">

            {
              battle.activityFeed.map(
                (activity) => (

                  <div
                    key={activity.id}

                    className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-xl font-semibold">

                        {activity.user}

                      </h3>



                      <p className="text-slate-400 mt-1">

                        Logged:
                        {" "}
                        {activity.activity}

                      </p>

                    </div>



                    <div className="text-orange-400 font-bold text-2xl">

                      +{activity.points}

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}
export default BattleDetails;