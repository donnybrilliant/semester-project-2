import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function update(data) {
  if (!data.id) {
    throw new Error("Update requires an ID");
  }

  const updateListingURL = URL + "/listings/" + data.id;
  const method = "put";

  const response = await authFetch(updateListingURL, {
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
      : "There was an error updating the listing.";
    throw new Error(error);
  }
}
