const listaPlanos = document.getElementById('lista-planos');

planos.forEach((plano) => {
    const cartao = document.createElement('article');
    cartao.classList.add('cartao-plano');

    const nome = document.createElement('h3');
    nome.textContent = plano.nome;

    const valorFormatado = plano.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const preco = document.createElement('p');
    preco.textContent = `${valorFormatado} por mês`;

    listaPlanos.appendChild(cartao);
    cartao.appendChild(nome);
    cartao.appendChild(preco);
});