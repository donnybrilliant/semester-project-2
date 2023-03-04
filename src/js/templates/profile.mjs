import { load } from "../storage/index.mjs";
import { dateConverter, dateCountdown } from "../utils/date.mjs";

export function profileInfoTemplate(data) {
  const container = document.querySelector("#profileInfo");
  const user = load("user").name;
  if (user === data.name) {
    const editButton = `<button type="button" class="btn btn-outline-secondary mb-3" data-bs-toggle="modal"
    data-bs-target="#updateProfileModal">
    <i class="bi bi-pencil-square"></i> Edit profile</button>`;
    container.querySelector("#avatarContainer").innerHTML += editButton;
  }

  container.querySelector("h5").innerText = data.name;
  container.querySelector("#profileInfoEmail>a").innerText = data.email;
  container.querySelector("#profileInfoEmail>a").href = "mailto:" + data.email;
  if (data.avatar) {
    container.querySelector("#avatar").src = data.avatar;
  }
  container.querySelector("#profileInfoCredits").innerText = data.credits;
  container.querySelector("#profileInfoCredits").innerHTML +=
    '<i class="bi bi-coin ms-1"></i>';

  if (data.listings.length === 1) {
    container.querySelector("#profileInfoListings").innerText =
      data.listings.length + " listing";
  } else {
    container.querySelector("#profileInfoListings").innerText =
      data.listings.length + " listings";
  }

  const profileBidsWins = container.querySelector("#profileInfoBidsWins");
  //make function for this type of plural thing, same with listings above
  if (data.wins.length === 1) {
    profileBidsWins.querySelector("span.wins").innerText =
      data.wins.length + " win";
  } else {
    profileBidsWins.querySelector("span.wins").innerText =
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
  <div class="col-7">
  <img class="rounded-circle me-2" width="32px" height="32px">
  <span>hello</span>
  </div>
  <div class="col-2"></div>
  <div class="col-3 d-flex"></div>
  `;

  // some other way to differentiate between bids, wins and listings?

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
  } else if (data.win === true) {
    listElement.href = "/listing/?id=" + data.id;
    if (data.media && data.media.length > 0) {
      listElement.querySelector("img").src = data.media[0];
    } else {
      listElement.querySelector("img").src = "/assets/images/placeholder.jpeg";
    }

    listElement.querySelector("span").innerText = data.title;
    listElement.querySelectorAll("div")[1].innerText =
      data.bids[data.bids.length - 1].amount;
    listElement.querySelectorAll("div")[1].innerHTML +=
      '<i class="bi bi-coin ms-1"></i>';
    listElement.querySelectorAll("div")[2].innerText = dateConverter(
      data.endsAt
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
  /*   if (dataList[0].bidderName) {
    if (dataList.length === 1) {
      document.querySelector("span.bids").innerText = dataList.length + " win";
    } else {
      document.querySelector("span.bids").innerText = dataList.length + " wins";
    }
  } */
  const container = parent.querySelector("ul");
  // set this in another function? where i await the readListings call?
  // if data.amount or data.listing exist - this is a bid! else it is a listing. But what about wins?
  if (dataList[0].bidderName && dataList.length === 1) {
    parent.querySelector("summary").innerText = dataList.length + " bid";
  } else if (dataList[0].bidderName && dataList.length > 1) {
    parent.querySelector("summary").innerText = dataList.length + " bids";
  } else if (dataList[0].win === true && dataList.length === 1) {
    parent.querySelector("summary").innerText = dataList.length + " win";
  } else if (dataList[0].win === true && dataList.length > 1) {
    parent.querySelector("summary").innerText = dataList.length + " wins";
  } else if (dataList[0].title && dataList.length === 1) {
    parent.querySelector("summary").innerText = dataList.length + " listing";
  } else if (dataList[0].title && dataList.length > 1) {
    parent.querySelector("summary").innerText = dataList.length + " listings";
  }

  dataList.forEach((element) => {
    const listing = profileListingsTemplate(element);
    container.appendChild(listing);
  });
}
