import RoastLevel from "./RoastLevel";
import { Link } from "react-router-dom";
const HomeItemCard = ({ itemInfo }) => {
  return (
    <Link to={"/item/" + itemInfo._id} className="homeItemCardLink">
      <div className="homeItemCardContainer">
        <img className="homeItemImg" src={itemInfo.image_url} alt={itemInfo.name + " Image"} />
        <h3 className="homeItemCardText">{itemInfo.name}</h3>
        <p className="homeItemCardText">${itemInfo.price}</p>
        <h4 className="homeItemCardText">Roast Level:</h4>
        <RoastLevel level={itemInfo.roast_level} />
        <h4 className="homeItemCardText">Flavor Profile:</h4>
        <p className="homeItemCardText">{itemInfo.flavor_profile.join(", ")}</p>
      </div>
    </Link>
  );
};

export default HomeItemCard;
