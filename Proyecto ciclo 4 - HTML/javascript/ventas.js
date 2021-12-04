window.onload = function() {
    document.getElementById("btn_consultar").onclick = buscar_cliente;
    document.getElementById("btn_consultar1").onclick = buscar_producto1;
    document.getElementById("btn_consultar2").onclick = buscar_producto2;
    document.getElementById("btn_consultar3").onclick = buscar_producto3;
    document.getElementById("cant1").onchange = calcula_total1;
    document.getElementById("cant2").onchange = calcula_total2;
    document.getElementById("cant3").onchange = calcula_total3;
    document.getElementById("btn_confirmar").onclick=guardar_venta;
}

function buscar_cliente() {
    var cedula = document.getElementById("ced_cliente").value;

    if (cedula !== "") {
        var direccion = "http://localhost:8181/clientes/buscar/" + cedula;

        // buscarcliente por cedula
        fetch(direccion, {method: "GET"})
            .then(resp => resp.json())
            .then(function(data) {
                document.getElementById("nombre_cliente").value = data.nombre_cliente;
                document.getElementById("cod_producto1").disabled = false;
                document.getElementById("btn_consultar1").disabled = false;
                document.getElementById("msg_error").innerHTML = '';
            })
            .catch(function(error) {
                document.getElementById("nombre_cliente").value = "";
                document.getElementById("cod_producto1").disabled = true;
                document.getElementById("btn_consultar1").disabled = true;
                document.getElementById("msg_error").innerHTML = 'Ese cliente no se encuentra registrado en el sistema';
            });

        document.getElementById("cod_producto1").disabled = false;
        document.getElementById("btn_consultar1").disabled = false;
    }
    else {
        console.log("cedula ==" + cedula);
    }
}

function busca_producto(cod_producto) {
    var codigo_producto = document.getElementById("cod_producto" + cod_producto).value;

    if (codigo_producto !== "") {
        var direccion = "http://localhost:9090/productos/buscar/" + codigo_producto;

        // buscar producto por codigo
        fetch(direccion, {method: "GET"})
            .then(resp => resp.json())
            .then(function(data) {
                document.getElementById("nombre_producto" + cod_producto).value = data.nombre_producto;
                document.getElementById("cant" + cod_producto).disabled = false;
                document.getElementById("valor_unitario" + cod_producto).value = data.precio_venta ;
                document.getElementById("valor_iva" + cod_producto).value = data.ivacompra;
                document.getElementById("total_venta" + cod_producto).value = 0.0;
                document.getElementById("msg_error").innerHTML = '';

                return true;
            })
            .catch(function(error) {
                document.getElementById("msg_error").innerHTML = 'Ese producto no se encuentra registrado en el sistema';
            });
    }
    else {
        console.log("producto ==" + codigo_producto);
    }

    return false;
}

function buscar_producto1() {
    if(busca_producto(1)) {
        document.getElementById("ced_cliente").disabled = true;
        document.getElementById("btn_consultar").disabled = true;
        document.getElementById("cod_producto2").disabled = false;
        document.getElementById("btn_consultar2").disabled = false;
    }
    else {
        document.getElementById("cant1").disabled = true;
        document.getElementById("cod_producto2").disabled = true;
        document.getElementById("btn_consultar2").disabled = true;
    }
}

function buscar_producto2() {
    if(busca_producto(2)) {
        document.getElementById("cod_producto3").disabled = false;
        document.getElementById("btn_consultar3").disabled = false;
    }
    else {
        document.getElementById("cant2").disabled = true;
    }
}


function buscar_producto3() {
    if(busca_producto(3)) {
        document.getElementById("cant3").disabled = false;
    }
    else {
    }
}

function total_producto(cod_producto) {

    var total = parseInt(document.getElementById("valor_unitario" + cod_producto).value) * parseFloat(document.getElementById("cant" + cod_producto).value);
    document.getElementById("valor_total" + cod_producto).value = total.toFixed(2);
    var valor_iva_venta  = parseFloat(document.getElementById("valor_iva" + cod_producto).value);
    document.getElementById("total_venta" + cod_producto).value = (total * (1 + valor_iva_venta)).toFixed(2);
}

function calcula_total1() {

    total_producto(1)

    if (document.getElementById("cant1").value == 0.0) {
        document.getElementById("cod_producto2").disabled = true;
        document.getElementById("btn_consultar2").disabled = true;
    }
    else {
        document.getElementById("cod_producto2").disabled = false;
        document.getElementById("btn_consultar2").disabled = false;
    }

    calcula_totales();
}


function calcula_total2() {

    total_producto(2);

    if (document.getElementById("cant2").value == 0.0) {
        document.getElementById("cod_producto3").disabled = true;
        document.getElementById("btn_consultar3").disabled = true;
    }
    else {
        document.getElementById("cod_producto3").disabled = false;
        document.getElementById("btn_consultar3").disabled = false;
    }

    calcula_totales();
}


function calcula_total3() {

    total_producto(3);

    calcula_totales();
}


function calcula_totales() {
    var tot_venta = parseFloat(document.getElementById("valor_total1").value) + parseFloat(document.getElementById("valor_total2").value) + parseFloat(document.getElementById("valor_total3").value);
    document.getElementById("total_venta").value = tot_venta.toFixed(2);

    var tot_iva = (document.getElementById("valor_total1").value * document.getElementById("valor_iva1").value / 100) + (document.getElementById("valor_total2").value * document.getElementById("valor_iva2").value / 100) + (document.getElementById("valor_total3").value * document.getElementById("valor_iva3").value / 100);
    document.getElementById("total_iva").value = tot_iva.toFixed(2);

    var tot_coniva = tot_venta + tot_iva ;
    document.getElementById("total_coniva").value = tot_coniva.toFixed(2);

    if (tot_coniva != 0)
        document.getElementById("btn_confirmar").disabled = false;
    else
        document.getElementById("btn_confirmar").disabled = true;
}


function guardar_venta() {

    var dirventa = "http://localhost:8182/ventas/guardar";
    var datos;
    var lista_productos = [];
    
    for(i = 1; i <= 3; i++) {
        if(document.getElementById("cod_producto" + i).value != "") {
            producto = {
                cantidad_producto: parseInt(document.getElementById("cant" + i).value),
                codigo_producto: parseInt(document.getElementById("cod_producto" + i).value),
                valor_venta: parseFloat(document.getElementById("valor_total" + i).value),
                valoriva: parseFloat(document.getElementById("valor_iva" + i).value),
                valor_total: parseFloat(document.getElementById("total_venta" + i).value)
            };

            lista_productos.push(producto);
        }
    }

    datos = {
        cedula_cliente: parseInt(document.getElementById("ced_cliente").value),
        detalle_venta: lista_productos,
        ivaventa: parseFloat(document.getElementById("total_iva").value),
        total_venta: parseFloat(document.getElementById("total_venta").value),
        valor_venta: parseFloat(document.getElementById("total_coniva").value)
    };

    console.log("datos => ", datos);

    fetch(dirventa, {
        headers: {
            "Content-Type": "application/json"
          },
        method: "POST",
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("consec_venta").value = data.codigo_venta;
        document.getElementById("cod_producto1").disabled = true;        
        document.getElementById("btn_consultar1").disabled = true;
        document.getElementById("cant1").disabled = true;
        document.getElementById("cod_producto2").disabled = true;        
        document.getElementById("btn_consultar2").disabled = true;
        document.getElementById("cant2").disabled = true;
        document.getElementById("cod_producto3").disabled = true;        
        document.getElementById("btn_consultar3").disabled = true;
        document.getElementById("cant3").disabled = true;
        alert("Venta " + document.getElementById("consec_venta").value + " almacenada exitosamente");
        document.forms[0].reset();
    })
    .catch(function(error) {
        document.getElementById("msg_error").innerHTML = `Error al guardar la venta ${error}`;
    });
}
