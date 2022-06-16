const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const db = require("./queries");
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

require("./entitys/userAuth")(app);
require("./entitys/rest/restFunctions")(app);
require("./entitys/userFunctions")(app);
require("./entitys/plate/plateFunctions")(app);
require("./entitys/priceHistory/histFunctions")(app);
require("./entitys/cart/cartFunctions")(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
