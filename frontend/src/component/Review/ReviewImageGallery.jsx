import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "./ReviewStyle";

const ReviewImageGallery = ({ images = [] }) => {
  const classes = useStyles();
  if (!images || images.length === 0) return null;
  return (
    <Box className={classes.imageGallery}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={typeof img === "string" ? img : URL.createObjectURL(img)}
          alt={`review-img-${idx}`}
          className={classes.reviewImg}
        />
      ))}
    </Box>
  );
};

export default ReviewImageGallery;