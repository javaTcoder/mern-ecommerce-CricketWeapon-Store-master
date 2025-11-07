import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Grid, TextField, Button, IconButton, Box,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";
import { clearErrors, newReview, editReview } from "../../actions/reviewActions";
import { useStyles } from "./ReviewStyle";

// ✅ helper to convert image files to Base64 strings
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const DialogBox = ({ open, handleClose, id, onReviewSubmitted, editingReview }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewImagePreviews, setReviewImagePreviews] = useState([]);

  const { success: addSuccess, error: addError } = useSelector((state) => state.addNewReview);
  const { isEdited, error: editError } = useSelector((state) => state.editReview || {});

  // ✅ Preview selected images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setReviewImages(files);
    setReviewImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // ✅ Submit review using Base64 + JSON
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert selected files to Base64 strings
      const base64Images = reviewImages.length
        ? await Promise.all(reviewImages.map((file) => toBase64(file)))
        : [];

      // Build the review payload
      const reviewData = {
        title,
        comment,
        ratings: Number(ratings),
        recommend,
        productId: id,
        images: base64Images, // array of Base64 strings
      };

      if (editingReview) {
        reviewData.reviewId = editingReview._id;
        dispatch(editReview(editingReview._id, id, reviewData));
      } else {
        dispatch(newReview(reviewData));
      }

      // Reset form
      setReviewImages([]);
      setReviewImagePreviews([]);
      setTitle("");
      setComment("");
      setRatings(0);
      setRecommend(false);

      handleClose();
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      console.error("Error converting images:", error);
      toast.error("Failed to process images");
    }
  };

  // ✅ Handle review success or error
  useEffect(() => {
    if (addError) {
      toast.error(addError);
      dispatch(clearErrors());
    }
    if (editError) {
      toast.error(editError);
      dispatch(clearErrors());
    }
    if (addSuccess) {
      toast.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
      handleClose();
      if (onReviewSubmitted) onReviewSubmitted();
    }
    if (isEdited) {
      toast.success("Successfully updated your review");
      dispatch({ type: "EDIT_REVIEW_RESET" });
      handleClose();
      if (onReviewSubmitted) onReviewSubmitted();
    }
  }, [dispatch, addError, editError, addSuccess, isEdited, handleClose, onReviewSubmitted]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" classes={{ paper: classes.dialog }}>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" className={classes.header}>
              Write your review
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Box mt={2}>
          <Typography>Title</Typography>
          <TextField fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        </Box>
        <Box mt={2}>
          <Typography>Description</Typography>
          <TextField fullWidth multiline rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
        </Box>
        <Box mt={2}>
          <Typography>Rating</Typography>
          <Rating
            value={ratings}
            onChange={(e, newValue) => setRatings(Number(newValue))}
            precision={0.5}
          />
        </Box>
        <Box mt={2}>
          <FormControl>
            <FormLabel>Recommend?</FormLabel>
            <RadioGroup
              value={recommend ? "yes" : "no"}
              onChange={(e) => setRecommend(e.target.value === "yes")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Typography>Upload Photo(s)</Typography>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <Box display="flex" gap={1} mt={1}>
            {reviewImagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" style={{ width: 80, borderRadius: 8 }} />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleSubmit} className={classes.submitBtn}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
