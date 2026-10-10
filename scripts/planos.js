const planos = [
    {
        id: "bem-cuidado",
        nome: "Bem Cuidado",
        valor: 300,
        descricao: "Cuidado de verdade o mês inteiro: seu pet sempre limpinho, com pelo e unhas em dia.",
        inclui: [
            { servico: "banho", quantidade: 2 },
            { servico: "banho-e-tosa", quantidade: 2 },
            { servico: "corte-de-unhas", quantidade: 2 }
        ]
    },

    {
        id: "cheirosinho",
        nome: "Cheirosinho",
        valor: 100,
        descricao: "Banho e unhas em dia pra seu pet viver cheirosinho e confortável.",
        inclui: [
            { servico: "banho", quantidade: 2 },
            { servico: "corte-de-unhas", quantidade: 1 }
        ]
    },

    {
        id: "saude-em-dia",
        nome: "Saúde em Dia",
        valor: 190,
        descricao: "Banho no mês e uma consulta com a gente, pra cuidar da saúde do seu melhor amigo.",
        inclui: [
            { servico: "banho", quantidade: 2 },
            { servico: "consulta-veterinaria", quantidade: 1 }
        ]
    }
]