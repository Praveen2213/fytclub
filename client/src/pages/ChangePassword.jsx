import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  changePassword
}
from "../services/profileService";

function ChangePassword(){

  const navigate =
    useNavigate();

  const userId =
    localStorage.getItem("userId");

  const [oldPassword,
    setOldPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  async function handleSubmit(e){

    e.preventDefault();

    if(
      newPassword !==
      confirmPassword
    ){

      alert(
        "Passwords do not match"
      );

      return;
    }

    try{

      setLoading(true);

      await changePassword(

        userId,

        {
          oldPassword,
          newPassword
        }
      );

      alert(
        "Password updated successfully"
      );

      navigate("/profile");

    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.message
        ||
        "Failed to update password"
      );

    }finally{

      setLoading(false);
    }
  }

  return(

    <MainLayout>

      <div className="max-w-2xl mx-auto p-6 text-white">

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <h1 className="text-4xl font-bold mb-8">

            Change Password 🔒

          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* OLD PASSWORD */}

            <div>

              <label className="block mb-3 font-semibold">

                Old Password

              </label>

              <input
                type="password"

                value={oldPassword}

                onChange={(e)=>
                  setOldPassword(
                    e.target.value
                  )
                }

                required

                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
              />

            </div>

            {/* NEW PASSWORD */}

            <div>

              <label className="block mb-3 font-semibold">

                New Password

              </label>

              <input
                type="password"

                value={newPassword}

                onChange={(e)=>
                  setNewPassword(
                    e.target.value
                  )
                }

                required

                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block mb-3 font-semibold">

                Confirm Password

              </label>

              <input
                type="password"

                value={confirmPassword}

                onChange={(e)=>
                  setConfirmPassword(
                    e.target.value
                  )
                }

                required

                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"

              disabled={loading}

              className="w-full bg-blue-500 hover:bg-blue-600 rounded-2xl p-4 font-bold text-lg transition-all duration-300"
            >

              {
                loading
                ?
                "Updating..."
                :
                "Update Password"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default ChangePassword;