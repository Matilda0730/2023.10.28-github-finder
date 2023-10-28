class GithubPerson {
  name;
  publicRepos;
  publicGists;
  followers;
  following;
  company;
  website;
  location;
  memberSince;

  constructor(
    name,
    publicRepos,
    publicGists,
    followers,
    following,
    company,
    website,
    location,
    memberSince
  ) {
    this.name = name;
    this.publicRepos = publicRepos;
    this.publicGists = publicGists;
    this.followers = followers;
    this.following = following;
    this.company = company;
    this.website = website;
    this.location = location;
    this.memberSince = memberSince;
  }
}

const githubName = new GithubPerson();
console.log(githubName.name);

const githubForm = document.querySelector("#github-form");
const githubUsernameInput = document.querySelector("#github-username");

githubForm.addEventListener("submit", githubFormSubmit);

function githubFormSubmit(event) {
  event.preventDefault();
}
