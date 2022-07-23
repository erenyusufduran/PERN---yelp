import React from "react";
import { Routes, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/Restourants.context";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route
            exact
            path="/restaurants/:id/update"
            element={<UpdatePage />}
          />
          <Route
            exact
            path="/restaurants/:id"
            element={<RestaurantDetailPage />}
          />
        </Routes>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
