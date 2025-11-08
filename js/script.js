// --- MENU MOBILE ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// --- GITHUB PROJECTS ---
const username = "AlexadraCampos";
const projetosSelecionados = [
  "Ponto-_de-_Luxo",
  "portfolio-powerbi",
  "clinica",
  "PaginaIDGE"
];

async function loadRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();

  const container = document.getElementById('repo');
  container.innerHTML = '';

  for (const repo of repos.filter(r => projetosSelecionados.includes(r.name))) {
    // Busca o README em formato texto
    const readmeRes = await fetch(`https://raw.githubusercontent.com/${username}/${repo.name}/main/README.md`);
    const readmeText = await readmeRes.text();

    //  imagem no README
    const imageMatch = readmeText.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
    let imageURL = null;

    if (imageMatch) {
      const src = imageMatch[1];
      
      if (src.startsWith('http')) {
        imageURL = src;
      } else {
        imageURL = `https://raw.githubusercontent.com/${username}/${repo.name}/main/${src.replace('./', '')}`;
      }
    }

    // card do repositório
    const div = document.createElement('div');
    div.classList.add('repo-list');
    div.innerHTML = `
      <a href="${repo.name === "portfolio-powerbi" ? "https://portfolio-powerbi.netlify.app/" : repo.html_url}" target="_blank">
        <h1>${repo.name}</h1>
        ${imageURL ? `<img src="${imageURL}" alt="Preview do projeto ${repo.name}">` : ''}
        <p>${repo.description || 'Clique na imagem para ver mais detalhes'}</p>
      </a>
    `;

    // se for o projeto de Power BI, usa o link do site
    const projectLink = repo.name === "portfolio-powerbi"
    ? "https://portfolio-powerbi.netlify.app/" 
    : repo.html_url;

    container.appendChild(div);
  }
}
loadRepos();
