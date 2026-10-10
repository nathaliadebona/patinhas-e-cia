const listaPlanos = document.getElementById('lista-planos');

planos.forEach((plano) => {
    const cartao = document.createElement('article');
    cartao.classList.add('cartao-plano');

    const nome = document.createElement('h3');
    nome.textContent = plano.nome;

    const valorFormatado = plano.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const preco = document.createElement('p');
    preco.textContent = `${valorFormatado} por mês`;

    const descricao = document.createElement('p');
    descricao.textContent = plano.descricao;

    const listaInclui = document.createElement('ul');
    listaInclui.classList.add('lista-inclui');

    plano.inclui.forEach((item) => {
        const servicoEncontrado = servicos.find((servico) => {
            return servico.id === item.servico;
        });

        const itemLista = document.createElement('li');
        itemLista.textContent = `${item.quantidade}x ${servicoEncontrado.nome}`;
        listaInclui.appendChild(itemLista);
    });

    listaPlanos.appendChild(cartao);
    cartao.appendChild(nome);
    cartao.appendChild(preco);
    cartao.appendChild(descricao);
    cartao.appendChild(listaInclui);
});