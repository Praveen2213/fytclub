import axios from "axios";
const API = axios.create({
     baseURL: `${import.meta.env.VITE_API_URL}`,
});
export async function loginUser(data){
    const response = await API.post("/login",data);
    console.log(response.data);
    return response.data;
}
export async function signupUser(data){
    const response= await API.post("/register",data);
    return response.data;
}