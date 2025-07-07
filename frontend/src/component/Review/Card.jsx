import React, { useState  } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { likeDislikeReview, getAllreviews } from "../../actions/reviewActions";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 455,
    minHeight: "50vh",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "4px",
    background: "white",
  },
  cardheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },

  title: {
    marginBottom: "1rem",
    fontWeight: 700,
  },
  commentTxt: {
    marginBottom: "1.5rem",
    fontSize: "14px",
    color: "#414141",
  },
  recommend: {
    fontWeight: 700,
  },
  helpful: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },

  thumbIcon: {
    marginRight: "5px",
    marginLeft: "2rem",
    cursor: "pointer",
    fontSize: "1.5rem",
    "&:hover": {
      color: "red",
    },
  },

  subHeadings: {
    fontSize: "16px",
    color: "#414141",
    fontWeight: 700,
  },
  bodyText: {
    fontSize: "14px",
    color: "#414141",
    fontWeight: 500,
  },

  star: {
    color: "black",
    fontSize: 24,
    marginTop: "2px",
  },
  clicked: {
    color: "red",
  },
  yes: {
    color: "green",
  },
  no: {
    color: "red",
  },
  moreButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const MyCard = ({ review , onEdit, onDelete, isOwnReview}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userData);

  // const [helpful, setHelpful] = useState(10);
  // const [unhelpful, setUnHelpful] = useState(5);
  // const [helpfulClicked, setHelpfulClicked] = useState(false);
  // const [unhelpfulClicked, setUnhelpfulClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
 // Likes/dislikes state from review arrays
  const likes = review.likes ? review.likes.length : 0;
  const dislikes = review.dislikes ? review.dislikes.length : 0;
  const liked = review.likes && user ? review.likes.includes(user._id) : false;
  const disliked = review.dislikes && user ? review.dislikes.includes(user._id) : false;
    
  

  // Like handler
  const handleLike = () => {
    if (!user) return;
    dispatch(likeDislikeReview(review._id, "like")).then(() => {
      dispatch(getAllreviews(review.product));
    });
  };
  const handleDislike = () => {
    if (!user) return;
    dispatch(likeDislikeReview(review._id, "dislike")).then(() => {
      dispatch(getAllreviews(review.product));
    });
  };
 
  // const helpfulHandler = (type) => {
  //   if (type === "up" && !helpfulClicked) {
  //     setHelpful(helpful + 1);
  //     setHelpfulClicked(true);

  //     if (unhelpfulClicked) {
  //       setUnHelpful(unhelpful - 1);
  //       setUnhelpfulClicked(false);
  //     }
  //   } else if (type === "down" && !unhelpfulClicked) {
  //     setUnHelpful(unhelpful + 1);
  //     setUnhelpfulClicked(true);

  //     if (helpfulClicked) {
  //       setHelpful(helpful - 1);
  //       setHelpfulClicked(false);
  //     }
  //   }
  // };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function formateDate(dateString){
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    return formattedDate;
  }

  return (
    <div className={classes.cardRoot}>
      <div className={classes.cardheader}>
        <Avatar
          alt="User Avatar"
          src={review.user.avatar.url || "https://i.imgur.com/JSW6mEk.png"}
          className={classes.avatar}
        />
        <Typography variant="body1" className={classes.subHeadings}>
          {review.name || (review.user && review.user.name) || "User"}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginLeft: "12rem" }}
          className={classes.bodyText}
        >
          {formateDate(review.createdAt)}
        </Typography>
        {/* {isOwnReview &&  */}
          <>
            <IconButton
              className={classes.moreButton}
              onClick={handleMenuOpen}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isOwnReview ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onEdit(review);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onDelete(review);
                    }}
                  >
                    Delete
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    // You can add your flag/report logic here
                    alert("Flagged as abusive or inappropriate!");
                  }}
                >
                  Flag as abusive or inappropriate
                </MenuItem>
              )}
            </Menu>
          </>
       
        {/* } */}

      </div>
      <div>
        <Rating
          value={review.ratings}
          precision={0.5}
          size="midium"
          readOnly
          className={classes.star}
        />
      </div>
      <Typography variant="h6" className={classes.title}>
        {review.title}
      </Typography>
      <Typography variant="body1" className={classes.commentTxt}>
        {review.comment}
      </Typography>
      <Typography variant="body1" className={classes.recommend}>
        Would you recommend this product?{" "}
        <span className={review.recommend ? classes.yes : classes.no}>
          {review.recommend ? "Yes!" : "No!"}
        </span>
      </Typography>
      <div className={classes.helpful}>
        <Typography
          variant="body2"
          color="textSecondary "
          className={classes.subHeadings}
        >
          Helpful?
        </Typography>
        <ThumbUpIcon
          className={`${classes.thumbIcon} ${liked ? classes.clicked : ""}`}
          onClick={handleLike}
          disabled={loading} // Optionally disable while loading
        />
        <Typography>{likes}</Typography>
        <ThumbDownIcon
          className={`${classes.thumbIcon} ${disliked ? classes.clicked : ""}`}
          onClick={handleDislike}
          disabled={loading} // Optionally disable while loading
        />
         <Typography>{dislikes}</Typography>

      </div>
    </div>
  );
};
export default MyCard;
