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
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "Could not place bid.";
    throw new Error(error);
  }
}

export async function read(id) {
  if (!id) {
    throw new Error("Requires a listing ID");
  }

  const readListingURL = URL + "/listings/" + id + "?_seller=true&_bids=true";
  const response = await authFetch(readListingURL);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "Could not place bid.";
    throw new Error(error);
  }
}

export async function readTag(tag) {
  if (!tag) {
    throw new Error("Requires a tag");
  }
  const readTagURL = `${URL}/listings?_tag=${tag}&_seller=true&_bids=true`;
  const response = await authFetch(readTagURL);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "Could not place bid.";
    throw new Error(error);
  }
}
