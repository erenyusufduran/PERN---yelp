import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/Restourants.context";
import RestaurantFinder from "../apis/RestaurantFinder";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return <div>{selectedRestaurant && selectedRestaurant.name}</div>;
};

export default RestaurantDetailPage;
