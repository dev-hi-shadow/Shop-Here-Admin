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
  try {
    const { data } = await axios.post(
      `${baseUrl}/category/create`,
      CategoryData,
      config
    );
    dispatch({ type: "CATEGORY_CREATE_SUCCESS", payload: data });

    dispatch(GetCategoryAction());
  } catch (error) {
    dispatch({
      type: "CATEGORY_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditCategoryAction = (CategoryData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/category/update/${CategoryData?._id}`,
      CategoryData,
      config
    );
    dispatch({ type: "CATEGORY_EDIT_SUCCESS", payload: data });
    dispatch(GetCategoryAction());
  } catch (error) {
    dispatch({
      type: "CATEGORY_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteCategoryAction = (CategoryData) => async (dispatch) => {
  console.log(" CategoryData", CategoryData);

  try {
    const { data } = await axios.put(
      `${baseUrl}/category/delete-recover/${CategoryData?._id}`,
      { is_deleted: CategoryData?.is_deleted },
      config
    );
    dispatch({ type: "CATEGORY_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetCategoryAction());
  } catch (error) {
    dispatch({
      type: "CATEGORY_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
