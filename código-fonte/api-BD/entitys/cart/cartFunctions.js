const Pool = require("pg").Pool;
const express = require("express");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

function DiferencaDias(dia1, dia2) {
  const datasplit1 = dia1.split("/");
  const datasplit2 = dia2.split("/");

  const day1 = datasplit1[0];
  const mes1 = datasplit1[1];
  const ano1 = datasplit1[2];

  const day2 = datasplit2[0];
  const mes2 = datasplit2[1];
  const ano2 = datasplit2[2];

  data1 = new Date(ano1, mes1 - 1, day1);
  data2 = new Date(ano2, mes2 - 1, day2);

  const diffdias = Math.abs(data1.getTime() - data2.getTime());

  return diffdias / (1000 * 60 * 60 * 24);
}

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

var id = 12;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "WeFood",
  password: "xgdkmomw6",
  port: 8181,
});

router.post("/add/:email", async (request, response) => {
  const { prato, email, preco, quantidade } = request.body;

  pool.query(
    "INSERT INTO carrinho ( usuario_email, prato_nome, restaurante_email, quantidade, preco_venda ) VALUES ( $1, $2, $3, $4, $5 )",
    [request.params.email, prato, email, quantidade, preco],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
});

router.get("/list/:email", async (request, response) => {
  pool.query(
    "SELECT prato_nome, quantidade, preco_venda, restaurante_email FROM carrinho WHERE usuario_email = $1 ORDER BY prato_nome ASC",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      carrinho = results.rows;

      if (results.rowCount != "0") {
        pool.query(
          "SELECT entrega FROM restaurante WHERE email = $1",
          [carrinho[0].restaurante_email],
          (error, results) => {
            if (error) {
              throw error;
            }

            entrega = results.rows[0].entrega;
            response.status(200).json({ carrinho, entrega });
          }
        );
      } else {
        response.status(200).json(carrinho);
      }
    }
  );
});

router.put("/edit/:email/:nome/:quantidade", async (request, response) => {
  if (request.params.quantidade == 0) {
    pool.query(
      "DELETE FROM carrinho WHERE usuario_email = $1 AND prato_nome = $2",
      [request.params.email, request.params.nome],
      (error, results) => {
        if (error) {
          throw error;
        }

        response.status(200).json("ok");
      }
    );
  } else {
    pool.query(
      "UPDATE carrinho SET quantidade = $1 WHERE usuario_email = $2 AND prato_nome = $3",
      [request.params.quantidade, request.params.email, request.params.nome],
      (error, results) => {
        if (error) {
          throw error;
        }

        response.status(200).json("ok");
      }
    );
  }
});

router.delete("/buy/:email", async (request, response) => {
  pool.query(
    "SELECT * FROM carrinho WHERE usuario_email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      objrowc = results.rowCount;
      object = results.rows;

      pool.query(
        "SELECT entrega, nome FROM restaurante WHERE email = $1",
        [object[0].restaurante_email],
        (error, results) => {
          if (error) {
            throw error;
          }

          rest_nome = results.rows[0].nome;

          entrega = results.rows[0].entrega;
          i = 0;
          while (i < objrowc) {
            pool.query(
              "INSERT INTO historico_vendas (id, horario, nome_prato, quantidade, preco_venda, restaurante_nome, restaurante_email, usuario_email, entrega) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
              [
                id,
                "" + Hora() + ":" + Minutos(),
                object[i].prato_nome,
                object[i].quantidade,
                object[i].preco_venda,
                rest_nome,
                object[i].restaurante_email,
                request.params.email,
                entrega,
              ],
              (error, resultado) => {
                if (error) {
                  throw error;
                }
              }
            );

            pool.query(
              "DELETE FROM carrinho WHERE usuario_email = $1 AND prato_nome = $2",
              [request.params.email, object[i].prato_nome],
              (error, resultado) => {
                if (error) {
                  throw error;
                }
              }
            );

            pool.query(
              "UPDATE prato SET pedidos = pedidos + 1 WHERE nome = $1",
              [object[i].prato_nome],
              (error, resultado) => {
                if (error) {
                  throw error;
                }
              }
            );

            i++;
          }
          id++;
        }
      );

      pool.query(
        "UPDATE restaurante SET pedidos = pedidos + 1 WHERE email = $1",
        [object[0].restaurante_email],
        (error, resutls) => {
          if (error) {
            throw error;
          }
        }
      );

      response.status(200).json(`obrigado por comprar`);
    }
  );
});

module.exports = (app) => app.use("/cart", router);
