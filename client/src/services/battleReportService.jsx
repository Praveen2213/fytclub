import API from "./api";

// ======================
// BATTLE EVENTS
// ======================

export async function getBattleEvents(
  battleId
) {

  const response =
    await API.get(

      `/battles/${battleId}/events`,

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
// AI INSIGHTS
// ======================

export async function getBattleInsights(
  battleId
) {

  const response =
    await API.get(

      `/history/${battleId}/insights`,

      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  return response.data;
}