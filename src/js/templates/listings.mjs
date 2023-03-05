import { dateCountdown } from "../utils/date.mjs";

export function listingsTemplate(data) {
  //better names?
  const container = document.createElement("div");
  container.innerHTML = `
  <div class="card">
  <a class="link-dark text-decoration-none">
    <img class="card-img">
    <div class="card-img-overlay d-flex flex-column justify-content-between">
      <h5 class="card-title"></h5>
        <div class="d-flex justify-content-between">
          <small id="bids"></small>
          <small id="price"></small>
          <small id="date" class="d-flex"></small>
        </div>
    </div>
  </a>
</div>`;

  // Title
  if (data.title === "") {
    data.title = "No Title";
  }
  container.querySelector("h5").innerText = data.title;

  // Link
  container.querySelector("a").href = "/listing/?id=" + data.id;

  // Bids - sort them by time?
  const bids = container.querySelector("#bids");
  if (!data.bids.length) {
    bids.innerText = "0 bids";
  } else if (data.bids.length === 1) {
    bids.innerText = data.bids.length + " bid";
  } else {
    bids.innerText = data.bids.length + " bids";
  }

  // Price
  const price = container.querySelector("#price");
  if (data.bids.length) {
    price.innerText = data.bids[data.bids.length - 1].amount;
    price.innerHTML += '<i class="bi bi-coin ms-1"></i>';
  }

  // Date

  container.querySelector("#date").innerText = dateCountdown(data.endsAt);
  container.querySelector("#date").innerHTML +=
    '<i class="bi bi-calendar order-first me-1"></i>';

  // Image
  // should also check if resource exists/can be fetched
  // use this? https://codepen.io/kallil-belmonte/pen/KKKRoyx

  let image = "";
  if (data.media.length >= 1) {
    image = data.media[0];
  } else {
    image = "/assets/images/placeholder.jpeg";
  }
  container.querySelector("img").src = image;
  container.querySelector("img").alt = data.title;

  return container;
}

export function renderListingTemplates(dataList, parent) {
  parent.innerHTML = ""; // should this be its own clear() function?
  dataList.forEach((element) => {
    const listing = listingsTemplate(element);
    parent.append(listing);
  });
}
