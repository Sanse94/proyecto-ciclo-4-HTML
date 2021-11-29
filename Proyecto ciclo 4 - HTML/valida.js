const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
//const node_ventas = require('./node_venta');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'.')));

app.post('/guardar_venta',(req,res) => {

    //    const {cedula_cliente} = req.body;
    
    let cedula_cliente = req.body.cedula_cliente;

    console.log(req.body);

    // Hay que validar que los campos esten correctos

    res.status(200).send("Guardando la venta");
});

app.listen(3000,() => {
    console.log('Servidor inicia puerto 3000')
})
module.exports=app;