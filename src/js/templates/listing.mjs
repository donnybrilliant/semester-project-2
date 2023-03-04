import { dateConverter, dateCountdown } from "../utils/date.mjs";
import { load } from "../storage/index.mjs";
import { bid } from "../api/listings/bid.mjs";

export function listingTemplate(data) {
  console.log(data);
  const container = document.createElement("div");
  container.innerHTML = `
  <small id="dates" class="float-end"></small>
  <div id="carousel" class="carousel slide" data-bs-ride="true">
  <img class="img-fluid rounded">
  </div>
  <div class="d-flex justify-content-between align-items-center border-bottom my-2">
  <h1></h1>
  <div id="endsAt" class="d-flex lead"></div>
  </div>
  <h6 class="mt-4">Description</h6>
  <div id="description" class=""></div>
  <div id="tags" class="border-bottom py-4"></div>
  <div class="d-flex justify-content-between align-items-center border-bottom">
  <div id="seller" class="d-flex align-items-center">
    <img class="rounded-circle me-2" width="32px" height="32px">
    <a class="text-decoration-none"><p id="sellerName" class="mt-3"></p>
    </a>
    </div>
    <div id="edit"></div>
  </div>
  <form id="placeBidForm">
  <div class="input-group my-4">
  <input id="placeBidAmount" name="amount" type="number" class="form-control" placeholder="Bid Amount" required>
  <span class="input-group-text"><i class="bi bi-coin"></i></span>
  <button class="btn btn-primary" type="submit">Bid</button>
</div>
</form>
  `;
  //rename shit and make own function
  const form = container.querySelector("#placeBidForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload.amount = parseInt(payload.amount);
      bid(data.id, payload);
      //successmessage here and reload page
    });
  }
  // disable bid if not logged in

  // Author
  const user = load("user").name;
  if (user === data.seller.name) {
    const edit = container.querySelector("#edit");
    edit.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal"
    data-bs-target="#updateListingModal">
    <i class="bi bi-pencil-square"></i></button>`;
  }

  // Image - own function of course. but better way to do this?
  // need to make image gallery if array bigger than 1

  if (data.media.length > 1) {
    const carousel = container.querySelector("#carousel");
    carousel.innerHTML = `<div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;
    const carouselInner = carousel.querySelector(".carousel-inner");
    data.media.forEach((element, index) => {
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-item");
      const carouselImage = document.createElement("img");
      carouselImage.classList.add("d-block", "w-100", "rounded");
      carouselImage.src = element;
      carouselImage.alt = data.title;
      if (index === 0) {
        carouselContainer.classList.add("active");
      }
      carouselContainer.append(carouselImage);
      carouselInner.append(carouselContainer);
    });
  } else if (data.media.length === 1) {
    container.querySelector("#carousel>img").src = data.media[0];
    container.querySelector("#carousel>img").alt = data.title;
  } else {
    container.querySelector("#carousel>img").src =
      "/assets/images/placeholder.jpeg";
    container.querySelector("#carousel>img").alt = data.title;
  }

  container.querySelector("h1").innerText = data.title;
  container.querySelector("#description").innerText = data.description;

  //avatar
  let avatar = "";
  if (data.seller.avatar) {
    avatar = data.seller.avatar;
  } else {
    avatar = "/assets/images/placeholder.jpeg";
  }
  container.querySelector("#seller>img").src = avatar;
  container.querySelector("#seller>img").alt = avatar;

  container.querySelector("#sellerName").innerText = data.seller.name;
  container.querySelector("#seller>a").href =
    "/profile/?name=" + data.seller.name;

  // Tags
  if (data.tags.length) {
    const tags = container.querySelector("#tags");
    data.tags.forEach((element) => {
      const anchor = document.createElement("a");
      const tag = document.createElement("span");
      tag.classList.add("badge", "bg-primary", "me-1");
      tag.innerText = element;
      anchor.href = "/listing/?tag=" + element;
      anchor.append(tag);
      tags.append(anchor);
    });
  }

  // Bids
  if (data.bids.length) {
    const bidContainer = document.createElement("ul");
    bidContainer.classList.add("list-group");
    bidContainer.innerHTML = `
    <li class="list-group-item">
    <details id="bids">
        <summary>No bids..</summary>
        <ul class="list-group list-group-flush my-3">

        </ul>
    </details>
</li>
    `;
    if (data.bids.length === 1) {
      bidContainer.querySelector("summary").innerText =
        data.bids.length + " bid";
    } else {
      bidContainer.querySelector("summary").innerText =
        data.bids.length + " bids";
    }

    const bidList = bidContainer.querySelector("ul");
    data.bids.forEach((element) => {
      const bid = document.createElement("li");
      bid.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      bid.innerHTML = `
        <div id="bidder" class="col-6">
          <img>
          <span id="bidderName"><a></a>
          </span>
        </div>
        <div class="col-2" id="bidAmount"></div>
        <div class="col-4" id="bidDate"></div>
      `;
      // bid.querySelector("#bidder>img").src = element.bidder.avatar; // should be another fetch to the seller?
      bid.querySelector("#bidderName>a").innerText = element.bidderName;
      bid.querySelector("#bidderName>a").href =
        "/profile/?name=" + element.bidderName;
      bid.querySelector("#bidAmount").innerText = element.amount;
      bid.querySelector("#bidAmount").innerHTML +=
        '<i class="bi bi-coin ms-1"></i>';
      bid.querySelector("#bidDate").innerText = dateConverter(element.created);
      bidList.append(bid);
    });

    container.append(bidContainer);
  } else {
    const bids = document.createElement("h6");
    bids.innerText = "No bids yet";
    bids.classList.add("my-3");
    container.append(bids);
  }

  // Dates
  container.querySelector("#endsAt").innerText = dateCountdown(data.endsAt);
  container.querySelector("#endsAt").innerHTML +=
    '<i class="bi bi-calendar order-first me-1" title="Ends in"></i>';

  if (data.created !== data.updated) {
    container.querySelector("#dates").innerText = `Created: ${dateConverter(
      data.created
    )}, Updated: ${dateConverter(data.updated)}`;
  } else {
    container.querySelector("#dates").innerText = `Created: ${dateConverter(
      data.created
    )}`;
  }

  return container;
}

export function renderListingTemplate(data, parent) {
  parent.innerHTML = ""; // should this be its own clear() function?
  const listing = listingTemplate(data);
  parent.append(listing);
}
