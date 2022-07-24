const db = require("../db");
const { StatusCodes } = require("http-status-codes");

const getAllRestaurants = async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    const restaurantRatingsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurant = async (req, res) => {

  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1", // string concatenating is not recommended.
      [req.params.id]
    );
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
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

const addReview = async (req, res) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1,$2,$3,$4) RETURNING *",
      [id, name, review, rating]
    );
    res.status(StatusCodes.CREATED).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *", // if not write returning here, it wouldn't return any data.
      [name, location, price_range, id]
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
  addReview,
};
