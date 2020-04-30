import { get } from "svelte/store";
import { authToken } from "../stores/user";
import { config } from "../util/config";

function validateResponse(res) {
  return res.ok ? res.json().then(({ data }) => data) : Promise.reject(res);
}

function validFetch(query) {
  return fetch(
    `${config.serverUrl}/graphql`,
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${get(authToken)}`,
      },
      body: JSON.stringify({ query })
    }
  ).then(validateResponse)
}

export const queryData = (query) => {
  return validFetch(`query ${query}`)
};
