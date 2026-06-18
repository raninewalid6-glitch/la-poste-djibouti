import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Tracking from "../pages/Tracking";
import News from "../pages/News";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="tracking"
            element={<Tracking />}
          />

          <Route
            path="news"
            element={<News />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;