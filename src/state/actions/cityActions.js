import { ADD_CITY, REMOVE_CITY, ADD_CITY_DETAILS } from "../contexts";
import axios from "axios";

export const addCity = city => dispatch => {
  dispatch({
    type: ADD_CITY,
    payload: { city }
  });
  getCityDetails(city.id);
};
export const removeCity = cityId => ({
  type: REMOVE_CITY,
  payload: { cityId }
});

export const getCityDetails = id => async dispatch => {
  const details = { population: 100, weather: "perfect" }; //await axios.get("http://google.com");
  dispatch({ type: ADD_CITY_DETAILS, payload: { id, details } });
};