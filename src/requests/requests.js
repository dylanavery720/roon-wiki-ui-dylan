import { message } from "antd";

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  message.error(`Something went wrong. ${response.statusText}`);
  return response;
}

export async function parseJSON(response) {
  return response.json();
}

export async function postContent(body) {
  const response = await fetch(`http://localhost:8080/articles`, {
    method: "POST",
    accept: "application/json",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response;
}

export async function putContent(topic, body) {
  const response = await fetch(`http://localhost:8080/articles/${topic}`, {
    method: "PUT",
    accept: "application/json",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const checkedStatus = await checkStatus(response);
  let parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}

export async function getContent(topic) {
  const response = await fetch(`http://localhost:8080/articles/${topic}`, {
    accept: "application/json",
  });
  const checkedStatus = await checkStatus(response);
  let parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}

export async function getHistory(topic) {
  const response = await fetch(`http://localhost:8080/edits/${topic}`, {
    accept: "application/json",
  });
  const checkedStatus = await checkStatus(response);
  let parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}

export async function getAllArticles(topic) {
  const response = await fetch(`http://localhost:8080/articles`, {
    accept: "application/json",
  });
  const checkedStatus = await checkStatus(response);
  let parsedJson = await parseJSON(checkedStatus);
  return parsedJson;
}
