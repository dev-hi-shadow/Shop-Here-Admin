import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";

export const DeleteAttributeValueAction =
  (AttributeData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/attribute/value/delete/${AttributeData?._id}`,
        AttributeData,
        config
      );
      dispatch({ type: "ATTRIBUTE_DELETE_VALUE_SUCCESS", payload: data });
      dispatch(GetAttributeAction());
    } catch (error) {
      dispatch({
        type: "ATTRIBUTE_DELETE_VALUE_FAILED",
        payload: error?.response?.data?.error,
      });
    }
  };
export const AddAttributeValueAction = (AttributeData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/attribute/value/add/${AttributeData?._id}`,
      AttributeData,
      config
    );
    dispatch({ type: "ATTRIBUTE_ADD_VALUE_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    dispatch({
      type: "ATTRIBUTE_ADD_VALUE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const GetAttributeAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/attribute`, config);
    dispatch({ type: "ATTRIBUTE_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ATTRIBUTE_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateAttributeAction = (AttributeData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/attribute/create`,
      AttributeData,
      config
    );
    dispatch({ type: "ATTRIBUTE_CREATE_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    dispatch({
      type: "ATTRIBUTE_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditAttributeAction = (AttributeData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/attribute/update/${AttributeData?._id}`,
      AttributeData,
      config
    );
    dispatch({ type: "ATTRIBUTE_EDIT_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    dispatch({
      type: "ATTRIBUTE_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteAttributeAction = (AttributeData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/attribute/delete-recover/${AttributeData?._id}`,
      { is_deleted: AttributeData?.is_deleted },
      config
    );
    dispatch({ type: "ATTRIBUTE_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    dispatch({
      type: "ATTRIBUTE_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
