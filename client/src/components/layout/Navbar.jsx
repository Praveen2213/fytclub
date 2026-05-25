import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    localStorage.removeItem("username");

    navigate("/login");
  }

  const navLinks = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Battles",
      path: "/battles",
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
    },
  ];

  return (

    <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}

        <Link
          to="/dashboard"

          className="flex items-center gap-3"
        >

          {/* LOGO */}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-lg">

            <span className="text-2xl font-black text-white">

              ⚡

            </span>

          </div>

          <div>

            <h1 className="text-2xl font-black tracking-wide text-white">

              FYTCLUB

            </h1>

            <p className="text-[10px] text-orange-400 tracking-widest">

              TRAIN • COMPETE • WIN

            </p>

          </div>

        </Link>

        {/* CENTER */}

        <div className="hidden md:flex items-center gap-3">

          {
            navLinks.map((link) => (

              <Link
                key={link.path}

                to={link.path}

                className={`px-5 py-3 rounded-2xl transition-all duration-300 font-semibold

                ${
                  location.pathname === link.path

                  ? "bg-orange-500 text-white shadow-lg"

                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >

                {link.name}

              </Link>
            ))
          }

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* START BATTLE */}

          <Link
            to="/create-battle"

            className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-all duration-300 px-5 py-3 rounded-2xl font-bold shadow-lg"
          >

            + Start Battle

          </Link>

          {/* NOTIFICATION */}

          <button className="relative bg-slate-800 hover:bg-slate-700 transition-all w-12 h-12 rounded-2xl flex items-center justify-center">

            🔔

            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">

              2

            </span>

          </button>

       {/* PROFILE */}

<div className="relative group">

  {/* CIRCULAR PROFILE BUTTON */}

  <button
    className="
      w-12 h-12 rounded-full
      bg-gradient-to-br from-orange-500 to-red-500
      flex items-center justify-center
      text-white font-bold text-lg
      shadow-lg
      hover:scale-105 transition-all duration-300
      border-2 border-slate-700
    "
  >

    {
      username
        ? username.charAt(0).toUpperCase()
        : "U"
    }

  </button>

  {/* DROPDOWN */}

  <div
    className="
      absolute right-0 mt-3
      bg-slate-800 border border-slate-700
      rounded-2xl shadow-2xl
      opacity-0 invisible
      group-hover:opacity-100
      group-hover:visible
      transition-all duration-300
      w-56 overflow-hidden z-50
    "
  >

    {/* USER INFO */}

    <div className="px-5 py-4 border-b border-slate-700">

      <p className="text-sm text-slate-400">

        Signed in as

      </p>

      <h3 className="font-bold text-white mt-1">

        {username}

      </h3>

    </div>

    {/* PROFILE */}

    <Link
      to="/profile"

      className="
        block px-5 py-4
        hover:bg-slate-700
        transition-all
      "
    >

      👤 Profile

    </Link>

    {/* HISTORY */}

    <Link
      to="/history"

      className="
        block px-5 py-4
        hover:bg-slate-700
        transition-all
      "
    >

      ⚔️ Battle History

    </Link>
    {/* LOGOUT */}

    <button
      onClick={handleLogout}

      className="
        w-full text-left px-5 py-4
        hover:bg-red-500
        transition-all
      "
    >

      🚪 Logout

    </button>

  </div>

</div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;