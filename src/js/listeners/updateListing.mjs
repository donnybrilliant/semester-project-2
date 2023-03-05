import { read, remove } from "../api/listings/index.mjs";
import { updateListingHandler } from "../handlers/updateListing.mjs";

export async function setUpdateListingListener() {
  const form = document.querySelector("#updateListingForm");
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const submitButton = form.querySelector("button[type='submit']");
    const deleteButton = form.querySelector("button#deleteButton");
    deleteButton.disabled = true;
    submitButton.disabled = true;

    const data = await read(id);

    form.title.value = data.title;
    form.description.value = data.description;
    form.tags.value = data.tags;

    // adds more containers for media input fields
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
      updateListingHandler(event, data.id);
    });

    // DELETE another listener
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      remove(data.id);
      //if response.ok should be here or somewhere else? æææ
      //successmessage
    });
  }
}
