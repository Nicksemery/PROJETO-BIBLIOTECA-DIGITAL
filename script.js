function setActiveLink(linkId) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active'); 
    });
    document.getElementById(linkId).classList.add('active');
}

function loadHome() {
    document.getElementById('content').innerHTML = `
        <h2>Explore nosso acervo</h2>
        <p>Descubra as histórias e lendas dos anões!</p>
    `;
    
    setActiveLink('linkHome');
}

function loadCadastro() {
    document.getElementById('content').innerHTML = `
        <h2>Cadastrar Livro</h2>
        <form id="formLivro">
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" required>
            
            <label for="autor">Autor:</label>
            <input type="text" id="autor" required>
            
            <label for="genero">Gênero:</label>
            <input type="text" id="genero" required>
            
            <label for="ano">Ano de Publicação (AAAA):</label>
            <input type="text" id="ano" required>
            
            <label for="capa">URL da Capa:</label>
            <input type="text" id="capa" required>
            
            <button type="submit">Cadastrar</button>
        </form>
    `;
    setActiveLink('linkCadastro');
    
    document.getElementById('formLivro').addEventListener('submit', function(e) {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const genero = document.getElementById('genero').value;
        const ano = document.getElementById('ano').value;
        const capa = document.getElementById('capa').value;

        const anoRegex = /^\d{4}$/;
        if (!anoRegex.test(ano)) {
            alert('O ano de publicação deve ter 4 dígitos.');
            return;
        }

        const livro = { titulo, autor, genero, ano, capa };

        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        livros.push(livro);
        localStorage.setItem('livros', JSON.stringify(livros));

        alert('Livro cadastrado com sucesso!');
        this.reset();
        loadLivros();
    });
}

function loadLivros() {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const lista = livros.map((livro, index) => `
        <li>
            <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.ano})<br>
            Gênero: ${livro.genero}<br>
            <img src="${livro.capa}" alt="${livro.titulo}"><br>
            <button onclick="deleteLivro(${index})">Deletar</button>
        </li>
    `).join('');

    document.getElementById('content').innerHTML = `
        <h2>Livros Cadastrados</h2>
        <ul>${lista}</ul>
        <h3>Filtrar Livros</h3>
        <input type="text" id="filterAutor" placeholder="Filtrar por Autor">
        <input type="text" id="filterGenero" placeholder="Filtrar por Gênero">
    `;
    setActiveLink('linkLivros'); 
    
    document.getElementById('filterAutor').addEventListener('input', filterLivros);
    document.getElementById('filterGenero').addEventListener('input', filterLivros);
}

function deleteLivro(index) {
    let livros = JSON.parse(localStorage.getItem('livros')) || [];
    livros.splice(index, 1);  
    localStorage.setItem('livros', JSON.stringify(livros)); 
    loadLivros();  
}

function filterLivros() {
    const autorFilter = document.getElementById('filterAutor').value.toLowerCase();
    const generoFilter = document.getElementById('filterGenero').value.toLowerCase();
    const livros = JSON.parse(localStorage.getItem('livros')) || [];

    const filteredBooks = livros.filter(livro => {
        return (livro.autor.toLowerCase().includes(autorFilter) || autorFilter === "") &&
            (livro.genero.toLowerCase().includes(generoFilter) || generoFilter === "");
    });

    const lista = filteredBooks.map((livro, index) => `
        <li>
            <strong>${livro.titulo}</strong> - ${livro.autor} (${livro.ano})<br>
            Gênero: ${livro.genero}<br>
            <img src="${livro.capa}" alt="${livro.titulo}"><br>
            <button onclick="deleteLivro(${index})">Deletar</button>
        </li>
    `).join('');

    document.getElementById('content').querySelector('ul').innerHTML = lista;
}

document.getElementById('linkHome').addEventListener('click', loadHome);
document.getElementById('linkCadastro').addEventListener('click', loadCadastro);
document.getElementById('linkLivros').addEventListener('click', loadLivros);

loadHome();