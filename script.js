class GithubPerson {
  API_URL = "https://api.github.com/users/";

  constructor(accessToken) {
    this.accessToken = accessToken;
  }
}
//변수들 정의
const githubForm = document.querySelector("#github-form");
const githubUsernameInput = document.querySelector("#github-username");
const profileButtonClick = document.querySelector(".view-profile");
const repository = document.querySelector(".repository");
const profilePersonNickname = document.querySelector('.profile-person-nickname');
const liCompany = document.querySelector('.li-company');
const liWebsite = document.querySelector('.li-website');
const liLocation = document.querySelector('.li-Location');
const liMemberSince = document.querySelector('.li-membersince');
const reposDivs = document.querySelectorAll('.repository > div');
const profileInfo1 = document.querySelector('.profile-info1 span');
const profileInfo2 = document.querySelector('.profile-info2 span');
const profileInfo3 = document.querySelector('.profile-info3 span');
const profileInfo4 = document.querySelector('.profile-info4 span');
const githubUserName = githubUsernameInput.value
const profileLink = document.querySelector('.view-profile');
const publicRepos = document.querySelector('.profile-info1');
const githubGists = document.querySelector('.profile-info2');
const githubFollowers = document.querySelector('.profile-info3')
const githubFollowing = document.querySelector('.profile-info4')

//변수 선언(getUser()안에 있는 값 꺼내오려고)
let jsonData = [];
let repoData = []; 

//로컬스토리지에 저장하려고 함
function loadFromLocalStorage() {
  const name = localStorage.getItem('jsonData');
  const repo = localStorage.getItem('repoData');

  if (name) {
    const nameJson = JSON.parse(name);
    githubUsernameInput.value = nameJson.login;

    // 저장된 사용자 정보를 화면에 표시
    const profilePhotoDiv = document.querySelector('.profile-photo');
    if (nameJson.avatar_url) {
      profilePhotoDiv.innerHTML = `<img src="${nameJson.avatar_url}" alt="${nameJson.login}'s profile photo">`;
    }

    profilePersonNickname.innerHTML = nameJson.login;
    liCompany.innerHTML = nameJson.company ? nameJson.company : 'N/A';
    liWebsite.innerHTML = nameJson.blog ? nameJson.blog : 'N/A';
    liLocation.innerHTML = nameJson.location ? nameJson.location : 'N/A';
    liMemberSince.innerHTML = new Date(nameJson.created_at).toLocaleDateString();
    profileInfo1.innerHTML = nameJson.public_repos;
    profileInfo2.innerHTML = nameJson.public_gists;
    profileInfo3.innerHTML = nameJson.followers;
    profileInfo4.innerHTML = nameJson.following;

    // 숨겨진 요소들을 보이게 설정
    const elementsToUnhide = document.querySelectorAll('.hidden');
    elementsToUnhide.forEach(element => {
      element.classList.remove('hidden');
    });
  }

  if (repo) {
    const repoJson = JSON.parse(repo);
    for (let i = 0; i < Math.min(repoJson.length, 5); i++) {
      reposDivs[i].innerHTML = `
        <h3>${repoJson[i].name}</h3>
        <p>${repoJson[i].description}</p>
        <a href="${repoJson[i].html_url}" target="_blank" class="goToRepository">Go to repository</a>
      `;
    }
  }
}


function saveToLocalStorage(jsonData) {
  const data = JSON.stringify(jsonData); //string으로 변환시켜주는 것
  localStorage.setItem('jsonData', JSON.stringify(jsonData))
  // window.localStorage.setItem('jsonData',data); //setItem(key, value)
}

function saveToLocalStorage2(repoData) {
  const data = JSON.stringify(repoData); //string으로 변환시켜주는 것
  localStorage.setItem('repoData', JSON.stringify(repoData));
  // window.localStorage.setItem('repoData',data); //setItem(key, value)
}



//이벤트 리스너들
profileButtonClick.addEventListener("click", goToProfile);
githubForm.addEventListener("submit", githubFormSubmit);
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);



//이벤트 리스너에 연결된 함수들
function goToProfile() {
  window.open(`https://github.com/${githubUserName}`)
}

//submit됐을 때 실행되는 함수
function githubFormSubmit(event) {
  event.preventDefault();
  getUser();
  const elementsToUnhide = document.querySelectorAll('.hidden');
  elementsToUnhide.forEach(element => {
    element.classList.remove('hidden');
  });
}


//위 getUser()에서 사용되는 함수
//사진, 이름, 회사 등등을 innerHtml에 집어넣어준다.

async function getUser() {
  const userId = githubUsernameInput.value;
  const response = await fetch('https://api.github.com/users/' + userId, {
    headers: {
      'Authorization': 'Bearer' + GithubPerson.accessToken
    }
  });
  const jsonData = await response.json();
  
const repoResponse = await fetch(`https://api.github.com/users/${userId}/repos`, {
    headers: {
      'Authorization': 'Bearer' + GithubPerson.accessToken
    }
  });
  const repoData = await repoResponse.json();


  const profilePhotoDiv = document.querySelector('.profile-photo');
  if (jsonData.avatar_url) { // avatar_url이 존재하는지 확인
    profilePhotoDiv.innerHTML = `<img src="${jsonData.avatar_url}" 
    alt="${userId}'s profile photo" class="profile-image">`;
}


  profilePersonNickname.innerHTML = jsonData.login;
  liCompany.innerHTML = jsonData.company ? jsonData.company : 'N/A'; // 만약 company 정보가 없으면 'N/A' 표시
  liWebsite.innerHTML = jsonData.blog ? jsonData.blog : 'N/A';
  liLocation.innerHTML = jsonData.location ? jsonData.location : 'N/A';
  liMemberSince.innerHTML = new Date(jsonData.created_at).toLocaleDateString(); // 가입 날짜를 보기 좋은 형식으로 변환
  profileInfo1.innerHTML = jsonData.public_repos
  profileInfo2.innerHTML = jsonData.public_gists
  profileInfo3.innerHTML = jsonData.followers
  profileInfo4.innerHTML = jsonData.following

  for (let i = 0; i < Math.min(repoData.length, 5); i++) {
    reposDivs[i].innerHTML = `
      <h3>${repoData[i].name}</h3>
      <p>${repoData[i].description}</p>
      <a href="${repoData[i].html_url}" target="_blank" class="goToRepository">Go to repository</a>
      
    `;
  }

  saveToLocalStorage2(repoData)
  saveToLocalStorage(jsonData)

  loadFromLocalStorage(jsonData,repoData)
}

document.addEventListener('DOMContentLoaded', function () {
  // 모든 repo_info div를 선택.
  const repoDivs = document.querySelectorAll('.repository > div');

  // 각 div에 클릭 이벤트 리스너를 추가.
  repoDivs.forEach(div => {
    div.addEventListener('click', function() {
      const aTag = this.querySelector('a');
      if(aTag) {
        window.open(aTag.href, '_blank');
      }
    });
  });
});

//프로필 버튼
function goToProfile() {
    const githubUserName = githubUsernameInput.value;
    window.open(`https://github.com/${githubUserName}`, '_blank');
}

// 이벤트 리스너
profileLink.addEventListener("click", goToProfile);


//퍼블릭 레포 버튼
function goToPublicRepos() {
    const githubUserName1 = githubUsernameInput.value;
    window.open(`https://github.com/${githubUserName1}?tab=repositories`, '_blank');
}

publicRepos.addEventListener("click", goToPublicRepos);

//Gits 버튼
function goToGists() {
    const githubUserName2 = githubUsernameInput.value;
    window.open(`https://api.github.com/users/${githubUserName2}/gists{/gist_id}`, '_blank');
}

githubGists.addEventListener("click", goToGists);

function goToFollowers() {
  const githubUserName3 = githubUsernameInput.value;
  window.open(`https://github.com/${githubUserName3}?tab=followers`, '_blank');
}

githubFollowers.addEventListener("click", goToFollowers);


function goToFollowing() {
  const githubUserName4 = githubUsernameInput.value;
  window.open(`https://github.com/${githubUserName4}?tab=following`, '_blank');
}

githubFollowing.addEventListener("click", goToFollowing);
