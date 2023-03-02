import { authFetch } from "../authFetch.mjs";
import { URL } from "../constants.mjs";

export async function read(name) {
  if (!name) {
    throw new Error("Requires a profile name"); // if not logged in show error too
  }
  const profileURL = URL + "/profiles/" + name + "?_listings=true";

  const response = await authFetch(profileURL);
  if (!response.ok) {
    console.log(response);
    // responsehandler no such user?
  } else {
    return response.json();
  }
}

export async function readListings(name) {
  if (!name) {
    throw new Error("Requires a profile name"); // if not logged in show error too
  }
  const listingsURL = URL + "/profiles/" + name + "/listings";

  const response = await authFetch(listingsURL);
  if (!response.ok) {
    console.log(response);
    // responsehandler no such user?
  } else {
    return response.json();
  }
}

export async function readBids(name) {
  if (!name) {
    throw new Error("Requires a profile name"); // if not logged in show error too
  }
  const bidsURL = URL + "/profiles/" + name + "/bids?_listings=true";

  const response = await authFetch(bidsURL);
  if (!response.ok) {
    console.log(response);
    // responsehandler no such user?
  } else {
    return response.json();
  }
}
