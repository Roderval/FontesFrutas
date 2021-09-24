const authenticService = require("../services/authentic.service");
let schema = require("../schema/loginValidationSchema.json");
let iValidator = require("../../common/iValidator");
let errorCode = require("../../common/error-code");
let errorMessage = require("../../common/error-methods");
const auth = require("../../middleware/auth");

const jwt = require("jsonwebtoken");

function init(router) {
  router.route("/auth").get(auth, verifyUser);
  router.route("/login").post(login);
  router.route("/signup").post(signup);
}

function verifyUser(req, res) {
  let idUser = req.user.id;

  authenticService
    .verifyUser(idUser)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).send("Server error");
    });
}

function login(req, res) {
  let authenticData = req.body;

  //Validating the input entity
  let json_format = iValidator.json_schema(
    schema.postSchema,
    authenticData,
    "authentic"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  authenticService
    .authentic(authenticData)
    .then(data => {
      if (data) {
        let id = data[0]["identificador_usuario"];
        const payload = {
          user: {
            id: id
          }
        };

        jwt.sign(
          payload,
          "chave_privada",
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    })
    .catch(err => {
      res.json(err);
    });
}

function signup(req, res) {
  let signUpData = req.body;

  //Validating the input entity
  let json_format = iValidator.json_schema(
    schema.postSchema,
    signUpData,
    "signUpData"
  );
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  authenticService
    .signup(signUpData)
    .then(data => {
      if (data) {
        if (data) {
          res.json({
            success: true,
            data: data
          });
        }
      }
    })
    .catch(err => {
      res.json(err);
    });
}

module.exports.init = init;
