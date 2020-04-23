require("dotenv").config();
const app = require("./server");

app.listen(port, () => {
  console.log(`Server started in `, port);
});
