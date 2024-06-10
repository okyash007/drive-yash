export async function makePostRequest(url, body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
      Authorization: localStorage.getItem("access_token"),
    },
    redirect: "follow",
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
