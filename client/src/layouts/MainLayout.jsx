import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

      <Navbar />

      <main className="flex-1">

        {children}

      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;