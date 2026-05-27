import API from "./api";

// ACTIVITY HISTORY
export async function getActivityHistory(
userId
){

const response =
await API.get(
`/history/${userId}/activity_history`,
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;
}

// BATTLE HISTORY
export async function getBattleHistory(
userId
){

const response =
await API.get(
`/history/${userId}/battle_history`,
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;
}