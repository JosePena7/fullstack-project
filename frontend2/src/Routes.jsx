import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import QuotePage from "./Pages/QuotePage.jsx";
import About from "./Pages/About.jsx";
import Services from "./Pages/Services.jsx";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="app" element={<App />} />
      <Route path="quote" element={<QuotePage />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
    </Route>
  )
);