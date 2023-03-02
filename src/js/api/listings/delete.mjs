import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function remove(id) {
  /*   if (id) {
    throw new Error("Delete requires an ID");
  } */

  const removeListingURL = URL + "/listings/" + id;
  const method = "delete";

  const response = await authFetch(removeListingURL, {
    method,
  });

  return response;
}
