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

function mostrarAgenda() {
    const agendamentosDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);

    agendamentosDoDia.sort((a, b) => a.diaHora.localeCompare(b.diaHora));

    listaAgenda.innerHTML = '';

    if (agendamentosDoDia.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhum agendamento neste dia';
        listaAgenda.appendChild(mensagem);
    }

    agendamentosDoDia.forEach((agendamento) => {
        const horario = agendamento.diaHora.split('T')[1];

        const servicoEncontrado = servicos.find((item) => {
            return item.id === agendamento.servico;
        });

        const cartao = document.createElement('article');

        const petNome = document.createElement('h3');
        petNome.textContent = `${horario} · ${agendamento.pet}`;

        const nomeTutor = document.createElement('p');
        nomeTutor.textContent = `${agendamento.tutor} · ${agendamento.telefone}`;

        const servicoNome = document.createElement('p');
        servicoNome.textContent = servicoEncontrado.nome;

        const selectPagamento = document.createElement('select');

        const opcaoPendente = document.createElement('option');
        opcaoPendente.value = 'pendente';
        opcaoPendente.textContent = 'Pendente';

        const opcaoPago = document.createElement('option');
        opcaoPago.value = 'pago';
        opcaoPago.textContent = 'Pago';

        selectPagamento.appendChild(opcaoPendente);
        selectPagamento.appendChild(opcaoPago);
        selectPagamento.value = agendamento.pagamento;

        selectPagamento.addEventListener('change', () => {
            const listaSalva = JSON.parse(localStorage.getItem('agendamentos')) || [];

            const agendamentoSalvo = listaSalva.find((item) => {
                return item.id === agendamento.id;
            });

            agendamentoSalvo.pagamento = selectPagamento.value;

            localStorage.setItem('agendamentos', JSON.stringify(listaSalva));
        });

        const selectStatus = document.createElement('select');

        const opcaoAgendado = document.createElement('option');
        opcaoAgendado.value = 'agendado';
        opcaoAgendado.textContent = 'Agendado';

        const opcaoConcluido = document.createElement('option');
        opcaoConcluido.value = 'concluido';
        opcaoConcluido.textContent = 'Concluído';

        const opcaoCancelado = document.createElement('option');
        opcaoCancelado.value = 'cancelado';
        opcaoCancelado.textContent = 'Cancelado';

        selectStatus.appendChild(opcaoAgendado);
        selectStatus.appendChild(opcaoConcluido);
        selectStatus.appendChild(opcaoCancelado);
        selectStatus.value = agendamento.status;

        selectStatus.addEventListener('change', () => {
            const listaSalva = JSON.parse(localStorage.getItem('agendamentos')) || [];

            const agendamentoSalvo = listaSalva.find((item) => {
                return item.id === agendamento.id;
            });

            agendamentoSalvo.status = selectStatus.value;

            localStorage.setItem('agendamentos', JSON.stringify(listaSalva));
        });

        listaAgenda.appendChild(cartao);
        cartao.appendChild(petNome);
        cartao.appendChild(nomeTutor);
        cartao.appendChild(servicoNome);
        cartao.appendChild(selectPagamento);
        cartao.appendChild(selectStatus);
    });
}

campoDataAgenda.addEventListener('change', mostrarAgenda);
