// Funções para carregar conteúdo
function loadHome() {
    document.getElementById('content').innerHTML = `
        <h2>Explore nosso acervo</h2>
        <p>Descubra as histórias e lendas dos anões!</p>
    `;
}

function loadCadastro() {
    document.getElementById('content').innerHTML = `
        <h2>Cadastrar Livro</h2>
        <form id="formLivro">
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" required>
            
            <label for="autor">Autor:</label>
            <input type="text" id="autor" required>
            
            <label for="ano">Ano de Publicação:</label>
            <input type="number" id="ano" required>
            
            <button type="submit">Cadastrar</button>
        </form>
    `;
    
    // Adiciona evento ao formulário
    document.getElementById('formLivro').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const ano = document.getElementById('ano').value;

        const livro = { titulo, autor, ano };
        
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        livros.push(livro);
        localStorage.setItem('livros', JSON.stringify(livros));

        alert('Livro cadastrado com sucesso!');
        this.reset();
        loadLivros(); // Carrega a lista de livros
    });
}

function loadLivros() {
    const livros = JSON.parse(localStorage.getItem('livros')) || [];
    const lista = livros.map(livro => `<li>${livro.titulo} - ${livro.autor} (${livro.ano})</li>`).join('');
    
    document.getElementById('content').innerHTML = `
        <h2>Livros Cadastrados</h2>
        <ul>${lista}</ul>
    `;
}

// Eventos dos links
document.getElementById('linkHome').addEventListener('click', loadHome);
document.getElementById('linkCadastro').addEventListener('click', loadCadastro);
document.getElementById('linkLivros').addEventListener('click', loadLivros);

// Carrega a página inicial ao iniciar
loadHome();
