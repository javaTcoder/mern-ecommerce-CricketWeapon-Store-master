import React, { useState,useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import {deleteProductReview } from "../../actions/reviewActions";
import { getAllreviews } from "../../actions/reviewActions";
import { getProductDetails } from "../../actions/productAction";
 import CricketBallLoader from "../layouts/loader/Loader";
import { useStyles } from "./ReviewStyle";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";
// import ReviewImageGallery from "./ReviewImageGallery";
// import ReviewActions from "./ReviewActions";
import Rating from "@mui/material/Rating";

// import MyCard from "../Product/Card";
import MyCard from "./Card";

import { useSelector } from "react-redux";
//import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const DialogBox = lazy(() => import("./DialogBox"));


const ReviewCard = () => { 
  
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const { product } = useSelector((state) => state.productDetails);
  const { reviews } = useSelector((state) => state.getAllReview);
  //const alert = useAlert();
  const history = useHistory();
  const [sortValue, setSortValue] = useState("highest");
  const [editingReview, setEditingReview] = useState(null);
  const [open, setOpen] = useState(false);
  // const [reviews, setReviews] = useState([]); // Local state for reviews

  const handleSortChange = (event) => {

    setSortValue(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
  if (product && product._id) {
    dispatch(getAllreviews(product._id));
  }
}, [dispatch, product]);


  // Refresh handler
  const handleReviewSubmitted = () => {
    dispatch(getProductDetails(product._id));
    dispatch(getAllreviews(product._id));
    // Optionally, you can also close the dialog here if needed
    setOpen(false);
  };


//    // Handler for editing a review
// const handleEditSubmit = (review, reviewData) => {
//   dispatch(editReview(review._id, product._id, reviewData)).then(() => {
//     dispatch(getProductDetails(product._id));
//   });
// };

  // When edit is clicked in MyCard
  const handleEdit = (review) => {
    setEditingReview(review);
    setOpen(true);
  };
  // Handler for deleting a review
  const handleDelete = (review) => {
  dispatch(deleteProductReview(review._id, product._id)).then(() => {
    dispatch(getProductDetails(product._id));
    dispatch(getAllreviews(product._id));
  });
};
  // const sortedData = yourData.sort((a, b) => {
  //   switch (sortValue) {
  //     case "highest":
  //       return b.rating - a.rating;
  //     case "lowest":
  //       return a.rating - b.rating;
  //     case "latest":
  //       return new Date(b.date) - new Date(a.date);
  //     case "oldest":
  //       return new Date(a.date) - new Date(b.date);
  //     default:
  //       return 0;
  //   }
  // });





    // Check if user has already reviewed
  const userHasReviewed = reviews
    ? reviews.some((rev) => {
        const revUserId = rev.user && rev.user._id ? String(rev.user._id) : String(rev.user || "");
        const currentUserId = String(user?._id || "");
        return revUserId === currentUserId;
      })
    : false;

  const handleClickOpen = () => {
     if (!isAuthenticated) {
      toast.error("Please Login to write a review");
     history.push("/login");
      return;
    }
      // Find the user's review if it exists
  const myReview = reviews.find((rev) => {
    const revUserId = rev.user && rev.user._id ? String(rev.user._id) : String(rev.user || "");
    const currentUserId = String(user?._id || "");
    return revUserId === currentUserId;
  });
    setEditingReview(myReview || null); // Reset editing review state
    // Open the dialog box for writing a review
    setOpen(true);
  };

  const handleClose = () => {
    console.log("called");
    setOpen(false);
  };

  return (
    <div className={classes.reviewRoot}>
      <Typography variant="h5" component="h1" className={classes.reviewHeader}>
        Users Reviews
      </Typography>
      <Button
        variant="contained"
        className={classes.submitBtn}
        fullWidth
        style={{ marginTop: "2rem" }}
        onClick={handleClickOpen}
      >
        {userHasReviewed ? "Update your Review" : "Write your Review"}
      </Button>

      <Suspense fallback={<CricketBallLoader />}>
        <DialogBox
          open={open}
          handleClose={handleClose}
          onReviewSubmitted={handleReviewSubmitted}
          id={product._id}
          editingReview={editingReview}
          className={classes.dialog}
        />
      </Suspense>
      <Grid container alignItems="center" style={{ marginTop: "2rem" }}>
        <Grid item className={classes.ratingContainer}>
          <Rating
            value={
              product && product.ratings !== undefined && product.ratings !== null
                ? Number(product.ratings) || 0
                : 0
            }
            precision={0.5}
            readOnly
            className={classes.star}
          />
        </Grid>
        <Typography variant="body2" className={classes.ratingNumber}>
          {(product && (product.ratings ?? 0)) + " stars"}
        </Typography>
        <Grid item>
          <Typography variant="body2">
            <strong> Total Reviews : </strong>
            {product.numOfReviews}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify="flex-end" className={classes.selectContainer}>
        <Grid item>
          <Typography
            variant="body2"
            style={{ fontSize: "12px" }}
            className={classes.sortBy}
          >
            SortBy :
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={sortValue ? sortValue : "highest"}
            className={classes.select}
            onClick={handleSortChange}
            MenuProps={{
              anchorOrigin: { vertical: "bottom", horizontal: "left" },
              getContentAnchorEl: null,
              MenuListProps: { disableScrollLock: true },
            }}
          >
            <MenuItem value="highest" className={classes.menuItem}>
              Highest Rated
            </MenuItem>
            <MenuItem value="lowest" className={classes.menuItem}>
              Lowest Rated
            </MenuItem>
            <MenuItem value="latest" className={classes.menuItem}>
              Latest Reviews
            </MenuItem>
            <MenuItem value="oldest" className={classes.menuItem}>
              Oldest Reviews
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <div className={classes.container}>
        {reviews &&
        reviews.map((review) => (
          <div key={review._id} style={{ marginBottom: "2rem" }}>
            <MyCard
              key={review._id}
              review={review}
              isOwnReview={user && ((review.user && review.user._id === user._id) || review.user === user._id)}
              onEdit={handleEdit}
              onDelete={() => handleDelete(review)}
            />
            {/* Show review images if present */}
            {/* {review.images && review.images.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url || img}
                    alt={`Review ${idx + 1}`}
                    style={{ width: 80, borderRadius: 8 }}
                  />
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
