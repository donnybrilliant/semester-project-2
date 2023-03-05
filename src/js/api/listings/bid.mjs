import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function bid(id, bid) {
  if (!id || !bid) {
    throw new Error("Bid requires an ID & amount");
  }
  const bidListingURL = URL + "/listings/" + id + "/bids";
  const method = "post";

  const response = await authFetch(bidListingURL, {
    method,
    body: JSON.stringify(bid),
  });

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
