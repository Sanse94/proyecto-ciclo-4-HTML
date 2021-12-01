const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'')));
const http = require("http");
const csv = require('csvtojson')
 


app.post('/convertir',(req,resp) => { 
    const  {
        files
    }=req.body;
    const converter = csv()
    .fromFile(files)
    .then((json) => {
        json.forEach((row) => {

            const data = JSON.stringify(row);

            const options = {
                host: "localhost",
                port: 1111,
                path: "/productos/guardar",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": data.length,
                },
              };
              req = http.request(options, (res) => {
                //status code of the request sent
                console.log("statusCode: ", res.statusCode);
                let result = "";
                // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
                res.on("data", (chunk) => {
                  result += chunk;
                });
                //The whole response has been received. Display it into the console.
                res.on("end", () => {
                  console.log("Result is: " + result);
                });
              });
              //error if any problem with the request
              req.on("error", (err) => {
                console.log("Error: " + err.message);
              });
              //write data to request body
              req.write(data);
              //to signify the end of the request - even if there is no data being written to the request body.
              req.end();
        });

        let alert = require('alert'); 
          alert("¡archivo cargado!")
  });
  });


app.listen(3001,() => {
    console.log('Servidor Inicia puerto 3001');
})
//module.exports=app;