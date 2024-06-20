import "../assets/styles/CartPage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const CartPage = ({ shoppingCart, setShoppingCart }) => {
  let [total, setTotal] = useState(0);
  let [checkoutComplete, setCheckoutComplete] = useState(false);

  useEffect(() => {
    let newTotalPrice = 0;
    for (let item of shoppingCart) {
      newTotalPrice += Number((item.price * item.quantity).toFixed(2));
    }
    setTotal(newTotalPrice);
  }, [shoppingCart]);

  const removeItem = (id, grind) => {
    setShoppingCart(
      shoppingCart.filter((item) => {
        return item.id !== id || item.grind !== grind;
      })
    );
  };

  const handleCheckout = () => {
    setShoppingCart([]);
    setTotal(0);
    setCheckoutComplete(true);
  };

  const closeModal = () => {
    setCheckoutComplete(false);
  };

  const handleQtyChange = (event, selectedItem) => {
    const updatedShoppingCart = shoppingCart.map((item) => {
      if (item.id === selectedItem.id && selectedItem.grind ===item.grind) {
        return { ...item, quantity: Number(event.target.value) };
      }
      return item;
    });
    setShoppingCart(updatedShoppingCart);
  };

  return (
    <div className="cartContainer">
      <h1>Your Cart:</h1>
      <hr />
      <div className="cartItemsContainer">
        {shoppingCart.length !== 0 ? (
          <>
            {shoppingCart.map((item) => (
              <>
                <div className="cartItem" key={item.id}>
                  <div>
                    <img className="cartImg" src={item.image} alt={item.name + "Image"} />
                  </div>
                  <div className="cartItemInfoDiv">
                    <div className="cartItemInfoSub">
                      <div>
                        <h1>{item.name }</h1>
                        <p style={{margin: '0px'}}>{item.grind + " Grind"}</p>
                      </div>
                      <div className="dropdownContainer">
                        <label id='qtylabel' htmlFor="qtyDropdown">Qty:</label>
                        <input id="qtyDropdown" type="number" value={item.quantity} onChange={(event) => handleQtyChange(event, item)} min="1" max="60"/>                      
                      </div>
                    </div>
                    <div className="cartItemInfoSub priceDiv">
                      <h2>${(item.price * item.quantity).toFixed(2)}</h2>
                      <button onClick={() => removeItem(item.id, item.grind)} className="cartButtons">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
            <div className="totalRow">
              <h2>Total</h2>
              <h2>${total.toFixed(2)}</h2>
            </div>
            <div className="cartButtonDiv">
              <Link to="/shop">
                <button className="cartButtons bottomCartButtons">Continue Shopping</button>
              </Link>
              <button className="cartButtons bottomCartButtons" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="emptyCart">
            <h1>Your cart is currently empty.</h1>
            <Link to="/shop">
              <button className="cartButtons bottomCartButtons">Get Shopping!</button>
            </Link>
          </div>
        )}
      </div>

      <Modal
        isOpen={checkoutComplete}
        onRequestClose={closeModal}
        contentLabel="Checkout Complete"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "15rem",
            maxWidth: "40rem",
            textAlign: "center",
            alignSelf: "center",
            justifySelf: "center",
          },
        }}
      >
        <h2>Thank You!</h2>
        <p>Thank you for shopping at The Coffee Bean! You have successfully checked out, your coffee is on the way!</p>
        <button onClick={closeModal} className="cartButtons bottomCartButtons">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CartPage;
