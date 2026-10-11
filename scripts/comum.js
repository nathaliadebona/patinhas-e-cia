function buscarAgendamentosDoDia(data) {
    const listaSalva = JSON.parse(localStorage.getItem('agendamentos')) || [];

    return listaSalva.filter((item) => {
        return item.diaHora.startsWith(data);
    });
}

function calcularTotal(lista) {
    return lista.reduce((acumulado, item) => {
        return acumulado + item.valor;
    }, 0);
}

const agora = new Date();
const ano = agora.getFullYear();
const mes = agora.getMonth() + 1;
const dia = agora.getDate();

const mesTexto = String(mes).padStart(2, '0');
const diaTexto = String(dia).padStart(2, '0');
const hoje = `${ano}-${mesTexto}-${diaTexto}`;

