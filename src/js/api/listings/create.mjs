import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function create(data) {
  const createListingURL = URL + "/listings";
  const method = "post";

  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log(response); // render something here . responseHandler
  }
  return response.json();
}
