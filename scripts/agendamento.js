const selectServico = document.getElementById('servico');

servicos.forEach((servico) => {
    const servicoOption = document.createElement('option');
    servicoOption.value = servico.id;
    servicoOption.textContent = servico.nome;
    selectServico.appendChild(servicoOption);
});