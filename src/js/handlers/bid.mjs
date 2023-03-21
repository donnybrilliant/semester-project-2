export async function bidListener() {
  const form = document.querySelector("#placeBidForm");
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
}
