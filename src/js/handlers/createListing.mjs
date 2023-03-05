import { create } from "../api/listings/index.mjs";
import { renderResponseMessage } from "../templates/response.mjs";

export async function createListingHandler(event) {
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
  const container = document.querySelector("#createResponse");
  try {
    const result = await create(listing);
    renderResponseMessage(
      "Listing successfully created.",
      container,
      "success"
    );
    setTimeout(() => location.assign(`/listing/?id=${result.id}`), 1000);
  } catch (error) {
    renderResponseMessage(error.message, container, "danger");
  }
}
