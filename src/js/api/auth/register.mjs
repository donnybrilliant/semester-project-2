import { renderResponseMessage } from "../../templates/response.mjs";
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

  const container = document.querySelector("#registerResponse");

  if (!response.ok) {
    const error = result.errors[0].message;
    return renderResponseMessage(error, container, "danger");
  }

  renderResponseMessage("You are now registered.", container, "success");
  // to login modal or auto-login?
}
