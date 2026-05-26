import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getProfile }
from "../services/profileService";
import { useNavigate }
from "react-router-dom";
function Profile() {
const navigate = useNavigate();
  const userId =
    localStorage.getItem("userId");

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, []);

  async function fetchProfile() {

    try {

      const data =
        await getProfile(userId);

      setUser(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">

        Loading Profile...

      </div>
    );
  }

  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* AVATAR */}

            <div className="relative">

              <div className="w-36 h-36 rounded-full bg-orange-500 flex items-center justify-center text-5xl font-bold overflow-hidden border-4 border-slate-700">

                {
                  user.avatar_url ? (

                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    user.username[0]
                  )
                }

              </div>

            </div>

            {/* USER INFO */}

            <div className="flex-1">

              <h1 className="text-4xl font-bold">

                {user.username}

              </h1>

              <p className="text-slate-400 mt-2">

                {user.email}

              </p>

              <p className="text-slate-300 mt-4">

                {
                  user.bio
                  || "No bio added yet"
                }

              </p>

              <div className="flex flex-wrap gap-4 mt-6">

                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Wins

                  </p>

                  <h3 className="text-2xl font-bold text-green-400">

                    {user.total_wins}

                  </h3>

                </div>

                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Losses

                  </p>

                  <h3 className="text-2xl font-bold text-red-400">

                    {user.total_losses}

                  </h3>

                </div>

                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Joined

                  </p>

                  <h3 className="text-lg font-bold text-orange-400">

                    {
                      new Date(
                        user.created_at
                      ).toLocaleDateString()
                    }

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SETTINGS */}

        <div className="mt-10 bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <h2 className="text-3xl font-bold mb-6">

            Account Settings

          </h2>

          <div className="space-y-5">

            <Link
              to="/edit-profile"

              className="block w-full bg-slate-900 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5"
            >

              ✏️ Edit Profile

            </Link>

            <button
               onClick={() =>
                 navigate("/change-password")
                }

             className="w-full bg-slate-900 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5 text-left"
            >
             🔒 Change Password

             </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;