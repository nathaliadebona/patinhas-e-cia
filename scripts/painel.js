const botaoSair = document.getElementById('botao-sair');

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

function buscarAgendamentosDoDia(data) {
    const listaSalva = JSON.parse(localStorage.getItem('agendamentos')) || [];

    return listaSalva.filter((item) => {
        return item.diaHora.startsWith(data);
    });
}

const campoDataAgenda = document.getElementById('data-agenda');

campoDataAgenda.addEventListener('change', () => {
    const agendamentosDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);
    console.log(agendamentosDoDia);
});