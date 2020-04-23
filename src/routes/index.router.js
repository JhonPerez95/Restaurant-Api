const express = require("express");
const app = express();

app.use(require("./category.router"));
app.use(require("./product.router"));
app.use(require("./order.router"));

module.exports = app;
