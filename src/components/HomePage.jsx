import { Link } from "react-router-dom";
import storeLogo from "../assets/images/storeLogo.png";
import HomeItemCard from "./HomeItemCard";
import "../assets/styles/HomePage.css";
const HomePage = ({ coffeeData, loading, error }) => {
  return (
    <>
      <div className="homeContainer">
        <div className="homeIntroContainer">
          <div className="homeTextInfo">
            <h1>Welcome to The Coffee Bean!</h1>
            <p>
              At our store every cup tells a story. Discover our carefully curated selection of premium beans, roasted to perfection to deliver the
              freshest flavors. Join us on a journey of rich aromas and bold tastes—because great coffee starts here.
            </p>

            <Link to="/shop" className="button">
              <button className="linkButton homePageButton">Get Shopping!</button>
            </Link>
          </div>
          <div id="homePageImageContainer">
            <img src={storeLogo} alt="Cartoon Storefront" />
          </div>
        </div>
        <div className="homePageItemsContainer">
          <h1>Check out some of our featured products!</h1>
          <div className="featuredItems">
            {loading && <h2>Loading...</h2>}
            {!loading && error && <h2>{error}</h2>}
            {!loading && !error && coffeeData && (
              <>
                <HomeItemCard itemInfo={coffeeData[3]} />
                <HomeItemCard itemInfo={coffeeData[6]} />
                <HomeItemCard itemInfo={coffeeData[10]} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
