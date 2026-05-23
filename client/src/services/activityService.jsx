import axios from "axios"; //axios ia a library helps react sending HTTP requests like GET,POST
const API = axios.create({ //reusable backend connector
    baseURL: "http://localhost:3000/api",
});
export async function createActivity(data){
    const token = localStorage.getItem("token"); //gets JWT token from browser storage
    const response = await API.post("/activities",data,
        {
            headers: { //custom request configuration
        Authorization: `Bearer ${token}`, //sends JWT token to backend
      },
        }
    );
    return response.data;
}
export async function getActivities(){
    const token=localStorage.getItem("token");
    const response = await API.get("/activities",
        {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }
    );
    return response.data;
}