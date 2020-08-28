const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "client/build")));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});