import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

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
  let toast_id;
  try {
    toast_id = toast.info(`Users Creating.... `, { icon: <IconLoader3 /> });

    const { data } = await axios.post(
      `${baseUrl}/users/create`,
      UsersData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",

      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "USER_CREATE_SUCCESS", payload: data });

    dispatch(GetUsersAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "USER_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditUsersAction = (UsersData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Users Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/users/update/${UsersData?._id}`,
      UsersData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "USER_EDIT_SUCCESS", payload: data });
    dispatch(GetUsersAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "USER_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteUsersAction = (UsersData) => async (dispatch) => {
  console.log(" UsersData", UsersData);
  let toast_id;

  try {
    toast_id = toast.info(
      `Users ${UsersData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );
    const { data } = await axios.put(
      `${baseUrl}/users/delete-recover/${UsersData?._id}`,
      { is_deleted: UsersData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "USER_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetUsersAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "USER_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
