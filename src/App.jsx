import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./assets/Main/Footer.jsx";
import {
  disable_sidebar,
  disable_subbar,
} from "./assets/Configurations/Config.jsx";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAction } from "./Services/Actions/Authentication.jsx";
import Sidebar from "./assets/Main/Sidebar.jsx";
import ManagementSection from "./assets/Main/ManagementSection.jsx";
import { PageRoutes } from "./assets/Configurations/ManagementSection.jsx";
import PageNotFound from "./assets/Pages/PageNotFound.jsx";

function App() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const authentication = useSelector((state) => state.authentication);
  const Location = useLocation();
  const [ActivePage, setActivePage] = useState();
  useEffect(() => {
    setActivePage(Location?.pathname);
  }, [Location?.pathname]);

  useLayoutEffect(() => {
    dispatch(ProfileAction());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (ActivePage !== "/sign-in" && ActivePage !== "/sign-up") {
      if (authentication.isAuthenticated === false) {
        Navigate("/sign-in");
      }
    }
  }, [ActivePage, Navigate, authentication]);

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
