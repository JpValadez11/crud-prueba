const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

//se crea la conexion a la base de datos
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    dateStrings: "date",
    database: "crud"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Consulta para ver la informacion de la base de datos, toda la tabla de empresas 
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM empresas ORDER BY Nombre ASC";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita} = req.body;
    const sqlInsert = "INSERT INTO empresas (Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:Id", (req, res) => {
    const { Id } = req.params;
    const sqlRemove = "DELETE FROM empresas WHERE Id = ?";
    db.query(sqlRemove, Id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:Id", (req, res) => {
    const {Id} = req.params;
    const sqlGet = "SELECT * FROM empresas WHERE Id = ?";
    db.query(sqlGet, Id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:Id", (req, res) => {
    const {Id} = req.params;
    const {Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita} = req.body;
    const sqlUpdate = "UPDATE empresas SET Nombre = ?, FechaCons = ?, TipoEmpresa = ?, Comentarios = ?, Favorita = ? WHERE Id = ?";
    db.query(sqlUpdate, [Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita, Id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    //const sqlInsert = "INSERT INTO empresas (Nombre, FechaCons, TipoEmpresa, Comentarios, Favorita) VALUES ('ITCOMPANY', '15/07/2000', 'Mayorista', 'Segunda prueba', '1')";
    //db.query(sqlInsert, (error, result) => {
        //console.log("error", error);
        //console.log("result", result);
        //res.send("Hola mundo");
    //})

})

app.listen(50010, () => {
    console.log("Server is running");
})