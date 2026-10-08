const botaoSair = document.getElementById('botao-sair');
const listaAgenda = document.getElementById('lista-agenda');
const campoDataAgenda = document.getElementById('data-agenda');

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

campoDataAgenda.addEventListener('change', () => {
    const agendamentosDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);

    listaAgenda.innerHTML = '';

    agendamentosDoDia.forEach((agendamento) => {
        const horario = agendamento.diaHora.split('T')[1];

        const cartao = document.createElement('article');
        cartao.textContent = `${horario} ${agendamento.pet}`;

        listaAgenda.appendChild(cartao);
    });
});