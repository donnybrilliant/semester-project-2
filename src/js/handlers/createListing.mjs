import { create } from "../api/listings/index.mjs";
import { datetimeLocal } from "../utils/date.mjs";

export function createListingListener() {
  const form = document.querySelector("#newListingForm");

  if (form) {
    // shows current date in modal
    const newListingModal = document.getElementById("newListingModal");
    newListingModal.addEventListener("shown.bs.modal", (event) => {
      newListingModal
        .querySelector("#newListingDate")
        .setAttribute("min", new Date().toISOString().slice(0, -8));
      newListingModal.querySelector("#newListingDate").value = datetimeLocal(
        new Date()
      );
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());
      listing.tags = Array.from(listing.tags.split(","));
      listing.tags = listing.tags.filter((tags) => tags.trim() !== "");
      listing.tags = listing.tags.map((tag) => tag.trim());
      listing.media = formData.getAll("media");
      listing.media = listing.media.filter((media) => media !== "");
      listing.endsAt = new Date(listing.endsAt).toISOString();
      create(listing);
      //successmessage here or in create()?
    });
  }
}
