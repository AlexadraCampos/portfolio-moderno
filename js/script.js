const username = "AlexadraCampos";
const projetosSelecionados = [
  "projeto_kanban",
  "pluma",
  "portfolio-powerbi",
  "Ponto-_de-_Luxo",
  "clinica",
  "sistema_de_gerenciamento_de_notas_front",
];

async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();
  const container = document.getElementById("repo");
  container.innerHTML = "";
  
  const filtrados = repos.filter(repo =>
    projetosSelecionados.includes(repo.name)
  );
  
  for (const repo of filtrados) {
    let imageURL = null;
    try {
      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/${username}/${repo.name}/main/README.md`
      );
      const readmeText = await readmeRes.text();
      const match = readmeText.match(/<img[^>]+src="([^"]+)"/i);
      if (match) {
        imageURL = match[1].startsWith("http")
          ? match[1]
          : `https://raw.githubusercontent.com/${username}/${repo.name}/main/${match[1]}`;
      }
    } catch (e) {
      console.warn(`Sem README ou imagem em ${repo.name}`);
    }
    
    const card = document.createElement("div");
    card.className = "repo-list";
    card.innerHTML = `
      <a href="${repo.name === "portfolio-powerbi"
        ? "https://portfolio-powerbi.netlify.app/"
        : repo.html_url
      }" target="_blank">
        <h2>${repo.name.replace(/[-_]/g, " ")}</h2>
        ${imageURL ? `<img src="${imageURL}" alt="Preview ${repo.name}">` : ""}
        <p>${repo.description || "Clique na imagem para ver mais detalhes"}</p>
      </a>
    `;
    container.appendChild(card);
  }
}
loadRepos();