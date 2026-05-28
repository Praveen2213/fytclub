import API from "./api";
function getToken() {

  return localStorage.getItem(
    "token"
  );
}



// ======================
// CREATE BATTLE
// ======================

export async function createBattle(
  data
) {

  const response =
    await API.post(

      "/battles",

      data,

      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  return response.data;
}



// ======================
// SEARCH USERS
// ======================

export async function searchUsers(
  query
) {

  const response =
    await API.get(

      `/users/search?q=${query}`,

      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  return response.data;
}



// ======================
// ACCEPT BATTLE
// ======================

export async function acceptBattle(

  battleId,

  opponent_dare

) {

  const response =
    await API.patch(

      `/battles/${battleId}/accept`,

      { opponent_dare },

      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  return response.data;
}



// ======================
// DECLINE BATTLE
// ======================

export async function declineBattle(
  battleId
) {

  const response =
    await API.patch(

      `/battles/${battleId}/decline`,

      {},

      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  return response.data;
}

// ======================
// ACTIVE BATTLES
// ======================

export async function getActiveBattles(userId) {

  const token =
    localStorage.getItem("token");

  const response =
    await API.get(

      `/battles/active/${userId}`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
}
// GET PENDING BATTLES
export async function getPendingBattles(
  userId
) {

  const response = await API.get(
    `/battles/pending/${userId}`,
    {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
}
// SCORES
export async function getBattleScores(
  battleId
) {

  const token =
    localStorage.getItem("token");

  const response =
    await API.get(

      `/battles/${battleId}/scores`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
}