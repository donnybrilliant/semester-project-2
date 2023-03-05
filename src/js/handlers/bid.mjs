export async function bidListener() {
  const form = document.querySelector("#placeBidForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const amount = Object.fromEntries(formData.entries());
      console.log(amount);
      //successmessage here or in create()?
    });
  }
}
