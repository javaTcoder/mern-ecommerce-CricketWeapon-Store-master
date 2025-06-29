import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { verifyEmailToken } from "../../actions/emailVerificationAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Loader from "../layouts/loader/Loader";

// Custom hook to parse URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null); // 'success' or 'error'

  useEffect(() => {
    const token = query.get("token");
    const email = query.get("email");

    if (token && email) {
      dispatch(verifyEmailToken(token, email))
        .then(() => {
          setResult("success");
          toast.success("Email verified successfully!");
        })
        .catch(() => {
          setResult("error");
          toast.error("Invalid or expired verification link.");
        })
        .finally(() => setLoading(false));
    } else {
      setResult("error");
      setLoading(false);
      toast.error("Verification link is missing parameters.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <Loader />;

  return (
    // Main container for the verification page, centered and takes full height
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 160px)", // Adjust height to account for header/footer
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5", // Light background for the whole page
      }}
    >
      {/* Content box with white background and shadow for a professional look */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px", // Max width for content box
          width: "100%", // Responsive width
        }}
      >
        {result === "success" ? (
          <>
            <Typography
              variant="h4"
              style={{
                color: "#28a745", // Green for success
                fontWeight: 700,
                marginBottom: "15px",
              }}
            >
              Email Verified!
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#333",
                fontSize: "1rem",
                marginBottom: "25px",
              }}
            >
              Your email has been successfully verified. You can now log in.
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#414141", // Dark gray button
                color: "white",
                padding: "10px 30px",
                fontSize: "1rem",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#ed1c24", // Red on hover
                },
              }}
              onClick={() => history.push("/login")}
            >
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              style={{
                color: "#dc3545", // Red for error
                fontWeight: 700,
                marginBottom: "15px",
              }}
            >
              Verification Failed
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "#333",
                fontSize: "1rem",
                marginBottom: "25px",
              }}
            >
              The verification link is invalid or has expired.
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#414141", // Dark gray button
                color: "white",
                padding: "10px 30px",
                fontSize: "1rem",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#ed1c24", // Red on hover
                },
              }}
              onClick={() => history.push("/signup")}
            >
              Go to Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
