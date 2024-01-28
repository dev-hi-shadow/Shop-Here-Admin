import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetTaxAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/tax`, config);
    dispatch({ type: "TAX_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "TAX_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateTaxAction = (TaxData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Tax Creating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.post(`${baseUrl}/tax/create`, TaxData, config);
    toast_id = toast.update(toast_id, {
      type: "success",

      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "TAX_CREATE_SUCCESS", payload: data });

    dispatch(GetTaxAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "TAX_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditTaxAction = (TaxData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Tax Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/tax/update/${TaxData?._id}`,
      TaxData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "TAX_EDIT_SUCCESS", payload: data });
    dispatch(GetTaxAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "TAX_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteTaxAction = (TaxData) => async (dispatch) => {
  console.log(" TaxData", TaxData);
  let toast_id;

  try {
    toast_id = toast.info(
      `Tax ${TaxData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.put(
      `${baseUrl}/tax/delete-recover/${TaxData?._id}`,
      { is_deleted: TaxData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "TAX_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetTaxAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "TAX_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
