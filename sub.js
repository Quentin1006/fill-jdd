function applyCreds(data) {
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");

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
