import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./assets/Pages/Dashboard.jsx";
import SignUp from "./assets/Pages/SignUp.jsx";
import SignIn from "./assets/Pages/SignIn.jsx";
import Brand from "./assets/Pages/Brand.jsx";
import Footer from "./assets/Main/Footer.jsx";
import {
  disable_sidebar,
  disable_subbar,
} from "./assets/Configurations/Config.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAction } from "./Services/Actions/Authentication.jsx";
import Category from "./assets/Pages/Category.jsx";
import SubCategory from "./assets/Pages/SubCategory.jsx";
import Attribute from "./assets/Pages/Attributes.jsx";
import Unit from "./assets/Pages/Unit.jsx";
import Role from "./assets/Pages/Role.jsx";
import AddProduct from "./assets/Pages/Product/AddProduct.jsx";
import Products from "./assets/Pages/Product/Products.jsx";
import Sidebar from "./assets/Main/Sidebar.jsx";
import ManagementSection from "./assets/Main/ManagementSection.jsx";

function App() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const authentication = useSelector((state) => state.authentication);
  const Location = useLocation();
  const [ActivePage, setActivePage] = useState();
  useEffect(() => {
    setActivePage(Location?.pathname);
  }, [Location?.pathname]);

  useEffect(() => {
    dispatch(ProfileAction());
  }, [dispatch]);

  useEffect(() => {
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/category" element={<Category />} />
        <Route path="/sub-category" element={<SubCategory />} />
        <Route path="/attribute" element={<Attribute />} />
        <Route path="/unit" element={<Unit />} />
        <Route path="/role" element={<Role />} />
        <Route path="/product-add" element={<AddProduct />} />d
        <Route path="/product-list" element={<Products />} />d
      </Routes>
      <Footer />
    </>
  );
}

export default App;
