// Elementos do formulário do tutor //
const formAgendamento = document.getElementById('form-agendamento');
const agendamentoSection = document.getElementById('agendamento');
const campoNome = document.getElementById('nome');
const campoTelefone = document.getElementById('telefone');
const campoPetNome = document.getElementById('pet-nome');
const campoEspecie = document.getElementById('especie');
const campoInfoAdicional = document.getElementById('informacao-adicional');

// Botões selecionar dos cards de serviços //
const botoesSelecionar = document.querySelectorAll('#servicos-cards button');

botoesSelecionar.forEach((botao) => {
    botao.addEventListener('click', () => {
        selectServico.value = botao.dataset.servico;
        atualizarTipoTosa();
        atualizarHorarios();

        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
    });
});

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
        pagamento: 'pendente',
        status: 'agendado'
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