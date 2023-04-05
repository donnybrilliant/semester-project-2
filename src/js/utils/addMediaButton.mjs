export function addMediaButton() {
  const addMediaButton = document.querySelector("#addMedia");
  if (addMediaButton) {
    addMediaButton.addEventListener("click", () => {
      const mediaContainer = document.querySelector("#mediaContainer");
      const firstInput = document.querySelector("#mediaContainer input");
      const mediaInput = document.createElement("input");
      mediaInput.classList.add("form-control", "mb-3");
      mediaInput.setAttribute("type", "url");
      mediaInput.setAttribute("name", "media");
      mediaInput.value = firstInput.value;
      firstInput.value = "";
      mediaContainer.appendChild(mediaInput);
    });
  }
}
