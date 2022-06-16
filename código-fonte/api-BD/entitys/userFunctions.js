const Pool = require("pg").Pool;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "WeFood",
  password: "xgdkmomw6",
  port: 8181,
});

router.get("/list", async (request, response) => {
  pool.query("SELECT nome, endereco, email FROM usuario", (error, results) => {
    if (error) {
      throw error;
    }

    return response.status(200).json(results.rows);
  });
});

router.put("/edit/nome/:email", async (request, response) => {
  const { nome } = request.body;

  pool.query(
    "UPDATE usuario SET nome = $1 WHERE email = $2",
    [nome, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Nome atualizado");
      } else {
        response.status(200).send("Nao ha usuarios com esse email");
      }
    }
  );
});

router.put("/edit/endereco/:email", async (request, response) => {
  const { endereco } = request.body;

  pool.query(
    "UPDATE usuario SET endereco = $1 WHERE email = $2",
    [endereco, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Endereco atualizado");
      } else {
        response.status(200).send("Nao ha usuarios com esse email");
      }
    }
  );
});

router.put("/edit/senha/:email", async (request, response) => {
  const { senha } = request.body;

  pool.query(
    "UPDATE usuario SET senha = $1 WHERE email = $2",
    [senha, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Senha atualizada");
      } else {
        response.status(200).send("Nao ha usuarios com esse email");
      }
    }
  );
});

router.delete("/delete/:email", async (request, response) => {
  pool.query(
    "DELETE FROM usuario WHERE email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send("Usuario deletado");
    }
  );
});

module.exports = (app) => app.use("/user", router);
