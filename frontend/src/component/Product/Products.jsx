import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { toast } from "react-toastify";
import { useRouteMatch } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import ReactPaginate from 'react-paginate';
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/Inventory";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { dispalyMoney } from "../DisplayMoney/DisplayMoney";

const categories = [
  "Cricket Kits",
  "Batting Gloves",
  "Batting Pads",
  "Bats",
  "Bags",
  "Helmets",
  "Balls",
  "Stumps",
  "Shoes",
  "Clothing",
  "Accessories",
];

function Products() {
  const match = useRouteMatch();
  let keyword = match.params.keyword;
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productsCount,
    error,
    resultPerPage,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [price, setPrice] = React.useState([0, 100000]);
  const [category, setCategory] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("all");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage + 1, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, ratings, category, error]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryChange = (selectedCat) => {
    // Toggle the category: if the clicked category is already selected, unselect it.
    if (selectedCat === selectedCategory) {
      setCategory("");
      setSelectedCategory("");
    } else {
      setCategory(selectedCat);
      setSelectedCategory(selectedCat);
    }
  };

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
    setSelectedRating(event.target.value);
  };

  return (
    <>
      <MetaData title="PRODUCTS --Ecart" />
      <div className="productPage">
        <div className="prodcutPageTop">
          {/* Filter Box remains here, fixed position */}
          <div className="filterBox">
            {/* Price Filter */}
            <div className="priceFilter">
              <Typography style={{ fontSize: "18px", padding: "5px", fontWeight: 700, color: "#414141" }}>
                Price
              </Typography>
              <div className="priceSlider">
                <Slider
                  value={price}
                  onChange={priceHandler}
                  min={0}
                  max={100000}
                  step={100}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
              </div>
              <div className="priceSelectors">
                <div className="priceSelector">
                  <Select
                    value={price[0]}
                    onChange={(e) => setPrice([+e.target.value, price[1]])}
                    className="priceOption"
                    IconComponent={ArrowDropDownIcon}
                    renderValue={(selected) => (selected !== "" ? selected : "min")}
                  >
                    <MenuItem value={0} className="menu_item">0</MenuItem>
                    <MenuItem value={5000} className="menu_item">5000</MenuItem>
                    <MenuItem value={10000} className="menu_item">10000</MenuItem>
                  </Select>
                  <span className="toText">to</span>
                  <Select
                    value={price[1]}
                    onChange={(e) => setPrice([price[0], +e.target.value])}
                    className="priceOption"
                    IconComponent={ArrowDropDownIcon}
                    renderValue={(selected) => (selected !== "" ? selected : "max")}
                  >
                    <MenuItem value={20000} className="menu_item">20000</MenuItem>
                    <MenuItem value={50000} className="menu_item">50000</MenuItem>
                    <MenuItem value={100000} className="menu_item">100000</MenuItem>
                  </Select>
                </div>
              </div>
            </div>

            <div className="filter_divider"></div>

            {/* Categories Filter */}
            <div className="categoriesFilter">
              <Typography style={{ fontSize: "18px", padding: "10px", fontWeight: 700, color: "#414141" }}>
                Categories
              </Typography>
              <ul className="categoryBox">
                {categories.map((cat, index) => (
                  <li className="category-link" key={index}>
                    <label htmlFor={`category-${index}`} className="category-label">
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="category-checkbox"
                        value={cat}
                        checked={cat === selectedCategory}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter_divider"></div>
            
            {/* Ratings Filter */}
            <div className="ratingsFilter">
              <Typography style={{ fontSize: "18px", padding: "10px", fontWeight: 700, color: "#414141" }}>
                Ratings Above
              </Typography>
              <RadioGroup
                value={selectedRating}
                onChange={handleRatingChange}
                row
                className="ratingsBox"
              >
                <FormControlLabel value="4" control={<Radio />} label="4★ & above" />
                <FormControlLabel value="3" control={<Radio />} label="3★ & above" />
                <FormControlLabel value="2" control={<Radio />} label="2★ & above" />
                <FormControlLabel value="0" control={<Radio />} label="All" />
              </RadioGroup>
            </div>
            <div className="filter_divider"></div>
          </div>

          {/* New wrapper for product content */}
          <div className="productContentWrapper"> 
            {loading ? (
              <Loader />
            ) : products && products.length > 0 ? (
              <div className={products.length < 2 ? "products1" : "products"}>
                {products.map((product) => {
                  // Calculate discounted price for each product
                  const discountPct = product.discountPercentage || 0;
                  const finalPrice = product.price * (1 - discountPct / 100);
                  const displayFinalPrice = dispalyMoney(finalPrice);
                  const displayOldPrice = dispalyMoney(product.price);
                  return (
                    <ProductCard
                      key={product._id}
                      product={{
                        ...product,
                        displayFinalPrice,
                        displayOldPrice,
                        discountPercentage: discountPct,
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="emptyProductsContainer">
                <InventoryIcon className="cartIcon" />
                <Typography variant="h5" component="h1" className="cartHeading">
                  Product Not Found
                </Typography>
                <Typography variant="body" className="cartText">
                  Nothin' to see here.
                </Typography>
                <Typography variant="body" className="cartText">
                  There is no product with this name
                </Typography>
                <Button
                  className="shopNowButton"
                  onClick={() => window.location.reload()}
                  style={{ width: "7rem" }}
                >
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </div>

        {products && products.length > 0 && (
          <div className="paginationBox">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(productsCount / resultPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
