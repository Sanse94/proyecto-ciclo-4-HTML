const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'')));

app.post('/guardar_venta',(req,res) => {

    //    const {cedula_cliente} = req.body;
    
    let cedula_cliente = req.body.cedula_cliente;

    console.log(req.body);
    console.log(cedula_cliente);
    // Hay que validar que los campos esten correctos

    res.status(200).send("Guardando la venta");
});
