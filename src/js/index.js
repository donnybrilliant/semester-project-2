import * as storage from "./storage/index.mjs";

import { listings } from "./render/listings.mjs";

import { profile } from "./render/profile.mjs";

import { loggedIn } from "./utils/loggedIn.mjs";

import { setLogoutListener } from "./handlers/logout.mjs";
import { setLoginFormListener } from "./listeners/login.mjs";
import { setRegisterFormListener } from "./listeners/register.mjs";
import { setCreateListingListener } from "./listeners/createListing.mjs";
import { setUpdateListingListener } from "./listeners/updateListing.mjs";
import { setUpdateProfileListener } from "./listeners/updateProfile.mjs";

setLoginFormListener();
setRegisterFormListener();

//readAll().then(console.log);

listings();

//profiles.read("donnybrilliant").then(console.log);
/* profiles.readListings("XXXX").then(console.log);
profiles.read("XXXX").then(console.log);
profiles.readBids("XXXX").then(console.log); */

profile();

// adds media input field
const addMediaButton = document.querySelector("#addMedia");
if (addMediaButton) {
  addMediaButton.addEventListener("click", () => {
    const mediaContainer = document.querySelector("#mediaContainer");
    const firstInput = document.querySelector("#mediaContainer input");
    const mediaInput = document.createElement("input");
    mediaInput.classList.add("form-control", "mb-3");
    mediaInput.setAttribute("type", "url");
    mediaInput.setAttribute("name", "media");
    mediaInput.value = firstInput.value;
    firstInput.value = "";
    mediaContainer.appendChild(mediaInput);
  });
}

setCreateListingListener();
setUpdateListingListener();

setUpdateProfileListener();

/* profiles.readBids("XXXX").then(console.log);
profiles.readListings("XXXX").then(console.log);
profiles.read("XXXX").then(console.log); */

//bidListener();

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

renderNav();
