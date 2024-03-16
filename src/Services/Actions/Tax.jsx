import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

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
  try {
    const { data } = await axios.post(`${baseUrl}/tax/create`, TaxData, config);
    dispatch({ type: "TAX_CREATE_SUCCESS", payload: data });
    dispatch(GetTaxAction());
  } catch (error) {
    dispatch({
      type: "TAX_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditTaxAction = (TaxData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/tax/update/${TaxData?.id}`,
      TaxData,
      config
    );
    dispatch({ type: "TAX_EDIT_SUCCESS", payload: data });
    dispatch(GetTaxAction());
  } catch (error) {
    dispatch({
      type: "TAX_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteTaxAction = (TaxData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/tax/delete-recover/${TaxData?.id}`,
      { is_deleted: TaxData?.is_deleted },
      config
    );
    dispatch({ type: "TAX_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetTaxAction());
  } catch (error) {
    dispatch({
      type: "TAX_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
