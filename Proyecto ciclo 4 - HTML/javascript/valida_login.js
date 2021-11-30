window.onload = function() {
  document.getElementById("entrar").onclick = validarLogin;  
}

function validarLogin() {

    var usuario = document.getElementById("c_usuario").value ;
    var password = document.getElementById("c_contrasena").value;

    if ((usuario === "admininicial") && (password === "admin123456")) {
        document.getElementById("msg_error").innerHTML = '';
        parent.frames["menu"].location.href = "menu.html";
        parent.frames["principal"].location.href = "blanco.html";
    }
    else {
        document.getElementById("msg_error").innerHTML = 'Usuario o Contraseña inválidos!';
    }
}