const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Database in connect"))
  .catch((err) => {
    throw err;
  });
