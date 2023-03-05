import { loginHandler } from "../handlers/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", loginHandler);
  }
}
