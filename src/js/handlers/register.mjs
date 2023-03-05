import { register } from "../api/auth/register.mjs";
import { renderResponseMessage } from "../templates/response.mjs";

export async function registerHandler(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  const container = document.querySelector("#registerResponse");
  try {
    const result = await register(user);
    renderResponseMessage("You are now registered.", container, "success");
    setTimeout(() => {
      const registerModal = bootstrap.Modal.getInstance("#registerModal");
      registerModal.hide();
      const loginModal = bootstrap.Modal.getInstance("#loginModal");
      loginModal.show();
      const loginResponseContainer = document.querySelector("#loginResponse");
      renderResponseMessage(
        "Please log in.",
        loginResponseContainer,
        "success"
      );
    }, 800);
  } catch (error) {
    renderResponseMessage(error.message, container, "danger");
  }
}
