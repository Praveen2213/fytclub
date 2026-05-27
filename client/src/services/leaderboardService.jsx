import API from "./api";

export async function getLeaderboard() {

  const response =
    await API.get(
      "/users/leaderboard"
    );

  return response.data;
}