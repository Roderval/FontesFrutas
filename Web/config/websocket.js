const db = require("./database");
const dbFunc = require("./db-functions");
const systemService = require("../app/services/system.service");

function wsServer(ws) {
  ws.on("connection", socket => {
    console.log("User connected");
    let getOutputData;

    socket.on("init_diagram_data", () => {
      console.log("WS: init_diagram_data msg");
      let responseData = {};
      let lastEmittedData = {};

      getOutputData = setInterval(() => {
        const GET_OUTPUT_DATA_QUERY = `SELECT saidas.rele1_saida,
                                      saidas.rele2_saida,
                                      saidas.rele3_saida,
                                      saidas.rele4_saida,
                                      saidas.rele5_saida,
                                      saidas.rele6_saida,
                                      saidas.rele7_saida,
                                      saidas.rele8_saida,
                                      saidas.rele9_saida,
                                      saidas.rele10_saida,
                                      saidas.rele11_saida,
                                      saidas.rele12_saida,
                                      saidas.rele13_saida,
                                      saidas.rele14_saida,
                                      saidas.rele15_saida,
                                      saidas.rele16_saida,
                                      saidas.rele17_saida,
                                      saidas.rele18_saida,
                                      saidas.rele19_saida,
                                      saidas.rele20_saida,
                                      saidas.rele21_saida
                                  FROM bancomestrado.saidas
                                  WHERE saidas.id_saida = ( SELECT MAX(saidas.id_saida) FROM bancomestrado.saidas );`;

        db.query(GET_OUTPUT_DATA_QUERY, (err, results) => {
          if (err) {
            dbFunc.releaseConnection;
          } else {
            //dbFunc.releaseConnection;
            responseData = results[0];

            const getAllCO2and02 = async _ => {
              const allQuerys = [
                systemService.getCO2and02(1),
                systemService.getCO2and02(2),
                systemService.getCO2and02(3),
                systemService.getCO2and02(4)
              ];

              const [
                dataCam1,
                dataCam2,
                dataCam3,
                dataCam4
              ] = await Promise.all(allQuerys);

              if (dataCam1.length > 1) {
                responseData.c1_CO2 = dataCam1[0].valor_dado;
                responseData.c1_O2 = dataCam1[1].valor_dado;
              }

              if (dataCam2.length > 1) {
                responseData.c2_CO2 = dataCam2[0].valor_dado;
                responseData.c2_O2 = dataCam2[1].valor_dado;
              }

              if (dataCam3.length > 1) {
                responseData.c3_CO2 = dataCam3[0].valor_dado;
                responseData.c3_O2 = dataCam3[1].valor_dado;
              }

              if (dataCam4.length > 1) {
                responseData.c4_CO2 = dataCam4[0].valor_dado;
                responseData.c4_O2 = dataCam4[1].valor_dado;
              }

              if (
                responseData !== null &&
                JSON.stringify(lastEmittedData) !== JSON.stringify(responseData)
              ) {
                console.log(responseData);
                try {
                  ws.emit("get_diagram_data", responseData);
                } catch (err) {
                  console.log(err);
                }

                lastEmittedData = responseData;
              }
            };

            getAllCO2and02().catch(err => console.log(err));
          }
        });
      }, 2000);
    });

    socket.on("stop", function() {
      console.log("user stopped");
      clearInterval(getOutputData);
      dbFunc.releaseConnection;
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
      clearInterval(getOutputData);
      dbFunc.releaseConnection;
    });
  });
}

function wsClient(ws) {}

module.exports = {
  wsServer: wsServer,
  wsClient: wsClient
};
