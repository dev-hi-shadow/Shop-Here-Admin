import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetAddressesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/addresses`, config);
     dispatch({ type: "ADDRESSES_GET_SUCCESS", payload: data });
  } catch (error) {
    toast.error(
        
        `Addresses Fetching Error `, { icon: <IconAlertCircleFilled /> }
    )
     dispatch({
      type: "ADDRESSES_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateAddressesAction = (AddressesData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Addresses Creating.... `, { icon: <IconLoader3 /> });

    const { data } = await axios.post(
      `${baseUrl}/addresses/create`,
      AddressesData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",

      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "ADDRESSES_CREATE_SUCCESS", payload: data });

    dispatch(GetAddressesAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "ADDRESSES_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditAddressesAction = (AddressesData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Addresses Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/addresses/update/${AddressesData?._id}`,
      AddressesData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "ADDRESSES_EDIT_SUCCESS", payload: data });
    dispatch(GetAddressesAction());
  } catch (error) {
     toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "ADDRESSES_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteAddressesAction = (AddressesData) => async (dispatch) => {
  let toast_id;

  try {
    toast_id = toast.info(
      `Addresses ${AddressesData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.put(
      `${baseUrl}/addresses/delete-recover/${AddressesData?._id}`,
      { is_deleted: AddressesData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "ADDRESSES_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetAddressesAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "ADDRESSES_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
