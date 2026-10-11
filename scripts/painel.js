const botaoSair = document.getElementById('botao-sair');
const listaAgenda = document.getElementById('lista-agenda');
const campoDataAgenda = document.getElementById('data-agenda');
const totalDia = document.getElementById('total-dia');
const totalRecebido = document.getElementById('total-recebido');
const filtroPagamento = document.getElementById('filtro-pagamento');
const filtroStatus = document.getElementById('filtro-status');
const mensagemAgenda = document.getElementById('mensagem-agenda');

const dialogAgendamento = document.getElementById('agendamento-manual');
const tituloAgendamento = document.getElementById('titulo-agendamento');
const botaoSalvarAgendamento = document.getElementById('botao-salvar');
const botaoAbrirAgendamento = document.getElementById('abrir-agendamento');
const botaoFecharAgendamento = document.getElementById('fechar-agendamento');

const formManual = document.getElementById('form-manual');
const campoNomeTutor = document.getElementById('nome');
const campoTelefoneTutor = document.getElementById('telefone');
const campoPetNome = document.getElementById('pet-nome');
const campoEspecie = document.getElementById('especie');
const campoValor = document.getElementById('valor');
const selectPagamentoManual = document.getElementById('pagamento');
const campoInfoAdicional = document.getElementById('informacao-adicional');

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

// Totais //
function atualizarTotal() {
    const listaDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);

    const aReceber = listaDoDia.filter((item) => {
        return item.pagamento === 'pendente' && item.status !== 'cancelado';
    });

    const total = calcularTotal(aReceber);
    const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalDia.innerHTML = `A receber: <strong>${totalFormatado}</strong>`;

    const recebidos = listaDoDia.filter((item) => {
        return item.pagamento === 'pago' && item.status !== 'cancelado';
    });

    const totalPago = calcularTotal(recebidos);
    const totalPagoFormatado = totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalRecebido.innerHTML = `Recebido: <strong>${totalPagoFormatado}</strong>`;
}

// Modal: criar e editar //
function abrirModalNovo() {
    idEmEdicao = null;

    tituloAgendamento.textContent = 'Agendamento manual';
    botaoSalvarAgendamento.textContent = 'Agendar';
    campoData.min = hoje;

    dialogAgendamento.showModal();
}

function abrirModalEdicao(agendamento) {
    idEmEdicao = agendamento.id;

    tituloAgendamento.textContent = 'Editar agendamento';
    botaoSalvarAgendamento.textContent = 'Salvar alterações';
    campoData.min = '';

    const partes = agendamento.diaHora.split('T');

    campoNomeTutor.value = agendamento.tutor;
    campoTelefoneTutor.value = agendamento.telefone;
    campoPetNome.value = agendamento.pet;
    campoEspecie.value = agendamento.especie;

    selectServico.value = agendamento.servico;
    atualizarTipoTosa();
    selectTipoTosa.value = agendamento.tipoTosa;

    campoData.value = partes[0];
    atualizarHorarios();
    selectHorario.value = partes[1];

    campoValor.value = agendamento.valor;
    selectPagamentoManual.value = agendamento.pagamento;
    campoInfoAdicional.value = agendamento.informacoes;

    dialogAgendamento.showModal();
}

// Agenda //
function mostrarAgenda() {
    const agendamentosDoDia = buscarAgendamentosDoDia(campoDataAgenda.value);

    agendamentosDoDia.sort((a, b) => a.diaHora.localeCompare(b.diaHora));

    atualizarTotal();

    const agendamentosFiltrados = agendamentosDoDia.filter((item) => {
        return (filtroPagamento.value === '' || item.pagamento === filtroPagamento.value)
            && (filtroStatus.value === '' || item.status === filtroStatus.value);
    });

    listaAgenda.innerHTML = '';

    if (agendamentosFiltrados.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhum agendamento neste dia';
        listaAgenda.appendChild(mensagem);
    }

    agendamentosFiltrados.forEach((agendamento) => {
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

        const valorFormatado = agendamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const valorCobrado = document.createElement('p');
        valorCobrado.textContent = `Valor: ${valorFormatado}`;

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

            atualizarTotal();
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

            atualizarTotal();
        });

        const rotuloStatus = document.createElement('label');
        rotuloStatus.textContent = 'Status';
        rotuloStatus.appendChild(selectStatus);

        const botaoEditar = document.createElement('button');
        botaoEditar.type = 'button';
        botaoEditar.classList.add('botao-editar');
        botaoEditar.textContent = 'Editar';
        botaoEditar.setAttribute('aria-label', `Editar agendamento de ${agendamento.pet}`);

        botaoEditar.addEventListener('click', () => {
            abrirModalEdicao(agendamento);
        });

        listaAgenda.appendChild(cartao);
        cartao.appendChild(petNome);
        cartao.appendChild(nomeTutor);
        cartao.appendChild(servicoNome);
        cartao.appendChild(valorCobrado);
        cartao.appendChild(rotuloPagamento);
        cartao.appendChild(rotuloStatus);
        cartao.appendChild(botaoEditar);
    });
}

campoDataAgenda.addEventListener('change', mostrarAgenda);
filtroPagamento.addEventListener('change', mostrarAgenda);
filtroStatus.addEventListener('change', mostrarAgenda);

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

botaoAbrirAgendamento.addEventListener('click', abrirModalNovo);

botaoFecharAgendamento.addEventListener('click', () => {
    dialogAgendamento.close();
});

dialogAgendamento.addEventListener('close', () => {
    idEmEdicao = null;

    formManual.reset();
    atualizarTipoTosa();
    atualizarHorarios();
    mensagemConfirmacao.textContent = '';
});

// Salvar: criar ou atualizar //
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

    const listaAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    if (idEmEdicao === null) {
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

        listaAgendamentos.push(agendamento);

        mensagemAgenda.textContent = 'Agendamento salvo!';
    } else {
        const agendamentoSalvo = listaAgendamentos.find((item) => {
            return item.id === idEmEdicao;
        });

        agendamentoSalvo.tutor = nome;
        agendamentoSalvo.telefone = telefone;
        agendamentoSalvo.pet = petNome;
        agendamentoSalvo.especie = especie;
        agendamentoSalvo.servico = servico;
        agendamentoSalvo.tipoTosa = tipoTosa;
        agendamentoSalvo.diaHora = `${data}T${horario}`;
        agendamentoSalvo.informacoes = infoAdicional;
        agendamentoSalvo.valor = valor;
        agendamentoSalvo.pagamento = pagamento;

        mensagemAgenda.textContent = 'Agendamento atualizado!';
    }

    localStorage.setItem('agendamentos', JSON.stringify(listaAgendamentos));

    campoDataAgenda.value = data;
    mostrarAgenda();

    dialogAgendamento.close();

    setTimeout(() => {
        mensagemAgenda.textContent = '';
    }, 4000);
});

campoDataAgenda.value = hoje;
mostrarAgenda();