const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'')));

app.post('/validar',(req,res) => {
    const {c_usuario, c_contrasena} = req.body;
    
    console.log(req.body);
    console.log(c_usuario + "," + c_contrasena);

    if(c_usuario == "admininicial" && c_contrasena == "admin123456"){
        res.status(200).send('Usuario logueado correctamente')
    }
    else{
        res.status(500).send('Usuario o clave incorrecta');
    }
});

app.post('/guardar_venta',(req,res) => {

    const {cedula_cliente} = req.body;

    console.log(req.body);
    console.log(cedula_cliente);
    // Hay que validar que los campos esten correctos

    res.status(200).send("Guardando la venta");
});

app.listen(3000,() => {
    console.log('Servidor inicia puerto 3000')
})
module.exports=app;