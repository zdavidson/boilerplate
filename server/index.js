const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./db");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

const init = async () => {
  await db.sync();

  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};

init();
