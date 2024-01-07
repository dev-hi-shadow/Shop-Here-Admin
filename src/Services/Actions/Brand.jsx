import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetBrandAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/brand`, config);
    dispatch({ type: "BRAND_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "BRAND_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateBrandAction = (BrandData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Brand Creating.... `, { icon: <IconLoader3 /> });

    const { data } = await axios.post(
      `${baseUrl}/brand/create`,
      BrandData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",

      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "BRAND_CREATE_SUCCESS", payload: data });

    dispatch(GetBrandAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "BRAND_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditBrandAction = (BrandData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Brand Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/brand/update/${BrandData?._id}`,
      BrandData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "BRAND_EDIT_SUCCESS", payload: data });
    dispatch(GetBrandAction());
  } catch (error) {
    console.log(" error", error);
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "BRAND_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteBrandAction = (BrandData) => async (dispatch) => {
  console.log(" BrandData", BrandData);
  let toast_id;

  try {
    toast_id = toast.info(
      `Brand ${BrandData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.put(
      `${baseUrl}/brand/delete-recover/${BrandData?._id}`,
      { is_deleted: BrandData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "BRAND_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetBrandAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "BRAND_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
