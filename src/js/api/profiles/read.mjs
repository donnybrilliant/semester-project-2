import { authFetch } from "../authFetch.mjs";
import { URL } from "../constants.mjs";

export async function read(name) {
  if (!name) {
    throw new Error("Requires a profile name");
  }
  const profileURL = URL + "/profiles/" + name + "?_listings=true";

  const response = await authFetch(profileURL);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "There was an error reading the profile.";
    throw new Error(error);
  }
}

export async function readListings(name) {
  if (!name) {
    throw new Error("Requires a profile name");
  }
  const listingsURL = URL + "/profiles/" + name + "/listings";

  const response = await authFetch(listingsURL);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "There was an error reading the listings.";
    throw new Error(error);
  }
}

export async function readBids(name) {
  if (!name) {
    throw new Error("Requires a profile name");
  }
  const bidsURL = URL + "/profiles/" + name + "/bids?_listings=true";

  const response = await authFetch(bidsURL);
  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "There was an error reading the bids.";
    throw new Error(error);
  }
}
