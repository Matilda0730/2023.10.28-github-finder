const githubForm = document.querySelector("#github-form");
const githubUsernameInput = document.querySelector("#github-username");

githubForm.addEventListener("submit", githubFormSubmit);

function githubFormSubmit(event) {
  event.preventDefault();
}
