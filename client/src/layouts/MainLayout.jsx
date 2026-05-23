import Navbar from "../components/layout/Navbar";
function MainLayout({children}){
    return(
        <div className="min-h-screen bg-slate-900">
            <Navbar/>
            <main>
                {children}
            </main>
        </div>
    );
}
export default MainLayout;
//children renders whatever page comes inside layout