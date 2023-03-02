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

  return response.json();
}
