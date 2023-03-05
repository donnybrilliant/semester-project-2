export function responseMessage(data, color) {
  const container = document.createElement("div");
  container.classList.add("alert", "alert-" + color);
  container.innerText = data;
  return container;
}

export function renderResponseMessage(data, parent, color) {
  const response = responseMessage(data, color);
  parent.innerHTML = "";
  parent.append(response);
}
