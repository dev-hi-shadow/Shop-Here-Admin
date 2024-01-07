import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetSubCategoryAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/sub-category`, config);
    dispatch({ type: "SUBCATEGORY_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SUBCATEGORY_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateSubCategoryAction =
  (SubCategoryData) => async (dispatch) => {
    let toast_id;
    try {
      toast_id = toast.info(`SubCategory Creating.... `, {
        icon: <IconLoader3 />,
      });

      const { data } = await axios.post(
        `${baseUrl}/sub-category/create`,
        SubCategoryData,
        config
      );
      toast_id = toast.update(toast_id, {
        type: "success",

        icon: <IconChecks />,
        render: data.message,
      });
      dispatch({ type: "SUBCATEGORY_CREATE_SUCCESS", payload: data });

      dispatch(GetSubCategoryAction());
    } catch (error) {
      toast.update(toast_id, {
        type: error,
        icon: <IconAlertCircleFilled />,
        render: error?.response?.data?.error,
      });
      dispatch({
        type: "SUBCATEGORY_CREATE_FAILED",
        payload: error?.response?.data?.error,
      });
    }
  };

export const EditSubCategoryAction = (SubCategoryData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`SubCategory Updating.... `, {
      icon: <IconLoader3 />,
    });
    const { data } = await axios.put(
      `${baseUrl}/sub-category/update/${SubCategoryData?._id}`,
      SubCategoryData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "SUBCATEGORY_EDIT_SUCCESS", payload: data });
    dispatch(GetSubCategoryAction());
  } catch (error) {
    console.log(" error", error);
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "SUBCATEGORY_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteSubCategoryAction =
  (SubCategoryData) => async (dispatch) => {
    console.log(" SubCategoryData", SubCategoryData);
    let toast_id;

    try {
      toast_id = toast.info(
        `SubCategory ${
          SubCategoryData?.is_deleted ? "Deleting" : "Recovering"
        }.... `,
        { icon: <IconLoader3 /> }
      );

      const { data } = await axios.put(
        `${baseUrl}/sub-category/delete-recover/${SubCategoryData?._id}`,
        { is_deleted: SubCategoryData?.is_deleted },
        config
      );
      toast.update(toast_id, {
        type: "success",
        icon: <IconChecks />,
        render: data?.message,
      });
      dispatch({ type: "SUBCATEGORY_DELETE_RECOVER_SUCCESS", payload: data });
      dispatch(GetSubCategoryAction());
    } catch (error) {
      toast.update(toast_id, {
        type: "error",
        icon: <IconAlertCircleFilled color="danger" />,
        render: error?.response?.data?.error,
      });
      dispatch({
        type: "SUBCATEGORY_DELETE_RECOVER_FAILED",
        payload: error?.response?.data?.error,
      });
    }
  };
