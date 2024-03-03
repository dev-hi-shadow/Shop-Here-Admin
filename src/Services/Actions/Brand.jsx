import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

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
  try {
    const { data } = await axios.post(
      `${baseUrl}/brand/create`,
      BrandData,
      config
    );
    dispatch({ type: "BRAND_CREATE_SUCCESS", payload: data });

    dispatch(GetBrandAction());
  } catch (error) {
    dispatch({
      type: "BRAND_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditBrandAction = (BrandData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/brand/update/${BrandData?._id}`,
      BrandData,
      config
    );
    dispatch({ type: "BRAND_EDIT_SUCCESS", payload: data });
    dispatch(GetBrandAction());
  } catch (error) {
    dispatch({
      type: "BRAND_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteBrandAction = (BrandData) => async (dispatch) => {
  console.log(" BrandData", BrandData);

  try {
    const { data } = await axios.put(
      `${baseUrl}/brand/delete-recover/${BrandData?._id}`,
      { is_deleted: BrandData?.is_deleted },
      config
    );
    dispatch({ type: "BRAND_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetBrandAction());
  } catch (error) {
    dispatch({
      type: "BRAND_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
