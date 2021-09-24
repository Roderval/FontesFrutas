const systemModel = require("../models/system.model");

systemService = {
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
    systemModel
      .getAllActivity()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getOnlineActivity() {
  return new Promise((resolve, reject) => {
    systemModel
      .getOnlineActivity()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function updateStatusActivity(id, status) {
  return new Promise((resolve, reject) => {
    systemModel
      .updateStatusActivity(id, status)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function addActivity(activity) {
  return new Promise((resolve, reject) => {
    systemModel
      .addActivity(activity)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getCO2and02(idCamara) {
  return new Promise((resolve, reject) => {
    systemModel
      .getCO2and02(idCamara)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getAllFruits() {
  return new Promise((resolve, reject) => {
    systemModel
      .getAllFruits()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function addFruit(fruit) {
  return new Promise((resolve, reject) => {
    systemModel
      .addFruit(fruit)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deleteFruits(idFruit) {
  return new Promise((resolve, reject) => {
    systemModel
      .deleteFruits(idFruit)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = systemService;
