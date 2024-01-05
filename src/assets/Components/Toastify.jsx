/* eslint-disable react/prop-types */
import { ToastContainer } from "react-toastify";

const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      theme="s"
    />
  );
};
export default Toastify;
