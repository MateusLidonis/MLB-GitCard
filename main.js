window.onload = function () {
  // Ao iniciar a janela é mostrado o meu próprio usuário
  const user = "mateuslidonis";
  getGithubProfile(user);
};
const user = "mateuslidonis";
let userData;

shareButton.onclick = function () {
  card.style.borderRadius = "0px";
  html2canvas(card, { useCORS: true }).then(function (canvas) {
    var img = canvas.toDataURL("image/png");
    var imageElement = document.createElement("img");
    imageElement.src = img;
    document.body.appendChild(imageElement);
    card.style.borderRadius = "30px";
    var link = document.createElement("a");
    link.href = img;
    link.download = "GitCard - " + `${userData.name}` + ".png";
    link.click();
  });
};

// Primeiro, obtenha o elemento input e o elemento cuja borda você deseja alterar
let inputProfile = document.querySelector("#input-profile");
let inputCard = document.querySelector("#input-card");
let inputText = document.querySelector("#input-text");

inputProfile.addEventListener("input", function (e) {
  let color = this.jscolor;
  setTimeout(() => {
    document.querySelector(".profile img").style.border = "5px solid " + color;
  }, 0);
});

inputCard.addEventListener("input", function (e) {
  let color = this.jscolor;
  setTimeout(() => {
    document.querySelector(".card").style.backgroundColor = color;
  }, 0);
});

inputText.addEventListener("input", function (e) {
  let color = this.jscolor;
  setTimeout(() => {
    document.querySelector(".card").style.color = color;
  }, 0);
});

// Essa função busca na API do GitHub pelo usuário informado
function getGithubProfile(user) {
  const profile = `https://api.github.com/users/${user}`;

  // Pega a resposta JSON e insere os retornos nas respectivas DIV's
  fetch(profile)
    .then((response) => response.json())
    .then((data) => {
      userData = data;
      userLogin.innerHTML = `${data.name} (${data.login})`;
      userImage.src = data.avatar_url;
      if (data.followers > 1) {
        userFollowers.innerHTML = `${data.followers} Seguidores`;
      } else {
        userFollowers.innerHTML = `${data.followers} Seguidor`;
      }

      userFollowing.innerHTML = `${data.following} Seguindo`;

      if (data.public_repos > 1) {
        userRepositories.innerHTML = `${data.public_repos} Repositórios`;
      } else {
        userRepositories.innerHTML = `${data.public_repos} Repositório`;
      }

      userCompany.innerHTML = data.company ? data.company : "Não informado";
      userLocation.innerHTML = data.location ? data.location : "Não informado";
    });
}

function newCard() {
  const userInput = prompt("Digite seu usuário do Github:");
  if (userInput) {
    getGithubProfile(userInput);
  } else {
    getGithubProfile(user);
  }
}

function randomColor() {
  const color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
  document.querySelector(".profile img").style.border = "5px solid " + color;
}
