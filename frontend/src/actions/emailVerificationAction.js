import axios from "axios";
import { toast } from "react-toastify";

// Send verification email
export const sendVerificationEmail = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/v1/send-verification-email", { email });
    toast.success(data.message || "Verification email sent!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send verification email");
  }
};

// Verify email token
export const verifyEmailToken = (token, email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/verify-email?token=${token}&email=${email}`);
    toast.success(data.message || "Email verified successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Invalid or expired verification link");
  }
};