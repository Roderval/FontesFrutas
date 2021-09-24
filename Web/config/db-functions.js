const db = require("./database");

function checkConnection() {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        if (connection) connection.release();
        reject(err);
      } else {
        resolve(`Connected successfully: ${connection.threadId}`);
      }
    });
  });
}

function releaseConnection() {
  return new Promise((resolve, reject) => {
    db.on("release", connection => {
      console.log(`Connection ${connection.threadId} released`);
    });
  });
}

module.exports = {
  checkConnection: checkConnection(),
  releaseConnection: releaseConnection()
};
