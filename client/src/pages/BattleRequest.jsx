import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { acceptBattle, declineBattle } from "../services/battleService";

function BattleRequest() {
  const params = useParams();
const token = params.token;
const id = params.id;
  const navigate = useNavigate();
  const location = useLocation();

  const [battle, setBattle] = useState(location.state?.battle || null);
  const [loading, setLoading] = useState(!location.state?.battle);
  const [opponentDare, setOpponentDare] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // FETCH BATTLE (TOKEN OR ID)
  // =========================
  useEffect(() => {
    async function fetchBattle() {
      try {
        let response;

        // CASE 1: Invite Link (token)
        if (token) {
          response = await axios.get(
            `http://localhost:3000/api/battles/accept/${token}`
          );
        }

        // CASE 2: Coming from pending list (id)
        else if (id) {
          response = await axios.get(
            `http://localhost:3000/api/battles/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }
        else {
        console.error("No token or id found in URL");
        return;
      }
        setBattle(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (!battle) fetchBattle();
  }, [token, id]);

  // =========================
  // ACCEPT BATTLE
  // =========================
  async function handleAcceptBattle() {
    try {
      await acceptBattle(battle.id, opponentDare);

      setSuccessMessage("Battle accepted successfully ⚔️");
      setShowAcceptModal(false);

      setTimeout(() => {
        navigate(`/battle/${battle.id}`);
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  }

  // =========================
  // DECLINE BATTLE
  // =========================
  async function handleDeclineBattle() {
    try {
      await declineBattle(battle.id);

      alert("Battle declined ❌");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading || !battle) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
        Loading Battle Request...
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 text-white">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Battle Request ⚔️</h1>
          <p className="text-slate-400 mt-2">
            Accept or decline this challenge
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="mb-6 bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-2xl">
            {successMessage}
          </div>
        )}

        {/* MAIN CARD */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

          {/* TOP */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">⚔️ Battle Request</h2>

              <p className="text-slate-400 mt-1">
                From:{" "}
                <span className="text-orange-400 font-semibold">
                  {battle.opponent_name || battle.challenger_name}
                </span>
              </p>
            </div>

            <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm">
              Pending
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">

            <div className="bg-slate-900 rounded-2xl p-4">
              <h3 className="text-slate-400 text-sm">Start Date</h3>
              <p className="text-lg font-bold mt-2">
                {battle.start_date
                  ? new Date(battle.start_date).toLocaleDateString()
                  : "Not started"}
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4">
              <h3 className="text-slate-400 text-sm">End Date</h3>
              <p className="text-lg font-bold mt-2">
                {battle.end_date
                  ? new Date(battle.end_date).toLocaleDateString()
                  : "7 Days Battle"}
              </p>
            </div>
          </div>

          {/* ACTIVITIES (from second code merged properly) */}
          {battle.activity_types && (
            <div className="mb-6">
              <p className="text-slate-400 mb-2">Activity Types</p>
              <div className="flex gap-3 flex-wrap">
                {battle.activity_types.map((type) => (
                  <div
                    key={type}
                    className="bg-blue-500 px-4 py-2 rounded-xl capitalize"
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHALLENGER DARE */}
          <div className="bg-orange-500/10 border border-orange-500 rounded-2xl p-4 mb-6">
            <h3 className="text-orange-300 font-semibold mb-2">
              Challenger Dare 😈
            </h3>
            <p className="text-slate-300">
              {battle.challenger_dare || "No dare provided"}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={() => setShowAcceptModal(true)}
              className="flex-1 bg-green-500 hover:bg-green-600 transition-all rounded-2xl py-4 font-bold text-lg"
            >
              Accept Battle
            </button>

            <button
              onClick={handleDeclineBattle}
              className="flex-1 bg-red-500 hover:bg-red-600 transition-all rounded-2xl py-4 font-bold text-lg"
            >
              Decline
            </button>

          </div>
        </div>

        {/* MODAL */}
        {showAcceptModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-3xl p-8 w-[90%] max-w-lg border border-slate-700">

              <h2 className="text-3xl font-bold mb-6">
                Accept Battle ⚔️
              </h2>

              <textarea
                value={opponentDare}
                onChange={(e) => setOpponentDare(e.target.value)}
                placeholder="Give your dare..."
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
              />

              <div className="flex gap-4 mt-6">

                <button
                  onClick={handleAcceptBattle}
                  className="flex-1 bg-green-500 hover:bg-green-600 py-4 rounded-2xl font-bold"
                >
                  Confirm
                </button>

                <button
                  onClick={() => setShowAcceptModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 py-4 rounded-2xl font-bold"
                >
                  Cancel
                </button>

              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default BattleRequest;