const api = require("./config/api-config");
const PORT = 4000;

api.app.listen(process.env.PORT || PORT, () => {
  console.log("server listen on port " + PORT);
});
