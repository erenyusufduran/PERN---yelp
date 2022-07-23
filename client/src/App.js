import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
        <Route
          exact
          path="/restaurants/:id"
          element={<RestaurantDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
