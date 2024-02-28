// Variável que vou usar para mostrar meu Card no início
const user = "mateuslidonis";

// Ao iniciar a janela é mostrado o meu próprio usuário
window.onload = function () {
  getGithubProfile(user);
};

// Copia a imagem do Card para a área de transferência com as bordas retas da mesma cor do fundo
shareButton.onclick = function () {
  var card = document.querySelector("#card");
  var style = window.getComputedStyle(card);
  var bgColor = style.getPropertyValue("background-color");
  html2canvas(document.querySelector("#card"), {
    useCORS: true,
    backgroundColor: bgColor,
  }).then((canvas) =>
    canvas.toBlob((blob) =>
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
    )
  );
};

// Criação dos ColorPickers de Borda, Fundo e Texto
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
      getRepos();
    });
}

// Essa função busca na API do GitHub pelos 6 repositórios mais recentes do usuário informado
function getRepos() {
  fetch(
    `https://api.github.com/users/${user}/repos?per_page=6&sort=created&direction=desc`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// Essa função faz aparecer uma caixa de diálogo onde o usuário pode pesquisar por outros Cards
function newCard() {
  const userInput = prompt("Digite seu usuário do Github:");
  if (userInput) {
    getGithubProfile(userInput);
  } else {
    getGithubProfile(user);
  }
}

// Essa função permite a personalização da fonte
function mudarFonte(select) {
  document.getElementById("card").style.fontFamily = select.value;
}
