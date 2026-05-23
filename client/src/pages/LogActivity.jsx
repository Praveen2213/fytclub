import MainLayout from "../layouts/MainLayout";

import ActivityForm from "../components/dashboard/ActivityForm";

function LogActivity() {

  return (

    <MainLayout>

      <div className="max-w-2xl mx-auto p-6 text-white">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            Log Activity

          </h1>

          <p className="text-slate-400 mt-2">

            Track your fitness progress

          </p>

        </div>

        {/* REUSABLE FORM */}

        <ActivityForm />

      </div>

    </MainLayout>
  );
}

export default LogActivity;