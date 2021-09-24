const systemService = require("../services/system.service");
const auth = require("../../middleware/auth");

function init(router) {
  router.route("/atividades").get(auth, getAllActivity);
  router.route("/atividades/on").get(auth, getOnlineActivity);
  router.route("/atividades/update").post(auth, updateStatusActivity);
  router.route("/atividades/add").post(auth, addActivity);
  router
    .route("/frutas")
    .get(auth, getAllFruits)
    .post(auth, addFruit)
    .delete(auth, deleteFruits);
}

function getAllActivity(req, res) {
  systemService
    .getAllActivity()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function getOnlineActivity(req, res) {
  systemService
    .getOnlineActivity()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function updateStatusActivity(req, res) {
  systemService
    .updateStatusActivity(req.body.id_atividade, req.body.status_atividade)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function addActivity(req, res) {
  systemService
    .addActivity(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function getAllFruits(req, res) {
  console.log(req.user.id);
  systemService
    .getAllFruits()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function addFruit(req, res) {
  systemService
    .addFruit(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

function deleteFruits(req, res) {
  systemService
    .deleteFruits(req.body.id_fruta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
}

module.exports.init = init;
