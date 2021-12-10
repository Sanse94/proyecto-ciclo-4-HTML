const ciudades = [
  {id:1, ciudad:"Bogota", ip:"localhost", total:0.0},
  {id:2, ciudad:"Cali", ip:"", total:0.0},
  {id:3, ciudad:"Medellin", ip:"", total:0.0},
];

window.onload=recorrer_ciudad();

function recorrer_ciudad() {
    ciudades.forEach(sucursal => {
      console.log("procesando ciudad: ", sucursal);
      borrado(sucursal.id);
      if(sucursal.ip !== "") {
          calcular(sucursal.id, sucursal.ciudad, sucursal.ip);
      }
    });
    mostrar();
}

async function borrado(id){
    var direccion = "http://localhost:1111/consolidado/eliminar/"+id; 
    await fetch(direccion, {method: "DELETE"})
    .then(resp => console.log("Borrado archivo de consolidacion de ciudad ", id, resp))
    .catch(function(error) {
      console.log("Error al borrar la ciudad ",id, error);
    });
}
          
async function calcular(id, ciudad, ip){
    var direccion = "http://"+ip+":8182/ventas/listar";
    var total = 0.0;

    console.log("Calculando ventas por ciudad: ", id, direccion);
    await fetch(direccion, {method: "GET"})
      .then(resp => resp.json())
      .then(function(data) {
        console.log("ventas de la ciudad ", ciudad);
        data.forEach(element => {
            total += element.valor_venta;         
        });
      })
      .catch(function(error) {
        console.log("Error al calcular las ventas totales ", error);
      });
    
    var dir_guardado = "http://localhost:1111/consolidado/guardar";
    var datos = {
        "id": id, 
        "ciudad": ciudad,
        total_venta: total,
    }

    console.log("calculados los datos >=", datos);

    await fetch(dir_guardado, {
        headers:{
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(datos)
    })
    .catch(function(error) {
        console.log("Error al guardar el consolidado de las ventas ", error);
    });

    ciudades.forEach (cada => {
      if(cada.id == id)
        cada.total = total;
    })
}

async function mostrar(){
     var direccion = "http://localhost:1111/consolidado/listar";
     var filas = "";
     var total = 0.0;

     var lista_ciudades = [];

     await fetch(direccion, {method: "GET"})
      .then(resp => resp.json())
      .then(function(data) {
        data.forEach(element => { console.log("element => ",element);
            lista_ciudades.push(element);
            total += element.total_venta; 
        });
      })
      .catch(function(error) {
        console.log("Error al calcular el consolidado total ", error);    
      });

      console.log("lista Ciudades : ", lista_ciudades);

      lista_ciudades.forEach(cada_ciudad => {
        filas += '<tr>';
        filas += '<td class="celda2">'+ cada_ciudad.ciudad + '</td>';
        filas += '<td class="total2">'+ cada_ciudad.total_venta.toFixed(2) + '</td>';
        filas += '</tr>';    
      })

      if(filas.length > 0){
        const encabezado=`<table class="tabla">
            <tr>
              <th class="celda">Ciudad</th>
              <th class="celda">Valor Total Ventas</th>
            </tr>`;
        const venta=`<tr>
        <th class="total">Total Ventas Tienda</th>
        <td><input type="text" required maxlength="15" id="venta_total" class="total2" disabled/></td>
        </tr>
        </table>`;
    
          document.getElementById("t_consolidacion").innerHTML=encabezado + filas + venta;
          
          document.getElementById("venta_total").value = total.toFixed(2);
      }
      else{
        document.getElementById("t_consolidacion").innerHTMLL='<h2 class="titulo">No hay consolidado de ventas</h2>';
      } 
}

/*

function mostrar() {
  var http = new XMLHttpRequest();
  http.open('GET', 'http://localhost:1111/consolidado/listar', true);
  http.setRequestHeader("Content-type", "application/json");

  console.log("Mostrar");

  
  http.onloadend = function(aEvt) {
    if (http.readyState == 4) {
      if (http.status == 200) {
        console.log("Response ", http.responseText);
        console.log("completo ", http.response);
      }
      else
        console.log("Error de peticion");
    }
  }

  http.send(null);
}
*/