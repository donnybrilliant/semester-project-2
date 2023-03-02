import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function bid(id, bid) {
  const bidListingURL = URL + "/listings/" + id + "/bids";
  const method = "post";

  console.log(bidListingURL, method, JSON.stringify(bid), bid);

  const response = await authFetch(bidListingURL, {
    method,
    body: JSON.stringify(bid),
  });

  if (!response.ok) {
    console.log(response); // render something here . responseHandler
  }
  return response.json();
}
