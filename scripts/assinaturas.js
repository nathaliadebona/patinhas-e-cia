const botaoSair = document.getElementById('botao-sair');
const listaAssinaturas = document.getElementById('lista-assinaturas');
const totalAssinantes = document.getElementById('total-assinantes');
const totalMensal = document.getElementById('total-mensal');

const statusAssinatura = [
    { valor: 'novo', texto: 'Novo' },
    { valor: 'contatado', texto: 'Contatado' },
    { valor: 'ativo', texto: 'Ativo' },
    { valor: 'cancelado', texto: 'Cancelado' }
];

if (sessionStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
}

function atualizarTotais() {
    const assinaturasSalvas = JSON.parse(localStorage.getItem('assinaturas')) || [];

    const ativas = assinaturasSalvas.filter((item) => {
        return item.status === 'ativo';
    });

    const quantidade = ativas.length;
    const palavra = quantidade === 1 ? 'assinante ativo' : 'assinantes ativos';

    const receita = calcularTotal(ativas);
    const receitaFormatada = receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    totalAssinantes.innerHTML = `<strong>${quantidade}</strong> ${palavra}`;
    totalMensal.innerHTML = `Receita mensal: <strong>${receitaFormatada}</strong>`;
}

function mostrarAssinaturas() {
    const assinaturasSalvas = JSON.parse(localStorage.getItem('assinaturas')) || [];

    atualizarTotais();

    assinaturasSalvas.sort((a, b) => b.dataAssinatura.localeCompare(a.dataAssinatura));

    listaAssinaturas.innerHTML = '';

    if (assinaturasSalvas.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhuma assinatura por enquanto.';
        listaAssinaturas.appendChild(mensagem);
    }

    assinaturasSalvas.forEach((assinatura) => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-assinatura');

        const nome = document.createElement('h3');
        nome.textContent = assinatura.nome;

        const contato = document.createElement('p');
        contato.textContent = `${assinatura.telefone} · ${assinatura.pet}`;

        const planoEncontrado = planos.find((item) => {
            return item.id === assinatura.plano;
        });

        const nomePlano = document.createElement('p');
        nomePlano.innerHTML = `<strong>Plano:</strong> ${planoEncontrado.nome}`;

        const valorFormatado = assinatura.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const valorAssinatura = document.createElement('p');
        valorAssinatura.innerHTML = `<strong>Valor:</strong> ${valorFormatado} por mês`;

        const selectStatus = document.createElement('select');

        statusAssinatura.forEach((status) => {
            const opcao = document.createElement('option');
            opcao.value = status.valor;
            opcao.textContent = status.texto;
            selectStatus.appendChild(opcao);
        });

        selectStatus.value = assinatura.status;

        selectStatus.addEventListener('change', () => {
            const listaSalva = JSON.parse(localStorage.getItem('assinaturas')) || [];

            const assinaturaSalva = listaSalva.find((item) => {
                return item.id === assinatura.id;
            });

            assinaturaSalva.status = selectStatus.value;

            localStorage.setItem('assinaturas', JSON.stringify(listaSalva));
        
            atualizarTotais();
        });

        const rotuloStatus = document.createElement('label');
        rotuloStatus.textContent = 'Status';
        rotuloStatus.appendChild(selectStatus);

        listaAssinaturas.appendChild(cartao);
        cartao.appendChild(nome);
        cartao.appendChild(contato);
        cartao.appendChild(nomePlano);
        cartao.appendChild(valorAssinatura);
        cartao.appendChild(rotuloStatus);
    });
}

botaoSair.addEventListener('click', () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
});

mostrarAssinaturas();