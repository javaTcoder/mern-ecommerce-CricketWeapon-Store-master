import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails, updateProduct, updateProductDiscount } from "../../../actions/productAction";
import Loader from "../../layout/Loader";
import Message from "../../layout/Message";

const ProductUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(product?.discountPercentage || 0);

  useEffect(() => {
    if (product && product._id === id) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setDiscountPercentage(product.discountPercentage);
    } else {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      price,
      image,
      category,
      countInStock,
      description,
      discountPercentage: Number(discountPercentage),
    };
    dispatch(updateProduct(id, payload));
    dispatch(updateProductDiscount(id, Number(discountPercentage)));
    navigate("/admin/products");
  };

  return (
    <div>
      <h1>Update Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={handleSave}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Count In Stock1</label>
            <input
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Discount Percentage (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </div>
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default ProductUpdate;