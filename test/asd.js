/*var padre={nombre: 'Pepe', apellido: 'Perez'};
var hijo= Object.create (padre);
padre.mostrarNombre=function (){console.log (this.nombre)};
hijo.nombre='Pedro';
padre.mostrarNombre ();
hijo.mostrarNombre ();
console.log (hijo.apellido); */

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'psgnew'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

connection.query('SELECT * FROM integrante', (err,rows) => {
    if(err) throw err;

    console.log('Data received from Db:');
    rows.forEach( (row) => {
        console.log(`${row.nombre} - ${row.apellido}`);
    });
});
// https://www.sitepoint.com/using-node-mysql-javascript-client/