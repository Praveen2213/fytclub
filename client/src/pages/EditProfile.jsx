import { useEffect, useState } from "react";

import { useNavigate }
from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getProfile,
  updateProfile,
  uploadAvatar
}
from "../services/profileService";

function EditProfile() {

  const userId =
    localStorage.getItem("userId");

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      bio: "",
    });

  const [avatar, setAvatar] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchProfile();

  }, []);

  async function fetchProfile() {

    try {

      const data =
        await getProfile(userId);

      setFormData({
        username: data.username,
        email: data.email,
        bio: data.bio || "",
      });

    } catch (error) {

      console.log(error);
    }
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  }

  // ✅ CORRECT handleSubmit
async function handleSubmit(e) {
    e.preventDefault();

    try {
        setLoading(true);

        // STEP 1 — update text profile data
        await updateProfile(userId, formData);

        // STEP 2 — upload avatar only if a new file was selected
        if (avatar) {
            const avatarData = new FormData();
            avatarData.append("avatar", avatar); // key must be "avatar" — matches backend upload.single('avatar')
            await uploadAvatar(userId, avatarData);
        }

        alert("Profile updated!");
        navigate("/profile");

    } catch (error) {
        console.log(error.response?.data); // 🔴 shows exact backend error message
        alert(error.response?.data?.message || "Update failed"); // show user what went wrong

    } finally {
        setLoading(false);
    }
}

  return (

    <MainLayout>

      <div className="max-w-3xl mx-auto p-6 text-white">

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <h1 className="text-4xl font-bold mb-8">

            Edit Profile ✨

          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-slate-900 p-4 rounded-2xl"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-slate-900 p-4 rounded-2xl"
            />

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows="5"
              className="w-full bg-slate-900 p-4 rounded-2xl resize-none"
            />

            <input
              type="file"
              onChange={(e) =>
                setAvatar(
                  e.target.files[0]
                )
              }
              className="w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-2xl p-4 font-bold"
            >

              {
                loading
                ? "Saving..."
                : "Save Changes"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default EditProfile;