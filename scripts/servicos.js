const servicos = [
    {
        id: "banho",
        nome: "Banho",
        valor: 50,
        duracao: 60,
        descricao: "Água morninha, shampoo neutro e muito carinho. Seu pet volta cheirosinho e fofinho."
    },

    {
        id: "tosa",
        nome: "Tosa",
        valor: 70,
        duracao: 90,
        descricao: "Um visual novo feito com calma e cuidado, do jeitinho que você escolher.",
        tipos: [
            { id: "higienica", nome: "Higiênica", descricao: "Remove os pelos da barriga, virilha, da região genital e ao redor das almofadinhas das patas para evitar acúmulo de sujeira e bactérias." },
            { id: "bebe", nome: "Bebê", descricao: "Deixa o pelo com comprimento uniforme (geralmente de 2 a 3 dedos) e formato arredondado, simulando a aparência de um filhote. É feita com máquina e acabamento em tesoura." },
            { id: "tesoura", nome: "Tesoura", descricao: "Indicada para cães com pelagem média ou longa, ou animais que têm medo ou alergia ao barulho e à vibração da lâmina de máquina. Proporciona um acabamento mais delicado." },
            { id: "verao", nome: "Verão", descricao: "Remove grande parte do volume da pelagem para aliviar o calor e eliminar nós difíceis." }
        ]
    },

    {
        id: "banho-e-tosa",
        nome: "Banho e tosa",
        valor: 100,
        duracao: 120,
        descricao: "O pacote completo: banho cheiroso e tosa à sua escolha, pro seu pet sair renovado.",
        tipos: [
            { id: "higienica", nome: "Higiênica", descricao: "Remove os pelos da barriga, virilha, da região genital e ao redor das almofadinhas das patas para evitar acúmulo de sujeira e bactérias." },
            { id: "bebe", nome: "Bebê", descricao: "Deixa o pelo com comprimento uniforme (geralmente de 2 a 3 dedos) e formato arredondado, simulando a aparência de um filhote. É feita com máquina e acabamento em tesoura." },
            { id: "tesoura", nome: "Tesoura", descricao: "Indicada para cães com pelagem média ou longa, ou animais que têm medo ou alergia ao barulho e à vibração da lâmina de máquina. Proporciona um acabamento mais delicado." },
            { id: "verao", nome: "Verão", descricao: "Remove grande parte do volume da pelagem para aliviar o calor e eliminar nós difíceis." }
        ]
    },

    {
        id: "consulta-veterinaria",
        nome: "Consulta veterinária",
        valor: 120,
        duracao: 30,
        descricao: "Um check-up com atenção e tranquilidade, pra cuidar da saúde do seu melhor amigo."
    },

    {
        id: "corte-de-unhas",
        nome: "Corte de unhas",
        valor: 20,
        duracao: 15,
        descricao: "Unhas aparadas com delicadeza, pra seu pet andar com conforto e sem arranhões."
    }
]