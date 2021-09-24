var db = require("../../config/database");
var dbFunc = require("../../config/db-functions");
const bcrypt = require("bcrypt");

var authenticModel = {
  verifyUser: verifyUser,
  authentic: authentic,
  signup: signup
};

function verifyUser(idUser) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT nome_usuario, cargo_usuario, identificador_usuario, status_usuario
              FROM bancomestrado.usuarios  where identificador_usuario = '${idUser}';
    `,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

function authentic(authenticData) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM usuarios WHERE identificador_usuario ='${
        authenticData.identificador_usuario
      }'`,
      (error, rows, fields) => {
        if (error) {
          reject(error);
        } else {
          if (authenticData.senha_usuario == rows[0].senha_usuario) {
            resolve(rows);
          } else {
            reject({ success: false, message: "password doesnot match" });
          }
          /* bcrypt.compare(
            authenticData.senha_usuario,
            rows[0].senha_usuario,
            function(err, isMatch) {
              if (err) {
                reject(error);
              } else if (isMatch) {
                resolve(rows);
              } else {
                reject({ success: false, message: "password doesnot match" });
              }
            }
          ); */
        }
      }
    );
  });
}

function signup(user) {
  return new Promise((resolve, reject) => {
    /*     bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.senha_usuario, salt, function(err, hash) {
        if (err) {
          return next(err);
        } */
    db.query(
      "SELECT * FROM usuarios WHERE identificador_usuario='" +
        user.identificador_usuario +
        "'",
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(error);
        } else if (rows.length > 0) {
          dbFunc.connectionRelease;
          reject({
            success: false,
            message: "user already exist ! try with different user"
          });
        } else {
          const GET_NEXT_ID_QUERY = `SELECT MAX(id_usuario)+1 FROM usuarios`;
          db.query(GET_NEXT_ID_QUERY, (err, results) => {
            if (err) {
              dbFunc.releaseConnection;
              reject(err);
            } else {
              const idUser = JSON.parse(JSON.stringify(results));

              const INSERT_USER_QUERY = `INSERT INTO bancomestrado.usuarios
                                          (id_usuario, nome_usuario, cargo_usuario, identificador_usuario,
                                          senha_usuario, datacad_usuario, status_usuario)
                                          VALUES
                                          (${idUser[0]["MAX(id_usuario)+1"]}, 
                                          "${user.nome_usuario}",
                                          "${user.cargo_usuario}",
                                          "${user.identificador_usuario}",
                                          "${user.senha_usuario}",
                                          '${user.datacad_usuario}',
                                          "Ativo");`;
              db.query(INSERT_USER_QUERY, (error, rows, fields) => {
                if (error) {
                  dbFunc.connectionRelease;
                  reject(error);
                } else {
                  dbFunc.connectionRelease;
                  resolve(rows);
                }
              });
            }
          });
        }
      }
    );
    /*       });
    }); */
  });
}

module.exports = authenticModel;
