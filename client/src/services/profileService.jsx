import API from "./api";

// GET PROFILE
export async function getProfile(userId) {

  const response =
    await API.get(
      `/users/${userId}`
    );

  return response.data;
}

// UPDATE PROFILE
export async function updateProfile(
  userId,
  formData
) {

  const response =
    await API.patch(
      `/users/${userId}/edit`,
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  return response.data;
}

// UPLOAD AVATAR
export async function uploadAvatar(
  userId,
  avatarData
) {

  const response =
    await API.patch(
      `/users/${userId}/avatar`,
      avatarData,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
            "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}
export async function changePassword(
  userId,
  passwordData
) {

  const token =
    localStorage.getItem("token");

  const response =
    await API.patch(

      `/users/${userId}/password`,

      passwordData,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
}