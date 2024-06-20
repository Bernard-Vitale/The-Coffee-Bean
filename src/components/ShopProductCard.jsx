import RoastLevel from "./RoastLevel";
import { Link } from "react-router-dom";
import '../assets/styles/ShopPage.css'

const ShopitemInfoCard = ({ itemInfo }) => {
  return (
    <Link to={"/item/" + itemInfo._id} className="shopItemCardLink">
      <div className="shopItemCardContainer">
        <img className="shopItemImg" src={itemInfo.image_url} alt={itemInfo.name + " Image"} />
        <h3 className="shopItemCardText">{itemInfo.name}</h3>
        <p className="shopItemCardText">${itemInfo.price}</p>
        <h4 className="shopItemCardText">Roast Level:</h4>
        <RoastLevel level={itemInfo.roast_level} />
        <h4 className="shopItemCardText">Flavor Profile:</h4>
        <p className="shopItemCardText flavorText">{itemInfo.flavor_profile.join(", ")}</p>
      </div>
    </Link>
  );
};

export default ShopitemInfoCard;
