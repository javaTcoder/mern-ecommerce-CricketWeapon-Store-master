import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MataData/MataData";
// import { useAlert } from "react-alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OrderDetailsSection from "./OrderDetails";
import DummyCard from "./DummyCard";
import { clearErrors, createOrder } from "../../actions/orderAction";
import CheckoutSteps from "./CheckoutSteps ";
import { toast } from "react-toastify";

// for cardDetails for card detials input section and hooks for accessing strip and element from App.js route
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";

import { makeStyles } from "@mui/styles";

import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import { ReactComponent as MasterCard } from "../../Image/payment-svg/mastercard.svg";
import { ReactComponent as Visa } from "../../Image/payment-svg/visa (1).svg";
import { ReactComponent as Paytm } from "../../Image/payment-svg/paytm.svg";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

const useStyles = makeStyles((theme) => ({
  payemntPage: {
    padding: "1rem 0",
    width: "100%",
    backgroundColor: "white",
    //overFlow : "hidden",
  },

  paymentPage__container: {
    display: "flex",
    width: "100%",
    maxWidth: "100vw", // Prevent overflow
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: "1rem",
      padding: "0 0.5rem",
      width: "100vw", // Ensure full viewport width
      maxWidth: "100vw", // Prevent horizontal scroll
      boxSizing: "border-box",
    },
  },

  PaymentBox: {
    width: "55%",
    minWidth: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 0,
      padding: "0",
    },
  },
  PaymentHeading: {
    fontWeight: "800",
    marginBottom: "1rem",
    fontSize: "1.5rem",
    textTransform: "uppercase",
  },
  securePayemnt: {
    display: "flex",
    alignItems: "center",
    fontWeight: "300",
    backgroundColor: "#f5f5f5 !important",
    width: "90%",
    padding: "1rem",
    gap: "0.8rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "2rem",
    },
  },
  icons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    width: "100%",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
    },
  },
  cardContainer: {
    padding: "1rem",
    border: "1px solid #f5f5f5",
    borderRadius: "0.5rem",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    width: "90%",
  },
  subHeading: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "500",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
    },
  },
  cardDetails: {
    width: "100%",
    "& .MuiGrid-item": {
      marginBottom: "1rem", // 👈 add bottom spacing
    },
  },
  labelText: {
    fontWeight: "300",
  },
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
        borderRadius: "none !important",
      },
      "&:hover fieldset": {
        borderColor: "#000",
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  },
  cardSelection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    "& svg": {
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#00000080",
    },
  },

  radioText: {
    fontWeight: "400",
    fontSize: "1rem",
    color: "#00000080",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  },
  radio: {
    color: "#000",
    "&.Mui-checked": {
      color: "#000",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
  placeOrderBtn: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.8rem 1rem",
    borderRadius: "0.5rem",
    width: "90%",
    marginLeft: "1rem",
    marginTop: "1rem",
    "&:hover": {
      backgroundColor: "#00000080",
    },
  },
  termsAndConditionsText: {
    fontFamily: "Roboto",
    color: "#727272",
    fontWeight: "400",
    lineHeight: "17px",
    paddingLeft: "16px",
    fontSize: "12px",
  },
  privacyText: {
    marginLeft: "4px",
    textDecoration: "underline",
    color: "black",
    fontSize: "14px",
    "&:hover": {
      color: "red",
    },
  },
  paymentInput: {
    width: "100%",
    minWidth: "320px", // Make the card number box wider
    padding: "18px 18px",
    paddingRight: "50px",
    border: "1.5px solid #000",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "1.3rem", // Larger font
    height: "56px", // Taller input
    background: "#fff",
    marginBottom: "1rem",
  },
  paymentInput2: {
    width: "100%",
    minWidth: "140px", // Wider for expiry and CVV
    padding: "18px 18px",
    paddingRight: "50px",
    border: "1.5px solid #000",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "1.2rem",
    height: "56px",
    background: "#fff",
    marginBottom: "1rem",
  },
  cardNumberInput: {
    position: "relative",
    width: "100%",
    marginBottom: "1.5rem",
    minWidth: "320px",
    display: "flex",
    alignItems: "center",
  },
  expiryInput: {
    position: "relative",
    minWidth: "140px",
    marginRight: "1rem",
  },
  cvvInput: {
    position: "relative",
    minWidth: "140px",
  },

  inputIcon: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 2,
    color: "#00000080",
  },

  payemntAmount: {
    width: "45%",
    minWidth: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 0,
      padding: "0",
    },
  },

  order_Details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "2rem 0.5rem 2rem 0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "2rem",
    },
  },
  orderSub_heading: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  boldDivider: {
    borderBottom: `0.3px solid #3A3E3A`,
    margin: "5px 0",
    width: "99%",
  },
  shipping_Deatils: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    padding: "1rem 1px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: "1rem 2rem",
    },
  },
  shipping_Address: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  shipping_Address_Details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "300",
    padding: "10px 0px",
    width: "70%",
  },
  shipping_Address_edit: {
    paddingRigth: "1rem",
    "& svg": {
      fontSize: "1.8rem",
      cursor: "pointer",
      color: "black",
      "&:hover": {
        color: "#ed1c24",
      },
    },
  },
}));

// Use env variable for Razorpay key
const RAZORPAY_TEST_KEY = process.env.REACT_APP_RAZORPAY_TEST_KEY;
//|| "rzp_test_RE9h3DAScR7UqG"
const PaymentComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  // const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user, loading } = useSelector((state) => state.userData);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { error } = useSelector((state) => state.newOrder);
  const [isFocused, setIsFocused] = useState(false);
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showDummyCard, setShowDummyCard] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const razorpayRef = useRef();

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem.quantity * currItem.price;
  }, 0);

  const totalFinalPrice = subTotal;

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
  };

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false);
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "");
  };

  const handleRadioChange = () => {
    setShowDummyCard(!showDummyCard);
  };

  const handleCloseDummyCard = () => {
    setShowDummyCard(false);
  };

  const address = `${shippingInfo.address} , ${shippingInfo.city} ${
    shippingInfo.state
  } , ${shippingInfo.pinCode} , ${shippingInfo.country || "India"}`;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  };

  const paymentData = {
    // stripe takes payment in pese there for multiply with 100 bcz 1rs == 100 pese
    amount: Math.round(totalFinalPrice * 100),
  };

  async function paymentSubmitHandler(e) {
    e.preventDefault();

    const backendBase =
      process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

    // 1. Handle PhonePe payment
    if (selectedPayment === "phonepe") {
      const merchantTransactionId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      // prefer user phone, fallback to shippingInfo
      let userPhoneRaw =
        (user && (user.phoneNo || user.mobile || user.phone)) ||
        (shippingInfo && shippingInfo.phoneNo) ||
        null;
      // sanitize phone: trim and remove non-digits
      const userPhone = userPhoneRaw ? String(userPhoneRaw).trim().replace(/\D/g, "") : null;

      if (!userPhone) {
        toast.error("Phone number required for PhonePe payment. Please add phone number in profile or shipping info.");
        return;
      }

      // Redirect back to backend callback route that will verify and redirect to frontend
      const redirectUrl = `${backendBase}/api/v1/payment/phonepe/return?merchantTransactionId=${encodeURIComponent(
        merchantTransactionId
      )}`;

    try {
       const payloadForBackend = {
         merchantTransactionId,
         amount: totalFinalPrice,
         userPhone,
         redirectUrl,
       };
       // log payload (without secrets) to help debug signature/key issues
       console.info("[PhonePe] Initiating payment - payload:", { ...payloadForBackend, amount: payloadForBackend.amount });

       const res = await axios.post(`${backendBase}/api/v1/payment/phonepe`, payloadForBackend, {
         withCredentials: true,
         timeout: 15000,
       });
       console.info("[PhonePe] Provider/initiate response status:", res.status, "data:", res.data);

      if (
        res.data &&
        res.data.data &&
        res.data.data.instrumentResponse &&
        res.data.data.instrumentResponse.redirectInfo &&
        res.data.data.instrumentResponse.redirectInfo.url
      ) {
        toast.info("Redirecting to PhonePe for payment...");
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
        return;
      } else {
        toast.error("Failed to initiate PhonePe payment: invalid provider response.");
        return;
      }
    } catch (err) {
        // network / DNS / provider errors
        const remote = err.response?.data || null;
        if (err.message && err.message.includes("ENOTFOUND")) {
          toast.error("PhonePe host not reachable (DNS lookup failed). Check network and backend URL.");
        } else if (remote && remote.code === "401") {
          toast.error("PhonePe payment error: Unauthorized (401). Check PhonePe merchant id / salt key, key index, and sandbox vs production endpoint.");
          console.warn("[PhonePe] 401 response details:", remote);
        } else if (remote) {
          const msg = remote?.message || remote?.error || JSON.stringify(remote);
          toast.error("PhonePe payment error: " + msg);
          console.warn("[PhonePe] provider error:", remote);
        } else {
          toast.error("PhonePe payment error: " + (err.message || "Unknown error"));
        }
         return;
       }
     }

    // 2. Handle COD
    if (selectedPayment === "cod") {
      dispatch(createOrder({ ...order, paymentInfo: { id: "COD", status: "Pending" } }));
      toast.success("Order placed with Cash on Delivery!");
      history.push("/success");
      return;
    }

    // 2.5. Handle Razorpay payment
    if (selectedPayment === "razorpay") {
      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => paymentSubmitHandler(e); // retry after load
        return;
      }
      try {
        // Create order on backend to get order_id
        const res = await axios.post(
          `${backendBase}/api/v1/payment/razorpay`,
          { amount: Math.round(totalFinalPrice * 100) },
          { withCredentials: true }
        );
        const { order_id } = res.data;

        const options = {
          key: RAZORPAY_TEST_KEY,
          amount: Math.round(totalFinalPrice * 100),
          currency: "INR",
          name: "CricketWeapon Store",
          description: "Test Transaction",
          image: "", // optional logo
          order_id: order_id,
          handler: function (response) {
            // On successful payment
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
              method: "razorpay",
            };
            toast.success("Razorpay payment succeeded!");
            dispatch(createOrder(order));
            history.push("/success");
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact:
              (user && (user.phoneNo || user.mobile || user.phone)) ||
              (shippingInfo && shippingInfo.phoneNo) ||
              "",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        razorpayRef.current = rzp;
        rzp.open();
      } catch (err) {
        toast.error("Razorpay payment error: " + (err.response?.data?.message || err.message));
      }
      return;
    }

    // 3. Handle Card payment (existing code)
    if(nameOnCard === ""){
      toast.error("Please enter name on card");
      return;
    }

    const confirm = window.confirm("Are you sure you want to place the order and pay with your card?");
    if (!confirm) 
      return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // ensure Stripe backend call also sends cookies if required
      };
      const { data } = await axios.post(
        `${backendBase}/api/v1/payment/process`,
        paymentData,
        config
      );

      // client_secret is key from STRIPE  while making payement post req at backend
      const client_secret = data.client_secret;

      // passed at App.js route statement
      if (!stripe || !elements) return;

      // this object is from stripe-js. only values need to put
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "IN",
            },
          },
        },
      });

      if (result.error) {
        // if error then again enable the button on

       toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // add new property inside order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          toast.success(result.paymentIntent.status);

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      // if error while payment then again enable payment button

    
      toast.error(error.message);
    }
  }
  

  useEffect(() => {
    // Ensure Razorpay script is loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, error]);

  // claculte price after discount
  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // compute discounted total using each item's discountPercentage from product model
  let discountedPrice = cartItems.reduce((acc, item) => {
    const discountPct = item.discountPercentage || 0;
    const unitPriceAfterDiscount = item.price * (1 - discountPct / 100);
    return acc + unitPriceAfterDiscount * item.quantity;
  }, 0);

  let totalDiscount = totalPrice - discountedPrice;
  let final = discountedPrice;
  final = dispalyMoney(final);
  totalDiscount = dispalyMoney(totalDiscount);
  totalPrice = dispalyMoney(totalPrice);

  return (
    <>
 
        <div className={classes.payemntPage}>
          <CheckoutSteps activeStep={2} />
          <MetaData title={"Payment"} />
          <div className={classes.paymentPage__container}>
            <div className={classes.PaymentBox}>
              <Typography
                variant="h5"
                component="h1"
                className={classes.PaymentHeading}
              >
                Payment method1
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                className={classes.securePayemnt}
              >
                <AssuredWorkloadOutlinedIcon />
                Payments are SSL encrypted so that your credit card and payment
                details stay safe.
              </Typography>

              <div className={classes.cardContainer}>
                <Typography variant="h6" className={classes.subHeading}>
                  Credit Card <CreditCardIcon fontSize="medium" />
                </Typography>
                <Grid container spacing={2} className={classes.cardDetails}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      Card number
                    </Typography>
                    <div className={classes.cardNumberInput}>
                      <CardMembershipIcon className={classes.inputIcon} />
                      <CardNumberElement className={classes.paymentInput} />
                    </div>
                  </Grid>
                  <Grid item xs={12} container justifyContent="space-between">
                    <Grid item className={classes.icons}>
                      <MasterCard
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                      <Visa
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                      <Paytm
                        style={{
                          width: "5%",
                          height: "auto",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      EXPIRY DATE
                    </Typography>
                    <div className={classes.expiryInput}>
                      <PaymentIcon className={classes.inputIcon} />
                      <CardExpiryElement className={classes.paymentInput2} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      CVV/CVV
                    </Typography>
                    <div className={classes.cvvInput}>
                      <LockIcon className={classes.inputIcon} />
                      <CardCvcElement className={classes.paymentInput2} />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      className={classes.labelText}
                    >
                      NAME ON CARD
                    </Typography>
                    <TextField
                      placeholder="John Doe"
                      variant="outlined"
                      fullWidth
                      className={classes.outlinedInput}
                      value={nameOnCard}
                      required
                      onChange={handleNameOnCardChange}
                    />
                  </Grid>
                </Grid>
              </div>


              <div className={classes.cardSelection}>
                <Radio
                  value="card"
                  className={classes.radio}
                  checked={selectedPayment === "card"}
                  onChange={() => setSelectedPayment("card")}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  Credit Card
                </Typography>
                <CreditCardIcon fontSize="medium" />
              </div>
              <div className={classes.cardSelection}>
                <Radio
                  value="dummyCard"
                  className={classes.radio}
                  checked={showDummyCard}
                  onChange={handleRadioChange}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  Use dummy card
                </Typography>
                <CreditCardIcon fontSize="medium" />
                {showDummyCard && <DummyCard onClose={handleCloseDummyCard} />}
              </div>

              <div className={classes.cardSelection}>
                <Radio
                  value="cod"
                  className={classes.radio}
                  checked={showDummyCard === false && selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  Cash on Delivery (COD)
                </Typography>
              </div>

              <div className={classes.cardSelection}>
                <Radio
                  value="phonepe"
                  className={classes.radio}
                  checked={selectedPayment === "phonepe"}
                  onChange={() => setSelectedPayment("phonepe")}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  PhonePe
                </Typography>
                {/* You can add a PhonePe icon here if you want */}
              </div>
              {/* Razorpay option below PhonePe */}
              <div className={classes.cardSelection}>
                <Radio
                  value="razorpay"
                  className={classes.radio}
                  checked={selectedPayment === "razorpay"}
                  onChange={() => setSelectedPayment("razorpay")}
                />
                <Typography variant="subtitle2" className={classes.radioText}>
                  Razorpay (Test)
                </Typography>
                {/* You can add a Razorpay icon here if you want */}
              </div>
              <Typography
                variant="body2"
                className={classes.termsAndConditionsText}
              >
                By clicking "Place Order", you agree to our
                <Link href="#" className={classes.privacyText}>
                  Product Trust Terms & Conditions
                </Link>
              </Typography>
              <Button
                variant="contained"
                className={classes.placeOrderBtn}
                fullWidth
                // disabled={isDisable}
                style={{ marginTop: "3rem" }}
                onClick={paymentSubmitHandler}
              >
                Place Order
              </Button>
            </div>
            <div className={classes.payemntAmount}>
              <div className="order_summary">
                <h4>
                  Order Summary2 &nbsp; ( {cartItems.length}{" "}
                  {cartItems.length > 1 ? "items" : "item"} )
                </h4>
                <div className="order_summary_details">
                  <div className="price order_Summary_Item">
                    <span>Original Price</span>
                    {/* ORIGINAL PRICE TOATAL */}
                    <p>{totalPrice}</p>
                  </div>

                  <div className="discount order_Summary_Item">
                    <span>Discount</span>
                    <p>
                      <del>{totalDiscount}</del>
                    </p>
                  </div>

                  <div className="delivery order_Summary_Item">
                    <span>Delivery</span>
                    <p>
                      <b>Free</b>
                    </p>
                  </div>

                  <div className="separator_cart"></div>
                  <div className="total_price order_Summary_Item">
                    <div>
                      <h4>Total Price</h4>

                      <p
                        style={{
                          fontSize: "14px",
                          marginTop: "-10px",
                          color: "#414141",
                        }}
                      >
                        (Inclusive of all taxes)
                      </p>
                    </div>
                    <p>
                      <b>{final}</b>
                    </p>
                  </div>
                </div>
              </div>

              <div className="separator"></div>

              <div className="coupon-box-wrapper">
                <div
                  className={`coupon-box-content ${isFocused ? "focused" : ""}`}
                >
                  <TextField
                    label="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={() => setIsFocused(false)}
                    error={!isValid}
                    helperText={!isValid && "Invalid coupon code"}
                    variant="outlined"
                    size="small"
                    style={{
                      width: "200px",
                      marginRight: "1rem",
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    className="coupon-box-apply-btn"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* <div className="paymentLogoImg">
                <img
                  src={require("../../Image/cart/cart_img.png")}
                  alt="payemnt-icons"
                  className="paymentImg"
                />
              </div> */}
              <div className={classes.order_Details}>
                <h5 className={classes.orderSub_heading}>ORDER DETAILS1</h5>
                {cartItems &&
                  cartItems.map((item, idx) => (
                    <Link to={`/product/${item.productId}`} style ={{textDecoration : "none" , color : "inherit"}}>
                      <OrderDetailsSection
                        key={idx}
                        item={item}
                        totalDiscount={totalDiscount}
                        totalPrice={totalPrice}
                      />
                    </Link>
                  ))}
              </div>
              <Divider className={classes.boldDivider} />
              <div className={classes.shipping_Deatils}>
                <Typography variant="h6" className={classes.orderSub_heading}>
                  DELIVERY ADDRESS
                </Typography>

                <div className={classes.shipping_Address}>
                  <div className={classes.shipping_Address_Details}>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {user.name && user.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {address}
                    </Typography>
                  </div>
                  <div className={classes.shipping_Address_edit}>
                    <EditIcon
                      className={classes.editIcon}
                      onClick={() => {
                        history.push("/shipping");
                      }}
                    />
                  </div>
                </div>
                <Typography
                  variant="subtitle2"
                  className={classes.mobileNo}
                  style={{
                    fontWeight: 400,
                    marginTop: "-5px",
                    fontSize: "16px",
                  }}
                >
                  {shippingInfo.phoneNo},
                </Typography>

                <Typography
                  variant="subtitle2"
                  className={classes.emailAddress}
                  style={{ fontWeight: 400, fontSize: "16px" }}
                >
                  {user.email}
                </Typography>
              </div>

              <div className={classes.shipping_Deatils}>
                <Typography
                  variant="h6"
                  className={classes.orderSub_heading}
                  style={{ marginTop: "5px" }}
                >
                  BILLING DETAILS
                </Typography>

                <div className={classes.shipping_Address}>
                  <div className={classes.shipping_Address_Details}>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", fontWeight: 400 }}
                    >
                      {address}
                    </Typography>
                  </div>
                  <div className={classes.shipping_Address_edit}>
                    <EditIcon
                      className={classes.editIcon}
                      onClick={() => {
                        history.push("/shipping");
                      }}
                    />
                  </div>
                </div>
                <Typography
                  variant="subtitle2"
                  className={classes.mobileNo}
                  style={{
                    fontWeight: 400,
                    marginTop: "-5px",
                    fontSize: "16px",
                  }}
                >
                  {shippingInfo.phoneNo},
                </Typography>

                <Typography
                  variant="subtitle2"
                  className={classes.emailAddress}
                  style={{ fontWeight: 400, fontSize: "16px" }}
                >
                  {user.email}
                </Typography>
              </div>
            </div>
          </div>
        </div>
    
    </>
  );
};

export default PaymentComponent;
