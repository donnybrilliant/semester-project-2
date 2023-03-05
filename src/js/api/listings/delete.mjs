import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function remove(id) {
  if (!id) {
    throw new Error("Delete requires an ID");
  }

  const removeListingURL = URL + "/listings/" + id;
  const method = "delete";

  const response = await authFetch(removeListingURL, {
    method,
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "Could not delete listing.";
    throw new Error(error);
  }
}
