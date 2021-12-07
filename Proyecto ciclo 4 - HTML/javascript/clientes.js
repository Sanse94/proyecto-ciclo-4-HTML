window.onload = function() {
    document.getElementById("ced_cliente").onchange = activar_boton;
    document.getElementById("btn_consultar").onclick = busca_cliente;
    document.getElementById("btn_crear").onclick = crear_cliente;
    document.getElementById("btn_actualizar").onclick = actualiza_cliente;
    document.getElementById("btn_borrar").onclick = borra_cliente;
}

function activar_boton() {
    document.getElementById("btn_consultar").disabled = false;
}

function busca_cliente() {
    var cedula = document.getElementById("ced_cliente").value;

    if (cedula !== "") {
        var direccion = "http://localhost:8181/clientes/buscar/" + cedula;

        // buscarcliente por cedula
        fetch(direccion, {method: "GET"})
            .then(resp => resp.json())
            .then(function(data) {
                document.getElementById("nombre").value = data.nombre_cliente;
                document.getElementById("telefono").value = data.telefono_cliente;
                document.getElementById("correo").value = data.correo_cliente;
                document.getElementById("direccion").value = data.direccion_cliente;
                document.getElementById("msg_error").innerHTML = '';
                document.getElementById("btn_crear").disabled = true;
                document.getElementById("btn_actualizar").disabled = false;
                document.getElementById("btn_borrar").disabled = false;
            })
            .catch(function(error) {
                document.getElementById("msg_error").innerHTML = 'Ese cliente no se encuentra registrado en el sistema';
                document.getElementById("nombre").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("correo").value = "";
                document.getElementById("direccion").value = "";
                document.getElementById("btn_crear").disabled = false;
                document.getElementById("btn_actualizar").disabled = true;
                document.getElementById("btn_borrar").disabled = true;
            });
    }
    else {
        console.log("cedula ==" + cedula);
    }

}

function crear_cliente() {
 

    if(document.getElementById("btn_crear").value == "Crear") {
        document.getElementById("btn_consultar").disabled = true;
        document.getElementById("btn_actualizar").disabled = true;
        document.getElementById("btn_borrar").disabled = true;
        activar_campos();
        document.getElementById("btn_crear").value = "Guardar";
    }
    else if(valida_campos()) {
        var direccion = "http://localhost:8181/clientes/guardar";

        datos = {
            cedula_cliente: document.getElementById("ced_cliente").value,
            nombre_cliente: document.getElementById("nombre").value,
            direccion_cliente: document.getElementById("direccion").value,
            telefono_cliente: document.getElementById("telefono").value,
            correo_cliente: document.getElementById("correo").value,
        }
        
        fetch(direccion, {
            headers: {
                "Content-Type": "application/json"
                },
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("msg_error").innerHTML = "El cliente fue creado exitosamente";
            document.getElementById("btn_crear").value = "Crear";
            document.forms[0].reset();
            desactivar_campos();
        })
        .catch(function(error) {
            document.getElementById("msg_error").innerHTML = 'Error al crear el cliente : ' + error;
        });        
    }
}

function valida_campos() {

    if(document.getElementById("telefono").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe ingresar un número telefónico del cliente";
        document.getElementById("telefono").focus();
        return false;
    }
    else if (document.getElementById("nombre").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe escribir el nombre completo del cliente";
        document.getElementById("nombre").focus();
        return false;
    } 
    else if (!validar_correo(document.getElementById("correo").value)) {
        document.getElementById("msg_error").innerHTML = "Debe escribir el correo electrónico del cliente";
        document.getElementById("correo").focus();            
        return false;
    }
    else if (document.getElementById("direccion").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe escribir la direccion del cliente";
        document.getElementById("direccion").focus();            
        return false;
    }

    return true;
}

function actualiza_cliente() {


    if(document.getElementById("btn_actualizar").value == "Actualizar") {
        document.getElementById("btn_consultar").disabled = true;
        document.getElementById("btn_crear").disabled = true;
        document.getElementById("btn_borrar").disabled = true;
        activar_campos();
        document.getElementById("btn_actualizar").value = "Guardar";
    }
    else if (valida_campos) {
        var direccion = "http://localhost:8181/clientes/actualizar";

        datos = {
            cedula_cliente: document.getElementById("ced_cliente").value,
            nombre_cliente: document.getElementById("nombre").value,
            direccion_cliente: document.getElementById("direccion").value,
            telefono_cliente: document.getElementById("telefono").value,
            correo_cliente: document.getElementById("correo").value,
        }
        
        fetch(direccion, {
            headers: {
                "Content-Type": "application/json"
                },
            method: "PUT",
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("msg_error").innerHTML = "El cliente fue actualizado exitosamente";
            document.getElementById("btn_actualizar").value = "Actualizar";
            document.forms[0].reset();
            desactivar_campos();
        })
        .catch(function(error) {
            document.getElementById("msg_error").innerHTML = 'Error al actualizar el cliente : ' + error;
        });
    }
}

function borra_cliente() {

    var direccion = "http://localhost:8181/clientes/eliminar/" + document.getElementById("ced_cliente").value;

    fetch(direccion, {
        headers: {
            "Content-Type": "application/json"
            },
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("msg_error").innerHTML = "El cliente fue eliminado exitosamente";
        document.forms[0].reset();
        desactivar_campos();
    })
    .catch(function(error) {
        document.getElementById("msg_error").innerHTML = 'Error al eliminar el cliente : ' + error;
    });
}

function activar_campos() {
    document.getElementById("msg_error").innerHTML = '';
    document.getElementById("ced_cliente").disabled = true;
    document.getElementById("nombre").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("correo").disabled = false;
    document.getElementById("direccion").disabled = false;
}

function desactivar_campos() {
    document.getElementById("ced_cliente").disabled = false;
    document.getElementById("nombre").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("correo").disabled = true;
    document.getElementById("direccion").disabled = true;
}

function validar_correo(valor) {
    if ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(valor)){
        return true;
    } 
    else {
        return false;
    }
}