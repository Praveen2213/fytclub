import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getActiveBattles,
  getPendingBattles,
} from "../services/battleService";

import { getBattleHistory } from "../services/historyService";

import { useNavigate } from "react-router-dom";

function Battles() {

  const navigate = useNavigate();

  const [pendingBattles, setPendingBattles] =
    useState([]);

  const [activeBattles, setActiveBattles] =
    useState([]);

  const [completedBattles, setCompletedBattles] =
    useState([]);

  useEffect(() => {

    async function fetchBattles() {

      try {

        const userId =
          localStorage.getItem("userId");

        // PENDING
        const pending =
          await getPendingBattles(userId);

        setPendingBattles(pending);

        // ACTIVE
        const active =
          await getActiveBattles(userId);

        setActiveBattles(active);

        // HISTORY
        const history =
          await getBattleHistory(userId);

        const completed =
          history.filter(
            (battle) =>
              battle.status === "completed"
          );

        setCompletedBattles(
          completed.slice(0, 3)
        );

      } catch (error) {

        console.log(error);
      }
    }

    fetchBattles();

  }, []);

  return (

    <MainLayout>

      <div className="p-6 text-white">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">

              Battles ⚔️

            </h1>

            <p className="text-slate-400 mt-2">

              Manage all your fitness battles

            </p>

          </div>

          <button
            onClick={() =>
              navigate("/create-battle")
            }

            className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-semibold"
          >

            + Create Battle

          </button>

        </div>

        {/* PENDING */}

   <section className="mb-12">
  <h2 className="text-2xl font-bold mb-5">
    Pending Requests
  </h2>

  <div className="grid gap-5">

    {pendingBattles.length === 0 ? (
      <div className="bg-slate-800 p-6 rounded-2xl text-slate-400">
        No pending battles
      </div>
    ) : (
      pendingBattles.map((battle) => (
        <div
          key={battle.id}
          onClick={() => {
            if (!battle?.id) {
              console.error("Missing battle id", battle);
              return;
            }

            navigate(`/battle-request/id/${battle.id}`, {
  state: { battle }
});
          }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-5 rounded-2xl cursor-pointer hover:scale-[1.02] hover:border-orange-500 transition-all duration-200"
        >

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
              ⚔️ {battle.challenger_name}
            </h3>

            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
              Pending
            </span>
          </div>

          <p className="text-slate-400 mt-2">
            Activity:{" "}
            <span className="text-slate-200">
              {battle.activity_types?.join(", ")}
            </span>
          </p>

        </div>
      ))
    )}

  </div>
</section>

        {/* ACTIVE */}

        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">

            Active Battles

          </h2>

          <div className="grid gap-5">

            {
              activeBattles.map(
                (battle) => (

                  <div
                    key={battle.id}

                    onClick={() =>
                      navigate(
                        `/battle/${battle.id}`
                      )
                    }

                    className="bg-slate-800 p-5 rounded-2xl cursor-pointer hover:bg-slate-700 transition"
                  >

                    <h3 className="text-xl font-bold">

                      vs {battle.opponent_name}

                    </h3>

                    <p className="text-orange-400 mt-2">

                      Active Now

                    </p>

                  </div>
                )
              )
            }

          </div>

        </section>

        {/* COMPLETED */}

        <section>

          <h2 className="text-2xl font-bold mb-5">

            Recently Completed

          </h2>

          <div className="grid gap-5">

            {
              completedBattles.map(
                (battle, index) => (

                  <div
                    key={index}

                    className="bg-slate-800 p-5 rounded-2xl"
                  >

                    <h3 className="font-bold">

                      vs {battle.opponent_name}

                    </h3>

                    <p className="text-slate-400 mt-2">

                      Status:
                      {" "}
                      {battle.status}

                    </p>

                  </div>
                )
              )
            }

          </div>

        </section>

      </div>

    </MainLayout>
  );
}

export default Battles;