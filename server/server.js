require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM restaurants WHERE id = $1", // string concatenating is not recommended.
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *", // if not write returning here, it wouldn't return any data.
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
