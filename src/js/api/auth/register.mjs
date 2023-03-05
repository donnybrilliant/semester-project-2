import { URL } from "../constants.mjs";

export async function register(user) {
  const registerURL = URL + "/auth/register";
  const method = "post";
  const body = JSON.stringify(user);

  // make more functional? dry
  const response = await fetch(registerURL, {
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
      : "There was an error registering.";
    throw new Error(error);
  }
}
