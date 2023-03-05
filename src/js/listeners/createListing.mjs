import { createListingHandler } from "../handlers/createListing.mjs";
import { datetimeLocal } from "../utils/date.mjs";

export function setCreateListingListener() {
  const form = document.querySelector("#newListingForm");
  if (form) {
    form.addEventListener("submit", createListingHandler);
    // Sets the minimum date for the date input field to today
    const newListingModal = document.getElementById("newListingModal");
    newListingModal.addEventListener("shown.bs.modal", (event) => {
      newListingModal
        .querySelector("#newListingDate")
        .setAttribute("min", datetimeLocal(new Date()));
      newListingModal.querySelector("#newListingDate").value = datetimeLocal(
        new Date()
      );
    });
  }
}
