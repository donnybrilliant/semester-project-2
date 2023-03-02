import { URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { renderResponseMessage } from "../../templates/response.mjs"; // template?

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

  //own function! responseHandler?
  const container = document.querySelector("#loginResponse");

  if (!response.ok) {
    const error = result.errors[0].message;
    return renderResponseMessage(error, container, "danger");
    // error handle this message more?
  }

  const { accessToken, ...userInfo } = result;

  storage.save("accessToken", accessToken);
  storage.save("user", userInfo);

  renderResponseMessage("You are logged in.", container, "success");

  setTimeout(() => location.reload(), 1000); // should be to listings
}
