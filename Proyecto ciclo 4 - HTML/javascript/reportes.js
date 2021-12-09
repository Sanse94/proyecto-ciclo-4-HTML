window.onload = function() {
  document.getElementById("boton_clientes").onclick = listar_clientes; 
  document.getElementById("boton_ventas").onclick = listar_ventas; 
}

async function listar_clientes() {
  //Buscar cliente función
  var direccion = "http://localhost:8181/clientes/listar";
  var filas='';

  // buscarcliente
  await fetch(direccion, {method: "GET"})
      .then(resp => resp.json())
      .then(function(data) {
        data.forEach(element => {
          filas+='<tr>';
          filas+='<td class="celda2">'+ element.cedula_cliente + '</td>';
          filas+='<td class="celda2">'+ element.nombre_cliente + '</td>';
          filas+='<td class="celda2">'+ element.correo_cliente + '</td>';
          filas+='<td class="celda2">'+ element.direccion_cliente + '</td>';
          filas+='<td class="celda2">'+ element.telefono_cliente + '</td>';
          filas+='</tr>'
        });

      })
      .catch(function(error) {
        console.log("entro al catch");
        //No hay clientes o hay un error de lectura
          
      });

  //Cliente existente

  if(filas!=''){
    const encabezado =`<h2 class="titulo">Listado de Clientes</h2>
      <table class="tabla">
        <tr class="celda">
          <th class="celda">Cedula</th>
          <th class="celda">Nombre</th>
          <th class="celda">Correo Electrónico</th>
          <th class="celda">Dirección</th>
          <th class="celda">Teléfono</th>
        </tr>`;
        
      const final_tabla = '</table>';

      document.getElementById("t_reportes").innerHTML= encabezado + filas + final_tabla;     
  }
  else {
    document.getElementById("t_reportes").innerHTML='<h2 class="titulo">No hay clientes registrados</h2>';
  }

}/*funcion promesa, axios, try catch o async await y hacer un for para impresion de tabla*/

async function listar_ventas() {
  //Buscar clientes
  var direccion = "http://localhost:8181/clientes/listar";
  var filas='';
  var venta_total=0;
  
  var clientes = [];

  // carga de clientes

  await fetch(direccion, {method: "GET"})
      .then(resp => resp.json())
      .then(function(data) {
        data.forEach(element => {
          nuevo_cliente = {
            cedula: element.cedula_cliente,
            nombre: element.nombre_cliente,
            valor_total: 0.0,
          }
          clientes.push(nuevo_cliente);
        });

      })
      .catch(function(error) {
        console.log("error al cargar los clientes ", error);
        //No hay clientes o hay un error de lectura
          
      });

  console.log("Clientes -> ", clientes);

  direccion = "http://localhost:8182/ventas/listar";
  var total=0.0;
  var lista_ventas=[];

  await fetch(direccion, {method: "GET"})
      .then(resp => resp.json())
      .then(function(data) {
        data.forEach(element => {
          venta = {
            cliente: element.cedula_cliente,
            valor_venta: element.valor_venta
          }
          lista_ventas.push(venta);
        });
      })
      .catch(function(error) {
        console.log("Error al calcular las ventas del cliente");
        //No hay clientes o hay un error de lectura
          
      });
      
  console.log("Ventas -> ", lista_ventas);

  lista_ventas.forEach(venta => {
    clientes.forEach(cliente => {
      if (cliente.cedula == venta.cliente)
        cliente.valor_total += venta.valor_venta;
    }) 
  });

  console.log("Clientes con ventas-> ", clientes);

  var total_venta = 0.0;

  clientes.forEach(cliente => {
    if(cliente.valor_venta != 0){
      filas+='<tr>';
      filas+='<td class="celda2">'+ cliente.cedula + '</td>';
      filas+='<td class="celda2">'+ cliente.nombre + '</td>';
      filas+='<td class="total2">'+ cliente.valor_total.toFixed(2) + '</td>';
      filas+='</tr>';
      venta_total += cliente.valor_total;
    }
  })

  if(filas!=''){
    const encabezado=`<h2 class="titulo">Total de Ventas por Cliente</h2>
      <table class="tabla">
        <tr>
          <th class="celda">Cedula</th>
          <th class="celda">Nombre</th>
          <th class="celda">Valor Total Ventas</th>
        </tr>`;
    const venta=`<tr>
          <td></td>
          <th class="total">Total Ventas</th>
          <td><input type="text" required maxlength="15" id="venta_total" class="total2" disabled/></td>
        </tr>
      </table>`;

      document.getElementById("t_reportes").innerHTML=encabezado + filas + venta;
      
      document.getElementById("venta_total").value = venta_total.toFixed(2);
  }
  else{
    document.getElementById("t_reportes").innerHTMLL='<h2 class="titulo">No hay ventas por cliente</h2>';
  }
}
