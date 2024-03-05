import { LogoutAction } from "../../Services/Actions/Authentication";
import SignUp from "../Pages/SignUp.jsx";
import SignIn from "../Pages/SignIn.jsx";
import Brand from "../Pages/Brand.jsx";
import Category from "../Pages/Category.jsx";
import SubCategory from "../Pages/SubCategory.jsx";
import Attribute from "../Pages/Attributes.jsx";
import Unit from "../Pages/Unit.jsx";
import Role from "../Pages/Role.jsx";
import AddProduct from "../Pages/Product/AddProduct.jsx";
import Products from "../Pages/Product/Products.jsx";
import Tax from "../Pages/Tax.jsx";
import Users from "../Pages/Users.jsx";
import Dashboard from "../Pages/Dashboard";
import Notifications from "../Pages/Notifications/Alerts.jsx";
import GlobalAlerts from "../Pages/Notifications/GlobalAlerts.jsx";
import Alerts from "../Pages/Notifications/Alerts.jsx";
export const PageRoutes = [
  { path: "/", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/brand", element: <Brand /> },
  { path: "/category", element: <Category /> },
  { path: "/sub-category", element: <SubCategory /> },
  { path: "/attribute", element: <Attribute /> },
  { path: "/unit", element: <Unit /> },
  { path: "/user", element: <Users /> },
  { path: "/admin", element: <Users /> },
  { path: "/customer", element: <Users /> },
  { path: "/seller", element: <Users /> },
  { path: "/tax", element: <Tax /> },
  { path: "/role", element: <Role /> },
  { path: "/product-add", element: <AddProduct /> },
  { path: "/product-list", element: <Products /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/alerts", element: <Alerts /> },
  { path: "/global-alerts", element: <GlobalAlerts /> },
];
export const SubBar = {
  association: [
    "brand",
    "category",
    "sub-category",
    "unit",
    "attribute",
    "tax",
  ],
  stock: ["stock-in", "stock-out"],
  profile: ["profile", "address"],
  product: ["product-list", "product-add"],
  users: ["user", "seller", "customer", "admin"],
  notification: ["notifications", "alerts", "global-alerts"],
};
export const SideBarConfig = [
  {
    icon: "hbwqfgcf",
    colors:
      "outline:#084186,primary:#206bc4,secondary:#206bc4,tertiary:#206bc4",
    Title: "Dashboard",
    redirects: "/dashboard",
    onClickFunction: null,
  },
  {
    icon: "nocovwne",
    colors: "primary:#121331,secondary:#206bc4",
    Title: "Product",
    redirects: "/product-list",
    onClickFunction: null,
  },
  {
    icon: "etqbfrgp",
    colors:
      "outline:#131432,primary:#92140c,secondary:#f24c00,tertiary:#b26836,quaternary:#ebe6ef",
    Title: "Warehouse",
    redirects: "/stock-in",
    onClickFunction: null,
  },
  {
    icon: "snvfoxut",
    colors: "outline:#242424,primary:#206bc4,secondary:#000000",
    Title: "Association Management",
    redirects: "/brand",
    onClickFunction: null,
  },
  {
    icon: "mebvgwrs",
    state: "hover-jump",
    colors:
      "primary:#121331,secondary:#b26836,tertiary:#206bc4,quaternary:#f9c9c0,quinary:#ebe6ef",
    Title: "Users",
    redirects: "/users",
    onClickFunction: null,
  },
  {
    icon: "mebvgwrs",
    state: "hover-jump",
    colors:
      "primary:#121331,secondary:#b26836,tertiary:#206bc4,quaternary:#f9c9c0,quinary:#ebe6ef",
    Title: "Profile",
    redirects: "/profile",
    onClickFunction: null,
  },

  {
    icon: "wwpzpqta",
    state: "hover",
    colors: "primary:#206bc4,secondary:#ffffff",
    Title: "Notifications",
    redirects: "/notifications",
    onClickFunction: null,
  },
  {
    icon: "twopqjaj",
    colors:
      "primary:#121331,secondary:#ebe6ef,tertiary:#f9c9c0,quaternary:#f24c00,quinary:#3a3347,senary:#b26836,septenary:#206bc4",
    Title: "Logout",
    redirects: null,
    onClickFunction: LogoutAction,
  },
];
