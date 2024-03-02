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
import Toastify from "./assets/Components/Toastify.jsx";
import { PageRoutes } from "./assets/Configurations/ManagementSection.jsx";

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
      <Toastify />
      {!disable_sidebar.includes(ActivePage) && <Sidebar />}
      {!disable_subbar.includes(ActivePage) && <ManagementSection />}
      <Routes>
        {PageRoutes?.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
