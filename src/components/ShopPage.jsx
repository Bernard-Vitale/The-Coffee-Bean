import ShopProductCard from "./ShopProductCard";
import { useState, useEffect } from "react";

const ShopPage = ({ items, loading, error }) => {
  const [roastFilter, setRoastFilter] = useState("Any");
  const [filteredItems, setFilteredItems] = useState(items);
  const [visibleItems, setVisibleItems] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15);
  const [flavorOptionChoices, setFlavorOptionChoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [items, maxPrice, roastFilter, flavorOptionChoices]);

  useEffect(() => {
    document.body.scrollTo({ top: '0', behavior: 'smooth'})
    paginateItems();
  }, [filteredItems, currentPage]);

  const handleFlavorChange = (event) => {
    if (event.target.checked) {
      setFlavorOptionChoices([...flavorOptionChoices, event.target.value]);
    } else {
      let newChoices = flavorOptionChoices.filter((flavor) => flavor !== event.target.value);
      setFlavorOptionChoices(newChoices);
    }
  };

  const resetFilters = () => {
    setMaxPrice(15);
    setRoastFilter("Any");
    setFlavorOptionChoices([]);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleRoastChange = (event) => {
    setRoastFilter(event.target.value);
  };

  const applyFilters = () => {
    let newFilteredItems = items;

    if (roastFilter !== "Any") {
      newFilteredItems = newFilteredItems.filter((item) => item.roast_level === Number(roastFilter));
    }
    
    newFilteredItems = newFilteredItems.filter((item) => item.price < maxPrice);

    if (flavorOptionChoices.length !== 0) {
      newFilteredItems = newFilteredItems.filter((item) => {
        return flavorOptionChoices.some((flavor) => item.flavor_profile.includes(flavor));
      });
    }

    setFilteredItems(newFilteredItems);
    setCurrentPage(1);
  };

  const paginateItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    setVisibleItems(currentItems);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  }

  return (
    <div id="shopPageOuterContainer">
      <div id="shopPageInnerContainer">
        <div id="filterContainer">
          <button className="toggleFiltersBtn" onClick={toggleFilters}>
            <h1 id="filterHeading">{"Filters (" + filteredItems.length + ")"}</h1>
          </button>
          <button className="filterButton" onClick={resetFilters}>Reset Filters</button>
          <div className={`filtersContainer ${isFilterOpen ? 'active' : ''}`}>
            <hr />
            <button className={`filterButton closeFilterButton ${isFilterOpen ? 'active' : ''}`} onClick={toggleFilters}>Close Filters Menu</button>
            <div className="filter">
              <fieldset className="roastOptions">
                <legend>Select a Roast Level:</legend>
                <div>
                  <input type="radio" id="anyRoast" name="roast" value="Any" onChange={handleRoastChange} checked={roastFilter === "Any"} />
                  <label htmlFor="anyRoast">Any</label>
                </div>
                <div>
                  <input type="radio" id="roastOne" name="roast" value="1" onChange={handleRoastChange} />
                  <label htmlFor="roastOne">1</label>
                </div>
                <div>
                  <input type="radio" id="roastTwo" name="roast" value="2" onChange={handleRoastChange} />
                  <label htmlFor="roastTwo">2</label>
                </div>
                <div>
                  <input type="radio" id="roastThree" name="roast" value="3" onChange={handleRoastChange} />
                  <label htmlFor="roastThree">3</label>
                </div>
                <div>
                  <input type="radio" id="roastFour" name="roast" value="4" onChange={handleRoastChange} />
                  <label htmlFor="roastFour">4</label>
                </div>
                <div>
                  <input type="radio" id="roastFive" name="roast" value="5" onChange={handleRoastChange} />
                  <label htmlFor="roastFive">5</label>
                </div>
              </fieldset>
            </div>
            <hr />
            <div className="filter">
              <label htmlFor="maxPrice">Max Price: $</label>
              <input type="number" value={maxPrice} id="maxPrice" min="1" max="15" onChange={handleMaxPriceChange} />
            </div>
            <hr />
            <div className="filter">
              <label>Flavor Profiles:</label>
              <div className="flavorOptionsDiv">
                <div className="flavorOption">
                  <input type="checkbox" id="darkChocolate" value="Dark Chocolate" onChange={handleFlavorChange} />
                  <label htmlFor="darkChocolate">Dark Chocolate</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="blackCherry" value="Black Cherry" onChange={handleFlavorChange} />
                  <label htmlFor="blackCherry">Black Cherry</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="citrus" value="Citrus" onChange={handleFlavorChange} />
                  <label htmlFor="citrus">Citrus</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="toastedNuts" value="Toasted Nuts" onChange={handleFlavorChange} />
                  <label htmlFor="toastedNuts">Toasted Nuts</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="caramel" value="Caramel" onChange={handleFlavorChange} />
                  <label htmlFor="caramel">Caramel</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="cocoa" value="Cocoa" onChange={handleFlavorChange} />
                  <label htmlFor="cocoa">Cocoa</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="hazelnut" value="Hazelnut" onChange={handleFlavorChange} />
                  <label htmlFor="hazelnut">Hazelnut</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="molasses" value="Molasses" onChange={handleFlavorChange} />
                  <label htmlFor="molasses">Molasses</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="nutty" value="Nutty" onChange={handleFlavorChange} />
                  <label htmlFor="nutty">Nutty</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="smooth" value="Smooth" onChange={handleFlavorChange} />
                  <label htmlFor="smooth">Smooth</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="spicy" value="Spicy" onChange={handleFlavorChange} />
                  <label htmlFor="spicy">Spicy</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="earthy" value="Earthy" onChange={handleFlavorChange} />
                  <label htmlFor="earthy">Earthy</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="cinnamon" value="Cinnamon" onChange={handleFlavorChange} />
                  <label htmlFor="cinnamon">Cinnamon</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="clove" value="Clove" onChange={handleFlavorChange} />
                  <label htmlFor="clove">Clove</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="blueberry" value="Blueberry" onChange={handleFlavorChange} />
                  <label htmlFor="blueberry">Blueberry</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="chocolate" value="Chocolate" onChange={handleFlavorChange} />
                  <label htmlFor="chocolate">Chocolate</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="almond" value="Almond" onChange={handleFlavorChange} />
                  <label htmlFor="almond">Almond</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="toffee" value="Toffee" onChange={handleFlavorChange} />
                  <label htmlFor="toffee">Toffee</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="blackcurrant" value="Blackcurrant" onChange={handleFlavorChange} />
                  <label htmlFor="blackcurrant">Blackcurrant</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="coconut" value="Coconut" onChange={handleFlavorChange} />
                  <label htmlFor="coconut">Coconut</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="cardamom" value="Cardamom" onChange={handleFlavorChange} />
                  <label htmlFor="cardamom">Cardamom</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="espresso" value="Espresso" onChange={handleFlavorChange} />
                  <label htmlFor="espresso">Espresso</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="vanilla" value="Vanilla" onChange={handleFlavorChange} />
                  <label htmlFor="vanilla">Vanilla</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="floral" value="Floral" onChange={handleFlavorChange} />
                  <label htmlFor="floral">Floral</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="honey" value="Honey" onChange={handleFlavorChange} />
                  <label htmlFor="honey">Honey</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="smoke" value="Smoke" onChange={handleFlavorChange} />
                  <label htmlFor="smoke">Smoke</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="milkChocolate" value="Milk Chocolate" onChange={handleFlavorChange} />
                  <label htmlFor="milkChocolate">Milk Chocolate</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="tropicalFruit" value="Tropical Fruit" onChange={handleFlavorChange} />
                  <label htmlFor="tropicalFruit">Tropical Fruit</label>
                </div>
                <div className="flavorOption">
                  <input type="checkbox" id="fruit" value="Fruit" onChange={handleFlavorChange} />
                  <label htmlFor="fruit">Fruit</label>
                </div>
              </div>
            </div>
            <button className={`filterButton closeFilterButton ${isFilterOpen ? 'active' : ''}`} onClick={toggleFilters}>Close Filters Menu</button>
          </div>
        </div>
        <div className="shopItemsOuterContainer">
          <div id="shopItemsContainer">
            {loading && <h2>Loading...</h2>}
            {!loading && error && <h2>{error}</h2>}
            {!loading && !error && items && (
              visibleItems.length !== 0 ? (
                visibleItems.map((item) => (
                  <ShopProductCard itemInfo={item} key={item._id} />
                ))
              ) : (
                <div className="noProductsDiv">
                  <h1>Uh oh, we do not have any products that match the filters you applied.</h1>
                  <button className="filterButton" onClick={resetFilters}>Reset Filters</button>
                </div>
              )
            )}
            
          </div>
          <div id="pagination">
            <button className="paginationButtons" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&#8592;</button>
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
              <button
              className={`paginationNumberButtons paginationButtons ${currentPage === index + 1 ? 'active' : ''}`}
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button className="paginationButtons"onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredItems.length}>&#8594;</button>
        </div>
        </div>
      </div>
    </div>
  )
};

export default ShopPage;
