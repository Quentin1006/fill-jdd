import { CredsData } from "../typings";

function applyCreds(data: CredsData) {
  const usernameInput = document.querySelector<HTMLInputElement>("#username");
  const passwordInput = document.querySelector<HTMLInputElement>("#password");

  if (usernameInput && passwordInput) {
    usernameInput.value = data.login;
    passwordInput.value = data.pwd;
  }
}

// Send message to top frame, for example:
chrome.runtime.onMessage.addListener(function ({ data }) {
  console.log({ data });

  applyCreds(data);
});

export {};
