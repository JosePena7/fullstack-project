import { Outlet } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ScrollToTop } from "./Components/ScrollToTop";


export const Layout = () => {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Chatbot />

      <a
        href="https://wa.me/12564687763"
        className="btn btn-success position-fixed bottom-0 end-0 m-4 rounded-circle d-flex align-items-center justify-content-center floating-whatsapp"
      >
        <i className="bi bi-whatsapp fs-2"></i>
      </a>

      <Footer />
    </div>
  );
};

export default Layout;
