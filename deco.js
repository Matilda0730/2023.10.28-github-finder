const searchInput = document.querySelector(".form-control");
const mainContent = document.querySelector("main");
const githubUsername = document.querySelector("#github-username");

searchInput.addEventListener("focus", () => {
  mainContent.classList.add("animate-up");
  mainContent.classList.remove("animate-down");
});

searchInput.addEventListener("blur", () => {
  mainContent.classList.add("animate-down");
  mainContent.classList.remove("animate-up");
});
