const db = require("../db");
const { StatusCodes } = require("http-status-codes");

const getAllRestaurants = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    res.status(StatusCodes.OK).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurant = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM restaurants WHERE id = $1", // string concatenating is not recommended.
      [req.params.id]
    );
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *", // if not write returning here, it wouldn't return any data.
      [name, location, price_range]
    );
    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *", // if not write returning here, it wouldn't return any data.
      [name, location, price_range]
    );
    res.status(StatusCodes.CREATED).json({
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
