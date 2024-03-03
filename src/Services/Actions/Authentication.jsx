import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

export const SignUpAction = (SignUpData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/signup`,
      SignUpData,
      config
    );
    dispatch({ type: "SIGNUP_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAILED", payload: error?.response?.data?.error });
  }
};

export const LoginAction = (LoginData) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNIN_REQUEST" });
    const { data } = await axios.post(
      `${baseUrl}/auth/signin`,
      LoginData,
      config
    );
    dispatch({ type: "SIGNIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SIGNIN_FAILED", payload: error?.response?.data?.error });
  }
};
export const ProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PROFILE_REQUEST" });
    const { data } = await axios.get(`${baseUrl}/users/profile`, config);
    dispatch({ type: "PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PROFILE_FAILED", payload: error?.response?.data?.error });
  }
};
export const LogoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    const { data } = await axios.delete(
      `${baseUrl}/userss/logout`,
      null,
      config
    );
    dispatch({ type: "LOGOUT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAILED", payload: error?.response?.data?.error });
  }
};
