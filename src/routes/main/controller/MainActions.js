import {
  FETCH_CHARITIES,
  FETCH_PAYMENTS,
  UPDATE_TOTAL_DONATE,
  UPDATE_MESSAGE
} from "./ActionTypes";
import * as api from "../../../common/services/api/Api";
import { summaryDonations } from "../../../helpers";

export function fetchCharities(params = {}, block = true, cb) {
  return dispatch => {
    api
      .get("/charities", params, { block: block })
      .then(response => {
        console.log(response);
        if (response) {
          dispatch({
            type: FETCH_CHARITIES,
            payload: response
          });
        }
      })
      .catch(error => { });
  };
}
export function fetchPayments(params = {}, block = true, cb) {
  return dispatch => {
    api
      .get("/payments", params, { block: block })
      .then(response => {
        console.log(response);
        if (response && response.length && response.length > 0) {
          dispatch({
            type: FETCH_PAYMENTS,
            payload: summaryDonations(response.map(item => item.amount || 0))
          });

        }
      })
      .catch(error => { });
  };
}
export function updatePayment(params = {}, block = true, cb) {
  return dispatch => {
    api
      .post("/payments", params, { block: block })
      .then(response => {
        if (response) {
          dispatch({
            type: UPDATE_TOTAL_DONATE,
            payload: response.amount || 0
          });
          if (cb) cb(response);
        }
      })
      .catch(error => { });
  };
}
export function updateMessage(msg) {
  return dispatch => {
    dispatch({
      type: UPDATE_MESSAGE,
      payload: msg
    });
  }
}