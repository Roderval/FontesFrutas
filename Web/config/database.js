
const mysql = require("mysql");

/* comentado por Roderval em 23_04_21
module.exports = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "raspberry",
  database: "bancomestrado"
}); */


// comentado por luanzinho
 module.exports = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "usuariodb",
  password: "internet",
  database: "bancomestrado"
}); 

/* criado por Roderval 23_04_21
 module.exports = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "internet",
  database: "bancomestrado"
});*/ 
