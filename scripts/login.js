const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('usuario');
const campoSenha = document.getElementById('senha');
const USUARIO_CORRETO = 'equipe';
const SENHA_CORRETA = '123456';

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const usuario = campoUsuario.value;
    const senha = campoSenha.value;

    if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
        console.log('entrou')
    } else {
        console.log('dados incorretos')
    }

});