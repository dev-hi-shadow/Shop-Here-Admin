import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

export const GetAddressesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/addresses`, config);
    dispatch({ type: "ADDRESSES_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ADDRESSES_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateAddressesAction = (AddressesData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/addresses/create`,
      AddressesData,
      config
    );
    dispatch({ type: "ADDRESSES_CREATE_SUCCESS", payload: data });
    dispatch(GetAddressesAction());
  } catch (error) {
    dispatch({
      type: "ADDRESSES_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditAddressesAction = (AddressesData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/addresses/update/${AddressesData?.id}`,
      AddressesData,
      config
    );
    dispatch({ type: "ADDRESSES_EDIT_SUCCESS", payload: data });
    dispatch(GetAddressesAction());
  } catch (error) {
    dispatch({
      type: "ADDRESSES_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteAddressesAction = (AddressesData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/addresses/delete-recover/${AddressesData?.id}`,
      { is_deleted: AddressesData?.is_deleted },
      config
    );
    dispatch({ type: "ADDRESSES_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetAddressesAction());
  } catch (error) {
    dispatch({
      type: "ADDRESSES_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
