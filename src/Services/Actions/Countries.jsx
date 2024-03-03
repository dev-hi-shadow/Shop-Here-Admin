import axios from "axios";
import { config } from "../../assets/Configurations/Config";

import { IconAlertCircleFilled } from "@tabler/icons-react";

export const GetCountriesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/all`,
      config
    );
    dispatch({ type: "COUNTRIES_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "COUNTRIES_GET_SUCCESS",
      payload: error?.response?.data?.error,
    });
  }
};
