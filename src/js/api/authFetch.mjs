import { load } from "../storage/index.mjs";

// should this return some failsafe/errorhandling or is the standard ok enough?
export function headers() {
  const accessToken = load("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
