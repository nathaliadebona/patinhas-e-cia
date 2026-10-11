const botaoSair = document.getElementById('botao-sair');
const listaAssinaturas = document.getElementById('lista-assinaturas');

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

function mostrarAssinaturas() {
    const assinaturasSalvas = JSON.parse(localStorage.getItem('assinaturas')) || [];

    assinaturasSalvas.sort((a, b) => b.dataAssinatura.localeCompare(a.dataAssinatura));

    listaAssinaturas.innerHTML = '';

    if (assinaturasSalvas.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhuma assinatura por enquanto.';
        listaAssinaturas.appendChild(mensagem);
    }

    assinaturasSalvas.forEach((assinatura) => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-assinatura');

        const nome = document.createElement('h3');
        nome.textContent = assinatura.nome;

        const contato = document.createElement('p');
        contato.textContent = `${assinatura.telefone} · ${assinatura.pet}`;

        listaAssinaturas.appendChild(cartao);
        cartao.appendChild(nome);
        cartao.appendChild(contato);
    });
}

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

mostrarAssinaturas();