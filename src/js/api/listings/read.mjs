import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function readAll(
  sort = "created",
  order = "desc",
  offset = 0,
  limit = 100,
  active = "true"
) {
  const readListingsURL = `${URL}/listings?_seller=true&_bids=true&sort=${sort}&sortOrder=${order}&offset=${offset}&limit=${limit}&_active=${active}`;

  const response = await authFetch(readListingsURL);
  if (!response.ok) {
    console.log(response); // render something here . responseHandler
  }
  return response.json();
}

export async function read(id) {
  if (!id) {
    throw new Error("Requires a listing ID"); // render something here?
  }

  const readListingURL = URL + "/listings/" + id + "?_seller=true&_bids=true";

  const response = await authFetch(readListingURL);
  if (!response.ok) {
    console.log(response);
  }
  return response.json();
}

export async function readTag(tag) {
  const readTagURL = `${URL}/listings?_tag=${tag}&_seller=true&_bids=true`;

  const response = await authFetch(readTagURL);
  if (!response.ok) {
    console.log(response); // render something here . responseHandler
  }
  return response.json();
}
