import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { verifyEmailToken } from "../../actions/emailVerificationAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Loader from "../layouts/loader/Loader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

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
    }
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      {result === "success" ? (
        <>
          <Typography variant="h4" color="primary" gutterBottom>
            Email Verified!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your email has been successfully verified. You can now log in.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/login")}
          >
            Go to Login
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" color="error" gutterBottom>
            Verification Failed
          </Typography>
          <Typography variant="body1" gutterBottom>
            The verification link is invalid or has expired.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/signup")}
          >
            Go to Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;