import { remove } from "../storage/index.mjs";

export function setLogoutListener() {
  const button = document.querySelector("#logOutButton");

  if (button) {
    button.addEventListener("click", (event) => {
      remove("accessToken");
      remove("user");
      location.href = "/";
    });
  }
}
