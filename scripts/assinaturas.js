const botaoSair = document.getElementById('botao-sair');
const listaAssinaturas = document.getElementById('lista-assinaturas');

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

const assinaturasSalvas = JSON.parse(localStorage.getItem('assinaturas')) || [];

console.log(assinaturasSalvas);