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

githubUsername.addEventListener("submit", nickNameFunction);

function nickNameFunction(event) {
  if (event.key === "Enter") {
    const username = githubUsername.value;

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}
