export function loggedIn() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return true;
  }
  return false;
}
