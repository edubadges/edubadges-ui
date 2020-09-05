import {get, } from "svelte/store";
import {authToken, showMainErrorDialog} from "../stores/user";
import {config} from "../util/config";

function badResponse(res) {
  showMainErrorDialog.set(true);
  return Promise.reject(res);
}

function validateResponse(res) {
  return res.ok ? res.json().then(({data}) => data) : badResponse(res);
}

export const queryData = (query, variables) => {
  return fetch(
    `${config.serverUrl}/graphql`,
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${get(authToken)}`,
      },
      body: JSON.stringify({
        query,
        variables
      })
    }
  ).then(validateResponse);
};
