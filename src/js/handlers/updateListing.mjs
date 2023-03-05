import { update } from "../api/listings/update.mjs";
import { renderResponseMessage } from "../templates/response.mjs";

export async function updateListingHandler(event, id) {
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

  const container = document.querySelector("#updateResponse");
  try {
    const result = await update(listing);
    renderResponseMessage(
      "Listing successfully updated.",
      container,
      "success"
    );
    setTimeout(() => location.assign(`/listing/?id=${result.id}`), 1000);
  } catch (error) {
    renderResponseMessage(error.message, container, "danger");
  }
}
