import { FETCH_ALL, SAVE_NEW } from "../types/actionTypes";
import * as api from "../../api/getDetails";

export const getDetails = () => async (dispatch) => {
  try {
    const response = await api.getDetails();
    dispatch({ type: FETCH_ALL, payload: response });
  } catch (err) {
    console.log(err);
  }
};

export const saveDetails = (details) => async (dispatch) => {
  try {
    const response = await api.saveDetails(details);
    dispatch({ type: SAVE_NEW, payload: response });
  } catch (err) {
    console.log(err);
  }
};
