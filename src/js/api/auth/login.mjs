import { URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

//make one function for login and register as they share many similarities.
export async function login(user) {
  const loginURL = URL + "/auth/login";
  const method = "post";
  const body = JSON.stringify(user);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "Log in error. Try again.";
    throw new Error(error);
  }
}
