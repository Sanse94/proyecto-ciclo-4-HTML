const t_reportes=document.getElementById("t_reportes");
const boton_clientes=document.getElementById("boton_clientes");
const boton_ventas=document.getElementById("boton_ventas");
boton_clientes.addEventListener("click", function () {
    t_reportes.innerHTML=`<h2 class="titulo">Listado de Clientes</h2>
    <table class="tabla">
      <tr class="celda">
        <th class="celda">Cedula</th>
        <th class="celda">Nombre</th>
        <th class="celda">Correo Electrónico</th>
        <th class="celda">Dirección</th>
        <th class="celda">Teléfono</th>
      </tr>
      <tr>
        <td class="celda2">nombre</td>
        <td class="celda2">Mayormente soleado</td>
        <td class="celda2">Parcialmente nublado</td>
        <td class="celda2">Parcialmente nublado</td>
        <td class="celda2">Parcialmente nublado</td>
      </tr>
      <tr>
        <td class="celda2">Correo</td>
        <td class="celda2">17°C</td>
        <td class="celda2">12°C</td>
        <td class="celda2">Parcialmente nublado</td>
        <td class="celda2">Parcialmente nublado</td>
      </tr>
      <tr>
        <td class="celda2">E 13 km/h</td>
        <td class="celda2">E 11 km/h</td>
        <td class="celda2">S 16 km/h</td>
        <td class="celda2">Parcialmente nublado</td>
        <td class="celda2">Parcialmente nublado</td>
      </tr>
    </table>`
})/*funcion promesa, axios, try catch o async await y hacer un for para impresion de tabla*/
boton_ventas.addEventListener("click", function () {
    t_reportes.innerHTML=`<h2 class="titulo">Total de Ventas por Cliente</h2>
    <table class="tabla">
      <tr>
        <th class="celda">Cedula</th>
        <th class="celda">Nombre</th>
        <th class="celda">Valor Total Ventas</th>
      </tr>
      <tr>
        <td class="celda2">nombre</td>
        <td class="celda2">Mayormente soleado</td>
        <td class="celda2">Parcialmente nublado</td>
      </tr>
      <tr>
        <td class="celda2">Correo</td>
        <td class="celda2">17°C</td>
        <td class="celda2">12°C</td>
      </tr>
      <tr>
        <td class="celda2">E 13 km/h</td>
        <td class="celda2">E 11 km/h</td>
        <td class="celda2">S 16 km/h</td>
      </tr>
      <tr>
        <td></td>
        <th class="total">Total Ventas</th>
        <td><input type="text" required maxlength="15" id="venta_total" class="total2" disabled/></td>
      </tr>
    </table>`
    document.getElementById("venta_total").value = 0;
})