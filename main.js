window.onload = function () {
  // Ao iniciar a janela é mostrado o meu próprio usuário
  const user = "mateuslidonis";
  getGithubProfile(user);
};

// Essa função busca na API do GitHub pelo usuário informado
function getGithubProfile(user) {
  const profile = `https://api.github.com/users/${user}`;

  // Pega a resposta JSON e insere os retornos nas respectivas DIV's
  fetch(profile)
    .then((response) => response.json())
    .then((data) => {
      userLogin.innerHTML = `${data.name} (${data.login})`;
      userImage.src = data.avatar_url;
      userFollowers.innerHTML = `${data.followers} Seguidores`;
      userFollowing.innerHTML = `${data.following} Seguindo`;
      userRepositories.innerHTML = `${data.public_repos} Repositórios`;
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
