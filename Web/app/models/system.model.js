const db = require("../../config/database");
const dbFunc = require("../../config/db-functions");

const WebSocketClient = require("websocket").client;

const client = new WebSocketClient();

const systemModel = {
  getAllActivity: getAllActivity,
  getOnlineActivity: getOnlineActivity,
  updateStatusActivity: updateStatusActivity,
  addActivity: addActivity,
  getCO2and02: getCO2and02,
  getAllFruits: getAllFruits,
  addFruit: addFruit,
  deleteFruits: deleteFruits
};

function getAllActivity() {
  return new Promise((resolve, reject) => {
    const SELECT_ALL_ACTIVITY_QUERY = "SELECT * FROM bancomestrado.atividades;";
    db.query(SELECT_ALL_ACTIVITY_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        dbFunc.releaseConnection;
        resolve(results);
      }
    });
  });
}

function getOnlineActivity() {
  return new Promise((resolve, reject) => {
    const SELECT_ON_ACTIVITY_QUERY = `SELECT atividades.id_atividade,
                                            atividades.nome_atividade,
                                            atividades.modoop_atividade,
                                            atividades.setpointO2_atividade,
                                            atividades.setpointCO2_atividade,
                                            atividades.datainicial_atividade,
                                            atividades.datafinal_atividade,
                                            atividades.datacad_atividade,
                                            atividades.status_atividade,
                                            atividades.frutas_id_fruta,
                                            atividades.camaras_id_camara
                                        FROM bancomestrado.atividades
                                        WHERE atividades.status_atividade = 1 OR atividades.status_atividade = 2 OR atividades.status_atividade = 3
                                        order by atividades.camaras_id_camara;`;
    db.query(SELECT_ON_ACTIVITY_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        dbFunc.releaseConnection;
        resolve(results);
      }
    });
  });
}

function updateStatusActivity(id, status) {
  return new Promise((resolve, reject) => {
    const UPDATE_ACTIVITY_STATUS = `UPDATE bancomestrado.atividades SET status_atividade = ${status} WHERE id_atividade = ${id}`;

    db.query(UPDATE_ACTIVITY_STATUS, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        dbFunc.releaseConnection;
        sendSocketAlert(client, "changed_status_activity");
        resolve(results);
      }
    });
  });
}

function addActivity(activity) {
  return new Promise((resolve, reject) => {
    // Gera ID aleatório -> ALTERAR
    let id_atividade = (function() {
      return Math.floor(Math.random() * (1000000 - 0 + 1));
    })();

    let id_usuario = 1; // vai ser o id do usuário logado
    let status_atividade = 3; // Atividade funcionando
    const INSERT_ACTIVITY_QUERY = `INSERT INTO bancomestrado.atividades (id_atividade, nome_atividade, modoop_atividade, setpointO2_atividade, setpointCO2_atividade, 
                                        datainicial_atividade, datafinal_atividade, datacad_atividade, status_atividade, frutas_id_fruta, camaras_id_camara, usuarios_id_usuario) 
                                     VALUES (${id_atividade}, "${
      activity.nome
    }", "${activity.modoop}", "${activity.setpointO2}", "${
      activity.setpointCO2
    }",
                                        '${activity.datainicial}', '${
      activity.datafinal
    }', '${activity.datacad}', "${status_atividade}", ${activity.frutas}, ${
      activity.id_camara
    }, ${id_usuario});`;

    db.query(INSERT_ACTIVITY_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        dbFunc.releaseConnection;
        sendSocketAlert(client, "added_activity");
        resolve(results);
      }
    });
  });
}

function getCO2and02(idCamara) {
  return new Promise((resolve, reject) => {
    const GET_O2_CO2_QUERY = `SELECT valor_dado from dados 
                                WHERE datacad_dado = (SELECT MAX(datacad_dado) FROM dados) 
                                AND atividades_id_atividade = (SELECT id_atividade FROM atividades WHERE camaras_id_camara = ${idCamara} AND status_atividade = 1) 
                                                              AND (sensores_id_sensor = 1 OR sensores_id_sensor = 2 ) ORDER BY sensores_id_sensor`;
    db.query(GET_O2_CO2_QUERY, (err, results) => {
      if (err) {
        /* dbFunc.releaseConnection; */
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getAllFruits() {
  return new Promise((resolve, reject) => {
    const SELECT_ALL_FRUITS_QUERY = "SELECT * FROM bancomestrado.frutas;";

    db.query(SELECT_ALL_FRUITS_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        dbFunc.releaseConnection;
        resolve(results);
      }
    });
  });
}

function addFruit(fruit) {
  return new Promise((resolve, reject) => {
    const GET_NEXT_ID_QUERY = `SELECT MAX(id_fruta)+1 FROM frutas`;

    db.query(GET_NEXT_ID_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        reject(err);
      } else {
        let idFruit = JSON.parse(JSON.stringify(results[0]["MAX(id_fruta)+1"]));

        if (!idFruit) {
          idFruit = 1;
        }

        const ADD_FRUIT_QUERY = `INSERT INTO bancomestrado.frutas (id_fruta, nome_fruta, cultivar_fruta, lote_fruta, safra_fruta, colheita_fruta, datacad_fruta, status_fruta) 
                              VALUES (${idFruit}, "${fruit.nome_fruta}", "${
          fruit.cultivar_fruta
        }", "${fruit.lote_fruta}", '${fruit.safra_fruta}', '${
          fruit.colheita_fruta
        }', '${fruit.datacad_fruta}', ${fruit.status_fruta})`;

        db.query(ADD_FRUIT_QUERY, (err, results) => {
          if (err) {
            dbFunc.releaseConnection;
            reject(err);
          } else {
            dbFunc.releaseConnection;
            resolve(results);
          }
        });
      }
    });
  });
}

function deleteFruits(idFruit) {
  return new Promise((resolve, reject) => {
    const DELETE_FRUIT_QUERY = `DELETE FROM bancomestrado.frutas WHERE id_fruta=${idFruit}`;

    db.query(DELETE_FRUIT_QUERY, (err, results) => {
      if (err) {
        dbFunc.releaseConnection;
        console.log(err);
        reject(err);
      } else {
        dbFunc.releaseConnection;
        console.log(results);
        resolve(results);
      }
    });
  });
}

function sendSocketAlert(client, msg) {
  client.on("connectFailed", function(error) {
    console.log("Connect Error: " + error.toString());
  });

  client.on("connect", function(connection) {
    console.log("WebSocket Client Connected");
    connection.sendUTF(msg);

    connection.on("error", function(error) {
      console.log("Connection Error: " + error.toString());
    });
    connection.on("close", function() {
      console.log("echo-protocol Connection Closed");
    });
    connection.on("message", function(message) {
      if (message.type === "utf8") {
        console.log("Received: '" + message.utf8Data + "'");
      }
    });
  });

  client.connect("ws://localhost:8760");
}

module.exports = systemModel;
