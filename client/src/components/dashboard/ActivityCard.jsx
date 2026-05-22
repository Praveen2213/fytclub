function ActivityCard({
    type,
    value,
    unit,
    points,
    loggedAt,
}){
    function getActivityIcon(){
        const normalizedType = type.toLowerCase();
     if (normalizedType === "run") {
      return "🏃";
    }

    if (normalizedType === "gym") {
      return "🏋️";
    }

    if (normalizedType === "steps") {
      return "👣";
    }

    if (normalizedType === "water") {
      return "💧";
    }

    if (normalizedType === "sleep") {
      return "😴";
    }

    return "🔥";
  }
return(
     <div className="bg-slate-800 p-5 rounded-2xl shadow-lg flex justify-between items-center hover:scale-[1.02] transition-all duration-300">
        {/* LEFT SECTION */}

      <div className="flex items-center gap-4">

        <div className="text-4xl">
          {getActivityIcon()}
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white capitalize">
            {type}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {value} {unit}
          </p>

          <p className="text-slate-500 text-xs mt-1">
            {loggedAt}
          </p>

        </div>
      </div>
        {/* RIGHT SECTION */}

      <div>

        <p className="text-green-400 text-2xl font-bold">
          +{points}
        </p>

        <p className="text-slate-400 text-sm text-right">
          points
        </p>

      </div>
     </div>
);
    }
export default ActivityCard;