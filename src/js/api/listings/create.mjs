import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function create(data) {
  const createListingURL = URL + "/listings";
  const method = "post";

  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "There was an error creating the listing.";
    throw new Error(error);
  }
}
