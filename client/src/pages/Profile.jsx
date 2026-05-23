import MainLayout from "../layouts/MainLayout";



function Profile() {

  // TEMP USER DATA
  // later backend

  const user = {

    username: "Roshni",

    email:
      "roshni@gmail.com",

    avatar:
      "",

    totalPoints: 1240,

    totalWins: 12,

    totalLosses: 3,

  };



  return (

    <MainLayout>

      <div className="p-4 sm:p-6 text-white max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* AVATAR */}

            <div className="relative">

              <div className="w-36 h-36 rounded-full bg-blue-500 flex items-center justify-center text-5xl font-bold overflow-hidden border-4 border-slate-700">

                {
                  user.avatar ? (

                    <img
                      src={user.avatar}

                      alt="avatar"

                      className="w-full h-full object-cover"
                    />

                  ) : (

                    user.username[0]
                  )
                }

              </div>



              <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full px-3 py-2 text-sm shadow-lg">

                ✏️

              </button>

            </div>



            {/* USER INFO */}

            <div className="flex-1">

              <h1 className="text-4xl font-bold">

                {user.username}

              </h1>



              <p className="text-slate-400 mt-2">

                {user.email}

              </p>



              <div className="flex flex-wrap gap-4 mt-6">

                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Total Points

                  </p>

                  <h3 className="text-2xl font-bold text-orange-400">

                    {user.totalPoints}

                  </h3>

                </div>



                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Wins

                  </p>

                  <h3 className="text-2xl font-bold text-green-400">

                    {user.totalWins}

                  </h3>

                </div>



                <div className="bg-slate-900 px-5 py-3 rounded-2xl">

                  <p className="text-slate-400 text-sm">

                    Losses

                  </p>

                  <h3 className="text-2xl font-bold text-red-400">

                    {user.totalLosses}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>



        {/* PROFILE SETTINGS */}

        <div className="mt-10 bg-slate-800 rounded-3xl p-8 border border-slate-700">

          <h2 className="text-3xl font-bold mb-6">

            Account Settings

          </h2>



          <div className="space-y-5">

            <button className="w-full bg-slate-900 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5 text-left">

              ✏️ Edit Username

            </button>



            <button className="w-full bg-slate-900 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5 text-left">

              🔒 Change Password

            </button>



            <button className="w-full bg-slate-900 hover:bg-slate-700 transition-all duration-300 rounded-2xl p-5 text-left">

              📸 Upload Avatar

            </button>



            <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 rounded-2xl p-5 text-left">

              🚪 Logout

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}



export default Profile;