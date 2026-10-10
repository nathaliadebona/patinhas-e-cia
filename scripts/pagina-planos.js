const listaPlanos = document.getElementById('lista-planos');

function calcularValorAvulso(plano) {
    return plano.inclui.reduce((acumulado, item) => {
        const servicoEncontrado = servicos.find((servico) => {
            return servico.id === item.servico;
        });

        return acumulado + servicoEncontrado.valor * item.quantidade;
    }, 0);
}

planos.forEach((plano) => {
    const cartao = document.createElement('article');
    cartao.classList.add('cartao-plano');

    const nome = document.createElement('h3');
    nome.textContent = plano.nome;

    const valorFormatado = plano.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const preco = document.createElement('p');
    preco.classList.add('preco-plano')
    preco.innerHTML = `<strong>${valorFormatado}</strong> por mês`;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao-plano');
    descricao.textContent = plano.descricao;

    const listaInclui = document.createElement('ul');
    listaInclui.classList.add('lista-inclui');

    plano.inclui.forEach((item) => {
        const servicoEncontrado = servicos.find((servico) => {
            return servico.id === item.servico;
        });

        const itemLista = document.createElement('li');
        itemLista.innerHTML = `<strong>${servicoEncontrado.nome}</strong>: ${item.quantidade} ${item.quantidade === 1 ? 'vez' : 'vezes'} ao mês`;
        listaInclui.appendChild(itemLista);
    });

    const valorAvulso = calcularValorAvulso(plano);
    const economia = valorAvulso - plano.valor;

    if (economia > 0) {
        const economiaFormatada = economia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const textoEconomia = document.createElement('p');
        textoEconomia.textContent = `Economize ${economiaFormatada} por mês`;

        cartao.appendChild(textoEconomia);
    }

    listaPlanos.appendChild(cartao);
    cartao.appendChild(nome);
    cartao.appendChild(preco);
    cartao.appendChild(descricao);
    cartao.appendChild(listaInclui);
});