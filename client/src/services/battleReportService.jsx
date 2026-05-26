import axios from "axios";

const API =
  "http://localhost:3000/api/battles";

// ======================
// GET BATTLE EVENTS
// ======================

export async function getBattleEvents(
  battleId
) {

  const response =
    await axios.get(

      `${API}/${battleId}/events`,

      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  return response.data;
}

// ======================
// GET AI INSIGHTS
// ======================

export async function getBattleInsights(
  battleId
) {

  const response =
    await axios.get(

      `http://localhost:3000/api/history/${battleId}/insights`,

      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  return response.data;
}