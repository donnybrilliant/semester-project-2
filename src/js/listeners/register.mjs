import { registerHandler } from "../handlers/register.mjs";

export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");
  if (form) {
    form.addEventListener("submit", registerHandler);
  }
}
