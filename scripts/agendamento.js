// Opções de serviços //
const selectServico = document.getElementById('servico');

servicos.forEach((servico) => {
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
    });
});

// Opções de tipo de tosa //
const opcoesTosa = document.getElementById('opcoes-tosa');

function atualizarTipoTosa() {
    const servicoEscolhido = servicos.find((servico) => {
        return servico.id === selectServico.value;
    });

    if (servicoEscolhido && servicoEscolhido.tipos) {
        opcoesTosa.hidden = false;
    } else {
        opcoesTosa.hidden = true;
    }
}

selectServico.addEventListener('change', atualizarTipoTosa);

