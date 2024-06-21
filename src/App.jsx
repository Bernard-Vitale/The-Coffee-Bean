import "./assets/styles/App.css";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import ShopPage from "./components/ShopPage";
import CartPage from "./components/CartPage";
import fetchCoffeeData from "./fetchCoffeeData";
import ItemPage from "./components/ItemPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [coffeeData, setCoffeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoffeeData();
        setCoffeeData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar shoppingCart={shoppingCart} />
      <div className="MainBodyContainer">
        <Routes>
          <Route path="https://bernard-vitale.github.io/The-Coffee-Bean/" element={<HomePage coffeeData={coffeeData} loading={loading} error={error} />} />
          <Route path="https://bernard-vitale.github.io/The-Coffee-Bean/shop" element={<ShopPage items={coffeeData} loading={loading} error={error} />} />
          <Route path="https://bernard-vitale.github.io/The-Coffee-Bean/cart" element={<CartPage shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />}></Route>
          <Route
            path="https://bernard-vitale.github.io/The-Coffee-Bean/item/:id"
            element={
              <ItemPage coffeeData={coffeeData} loading={loading} error={error} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

