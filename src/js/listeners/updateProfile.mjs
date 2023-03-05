import { read } from "../api/profiles/read.mjs";
import { updateProfileHandler } from "../handlers/updateProfile.mjs";

export async function setUpdateProfileListener() {
  const form = document.querySelector("#updateProfileForm");
  const url = new URL(location.href);
  const username = url.searchParams.get("name");

  if (form) {
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;

    const data = await read(username);

    form.name.value = data.name;
    form.email.value = data.email;
    form.avatar.value = data.avatar;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      updateProfileHandler(event, data.name);
    });
  }
}
