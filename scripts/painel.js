const botaoSair = document.getElementById('botao-sair');
const listaAgenda = document.getElementById('lista-agenda');
const campoDataAgenda = document.getElementById('data-agenda');
const campoNomeTutor = document.getElementById('nome');
const campoTelefoneTutor = document.getElementById('telefone');
const campoPetNome = document.getElementById('pet-nome');
const campoEspecie = document.getElementById('especie');
const campoValor = document.getElementById('valor');
const selectPagamentoManual = document.getElementById('pagamento');
const campoInfoAdicional = document.getElementById('informacao-adicional'); 
const formManual = document.getElementById('form-manual');
const totalDia = document.getElementById('total-dia');

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

function calcularTotal(lista) {
    return lista.reduce((acumulado, agendamento) => {
        return acumulado + agendamento.valor;
    }, 0);
}

function mostrarAgenda() {
    const agendamentosDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);

    agendamentosDoDia.sort((a, b) => a.diaHora.localeCompare(b.diaHora));

    const aReceber = agendamentosDoDia.filter((item) => {
        return item.pagamento === 'pendente' && item.status !== 'cancelado';
    });

    const total = calcularTotal(aReceber);
    const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalDia.textContent = `A receber: ${totalFormatado}`;

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
        cartao.classList.add('cartao-agenda');

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
        
        const rotuloPagamento = document.createElement('label');
        rotuloPagamento.textContent = 'Pagamento';
        rotuloPagamento.appendChild(selectPagamento);

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

        const rotuloStatus = document.createElement('label');
        rotuloStatus.textContent = 'Status';
        rotuloStatus.appendChild(selectStatus);

        const valorFormatado = agendamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const valorCobrado = document.createElement('p');
        valorCobrado.textContent = `Valor: ${valorFormatado}`;

        listaAgenda.appendChild(cartao);
        cartao.appendChild(petNome);
        cartao.appendChild(nomeTutor);
        cartao.appendChild(servicoNome);
        cartao.appendChild(valorCobrado);
        cartao.appendChild(rotuloPagamento);
        cartao.appendChild(rotuloStatus);
    });
}

campoDataAgenda.addEventListener('change', mostrarAgenda);

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

formManual.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = campoNomeTutor.value;
    const telefone = campoTelefoneTutor.value;
    const petNome = campoPetNome.value;
    const especie = campoEspecie.value;
    const servico = selectServico.value;
    const tipoTosa = selectTipoTosa.value;
    const data = campoData.value;
    const horario = selectHorario.value;
    const valor = Number(campoValor.value);
    const pagamento = selectPagamentoManual.value;
    const infoAdicional = campoInfoAdicional.value;

    const agendamento = {
        id: Date.now(),
        tutor: nome,
        telefone: telefone,
        pet: petNome,
        especie: especie,
        servico: servico,
        tipoTosa: tipoTosa,
        diaHora: `${data}T${horario}`,
        informacoes: infoAdicional,
        valor: valor,
        pagamento: pagamento,
        status: 'agendado'
    };

    const listaAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    listaAgendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(listaAgendamentos));
    formManual.reset();

    atualizarTipoTosa();
    atualizarHorarios();

    campoDataAgenda.value = data;
    mostrarAgenda();

    mensagemConfirmacao.textContent = 'Agendamento salvo!';

    setTimeout(() => {
        mensagemConfirmacao.textContent = '';
    }, 4000);
});

campoDataAgenda.value = hoje;
mostrarAgenda();

