import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import QuotePage from "./Pages/QuotePage.jsx";
import About from "./Pages/About.jsx";
import Services from "./Pages/Services.jsx";
import Admin from "./Pages/Admin.jsx";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="quote" element={<QuotePage />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  )
);
