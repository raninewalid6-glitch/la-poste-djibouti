import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Tracking from "../pages/Tracking";
import News from "../pages/News";
import Contact from "../pages/Contact";
import AdminPage from "../pages/admin/AdminPage";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/portail-lpdj/administration" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
