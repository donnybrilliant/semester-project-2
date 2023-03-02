import { update } from "../api/listings/update.mjs";
import { read } from "../api/listings/read.mjs";
import { remove } from "../api/listings/delete.mjs";

export async function updateListingListener() {
  const form = document.querySelector("#updateListingForm");

  // do i have to do this again?
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const submitButton = form.querySelector("button[type='submit']");
    const deleteButton = form.querySelector("button#deleteButton");
    deleteButton.disabled = true;
    submitButton.disabled = true;

    // do i have to do this again? pass it in?
    const data = await read(id);

    form.title.value = data.title;

    form.description.value = data.description;

    form.tags.value = data.tags;

    if (data.media.length) {
      const firstInput = document.querySelector("#mediaContainer input");
      firstInput.value = data.media[0];
      if (data.media.length > 1) {
        for (let i = 1; i < data.media.length; i++) {
          const input = firstInput.cloneNode(true);
          input.value = data.media[i];
          const container = document.createElement("div");
          container.classList.add("input-group", "mb-3");
          form.querySelector("#mediaContainer").appendChild(container);
          container.appendChild(input);
        }
      }
    }

    submitButton.disabled = false;
    deleteButton.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const listing = Object.fromEntries(formData.entries());
      listing.id = id;
      listing.tags = Array.from(listing.tags.split(","));
      listing.tags = listing.tags.filter((tags) => tags.trim() !== "");
      listing.tags = listing.tags.map((tag) => tag.trim());
      listing.media = formData.getAll("media");
      listing.media = listing.media.filter((media) => media !== "");
      update(listing);
      //successmessage here or in create()?
      // responseHandler
    });

    // DELETE
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      remove(data.id);
      //if response.ok should be here or somewhere else? æææ
      //successmessage
    });
  }
}
