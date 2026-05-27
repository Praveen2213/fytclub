import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export async function loginUser(data) {

  const response =
    await API.post(
      "/login",
      data
    );

  return response.data;
}

export async function signupUser(data) {

  const response =
    await API.post(
      "/register",
      data
    );

  return response.data;
}