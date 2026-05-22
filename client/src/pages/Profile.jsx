import MainLayout from "../layouts/MainLayout";
function Profile(){
    return(
        <MainLayout>
            <div className="p-6 text-white">

        <div className="bg-slate-800 p-8 rounded-2xl max-w-xl">

          <h1 className="text-3xl font-bold mb-6">
            My Profile
          </h1>

          <div className="space-y-4">

            <div>
              <p className="text-gray-400">
                Name
              </p>

              <h2 className="text-xl">
                Roshni Panda
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Email
              </p>

              <h2 className="text-xl">
                roshni@example.com
              </h2>
            </div>

          </div>

        </div>

      </div>
        </MainLayout>
    );
}
export default Profile;