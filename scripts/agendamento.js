// Opções de serviços //
const selectServico = document.getElementById('servico');
const opcoesTosa = document.getElementById('opcoes-tosa');
const selectTipoTosa = document.getElementById('tipo-tosa');
const agendamentoSection = document.getElementById('agendamento');

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
    } else {
        opcoesTosa.hidden = true;
    }
}

selectServico.addEventListener('change', atualizarTipoTosa);

