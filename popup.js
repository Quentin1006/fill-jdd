console.log("eeee");
const filter = document.querySelector("#filtre-jdd");

filter.addEventListener(
  "keyup",
  () => {
    document.body.append("<div>hello</div>");
  },
  false
);

const button = document
  .querySelector("button")
  .addEventListener("click", async () => {
    const data = { login: "0610101010", pwd: "1234" };
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { sendBack: true, data });
  });
