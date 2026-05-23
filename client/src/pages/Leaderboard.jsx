import { useEffect,useState} from "react";
import MainLayout from "../layouts/MainLayout";
import { getLeaderboard } from "../services/leaderboardService";
function Leaderboard(){
    const[leaders,setLeaders]=useState([]);//leaders=current data , setLeaders=function to update data
    const [loading, setLoading] =
    useState(true);
    useEffect(()=>{ //run only once when page opens
        async function fetchLeaderboard(){
            try{
                const data=await getLeaderboard();
                setLeaders(data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchLeaderboard();
    },[]);
    function getWinRate(wins,losses){ //helper function
        const total=wins+losses;
        if(total==0){
            return 0;
        }
        return Math.round(
            (wins/total)*100
        );
    }
    if(loading){//if data still loading then loading screen else show leaderboard
        return(
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

        Loading Leaderboard...

      </div>
        );
    }
    return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Leaderboard 🏆

          </h1>

          <p className="text-slate-400 mt-2">

            Top fitness competitors ranked
            by battle points

          </p>

        </div>



        {/* TOP 3 PLAYERS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

          {
            leaders
              .slice(0, 3)
              .map((player, index) => ( //map loop through array .for each player create UI card

                <div
                  key={player.username}//key unique identity for list items

                  className={`rounded-2xl p-6 shadow-xl border transition-all duration-300
                  ${
                    index === 0
                      ? "bg-yellow-500/10 border-yellow-400"
                      : index === 1
                      ? "bg-slate-700 border-slate-500"
                      : "bg-orange-500/10 border-orange-400"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">

                        #{index + 1}

                      </h2>

                      <p className="text-slate-300 mt-1">

                        {player.username}

                      </p>

                    </div>



                    <div className="text-5xl">

                      {
                        index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : "🥉"
                      }

                    </div>

                  </div>



                  <div className="mt-6 space-y-2">

                    <p>

                      🔥 Points:
                      {" "}
                      <span className="font-bold">

                        {player.total_points}

                      </span>

                    </p>



                    <p>

                      🏆 Wins:
                      {" "}
                      <span className="font-bold">

                        {player.total_wins}

                      </span>

                    </p>



                    <p>

                      📉 Losses:
                      {" "}
                      <span className="font-bold">

                        {player.total_losses}

                      </span>

                    </p>



                    <p>

                      ⚡ Win Rate:
                      {" "}
                      <span className="font-bold">

                        {
                          getWinRate(
                            player.total_wins,
                            player.total_losses
                          )
                        }%

                      </span>

                    </p>

                  </div>

                </div>
              ))
          }

        </div>



        {/* FULL LEADERBOARD */}

        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900">

                <tr>

                  <th className="text-left p-5">

                    Rank

                  </th>

                  <th className="text-left p-5">

                    Player

                  </th>

                  <th className="text-left p-5">

                    Points

                  </th>

                  <th className="text-left p-5">

                    Wins

                  </th>

                  <th className="text-left p-5">

                    Losses

                  </th>

                  <th className="text-left p-5">

                    Win Rate

                  </th>

                </tr>

              </thead>



              <tbody>

                {
                  leaders.map( //again loop through all players..create rows dynamically
                    (player, index) => (

                      <tr
                        key={player.username}

                        className="border-t border-slate-700 hover:bg-slate-700/40 transition-all duration-300"
                      >

                        <td className="p-5 font-bold">

                          #{index + 1}

                        </td>



                        <td className="p-5">

                          {player.username}

                        </td>



                        <td className="p-5 text-orange-400 font-semibold">

                          {player.total_points}

                        </td>



                        <td className="p-5 text-green-400 font-semibold">

                          {player.total_wins}

                        </td>



                        <td className="p-5 text-red-400 font-semibold">

                          {player.total_losses}

                        </td>



                        <td className="p-5">

                          {
                            getWinRate(
                              player.total_wins,
                              player.total_losses
                            )
                          }%

                        </td>

                      </tr>
                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}
export default Leaderboard;