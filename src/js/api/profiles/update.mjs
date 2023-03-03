import { URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function update(data) {
  if (!data.name) {
    throw new Error("Update requires a name");
  }

  const updateProfileURL = URL + "/profiles/" + data.name + "/media";
  const method = "put";

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(data),
    name: data.name,
  });

  return response.json();
}
