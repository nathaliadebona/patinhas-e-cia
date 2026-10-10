const selectServico = document.getElementById('servico');
const opcoesTosa = document.getElementById('opcoes-tosa');
const selectTipoTosa = document.getElementById('tipo-tosa');
const selectHorario = document.getElementById('horario');
const campoData = document.getElementById('data');
const mensagemConfirmacao = document.getElementById('mensagem-confirmacao');
const ABERTURA = 540;
const FECHAMENTO = 1080;
const INTERVALO = 30;

// Id do agendamento que está sendo editado (null = nenhum) //
let idEmEdicao = null;

// Opções de serviços //
servicos.forEach((servico) => {
    const servicoOption = document.createElement('option');
    servicoOption.value = servico.id;
    servicoOption.textContent = servico.nome;
    selectServico.appendChild(servicoOption);
});

// Opções de tipo de tosa //
function atualizarTipoTosa() {
    const servicoEscolhido = servicos.find((servico) => {
        return servico.id === selectServico.value;
    });

    if (servicoEscolhido && servicoEscolhido.tipos) {
        opcoesTosa.hidden = false;

        selectTipoTosa.innerHTML = '<option value="">Selecione</option>';

        servicoEscolhido.tipos.forEach((tipo) => {
            const tipoOption = document.createElement('option');
            tipoOption.value = tipo.id;
            tipoOption.textContent = tipo.nome;
            selectTipoTosa.appendChild(tipoOption);
        });

        selectTipoTosa.required = true;

    } else {
        opcoesTosa.hidden = true;
        selectTipoTosa.required = false;
        selectTipoTosa.value = '';
    }
}

// Horários //
function preencherHorarios(duracao) {
    selectHorario.innerHTML = '<option value="">Selecione</option>';

    const agendamentosDoDia = buscarAgendamentosDoDia(campoData.value);

    const relogio = new Date();
    const minutosAgora = relogio.getHours() * 60 + relogio.getMinutes();
    const ehHoje = campoData.value === hoje;

    for (let i = ABERTURA; i + duracao <= FECHAMENTO; i += INTERVALO) {
        const jaPassou = ehHoje && i <= minutosAgora;

        if (!horarioOcupado(i, duracao, agendamentosDoDia) && !jaPassou) {
            const horas = Math.floor(i / 60);
            const minutos = i % 60;
            const horasTexto = String(horas).padStart(2, '0');
            const minutosTexto = String(minutos).padStart(2, '0');
            const horario = `${horasTexto}:${minutosTexto}`;

            const horarioOption = document.createElement('option');
            horarioOption.value = horario;
            horarioOption.textContent = horario;

            selectHorario.appendChild(horarioOption);
        }
    }
}

function atualizarHorarios() {
    const servicoEscolhido = servicos.find((servico) => {
        return servico.id === selectServico.value;
    });

    if (servicoEscolhido && campoData.value) {
        preencherHorarios(servicoEscolhido.duracao);
    } else {
        selectHorario.innerHTML = '<option value="">Selecione</option>';
    }
}

function horarioParaMinutos(horario) {
    const partes = horario.split(':');
    return Number(partes[0]) * 60 + Number(partes[1]);
}

function inicioDoAgendamento(agendamento) {
    const partes = agendamento.diaHora.split('T');
    return horarioParaMinutos(partes[1]);
}

function duracaoDoAgendamento(agendamento) {
    const servicoEncontrado = servicos.find((item) => {
        return item.id === agendamento.servico;
    });

    return servicoEncontrado.duracao;
}

function fimDoAgendamento(agendamento) {
    const inicio = inicioDoAgendamento(agendamento);
    const duracao = duracaoDoAgendamento(agendamento);

    return inicio + duracao;
}

function seSobrepoe(inicioA, fimA, inicioB, fimB) {
    return inicioA < fimB && fimA > inicioB;
}

function horarioOcupado(inicio, duracao, lista) {
    return lista.some((item) => {
        return item.status !== 'cancelado'
            && item.id !== idEmEdicao
            && seSobrepoe(inicio, inicio + duracao, inicioDoAgendamento(item), fimDoAgendamento(item));
    });
}

function ehDomingo(data) {
    const diaDaSemana = new Date(`${data}T00:00`).getDay();

    return diaDaSemana === 0;
}

selectServico.addEventListener('change', atualizarTipoTosa);
selectServico.addEventListener('change', atualizarHorarios);

campoData.addEventListener('change', () => {
    mensagemConfirmacao.textContent = '';

    if (ehDomingo(campoData.value)) {
        campoData.value = '';
        mensagemConfirmacao.textContent = 'Fechamos aos domingos. Escolha outro dia.';
    }

    atualizarHorarios();
});

campoData.min = hoje;