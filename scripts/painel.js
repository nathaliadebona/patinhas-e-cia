const botaoSair = document.getElementById('botao-sair');

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});