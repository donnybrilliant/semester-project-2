export function dateCountdown(data) {
  const date = new Date(data);
  const now = new Date();
  const timeleft = date - now;

  const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  let dateToRender = "";
  if (timeleft < 0) {
    dateToRender = "Ended";
  } else if (hours === 0) {
    dateToRender = `${minutes}m ${seconds}s`; // setTimeout to count seconds
  } else if (days === 0) {
    dateToRender = `${hours}h ${minutes}m`;
  } else {
    dateToRender = days + "d";
  }
  return dateToRender;
}

export function dateConverter(date) {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}

export function datetimeLocal(datetime) {
  const date = new Date(datetime);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}
