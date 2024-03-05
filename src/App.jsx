import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./assets/Main/Footer.jsx";
import {
  disable_sidebar,
  disable_subbar,
} from "./assets/Configurations/Config.jsx";
import { useEffect, useState } from "react";
import Sidebar from "./assets/Main/Sidebar.jsx";
import ManagementSection from "./assets/Main/ManagementSection.jsx";
import { PageRoutes } from "./assets/Configurations/ManagementSection.jsx";
import PageNotFound from "./assets/Pages/PageNotFound.jsx";

function App() {
  const Location = useLocation();
  const [ActivePage, setActivePage] = useState();
  useEffect(() => {
    setActivePage(Location?.pathname);
  }, [Location?.pathname]);
  
 
  return (
    <>
      {!disable_sidebar.includes(ActivePage) && <Sidebar />}
      {!disable_subbar.includes(ActivePage) && <ManagementSection />}
      <Routes>
        {PageRoutes?.map((item) => {
          return (
            <Route
              key={item.path || "/404"}
              path={item.path || "404"}
              element={item.element || <PageNotFound />}
            />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
