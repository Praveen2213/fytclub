//statcard is a ui box with a label , a big number , and optional small text underneath
function StatCard({
    title,
    value,
    description,
    icon,
}){
    return( //left side text right side icon
         <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex justify-between items-start hover:scale-105 transition-all duration-300">
         <div>

        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-white mt-2">
          {value}
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          {description}
        </p>

      </div>

      <div className="text-4xl">
        {icon}
      </div>

        </div>
    );
}
export default StatCard;