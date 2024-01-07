/* eslint-disable react/prop-types */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      pauseOnHover={false}
      closeOnClick
      theme="dark"
    />
  );
};
export default Toastify;
