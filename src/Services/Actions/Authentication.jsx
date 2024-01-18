import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import { IconLoader3 } from "@tabler/icons-react";
import { IconChecks } from "@tabler/icons-react";
import { IconAlertCircleFilled } from "@tabler/icons-react";

export const SignUpAction = (SignUpData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Category Creating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.post(
      `${baseUrl}/user/register`,
      SignUpData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "SIGNUP_SUCCESS", payload: data });
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({ type: "SIGNUP_FAILED", payload: error?.response?.data?.error });
  }
};

export const LoginAction = (LoginData) => async (dispatch) => {
  let toast_id;
  try {
    dispatch({ type: "SIGNIN_REQUEST" });
    const { data } = await axios.post(
      `${baseUrl}/user/login`,
      LoginData,
      config
    );
    dispatch({ type: "SIGNIN_SUCCESS", payload: data });
    toast_id = toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data.message,
    });
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({ type: "SIGNIN_FAILED", payload: error?.response?.data?.error });
  }
};
export const ProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PROFILE_REQUEST" });
    const { data } = await axios.get(`${baseUrl}/user/profile`, config);
    dispatch({ type: "PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PROFILE_FAILED", payload: error?.response?.data?.error });
  }
};
export const LogoutAction = () => async (dispatch) => {
  let toast_id;
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    const { data } = await axios.put(`${baseUrl}/user/logout`, null, config);
    toast_id = toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "LOGOUT_SUCCESS", payload: data });
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({ type: "LOGOUT_FAILED", payload: error?.response?.data?.error });
  }
};
