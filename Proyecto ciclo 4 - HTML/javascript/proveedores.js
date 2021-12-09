window.onload = function() {
    document.getElementById("nit").onchange = activar_boton;
    document.getElementById("btn_consultar").onclick = busca_proveedor;
    document.getElementById("btn_crear").onclick = crear_proveedor;
    document.getElementById("btn_actualizar").onclick = actualiza_proveedor;
    document.getElementById("btn_borrar").onclick = borra_proveedor;
}

function activar_boton() {
    document.getElementById("btn_consultar").disabled = false;
}

function busca_proveedor() {
    var numero_nit = document.getElementById("nit").value;

    console.log("nit: ", numero_nit);

    if (numero_nit !== "") {
        var direccion = "http://localhost:9091/proveedor/buscar/" + numero_nit;

        // buscarcliente por cedula
        fetch(direccion, {method: "GET"})
            .then(resp => resp.json())
            .then(function(data) {
                document.getElementById("nombre").value = data.nombre_proveedor;
                document.getElementById("telefono").value = data.telefono_proveedor;
                document.getElementById("ciudad").value = data.ciudad_proveedor;
                document.getElementById("direccion").value = data.direccion_proveedor;
                document.getElementById("msg_error").innerHTML = '';
                document.getElementById("btn_crear").disabled = true;
                document.getElementById("btn_actualizar").disabled = false;
                document.getElementById("btn_borrar").disabled = false;
            })
            .catch(function(error) {
                document.getElementById("msg_error").innerHTML = 'Ese proveedor no se encuentra registrado en el sistema';
                document.getElementById("nombre").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("ciudad").value = "";
                document.getElementById("direccion").value = "";
                document.getElementById("btn_crear").disabled = false;
                document.getElementById("btn_actualizar").disabled = true;
                document.getElementById("btn_borrar").disabled = true;
            });
    }
    else {
        console.log("nit ==" + numero_nit);
    }

}

function crear_proveedor() {
 
    if(document.getElementById("btn_crear").value == "Crear") {
        document.getElementById("btn_consultar").disabled = true;
        document.getElementById("btn_actualizar").disabled = true;
        document.getElementById("btn_borrar").disabled = true;
        activar_campos();
        document.getElementById("btn_crear").value = "Guardar";
    }
    else if(valida_campos()) {
        var direccion = "http://localhost:9091/proveedor/guardar";

        datos = {
            nitproveedor: document.getElementById("nit").value,
            nombre_proveedor: document.getElementById("nombre").value,
            direccion_proveedor: document.getElementById("direccion").value,
            telefono_proveedor: document.getElementById("telefono").value,
            ciudad_proveedor: document.getElementById("ciudad").value,
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
            document.getElementById("msg_error").innerHTML = "El proveedor fue creado exitosamente";
            document.getElementById("btn_crear").value = "Crear";
            document.forms[0].reset();
            desactivar_campos();
        })
        .catch(function(error) {
            document.getElementById("msg_error").innerHTML = 'Error al crear el proveedor : ' + error;
        });        
    }
}

function valida_campos() {

    if(document.getElementById("telefono").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe ingresar un número telefónico del proveedor";
        document.getElementById("telefono").focus();
        return false;
    }
    else if (document.getElementById("nombre").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe escribir el nombre completo del proveedor";
        document.getElementById("nombre").focus();
        return false;
    } 
    else if (document.getElementById("ciudad").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe escribir la ciudad del proveedor";
        document.getElementById("ciudad").focus();            
        return false;
    }
    else if (document.getElementById("direccion").value == "") {
        document.getElementById("msg_error").innerHTML = "Debe escribir la direccion del proveedor";
        document.getElementById("direccion").focus();            
        return false;
    }

    return true;
}

function actualiza_proveedor() {

    if(document.getElementById("btn_actualizar").value == "Actualizar") {
        document.getElementById("btn_consultar").disabled = true;
        document.getElementById("btn_crear").disabled = true;
        document.getElementById("btn_borrar").disabled = true;
        activar_campos();
        document.getElementById("btn_actualizar").value = "Guardar";
    }
    else if (valida_campos) {
        var direccion = "http://localhost:9091/proveedor/actualizar";

        datos = {
            nitproveedor: document.getElementById("nit").value,
            nombre_proveedor: document.getElementById("nombre").value,
            direccion_proveedor: document.getElementById("direccion").value,
            telefono_proveedor: document.getElementById("telefono").value,
            ciudad_proveedor: document.getElementById("ciudad").value,
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
            document.getElementById("msg_error").innerHTML = "El proveedor fue actualizado exitosamente";
            document.getElementById("btn_actualizar").value = "Actualizar";
            document.forms[0].reset();
            desactivar_campos();
        })
        .catch(function(error) {
            document.getElementById("msg_error").innerHTML = 'Error al actualizar el proveedor : ' + error;
        });
    }
}

function borra_proveedor() {

    var direccion = "http://localhost:9091/proveedor/eliminar/" + document.getElementById("nit").value;

    fetch(direccion, {
        headers: {
            "Content-Type": "application/json"
            },
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("msg_error").innerHTML = "El proveedor fue eliminado exitosamente";
        document.forms[0].reset();
        desactivar_campos();
    })
    .catch(function(error) {
        document.getElementById("msg_error").innerHTML = 'Error al eliminar el proveedor : ' + error;
    });
}

function activar_campos() {
    document.getElementById("msg_error").innerHTML = '';
    document.getElementById("nit").disabled = true;
    document.getElementById("nombre").disabled = false;
    document.getElementById("telefono").disabled = false;
    document.getElementById("ciudad").disabled = false;
    document.getElementById("direccion").disabled = false;
}

function desactivar_campos() {
    document.getElementById("nit").disabled = false;
    document.getElementById("nombre").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("ciudad").disabled = true;
    document.getElementById("direccion").disabled = true;
}
