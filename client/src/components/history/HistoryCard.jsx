function HistoryCard({

  type,
  value,
  unit,
  points,
  loggedAt,

}) {

  function getIcon() {

    if (type === "run") {
      return "🏃";
    }

    if (type === "steps") {
      return "👣";
    }

    if (type === "gym") {
      return "🏋️";
    }

    if (type === "water") {
      return "💧";
    }

    if (type === "sleep") {
      return "😴";
    }

    return "🔥";
  }



  return (

    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg hover:border-blue-500 transition-all duration-300">

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <div className="text-4xl">

            {getIcon()}

          </div>



          <div>

            <h3 className="text-xl font-bold text-white capitalize">

              {type}

            </h3>



            <p className="text-slate-400">

              {value} {unit}

            </p>

          </div>

        </div>



        {/* RIGHT */}

        <div className="text-right">

          <p className="text-orange-400 font-bold text-lg">

            +{points} pts

          </p>



          <p className="text-slate-500 text-sm mt-1">

            {
              new Date(
                loggedAt
              ).toLocaleString()
            }

          </p>

        </div>

      </div>

    </div>
  );
}



export default HistoryCard;