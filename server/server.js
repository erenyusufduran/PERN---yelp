require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const router = require("./routes/restaurants");

const notFoundMiddleware = require("./middleware/not-found");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("go /restaurants");
});

app.use("/api/v1/restaurants", router);

app.use(notFoundMiddleware);

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
