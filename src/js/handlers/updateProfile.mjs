import { update } from "../api/profiles/update.mjs";
import { renderResponseMessage } from "../templates/response.mjs";

export async function updateProfileHandler(event, name) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());
  profile.name = name;

  const container = document.querySelector("#updateProfileResponse");
  try {
    const result = await update(profile);
    renderResponseMessage(
      "Profile successfully updated.",
      container,
      "success"
    );
    setTimeout(() => location.reload(), 1000);
  } catch (error) {
    renderResponseMessage(error.message, container, "danger");
  }
}
