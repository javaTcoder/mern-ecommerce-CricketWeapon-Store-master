import React, { useState , useEffect} from "react";
import { useStyles } from "./ReviewStyle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";

import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";
import { useSelector, useDispatch } from "react-redux";

//import { useParams } from "react-router-dom";
//import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { clearErrors, newReview,editReview } from "../../actions/reviewActions";



const DialogBox = ({ open, handleClose, id ,onReviewSubmitted, editingReview}) => {

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const { success: addSuccess, error: addError } = useSelector((state) => state.addNewReview);
  const { isEdited, error: editError } = useSelector((state) => state.editReview || {});
  

  const dispatch = useDispatch();
  //const params = useParams();
  //const alert = useAlert();


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event,newValue) => {
    setRatings(Number(newValue));
  };

  //  const handleRecommendChange = (event) => {
  //    setRecommend(event.target.value);
  //  };

  // On submit, call editReview if editingReview exists, else newReview
  const handleSubmit = () => {
    const reviewData = {
      title,
      comment,
      ratings,
      recommend,
      productId: id,
      reviewId: editingReview ? editingReview._id : undefined,
    };
    if (editingReview) {
      dispatch(editReview(editingReview._id, id, reviewData));
    } else {
      dispatch(newReview(reviewData));
    }
    handleClose();
    if (onReviewSubmitted) onReviewSubmitted();
  };

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

    useEffect(() => {
    if (editingReview) {
      setTitle(editingReview.title || "");
      setComment(editingReview.comment || "");
      setRatings(editingReview.ratings || 0);
      setRecommend(!!editingReview.recommend);
    } else {
      setTitle("");
      setComment("");
      setRatings(0);
      setRecommend(false);
    }
  }, [editingReview, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" className={classes.header}>
              Write your review
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="body1" className={classes.subHeadings}>
          *All fields are required unless marked optional.
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Title1
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter title here"
            value={title}
            onChange={handleTitleChange}
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Description
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter description here"
            multiline
            rows={4}
            value={comment}
            onChange={handleDescriptionChange}
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={classes.bodyText}>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={ratings}
            onChange={handleRatingChange}
            precision={0.5}
            className={classes.star}
          />
        </Box>
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
            >
              Would you recommend this product?
            </FormLabel>
            <RadioGroup
              aria-label="recommendation"
              name="recommendation"
              value={recommend ? "yes" : "no"}
              onChange={e => setRecommend(e.target.value === "yes")}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="black" />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="black" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleSubmit}
           // handleClose={handleClose}
            className={classes.submitBtn}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
