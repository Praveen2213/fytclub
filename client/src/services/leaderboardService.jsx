import axios from "axios";
const API = axios.create({
    baseURL:"http://localhost:3000/api",
});
export async function getLeaderboard(){
    const token=localStorage.getItem("token");
    const response = await API.get("/leaderboard",
        {
            headers: {
          Authorization:
            `Bearer ${token}`,
        },
        }
    );
    return response.data;
}