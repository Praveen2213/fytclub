import API from "./api";
export async function loginUser(data) {

  const response =
    await API.post(
      "/auth/login",
      data
    );

  return response.data;
}

export async function signupUser(data) {

  const response =
    await API.post(
      "/auth/register",
      data
    );

  return response.data;
}