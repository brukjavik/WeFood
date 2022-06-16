const Pool = require("pg").Pool;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "WeFood",
  password: "xgdkmomw6",
  port: 8181,
});

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/user/register", async (request, response) => {
  const { nome, senha, endereco, email } = request.body;

  pool.query(
    "INSERT INTO usuario ( nome, senha, endereco, email) VALUES ($1, $2, $3, $4)",
    [nome, senha, endereco, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User registered successfully`);
    }
  );
});

router.post("/rest/register", async (request, response) => {
  const { nome, senha, endereco, categoria, email } = request.body;

  pool.query(
    "INSERT INTO restaurante ( nome, senha, endereco, categoria, email) VALUES ($1, $2, $3, $4, $5)",
    [nome, senha, endereco, categoria, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send(`Restaurant registered successfully`);
    }
  );
});

router.post("/user/login", async (request, response) => {
  const { senha, email } = request.body;

  pool.query(
    "SELECT * FROM usuario WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        if (senha === results.rows[0].senha) {
          pool.query(
            "SELECT nome, endereco, email FROM usuario WHERE email = $1",
            [email],
            (error, result) => {
              if (error) {
                throw error;
              }

              user = result.rows[0];

              response.status(200).send({
                user,
                tipo: 0,
                token: generateToken({ user: user.id }),
              });
            }
          );
        } else {
          response.status(400).send("Invalid password");
        }
      } else {
        pool.query(
          "SELECT * FROM restaurante WHERE email = $1",
          [email],
          (error, results) => {
            if (error) {
              throw error;
            }

            if (results.rowCount !== 0) {
              if (senha === results.rows[0].senha) {
                pool.query(
                  "SELECT nome, endereco, email FROM restaurante WHERE email = $1",
                  [email],
                  (error, result) => {
                    if (error) {
                      throw error;
                    }

                    user = result.rows[0];

                    response.status(200).send({
                      user,
                      tipo: 1,
                      token: generateToken({ user: user.id }),
                    });
                  }
                );
              } else {
                response.status(400).send("Invalid password");
              }
            } else {
              response.status(400).send("Invalid email");
            }
          }
        );
      }
    }
  );
});

module.exports = (app) => app.use("/auth", router);
