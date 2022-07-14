require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["mcDonalds", "WendyS"],
    },
  });
});

app.get("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: success,
    data: {
      restaurant: "McDonalds",
    },
  });
});

app.post("/api/v1/restaurants", (req, res) => {
  res.status(201).json({
    status: success,
    data: {
      restaurant: "McDonalds",
    },
  });
});

app.put("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: "McDonalds",
    },
  });
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
