import axios from "axios";

const BASE_URL =
"http://localhost:3000/api/users";

export async function getProfile(userId){

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(

      `${BASE_URL}/${userId}`,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return response.data;
}

export async function updateProfile(userId,data){

  const token =
    localStorage.getItem("token");

  const response =
    await axios.patch(

      `${BASE_URL}/${userId}/edit`,

      data,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return response.data;
}

export async function uploadAvatar(userId,formData){

  const token =
    localStorage.getItem("token");

  const response =
    await axios.patch(

      `${BASE_URL}/${userId}/avatar`,

      formData,

      {
        headers:{
          Authorization:
          `Bearer ${token}`,

          "Content-Type":
          "multipart/form-data"
        }
      }
    );

  return response.data;
}
export async function changePassword(userId,passwordData){

  const token =
    localStorage.getItem("token");

  const response =
    await axios.patch(

      `${BASE_URL}/${userId}/password`,

      passwordData,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return response.data;
}