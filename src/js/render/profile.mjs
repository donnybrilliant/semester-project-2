import { read, readBids, readListings } from "../api/profiles/read.mjs";
import {
  renderProfileInfoTemplate,
  renderProfileListingsTemplate,
} from "../templates/profile.mjs";
import { read as readListing } from "../api/listings/read.mjs";

export async function profile() {
  //if url is /profiles/
  const url = new URL(location.href);
  const userName = url.searchParams.get("name");

  const profileInfo = await read(userName);
  console.log(profileInfo);
  renderProfileInfoTemplate(profileInfo);

  const profileListings = await readListings(userName);
  console.log(profileListings);
  const profileListingsContainer = document.querySelector("#profileListings");
  renderProfileListingsTemplate(profileListings, profileListingsContainer);
  //or use the same call as profileInfo? you also get _count on readListings though.
  /*   const profileListings = await read(userName);
  const profileListingsContainer = document.querySelector("#profileListings");
  renderProfileListingsTemplate(
    profileListings.listings,
    profileListingsContainer
  ); */

  const profileBids = await readBids(userName);
  console.log(profileBids);
  const profileBidsContainer = document.querySelector("#profileBids");
  renderProfileListingsTemplate(profileBids, profileBidsContainer);

  const profileWins = profileInfo.wins;
  console.log(profileWins);

  // find win amount
  // loop through profileWins and get the listing data for each win and return a new array with the listing data
  const profileWinsWithListingData = [];
  for (let i = 0; i < profileWins.length; i++) {
    const listing = await readListing(profileWins[i]);
    listing.win = true;
    if (listing.errors) {
      continue;
    }
    profileWinsWithListingData.push(listing);
  }
  console.log(profileWinsWithListingData);

  const profileWinsContainer = document.querySelector("#profileWins");
  renderProfileListingsTemplate(
    profileWinsWithListingData,
    profileWinsContainer
  );
}
