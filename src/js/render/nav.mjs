import { loggedIn } from "../utils/loggedIn.mjs";
import { setLogoutListener } from "../handlers/logout.mjs";
import * as storage from "../storage/index.mjs";

export function renderNav() {
  if (loggedIn()) {
    const user = storage.load("user");
    const nav = document.querySelector("nav");
    const navControls = document.querySelector("#navControls");
    navControls.innerHTML = `
    <button type="button" class="btn btn-success rounded-circle" data-bs-target="#newListingModal"
    data-bs-toggle="modal" data-bs-dismiss="modal" title="Add new listing">
    <i class="bi bi-plus-circle"></i>
  </button>
  <button class="navbar-toggler collapsed border-0" type="button" data-bs-toggle="collapse"
    data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
    aria-label="Toggle navigation">
    <img src="/assets/images/placeholder.jpeg" alt="Navigation" width="38" height="38" class="rounded-circle">
  </button>`;
    navControls.querySelector("img").src = user.avatar;
    nav.querySelector("#userNameMenu>a").innerText = user.name;
    nav.querySelector("#userNameMenu>a").href = `/profile/?name=${user.name}`;
    nav.querySelector("span#creditsMenu").innerText = user.credits;
    nav.querySelector("#profileLink").href = `/profile/?name=${user.name}`;
    setLogoutListener();
  }
}
