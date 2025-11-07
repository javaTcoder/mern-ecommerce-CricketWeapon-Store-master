import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";


const useStyles = makeStyles((theme) => ({
  rootPayment: {
    width: "100%",
    display: "flex",
    gap: "1rem",
    padding: "1rem 0rem 0rem 0rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Stack vertically on mobile
      gap: "0.5rem",
      alignItems: "center",
    },
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "80vw", // Responsive width
      height: "auto",
      maxWidth: "200px",
    },
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: theme.spacing(1),
  },
  quantity: {
    fontSize: 16,
    marginBottom: theme.spacing(1),
    color: "#00000080",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  finalPrice: {
    fontWeight: 400,
    fontSize: 16,
  },
  discountPrice: {
    textDecoration: "line-through",
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    fontSize: 16,
  },
  paymentStatus: {
    color: "green",
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
  paymentValue: {
    fontWeight: 400,
    marginRight: "10px",
    color: "#00000080",
  },
}));

// simple INR formatter
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    Number(value) || 0
  );

const OrderDetailsSection = ({ item /* totalDiscount, totalPrice */ }) => {
  const classes = useStyles();

  // ensure price and quantity exist
  const unitPrice = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;
  const subtotal = unitPrice * quantity;

  // determine discount percentage (support different shapes)
  const discountPercentage =
    Number(item.discountPercentage) ||
    Number(item.product?.discountPercentage) ||
    0;

  const discountedUnitPrice =
    discountPercentage > 0
      ? unitPrice * (1 - discountPercentage / 100)
      : unitPrice;
  const discountedTotal = discountedUnitPrice * quantity;

  return (
    <div className={classes.rootPayment}>
      <img src={item.image} alt={item.name} className={classes.image} />
      <div className={classes.details}>
        <Typography variant="subtitle1" className={classes.productName}>
          {item.name}
        </Typography>

        <Typography variant="body2" className={classes.quantity}>
          <span
            style={{ fontWeight: 400, marginRight: "10px", color: "#00000080" }}
          >
            Quantity:
          </span>
          {quantity}
        </Typography>

        <div className={classes.priceContainer}>
          <Typography variant="body2" className={classes.finalPrice}>
            {/* show discounted total if discount applies, otherwise show subtotal */}
            {discountPercentage > 0
              ? formatINR(discountedTotal)
              : formatINR(subtotal)}
          </Typography>

          {discountPercentage > 0 && (
            <Typography variant="body2" className={classes.discountPrice}>
              {formatINR(subtotal)}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="body2" className={classes.paymentStatus}>
            <span className={classes.paymentValue}>Payment:</span> Paid
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSection;
