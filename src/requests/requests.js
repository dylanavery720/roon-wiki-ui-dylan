import { message } from "antd";

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  message.error(`Something went wrong. ${response.statusText}`);
  // throw error;
  return response;
}

export async function parseJSON(response) {
  return response.json();
}

// export async function getLiveEmailSearchMessagesRequest(email, msgids) {
//   const body = {};
//   body[email] = msgids;
//   const response = await fetch(`/Hubble/rest/saas/${oauthID}/gmail/messages`, {
//     method: "POST",
//     accept: "application/json",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });
//   const checkedStatus = await checkStatus(response);
//   const parsedJson = await parseJSON(checkedStatus);
//   return parsedJson;
// }

export async function getContent(topic) {
  const phishing = await fetch(`http://localhost:8080/articles/${topic}`, {
    accept: "application/json",
  });
  const checkedStatus = await checkStatus(phishing);
  let parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}
