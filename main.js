// Variável que vou usar para mostrar meu Card no início
const user = "mateuslidonis";

// Variaél que permite eu usar o retorno JSON em qualquer lugar
let userData;

// Decriptação
var shift = 3;
var data = decrypt("jks_hlLs1r3WUbGwevEvACYhmo3XpWIiXT1AFVdM", shift);
const API_KEY = data;

// Opção para utilizar o Token do GitHub e ter direito a 5000 requisições por hora (por IP)
let options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Ao iniciar a janela é mostrado o meu próprio usuário
window.onload = function () {
  getGithubProfile(user);
};

// Copia a imagem do Card para a área de transferência com as bordas retas da mesma cor do fundo
// Pode usar :)
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

  document.querySelector("#userImage").style.border = "5px solid " + color;
  let repoInfoElements = document.querySelectorAll(".repo-info");
  repoInfoElements.forEach(function (element) {
    element.style.border = "5px solid " + color;
  });
});

inputCard.addEventListener("input", function (e) {
  let color = this.jscolor;
  document.querySelector(".card").style.backgroundColor = color;
  let repoInfoElements = document.querySelectorAll(".repo-info");
  repoInfoElements.forEach(function (element) {
    element.style.backgroundColor = color;

    let originalColor = element.style.backgroundColor; // Armazena a cor original

    element.addEventListener("mouseover", function () {
      this.style.backgroundColor = darkerColor(originalColor, -50); // 50% mais escuro
    });

    element.addEventListener("mouseout", function () {
      this.style.backgroundColor = originalColor; // Restaura a cor original
    });
  });
});

inputText.addEventListener("input", function (e) {
  let color = this.jscolor;
  document.querySelector(".card").style.color = color;
  let repoInfoElements = document.querySelectorAll(".repo-info");
  repoInfoElements.forEach(function (element) {
    element.style.color = color;
  });
});

// Essa função busca na API do GitHub pelo usuário informado
function getGithubProfile(user) {
  const profile = `https://api.github.com/users/${user}`;

  // Pega a resposta JSON e insere os retornos nas respectivas DIV's
  fetch(profile, options)
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

      // Mostra a coroa se tiver mais que 10 repositórios públicos
      if (data.public_repos > 10) {
        document.getElementById("mvpImage").style.display = "flex";
      } else {
        document.getElementById("mvpImage").style.display = "none";
      }
      getRepos();
    });
}

// Essa função busca na API do GitHub pelos 6 repositórios mais recentes do usuário informado
function getRepos() {
  const profile = `https://api.github.com/users/${userData.login}/repos?per_page=6&sort=created&direction=desc`;

  // Limpa a div antes de adicionar novos repositórios
  const reposContainer = document.getElementById("repos-container");
  reposContainer.innerHTML = "";

  // Pega a resposta JSON
  fetch(profile, options)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        const repoElement = document.createElement("div");
        repoElement.classList.add("repo-info");
        repoElement.innerHTML = `
          <h3>${repo.name}</h3>
          <p>Principal Tecnologia: ${repo.language}</p>
          <p>Pessoas Assistindo: ${repo.watchers_count}</p>
          <p>Estrelas: ${repo.stargazers_count}</p>
          <p>Forks: ${repo.forks_count}</p>
        `;
        repoElement.addEventListener("click", () => {
          window.open(repo.html_url, "_blank");
        });
        reposContainer.appendChild(repoElement);
      });
    });
}

// Essa função faz aparecer uma caixa de diálogo onde o usuário pode pesquisar por outros Cards
// Se nenhum usuário for inserido, o meu será mostrado
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

function darkerColor(color, percent) {
  let [r, g, b] = color.match(/\d+/g).map(Number); // Extrai os valores RGB da string de cor

  r = parseInt((r * (100 + percent)) / 100);
  g = parseInt((g * (100 + percent)) / 100);
  b = parseInt((b * (100 + percent)) / 100);

  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  return "rgb(" + r + "," + g + "," + b + ")";
}

// Função para criptografar um texto
function encrypt(text, shift) {
  var result = "";
  // Itera sobre cada caractere do texto
  for (var i = 0; i < text.length; i++) {
    // Itera sobre cada caractere do texto
    var asciiCode = text.charCodeAt(i);
    // Verifica se o caractere é uma letra maiúscula
    if (asciiCode >= 65 && asciiCode <= 90) {
      // Se for, criptografa o caractere e adiciona ao resultado
      result += String.fromCharCode(((asciiCode - 65 + shift) % 26) + 65);
      // Verifica se o caractere é uma letra minúscula
    } else if (asciiCode >= 97 && asciiCode <= 122) {
      // Se for, criptografa o caractere e adiciona ao resultado
      result += String.fromCharCode(((asciiCode - 97 + shift) % 26) + 97);
      // Se o caractere não for uma letra, adiciona ao resultado sem criptografar
    } else {
      result += text.charAt(i);
    }
  }
  // Retorna o texto criptografado
  return result;
}
// Função para descriptografar um texto
function decrypt(text, shift) {
  // Chama a função encrypt com 26 - shift para descriptografar o texto
  return encrypt(text, 26 - shift);
}
