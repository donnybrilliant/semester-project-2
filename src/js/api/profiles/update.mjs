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

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  if (!response.ok) {
    const error = result.errors[0].message
      ? result.errors[0].message
      : "There was an error updating the profile.";
    throw new Error(error);
  }
}
