var iva1 = 0;
var iva2 = 1;
var iva3 = 0;
var valor_unitario1 = 1.0;
var valor_unitario2 = 1.0;
var valor_unitario3 = 1.0;
var total1 = 0;
var total2 = 0;
var total3 = 0;
var tot_venta = 0.0;
var tot_iva = 0.0;
var tot_coniva = 0.0;

window.onload = function() {
    document.getElementById("btn_consultar").onclick = buscar_cliente;
    document.getElementById("btn_consultar1").onclick = buscar_producto1;
    document.getElementById("btn_consultar2").onclick = buscar_producto2;
    document.getElementById("btn_consultar3").onclick = buscar_producto3;
    document.getElementById("cant1").onchange = calcula_total1;
    document.getElementById("cant2").onchange = calcula_total2;
    document.getElementById("cant3").onchange = calcula_total3;
}

function buscar_cliente() {
    var cedula = document.getElementById("cedula_cliente").value;

    // buscarcliente por cedula
    document.getElementById("cliente").value = "nombre del cliente";

    document.getElementById("cod_producto1").disabled = false;
    document.getElementById("btn_consultar1").disabled = false;
}

function buscar_producto1() {
    var cod_producto = document.getElementById("cod_producto1").value;

    // si encuentra el producto activar todo

    document.getElementById("cant1").disabled = false;
    document.getElementById("cod_producto2").disabled = false;
    document.getElementById("btn_consultar2").disabled = false;
}

function buscar_producto2() {
    var cod_producto = document.getElementById("cod_producto2").value;

    // si encuentra el producto activar todo

    document.getElementById("cant2").disabled = false;
    document.getElementById("cod_producto3").disabled = false;
    document.getElementById("btn_consultar3").disabled = false;
    document.getElementById("cant3").disabled = false;
}

function buscar_producto3() {
    var cod_producto = document.getElementById("cod_producto2").value;

    // si encuentra el producto activar todo

    document.getElementById("cant3").disabled = false;
}

function calcula_total1() {

    total1 = valor_unitario1 * document.getElementById("cant1").value;
    document.getElementById("valor_total1").value = total1.toFixed(2);

    calcula_totales();
}

function calcula_total2() {

    total2 = valor_unitario2 * document.getElementById("cant2").value;
    document.getElementById("valor_total2").value = total2.toFixed(2);

    calcula_totales();
}

function calcula_total3() {

    total3 = valor_unitario3 * document.getElementById("cant3").value;
    document.getElementById("valor_total3").value = total3.toFixed(2);

    calcula_totales();
}

function calcula_totales() {
    tot_venta = total1 + total2 + total3
    document.getElementById("total_venta").value = tot_venta.toFixed(2);

    tot_iva = (total1 * iva1 / 100) + (total2 * iva2 / 100) + (total3 * iva3 / 100)
    document.getElementById("total_iva").value = tot_iva.toFixed(2);

    tot_coniva = tot_venta + tot_iva ;
    document.getElementById("total_coniva").value = tot_coniva.toFixed(2);

    document.getElementById("btn_confirmar").disabled = false;
}

function guardar_venta() {
    alert("venta guardada");
}