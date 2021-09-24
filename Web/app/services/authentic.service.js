var authenticModel = require("../models/authentic.model");

var authenticService = {
  verifyUser: verifyUser,
  authentic: authentic,
  signup: signup
};

function verifyUser(idUser) {
  return new Promise((resolve, reject) => {
    authenticModel
      .verifyUser(idUser)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function authentic(authenticData) {
  return new Promise((resolve, reject) => {
    authenticModel
      .authentic(authenticData)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function signup(signUpData) {
  return new Promise((resolve, reject) => {
    authenticModel
      .signup(signUpData)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = authenticService;
