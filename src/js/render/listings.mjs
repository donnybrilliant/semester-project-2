import { renderListingTemplate } from "../templates/listing.mjs";
import { renderListingTemplates } from "../templates/listings.mjs";
import { readAll, read } from "../api/listings/index.mjs";

export async function listings() {
  // if url is /listings/
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const container = document.querySelector("#listingsContainer");
  if (container) {
    if (id) {
      const listing = await read(id);
      renderListingTemplate(listing, container);
      container.classList.add("container-fluid");
    } else {
      const listings = await readAll();
      renderListingTemplates(listings, container);
      container.classList.add(
        "row",
        "row-cols-1",
        "row-cols-sm-3",
        "align-items-stretch"
      );
    }
  }
}
