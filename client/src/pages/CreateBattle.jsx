import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  createBattle,
  searchUsers,
} from "../services/battleService";

function CreateBattle() {

  // ======================
  // STATES
  // ======================

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [activityTypes,
    setActivityTypes] =
    useState([]);

  const [challengerDare,
    setChallengerDare] =
    useState("");

  const [createdBattleLink,
    setCreatedBattleLink] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ======================
  // HANDLE CHECKBOX
  // ======================

  function handleActivityChange(type) {

    if (
      activityTypes.includes(type)
    ) {

      setActivityTypes(
        activityTypes.filter(
          (item) => item !== type
        )
      );

    } else {

      setActivityTypes([
        ...activityTypes,
        type,
      ]);
    }
  }

  // ======================
  // HANDLE SEARCH
  // ======================

  async function handleSearch(value) {

    setSearch(value);

    if (value.length < 1) {

      setUsers([]);

      return;
    }

    try {

      const data =
        await searchUsers(value);

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  }

  // ======================
  // HANDLE SUBMIT
  // ======================

  async function handleSubmit(e) {

    e.preventDefault();

    // VALIDATION

    if (!selectedUser) {

      alert("Please select opponent");

      return;
    }

    if (activityTypes.length === 0) {

      alert("Select at least one activity type");

      return;
    }

    try {

      setLoading(true);

      // API CALL

      const data =
        await createBattle({

          opponent_id:
            selectedUser.id,

          activity_types:
            activityTypes,

          challenger_dare:
            challengerDare,
        });

      console.log(data);

      // CREATE INVITE LINK

      const inviteLink =
        `${window.location.origin}/accept/${data.invite_token}`;

      setCreatedBattleLink(
        inviteLink
      );

      alert(
        "Challenge Sent ✅"
      );

      // RESET FORM

      setSelectedUser(null);

      setSearch("");

      setUsers([]);

      setActivityTypes([]);

      setChallengerDare("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create battle"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <MainLayout>

      <div className="max-w-3xl mx-auto p-6 text-white">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Create Battle ⚔️

          </h1>

          <p className="text-slate-400 mt-2">

            Challenge another player
            and compete for 7 days

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-3xl p-8 space-y-7 shadow-xl border border-slate-700"
        >

          {/* SEARCH USER */}

          <div>

            <label className="block mb-3 font-semibold">

              Search Opponent

            </label>

            <input
              type="text"

              value={search}

              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }

              placeholder="Search username..."

              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
            />

            {/* SEARCH RESULTS */}

            {
              users.length > 0 && (

                <div className="mt-3 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">

                  {
                    users.map((user) => (

                      <button
                        key={user.id}

                        type="button"

                        onClick={() => {

                          setSelectedUser(user);

                          setSearch(
                            user.username
                          );

                          setUsers([]);
                        }}

                        className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-all duration-300 border-b border-slate-700"
                      >

                        {user.username}

                      </button>
                    ))
                  }

                </div>
              )
            }

            {/* SELECTED USER */}

            {
              selectedUser && (

                <div className="mt-3 text-green-400 font-semibold">

                  Selected:
                  {" "}
                  {selectedUser.username}

                </div>
              )
            }

          </div>

          {/* ACTIVITY TYPES */}

          <div>

            <label className="block mb-4 font-semibold">

              Battle Activity Types

            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {
                [
                  "run",
                  "steps",
                  "gym",
                  "water",
                  "sleep",
                  "custom",
                ].map((type) => (

                  <label
                    key={type}

                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300
                    ${
                      activityTypes.includes(type)
                        ? "bg-blue-500 border-blue-400"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >

                    <input
                      type="checkbox"

                      checked={
                        activityTypes.includes(
                          type
                        )
                      }

                      onChange={() =>
                        handleActivityChange(
                          type
                        )
                      }

                      className="hidden"
                    />

                    <span className="capitalize">

                      {type}

                    </span>

                  </label>
                ))
              }

            </div>

          </div>

          {/* DARE */}

          <div>

            <label className="block mb-3 font-semibold">

              Your Dare

            </label>

            <textarea
              rows="4"

              value={challengerDare}

              onChange={(e) =>
                setChallengerDare(
                  e.target.value
                )
              }

              placeholder="Loser buys protein shake 😈"

              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none resize-none"

              required
            />

          </div>

          {/* SUBMIT BUTTON */}

          <button
            type="submit"

            disabled={loading}

            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-xl p-4 font-bold text-lg"
          >

            {
              loading
                ? "Sending Challenge..."
                : "Send Battle Challenge"
            }

          </button>

        </form>

        {/* INVITE LINK UI */}

        {
          createdBattleLink && (

            <div className="mt-8 bg-slate-800 border border-orange-500 rounded-2xl p-5">

              <h2 className="text-2xl font-bold mb-4">

                Challenge Sent ✅

              </h2>

              <div className="bg-slate-900 p-3 rounded-xl text-sm break-all">

                {createdBattleLink}

              </div>

              <div className="flex gap-3 mt-4 flex-wrap">

                {/* COPY BUTTON */}

                <button
                  onClick={() => {

                    navigator.clipboard.writeText(
                      createdBattleLink
                    );

                    alert("Link copied!");
                  }}

                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl font-semibold"
                >

                  Copy Link

                </button>

                {/* WHATSAPP SHARE */}

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(createdBattleLink)}`}

                  target="_blank"

                  rel="noreferrer"

                  className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold"
                >

                  Share WhatsApp

                </a>

              </div>

            </div>
          )
        }

      </div>

    </MainLayout>
  );
}

export default CreateBattle;