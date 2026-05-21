import MainLayout from "../layouts/MainLayout";
function Dashboard(){
    return(
        <MainLayout>
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-6">
                Welcome back! 👋
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">
            Total Activities
          </h2>
          <p className="text-3xl mt-2">
            24
          </p>
        </div> 
         <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">
            Calories Burned
          </h2>

          <p className="text-3xl mt-2">
            3200
          </p>
        </div>
         <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">
            Active Battles
          </h2>

          <p className="text-3xl mt-2">
            3
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">
            Current Streak
          </h2>

          <p className="text-3xl mt-2">
            7 days
          </p>
        </div>
        </div>
        </div>
        </MainLayout>
    );
}
export default Dashboard;