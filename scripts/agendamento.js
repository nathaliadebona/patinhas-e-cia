const selectServico = document.getElementById('servico');
const opcoesTosa = document.getElementById('opcoes-tosa');
const selectTipoTosa = document.getElementById('tipo-tosa');
const agendamentoSection = document.getElementById('agendamento');
const selectHorario = document.getElementById('horario');
const formAgendamento = document.getElementById('form-agendamento');
const campoNome = document.getElementById('nome');
const campoTelefone = document.getElementById('telefone');
const campoPetNome = document.getElementById('pet-nome');
const campoEspecie = document.getElementById('especie');
const campoData = document.getElementById('data');
const campoInfoAdicional = document.getElementById('informacao-adicional');
const mensagemConfirmacao = document.getElementById('mensagem-confirmacao');
const ABERTURA = 540;
const FECHAMENTO = 1080;
const INTERVALO = 30;

// Opções de serviços //
servicos.forEach((servico) => {
    selectTipoTosa.innerHTML = '';
    const servicoOption = document.createElement('option');
    servicoOption.value = servico.id;
    servicoOption.textContent = servico.nome;
    selectServico.appendChild(servicoOption);
});

// Botões selecionar dos cards de serviços //
const botoesSelecionar = document.querySelectorAll('#servicos-cards button');

botoesSelecionar.forEach((botao) => {
    botao.addEventListener('click', () => {
        selectServico.value = botao.dataset.servico;
        atualizarTipoTosa();
        atualizarHorarios();

        agendamentoSection.scrollIntoView({ behavior: 'smooth'});
    });
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

    for (let i = ABERTURA; i + duracao <= FECHAMENTO; i += INTERVALO) {
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

function atualizarHorarios() {
    const servicoEscolhido = servicos.find((servico) => {
        return servico.id === selectServico.value;
    });

    if (servicoEscolhido) {
        preencherHorarios(servicoEscolhido.duracao);
    } else {
        selectHorario.innerHTML = '<option value="">Selecione</option>';
    }
}

function buscarAgendamentosDoDia(data) {
    const listaSalva = JSON.parse(localStorage.getItem('agendamentos')) || [];

    return listaSalva.filter((item) => {
        return item.diaHora.startsWith(data);
    });
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

// Envio de formulário de agendamento //
formAgendamento.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    const nome = campoNome.value;
    const telefone = campoTelefone.value;
    const petNome = campoPetNome.value;
    const especie = campoEspecie.value;
    const servico = selectServico.value;
    const tipoTosa = selectTipoTosa.value;
    const data = campoData.value;
    const horario = selectHorario.value;
    const infoAdicional = campoInfoAdicional.value;

    const servicoEscolhido = servicos.find((item) => {
        return item.id === servico;
    });

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
        valor: servicoEscolhido.valor,
        pagamento: "pendente",
        status: "agendado"
    };

    const listaAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    listaAgendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(listaAgendamentos));
    formAgendamento.reset();

    atualizarTipoTosa();
    atualizarHorarios();

    mensagemConfirmacao.textContent = 'Agendamento confirmado! Esperamos você e seu pet.';

    setTimeout(() => {
        mensagemConfirmacao.textContent = '';
    }, 4000);
});

selectServico.addEventListener('change', atualizarTipoTosa);
selectServico.addEventListener('change', atualizarHorarios);

campoData.addEventListener('change', () => {
    const agendamentos = buscarAgendamentosDoDia(campoData.value);
});