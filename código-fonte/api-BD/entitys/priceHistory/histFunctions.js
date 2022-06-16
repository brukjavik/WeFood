const Pool = require("pg").Pool;
const express = require("express");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "WeFood",
  password: "xgdkmomw6",
  port: 8181,
});

router.get("/price/:email/:nome", async (request, response) => {
  pool.query(
    "SELECT data, horario, preco FROM historico_precos WHERE prato_nome = $1 AND restaurante_email = $2",
    [request.params.nome, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      for (i = 0; i < results.rowCount; i++) {
        results.rows[i].data = results.rows[i].data = new Date(
          results.rows[i].data
        ).toLocaleDateString("pt-BR");
      }

      response.status(200).json(results.rows);
    }
  );
});

router.get("/order/:email", async (request, response) => {
  pool.query(
    "SELECT DISTINCT id, data, horario FROM historico_vendas WHERE usuario_email = $1 OR restaurante_email = $1 ORDER BY id DESC",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      for (i = 0; i < results.rowCount; i++) {
        results.rows[i].data = results.rows[i].data = new Date(
          results.rows[i].data
        ).toLocaleDateString("pt-BR");
      }

      response.status(200).json(results.rows);
    }
  );
});

router.get("/order/:email/:id", async (request, response) => {
  pool.query(
    "SELECT id, data, horario, nome_prato, quantidade, preco_venda, entrega, restaurante_nome FROM historico_vendas WHERE (usuario_email = $1 OR restaurante_email = $1) AND id = $2",
    [request.params.email, request.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }

      for (i = 0; i < results.rowCount; i++) {
        results.rows[i].data = results.rows[i].data = new Date(
          results.rows[i].data
        ).toLocaleDateString("pt-BR");
      }

      response.status(200).json(results.rows);
    }
  );
});

module.exports = (app) => app.use("/hist", router);
