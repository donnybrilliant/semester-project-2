import { login } from "../api/auth/login.mjs";
import { renderResponseMessage } from "../templates/response.mjs";
import * as storage from "../storage/index.mjs";

export async function loginHandler(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  const container = document.querySelector("#loginResponse");
  try {
    const result = await login(user);
    const { accessToken, ...userInfo } = result;
    storage.save("accessToken", accessToken);
    storage.save("user", userInfo);
    renderResponseMessage("Logging in...", container, "success");
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    renderResponseMessage(error.message, container, "danger");
  }
}
