import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetCategoryAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/category`, config);
    dispatch({ type: "CATEGORY_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CATEGORY_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateCategoryAction = (CategoryData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Category Creating.... `, { icon: <IconLoader3 /> });

    const { data } = await axios.post(
      `${baseUrl}/category/create`,
      CategoryData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "CATEGORY_CREATE_SUCCESS", payload: data });

    dispatch(GetCategoryAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "CATEGORY_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditCategoryAction = (CategoryData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Category Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/category/update/${CategoryData?._id}`,
      CategoryData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "CATEGORY_EDIT_SUCCESS", payload: data });
    dispatch(GetCategoryAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "CATEGORY_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteCategoryAction = (CategoryData) => async (dispatch) => {
  console.log(" CategoryData", CategoryData);
  let toast_id;

  try {
    toast_id = toast.info(
      `Category ${CategoryData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.put(
      `${baseUrl}/category/delete-recover/${CategoryData?._id}`,
      { is_deleted: CategoryData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "CATEGORY_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetCategoryAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "CATEGORY_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
