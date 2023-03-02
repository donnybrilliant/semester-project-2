import { dateCountdown } from "../utils/date.mjs";

export function profileInfoTemplate(data) {
  const container = document.querySelector("#profileInfo");
  container.querySelector("h5").innerText = data.name;
  container.querySelector("#profileInfoEmail").innerText = data.email;
  if (data.avatar) {
    container.querySelector("#avatar").src = data.avatar;
  }
  container.querySelector("#profileInfoCredits").innerText =
    data.credits + " credits";

  container.querySelector("#profileInfoListings").innerText =
    data.listings.length + " listings";

  //make function for this type of plural thing, same with listings above
  if (!data.wins.length) {
    container.querySelector("#profileInfoBidsWins").innerText = "0 wins";
  } else if (data.wins.length === 1) {
    container.querySelector("#profileInfoBidsWins").innerText =
      data.wins.length + " win";
  } else {
    container.querySelector("#profileInfoBidsWins").innerText =
      data.wins.length + " wins";
  }
}

//neccessary?
export function renderProfileInfoTemplate(data) {
  return profileInfoTemplate(data);
}

export function profileListingsTemplate(data) {
  const listElement = document.createElement("a");
  listElement.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "list-group-item-action"
  );
  listElement.innerHTML = `
  <div class="col-8">
  <img class="rounded-circle me-2" width="32px" height="32px">
  <span>hello</span>
  </div>
  <div class="col-2"></div>
  <div class="col-2 d-flex"></div>
  `;

  if (data.listing) {
    listElement.href = "/listing/?id=" + data.listing.id;
    listElement.querySelector("img").src = data.listing.media[0];
    listElement.querySelector("span").innerText = data.listing.title;
    listElement.querySelectorAll("div")[1].innerText = data.amount;
    listElement.querySelectorAll("div")[1].innerHTML +=
      '<i class="bi bi-coin ms-1"></i>';
    listElement.querySelectorAll("div")[2].innerText = dateCountdown(
      data.listing.endsAt
    );
  } else {
    listElement.href = "/listing/?id=" + data.id;
    listElement.querySelector("img").src = data.media[0];
    listElement.querySelector("span").innerText = data.title;
    listElement.querySelectorAll("div")[2].innerText = dateCountdown(
      data.endsAt
    );
  }

  listElement.querySelectorAll("div")[2].innerHTML +=
    '<i class="bi bi-calendar order-first me-1" title="Ends in"></i>';

  return listElement;
}

export function renderProfileListingsTemplate(dataList, parent) {
  const container = parent.querySelector("ul");
  // set this in another function? where i await the readListings call?
  // if data.amount or data.listing exist - this is a bid! else it is a listing. But what about wins?
  if (dataList[0].bidderName) {
    parent.querySelector("summary").innerText = dataList.length + " bids";
  } else if (dataList[0].title) {
    parent.querySelector("summary").innerText = dataList.length + " listings";
  }
  dataList.forEach((element) => {
    const listing = profileListingsTemplate(element);
    container.appendChild(listing);
  });
}
