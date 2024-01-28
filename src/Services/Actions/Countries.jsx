import axios from "axios";
import { config } from "../../assets/Configurations/Config";
import { toast } from "react-toastify";
import { IconAlertCircleFilled } from "@tabler/icons-react";

export const GetCountriesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/all`,
      config
    );
     console.log(" data", data)
     dispatch({ type: "COUNTRIES_GET_SUCCESS", payload: data });
  } catch (error) {
    toast.error(`Countries Fetching issue.... `, {
      icon: <IconAlertCircleFilled />,
    });

    dispatch({
      type: "COUNTRIES_GET_SUCCESS",
      payload: error?.response?.data?.error,
    });
  }
};
