import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const DeleteAttributeValueAction =
  (AttributeData) => async (dispatch) => {
    let toast_id;
    try {
      toast_id = toast.info(`Attribute Value Deleting....`, {
        icon: <IconLoader3 />,
      });

      const { data } = await axios.put(
        `${baseUrl}/attribute/value/delete/${AttributeData?._id}`,
        AttributeData,
        config
      );
      toast.update(toast_id, {
        type: "success",
        icon: <IconChecks />,
        render: data?.message,
      });
      toast.update(toast_id, {
        type: "success",
        icon: <IconChecks />,
        render: data?.message,
      });
      dispatch({ type: "ATTRIBUTE_DELETE_VALUE_SUCCESS", payload: data });
      dispatch(GetAttributeAction());
    } catch (error) {
      toast.update(toast_id, {
        type: "error",
        icon: <IconAlertCircleFilled color="danger" />,
        render: error?.response?.data?.error,
      });
      dispatch({
        type: "ATTRIBUTE_DELETE_VALUE_FAILED",
        payload: error?.response?.data?.error,
      });
    }
  };
export const AddAttributeValueAction = (AttributeData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(
      `Attribute ${AttributeData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.post(
      `${baseUrl}/attribute/value/add/${AttributeData?._id}`,
      AttributeData,
      config
    );
    dispatch({ type: "ATTRIBUTE_ADD_VALUE_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
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
  let toast_id;
  try {
    toast_id = toast.info(`Attribute Creating.... `, { icon: <IconLoader3 /> });

    const { data } = await axios.post(
      `${baseUrl}/attribute/create`,
      AttributeData,
      config
    );
    toast_id = toast.update(toast_id, {
      type: "success",

      icon: <IconChecks />,
      render: data.message,
    });
    dispatch({ type: "ATTRIBUTE_CREATE_SUCCESS", payload: data });

    dispatch(GetAttributeAction());
  } catch (error) {
    toast.update(toast_id, {
      type: error,
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "ATTRIBUTE_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditAttributeAction = (AttributeData) => async (dispatch) => {
  let toast_id;
  try {
    toast_id = toast.info(`Attribute Updating.... `, { icon: <IconLoader3 /> });
    const { data } = await axios.put(
      `${baseUrl}/attribute/update/${AttributeData?._id}`,
      AttributeData,
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "ATTRIBUTE_EDIT_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    console.log(" error", error);
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled />,
      render: error?.response?.data?.message,
    });
    dispatch({
      type: "ATTRIBUTE_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteAttributeAction = (AttributeData) => async (dispatch) => {
  console.log(" AttributeData", AttributeData);
  let toast_id;

  try {
    toast_id = toast.info(
      `Attribute ${AttributeData?.is_deleted ? "Deleting" : "Recovering"}.... `,
      { icon: <IconLoader3 /> }
    );

    const { data } = await axios.put(
      `${baseUrl}/attribute/delete-recover/${AttributeData?._id}`,
      { is_deleted: AttributeData?.is_deleted },
      config
    );
    toast.update(toast_id, {
      type: "success",
      icon: <IconChecks />,
      render: data?.message,
    });
    dispatch({ type: "ATTRIBUTE_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetAttributeAction());
  } catch (error) {
    toast.update(toast_id, {
      type: "error",
      icon: <IconAlertCircleFilled color="danger" />,
      render: error?.response?.data?.error,
    });
    dispatch({
      type: "ATTRIBUTE_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
