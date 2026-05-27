import axios from "axios";
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});
export async function getDashboardStats(){
    const token = localStorage.getItem("token");
    const response=await API.get(
        "/dashboard",
        {
            headers: {
        Authorization: `Bearer ${token}`,
        },
    }
    );
    return response.data;
}