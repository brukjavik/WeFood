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

/*

const f = async () => { return "hello" }
const str = await f()
console.log(str)

*/

async function filterConcat(obj) {
  cont = 0;
  let concat = "";
  str = "";

  if (obj.nome !== "undefined") {
    if (cont === 0) {
      str = "%" + obj.nome + "%";
      concat = ` WHERE nome LIKE '${str}'`;
      cont = cont + 1;
    } else {
      str = "%" + obj.nome + "%";
      concat = concat + ` AND nome LIKE '${str}'`;
    }
  }

  if (obj.categoria !== "undefined") {
    if (cont === 0) {
      str = "%" + obj.categoria + "%";
      concat = concat + ` WHERE categoria LIKE '${str}'`;
      cont = cont + 1;
    } else {
      str = "%" + obj.categoria + "%";
      concat = concat + ` AND categoria LIKE '${str}'`;
    }
  }

  if (obj.entrega !== "undefined") {
    if (cont === 0) {
      concat = concat + ` WHERE entrega = '${obj.entrega}'`;
      cont = cont + 1;
    } else {
      concat = concat + ` AND entrega = '${obj.entrega}'`;
    }
  }
  if (obj.promo !== "false") {
    if (cont === 0) {
      concat = concat + ` WHERE promocao = '1'`;
      cont = cont + 1;
    } else {
      concat = concat + ` AND promocao = '1'`;
    }
  }

  if (obj.popular !== "false") {
    if (cont === 0) {
      concat = concat + ` WHERE popular = '1'`;
      cont = cont + 1;
    } else {
      concat = concat + ` AND popular = '1'`;
    }
  }

  return concat;
}

router.get("/list/popular", async (request, response) => {
  pool.query(
    "SELECT nome, endereco, categoria, email, entrega, funcionamento FROM restaurante WHERE popular = '1'",
    (error, results) => {
      if (error) {
        throw error;
      }

      return response.status(200).json(results.rows);
    }
  );
});

router.get("/list/:email", async (request, response) => {
  pool.query(
    "SELECT nome, endereco, categoria, email, entrega, funcionamento FROM restaurante WHERE email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      return response.status(200).json(results.rows[0]);
    }
  );
});

router.get("/name/:email", async (request, response) => {
  pool.query(
    "SELECT nome FROM restaurante WHERE email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      return response.status(200).json(results.rows[0].nome);
    }
  );
});

router.get(
  "/list/:nome/:categoria/:entrega/:promo/:popular/:pedidos",
  async (request, response) => {
    //SELECT DISTINCT ON (id) id, data, restaurante_email FROM historico_vendas WHERE ( SELECT DATE_PART('day', CURRENT_DATE::timestamp - data::timestamp)) <= 1 ORDER BY id, data DESC

    query =
      "SELECT nome, endereco, categoria, email, entrega, funcionamento FROM restaurante";

    let concat = query + (await filterConcat(request.params));

    if (request.params.pedidos !== "false") {
      pool.query("UPDATE restaurante SET pedidos = '0'", (error, results) => {
        if (error) {
          throw error;
        }
      });

      pool.query(
        "SELECT DISTINCT ON (id) id, data, restaurante_email FROM historico_vendas WHERE ( SELECT DATE_PART('day', CURRENT_DATE::timestamp - data::timestamp)) = '1' ORDER BY id, data DESC",
        (error, results) => {
          if (error) {
            throw error;
          }

          for (i = 0; i < results.rowCount; i++) {
            pool.query(
              "UPDATE restaurante SET pedidos = pedidos + 1 WHERE email = $1",
              [results.rows[i].restaurante_email],
              (error, results) => {
                if (error) {
                  throw error;
                }

                i++;
              }
            );
          }

          pool.query(
            "SELECT nome, endereco, categoria, email, entrega, funcionamento FROM restaurante WHERE email = 'neto@gmail.com' ORDER BY pedidos DESC LIMIT 5",
            (error, results) => {
              if (error) {
                throw error;
              }
              console.log(JSON.stringify(results.rows));
              return response.status(200).json(results.rows);
            }
          );
        }
      );
    } else {
      pool.query(concat, (error, results) => {
        if (error) {
          throw error;
        }
        return response.status(200).json(results.rows);
      });
    }
  }
);

router.get("/list/food/:nome", async (request, response) => {
  str = "%" + request.params.nome + "%";
  pool.query(
    "SELECT DISTINCT restaurante_email FROM prato WHERE nome LIKE $1 OR descricao LIKE $2",
    [str, str],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount != "0") {
        query = `SELECT nome, email FROM restaurante `;

        for (j = 0; j < results.rowCount; j++) {
          if (j === 0) {
            query =
              query + `WHERE email = '${results.rows[0].restaurante_email}'`;
          } else {
            query = query + `OR email = '${results.rows[j].restaurante_email}'`;
          }
        }

        pool.query(query, (error, results) => {
          if (error) {
            throw error;
          }

          return response.status(200).json(results.rows);
        });
      } else {
        response.status(200).json([]);
      }
    }
  );
});

router.put("/edit/email/:email", async (request, response) => {
  const { email, nome, endereco } = request.body;

  pool.query(
    "UPDATE restaurante SET email = $1 WHERE email = $2",
    [email, nome, endereco, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Restaurante atualizado");
      } else {
        response.status(200).send("Nao ha restaurantes com essa categoria");
      }
    }
  );
});

router.put("/edit/nome/:email", async (request, response) => {
  const { nome } = request.body;

  pool.query(
    "UPDATE restaurante SET nome = $1 WHERE email = $2",
    [nome, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Restaurante atualizado");
      } else {
        response.status(200).send("Nao ha restaurantes com essa categoria");
      }
    }
  );
});

router.put("/edit/endereco/:email", async (request, response) => {
  const { endereco } = request.body;

  pool.query(
    "UPDATE restaurante SET endereco = $1 WHERE email = $2",
    [endereco, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount !== 0) {
        response.status(200).send("Restaurante atualizado");
      } else {
        response.status(200).send("Nao ha restaurantes com essa categoria");
      }
    }
  );
});

router.put("/edit/delivery/:email/:entr", async (request, response) => {
  pool.query(
    "UPDATE restaurante SET entrega = $1 WHERE email = $2",
    [request.params.entr, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (request.params.entr !== "0") {
        response.status(200).send("UM");
      } else {
        response.status(200).send("ZERO");
      }
    }
  );
});

router.put("/edit/open/:email/:func", async (request, response) => {
  pool.query(
    "UPDATE restaurante SET funcionamento = $1 WHERE email = $2",
    [request.params.func, request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (request.params.func !== 0) {
        response.status(200).send("ABERTO");
      } else {
        response.status(200).send("FECHADO");
      }
    }
  );
});

router.delete("/delete/:email", async (request, response) => {
  pool.query(
    "DELETE FROM restaurante WHERE email = $1",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      pool.query(
        "DELETE FROM prato WHERE restaurante_email = $1",
        [request.params.email],
        (error, results) => {
          if (error) {
            throw error;
          }

          pool.query(
            "DELETE FROM historico_precos WHERE restaurante_email = $1",
            [request.params.email],
            (error, results) => {
              if (error) {
                throw error;
              }

              pool.query(
                "DELETE FROM historico_vendas WHERE restaurante_email = $1",
                [request.params.email],
                (error, results) => {
                  if (error) {
                    throw error;
                  }

                  pool.query(
                    "DELETE FROM carrinho WHERE restaurante_email = $1",
                    [request.params.email],
                    (error, results) => {
                      if (error) {
                        throw error;
                      }
                      response.status(200).send(`O restaurante foi deletado`);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

router.get("/report1/:email", async (request, response) => {
  pool.query(
    "SELECT nome, pedidos FROM prato WHERE restaurante_email = $1 ORDER BY pedidos DESC",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send(results.rows[0]);
    }
  );
});

router.get("/report2/:email/:dias", async (request, response) => {
  pool.query(
    "SELECT DISTINCT id, data, horario FROM historico_vendas WHERE restaurante_email = $1 AND ( SELECT DATE_PART('day', CURRENT_DATE::timestamp - data::timestamp)) <= $2 ORDER BY data DESC",
    [request.params.email, request.params.dias],
    (error, results) => {
      if (error) {
        throw error;
      }

      for (i = 0; i < results.rowCount; i++) {
        results.rows[i].data = results.rows[i].data = new Date(
          results.rows[i].data
        ).toLocaleDateString("pt-BR");
      }

      response.status(200).send(results.rows);
    }
  );
});

router.get("/report3/:email", async (request, response) => {
  nome = [{}];
  reportObj = {};
  array = [];

  pool.query(
    "SELECT DISTINCT nome_prato FROM historico_vendas WHERE restaurante_email = $1 AND ( SELECT DATE_PART('day', CURRENT_DATE::timestamp - data::timestamp)) <= 7",
    [request.params.email],
    (error, results) => {
      if (error) {
        throw error;
      }

      nome = results.rows;
      max = results.rowCount;

      for (i = 0; i < results.rowCount; i++) {
        pool.query(
          "SELECT AVG(preco) FROM historico_precos WHERE prato_nome = $1 AND restaurante_email = $2",
          [nome[i].nome_prato, request.params.email],
          (error, results) => {
            if (error) {
              throw error;
            }

            aux = parseFloat(results.rows[0].avg);

            arrendodado = aux.toFixed(2);

            reportObj = {
              nome_prato: nome[i].nome_prato,
              media: arrendodado,
            };

            array.push(reportObj);

            if (i === max - 1) {
              response.status(200).json(array);
            }

            i++;
          }
        );
      }
      i = 0;

      if (max === 0) {
        response.status(200).json("nada");
      }
    }
  );
});

module.exports = (app) => app.use("/rest", router);

/*
      Promise.all(array).then((array) => {
        for (i = 0; i < results.rowCount; i++) {
          console.log("for: ");
          console.log(i);

          pool
            .query(
              "SELECT AVG(preco) FROM historico_precos WHERE prato_nome = $1 AND restaurante_email = $2",
              [nome[i].nome_prato, request.params.email]
            )
            .then((res) => {
              console.log("query: ");
              console.log(i);
              array.push(nome[i].nome_prato, res.rows[0].avg);
              i++;

              if (i == max) {
                console.log("send");
              }
            })
            .catch((e) => console.error(e.stack));
        }
        i = 0;
      });

res.rows[0]


      for (i = 0; i < results.rowCount; i++) {
        console.log(i);

        pool
          .query(
            "SELECT AVG(preco) FROM historico_precos WHERE prato_nome = $1 AND restaurante_email = $2",
            [nome[i].nome_prato, request.params.email]
          )
          .then((res) => {
            console.log(i);
            array.push(nome[i].nome_prato, res.rows[0].avg);
            i++;
          })
          .catch((e) => console.error(e.stack));
      }

*/
