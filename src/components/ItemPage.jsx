import { useParams, Link } from "react-router-dom";
import RoastLevel from "./RoastLevel";
import AddItemOptions from "./AddItemOptions";
import "../assets/styles/ItemPage.css";

const ItemPage = ({ coffeeData, loading, error, shoppingCart, setShoppingCart }) => {
  const { id } = useParams();
  const item = coffeeData.find((item) => item._id === id);
  return (
    <div className="itemPageContainer">
      {!item ? (
        !loading && error ? (
          <h2>{error}</h2>
        ) : loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="notFoundDiv">
            <h1>Error 404: Item does not exist</h1>
            <Link to="/" className="button">
              <button className="linkButton">Go to the home page</button>
            </Link>
          </div>
        )
      ) : (
        <div className="itemExistsContainer">
          <div className="itemExistsInnerContainer">
            <img className="itemPageImg" src={item.image_url} alt={item.name + " Image"} />
          </div>
          <div className="itemExistsInnerContainer">
            <h1 className="itemPageHeading">{item.name}</h1>
            <h2 className="itemPageSubHeading" style={{ marginTop: "0px", marginBottom: "10px" }}>
              ${item.price}
            </h2>
            <hr />
            <AddItemOptions item={item} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
            <hr />
            <p className="itemPageText">{item.description}</p>
            <h3 className="itemPageSubHeading">Roast Level:</h3>
            <RoastLevel level={item.roast_level} />
            <h3 className="itemPageSubHeading">Region:</h3>
            <p className="itemPageText">{item.region}</p>
            <h3 className="itemPageSubHeading">Flavor Profile:</h3>
            <p className="itemPageText">{item.flavor_profile.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
