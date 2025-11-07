import axios from "axios";
// ...existing imports...
import { toast } from "react-toastify";

// ...existing actions...

// Update product discount (admin)
export const updateProductDiscount = (productId, discountPercentage) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_DISCOUNT_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/product/${productId}/discount`,
      { discountPercentage },
      config
    );
    dispatch({ type: "UPDATE_PRODUCT_DISCOUNT_SUCCESS", payload: data.product });
    toast.success("Discount updated");
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_DISCOUNT_FAIL",
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.message || error.message);
  }
};
