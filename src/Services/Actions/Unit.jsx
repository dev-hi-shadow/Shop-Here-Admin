import axios from "axios";
import { baseUrl, config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import {
  IconAlertCircleFilled,
  IconChecks,
  IconLoader3,
} from "@tabler/icons-react";

export const GetUnitAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/unit`, config);
    dispatch({ type: "UNIT_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UNIT_GET_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const CreateUnitAction = (UnitData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/unit/create`,
      UnitData,
      config
    );
    dispatch({ type: "UNIT_CREATE_SUCCESS", payload: data });

    dispatch(GetUnitAction());
  } catch (error) {
    dispatch({
      type: "UNIT_CREATE_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const EditUnitAction = (UnitData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/unit/update/${UnitData?._id}`,
      UnitData,
      config
    );
    dispatch({ type: "UNIT_EDIT_SUCCESS", payload: data });
    dispatch(GetUnitAction());
  } catch (error) {
    dispatch({
      type: "UNIT_EDIT_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};

export const DeleteUnitAction = (UnitData) => async (dispatch) => {
  console.log(" UnitData", UnitData);

  try {
    const { data } = await axios.put(
      `${baseUrl}/unit/delete-recover/${UnitData?._id}`,
      { is_deleted: UnitData?.is_deleted },
      config
    );
    dispatch({ type: "UNIT_DELETE_RECOVER_SUCCESS", payload: data });
    dispatch(GetUnitAction());
  } catch (error) {
    dispatch({
      type: "UNIT_DELETE_RECOVER_FAILED",
      payload: error?.response?.data?.error,
    });
  }
};
