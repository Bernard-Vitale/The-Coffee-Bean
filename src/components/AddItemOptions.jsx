import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/ItemPage.css"
const AddItemOptions = ({ item, shoppingCart, setShoppingCart }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState(item.grind_option[0]);

  const handleQtyChange = (event) => {
    setSelectedQty(event.target.value);
  };
  const handleGrindChange = (event) => {
    setSelectedGrind(event.target.value);
  };
  const updateCart = () => {
    let seen = false;
    const newCart = shoppingCart.map((x) => {
      if(item._id === x.id  && x.grind === selectedGrind){
        x.quantity = Number(x.quantity) + Number(selectedQty);
        seen = true;
      } 
      return x;
    });
    console.log(newCart);
    if(!seen){
      setShoppingCart([
        ...shoppingCart,
        { id: item._id, name: item.name, price: Number(item.price), image: item.image_url, quantity: Number(selectedQty), grind: selectedGrind },
      ]);
    }else{
      setShoppingCart(newCart)
    }
  };

  return (
    <div className="addItemDiv">
      <div className="dropdownContainer">
        <label htmlFor="qtyDropdown">Qty:</label>
        <select id="qtyDropdown" value={selectedQty} onChange={handleQtyChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="dropdownContainer">
        <label htmlFor="grindDropdown">Grind Option:</label>
        <select id="grindDropdown" value={selectedGrind} onChange={handleGrindChange}>
          {item.grind_option.map((grind) => {
            return (
              <option key={grind} value={grind}>
                {grind}
              </option>
            );
          })}
        </select>
      </div>
      <Link to="/cart">
        <button className="addToCartButton" onClick={updateCart}>
          Add To Cart
        </button>
      </Link>
    </div>
  );
};

export default AddItemOptions;
