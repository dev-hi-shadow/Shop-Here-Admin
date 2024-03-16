import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

export const GetUsersAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/users`, config);
    dispatch({ type: "USER_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateUsersAction = (UsersData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/users/create`,
      UsersData,
      config
    );
    dispatch({ type: "USER_CREATE_SUCCESS", payload: data });

    dispatch(GetUsersAction());
  } catch (error) {
    dispatch({
      type: "USER_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditUsersAction = (UsersData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/users/update/${UsersData?.id}`,
      UsersData,
      config
    );
    dispatch({ type: "USER_EDIT_SUCCESS", payload: data });
    dispatch(GetUsersAction());
  } catch (error) {
    dispatch({
      type: "USER_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteUsersAction = (UsersData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/users/delete-recover/${UsersData?.id}`,
      { is_deleted: UsersData?.is_deleted },
      config
    );
    dispatch({ type: "USER_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetUsersAction());
  } catch (error) {
    dispatch({
      type: "USER_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
