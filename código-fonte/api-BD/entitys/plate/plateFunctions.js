const Pool = require("pg").Pool;
const express = require("express");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();
router.use(authMiddleware);

function Hora() {
  var d = new Date();

  if (d.getHours() < 10) {
    hora = "0" + d.getHours();
  } else {
    hora = d.getHours();
  }

  return hora;
}

function Minutos() {
  var d = new Date();

  if (d.getMinutes() < 10) {
    minuto = "0" + d.getMinutes();
  } else {
    minuto = d.getMinutes();
  }

  return minuto;
}

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "WeFood",
  password: "xgdkmomw6",
  port: 8181,
});

router.post("/add/:email", async (request, response) => {
  const { nome, descricao, preco } = request.body;

  pool.query(
    "INSERT INTO prato ( nome, descricao, restaurante_email , preco) VALUES ($1, $2, $3, $4)",
    [nome, descricao, request.params.email, preco],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (preco > 10) {
        pool.query(
          "UPDATE restaurante SET popular = '0' WHERE email = $1",
          [request.params.email],
          (error, results) => {
            if (error) {
              throw error;
            }
          }
        );
      }

      pool.query(
        "INSERT INTO historico_precos ( preco , horario, prato_nome, restaurante_email) VALUES ($1, $2, $3, $4)",
        [preco, "" + Hora() + ":" + Minutos(), nome, request.params.email],
        (error, results) => {
          if (error) {
            throw error;
          }

          response.status(200).send(`Plate created successfully`);
        }
      );
    }
  );
});

router.put("/edit/:email/:nome", async (request, response) => {
  const { nome, descricao, preco, restaurante_email } = request.body;

  //console.log(JSON.stringify(request.body));

  pool.query(
    "UPDATE historico_precos SET prato_nome = $1 WHERE restaurante_email = $2 AND prato_nome = $3",
    [nome, restaurante_email, request.params.nome],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "UPDATE prato SET nome = $1, descricao = $2, preco = $3 WHERE restaurante_email = $4 AND nome = $5",
        [nome, descricao, preco, restaurante_email, request.params.nome],
        (error, results) => {
          if (error) {
            throw error;
          }

          if (preco > 10) {
            pool.query(
              "UPDATE restaurante SET popular = '0' WHERE email = $1",
              [restaurante_email],
              (error, results) => {
                if (error) {
                  throw error;
                }
              }
            );
          } else {
            pool.query(
              "SELECT preco FROM prato WHERE restaurante_email = $1 AND preco > '10'",
              [restaurante_email],
              (error, results) => {
                if (error) {
                  throw error;
                }

                if (results.rowCount == 0) {
                  pool.query(
                    "UPDATE restaurante SET popular = '1' WHERE email = $1",
                    [restaurante_email],
                    (error, results) => {
                      if (error) {
                        throw error;
                      }
                    }
                  );
                }
              }
            );
          }

          //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaqui 7dias SELECT DATEDIFF(day, '2011-12-29', '2011-12-31')
          pool.query(
            "SELECT AVG(preco) FROM historico_precos WHERE prato_nome = $1 AND ( SELECT DATE_PART('day', CURRENT_DATE::timestamp - data::timestamp)) <= 7",
            [nome],
            (error, results) => {
              if (error) {
                throw error;
              }

              if (preco <= parseInt(results.rows[0].avg) / 2) {
                pool.query(
                  "UPDATE restaurante SET promocao = '1' WHERE email = $1",
                  [restaurante_email],
                  (error, results) => {
                    if (error) {
                      throw error;
                    }
                  }
                );

                pool.query(
                  "UPDATE prato SET promocao = '1' WHERE nome = $1 AND restaurante_email = $2",
                  [nome, restaurante_email],
                  (error, results) => {
                    if (error) {
                      throw error;
                    }
                    response.status(200).send(`Plate edited successfully`);
                  }
                );
              } else {
                pool.query(
                  "UPDATE prato SET promocao = '0' WHERE nome = $1 AND restaurante_email = $2",
                  [nome, restaurante_email],
                  (error, results) => {
                    if (error) {
                      throw error;
                    }

                    pool.query(
                      "SELECT promocao FROM prato WHERE promocao = '1' AND restaurante_email = $1",
                      [restaurante_email],
                      (error, results) => {
                        if (error) {
                          throw error;
                        }

                        if (results.rowCount === "0") {
                          pool.query(
                            "UPDATE restaurante SET promocao = '0' WHERE restaurante_email = $2",
                            [restaurante_email],
                            (error, results) => {
                              if (error) {
                                throw error;
                              }
                              response
                                .status(200)
                                .send(`Plate edited successfully`);
                            }
                          );
                        } else {
                          response
                            .status(200)
                            .send(`Plate edited successfully`);
                        }
                      }
                    );
                  }
                );
              }

              pool.query(
                "INSERT INTO historico_precos ( preco , horario, prato_nome, restaurante_email) VALUES ($1, $2, $3, $4)",
                [preco, "" + Hora() + ":" + Minutos(), nome, restaurante_email],
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

router.get("/list/:restaurante_email/:nome", async (request, response) => {
  pool.query(
    "SELECT nome, descricao, preco, promocao, restaurante_email FROM prato WHERE nome = $1 AND restaurante_email = $2",
    [request.params.nome, request.params.restaurante_email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  );
});

router.get("/list/:restaurante_email", async (request, response) => {
  pool.query(
    "SELECT nome, restaurante_email, promocao FROM prato WHERE restaurante_email = $1 ORDER BY nome ASC",
    [request.params.restaurante_email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    }
  );
});

router.delete("/delete/:restaurante_email/:nome", async (request, response) => {
  pool.query(
    "DELETE FROM historico_precos WHERE prato_nome = $1 AND restaurante_email = $2",
    [request.params.nome, request.params.restaurante_email],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "DELETE FROM prato WHERE nome = $1 AND restaurante_email = $2",
        [request.params.nome, request.params.restaurante_email],
        (error, results) => {
          if (error) {
            throw error;
          }
        }
      );
    }
  );
});

module.exports = (app) => app.use("/plate", router);
