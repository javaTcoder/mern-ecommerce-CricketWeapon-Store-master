import axios from "axios";
import { toast } from "react-toastify";
import {
 
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
 
 ALL_REVIEW_REQUEST,
 ALL_REVIEW_SUCCESS,
 DELETE_REVIEW_REQUEST,
 DELETE_REVIEW_SUCCESS,
 DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_FAIL,

  EDIT_REVIEW_REQUEST, EDIT_REVIEW_SUCCESS, EDIT_REVIEW_FAIL,
  LIKE_REVIEW_REQUEST, LIKE_REVIEW_SUCCESS, LIKE_REVIEW_FAIL,
} from "../constants/reviewConstants";






//Add new Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    console.log("🔥 REVIEW DATA TYPE:", reviewData.constructor.name);
    if (reviewData instanceof FormData) {
      for (let [key, val] of reviewData.entries()) {
        console.log("FormData:", key, val);
      }
    } else {
      console.log("JSON DATA:", reviewData);
    } 

    const { data } = await axios.post(`/api/v1/review/new`, reviewData);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    console.error("❌ Review upload failed:", error);
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};


 
 
 
 // get all review of product admin ==>
 export const getAllreviews  = (productId) => async (dispatch) =>{

     try {
        dispatch({type : ALL_REVIEW_REQUEST})

        const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`);
        dispatch({type : ALL_REVIEW_SUCCESS , payload : data.reviews})
     } catch (error) {
        dispatch({type : ALL_REVIEW_FAIL , payload : error.message})
     }
 }


  // delete product review
 export const deleteProductReview = (reviewId , productId) => async (dispatch) =>{
    try {
   dispatch({type : DELETE_REVIEW_REQUEST})
 
     const { data } = await axios.delete(
       `/api/v1/product/reviews/delete?reviewId=${reviewId}&productId=${productId}`
     );
 
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
       dispatch({type : DELETE_REVIEW_FAIL , payload : error.message})
    }
 
 }

 // Edit (update) a review
 // Edit Review
export const editReview = (reviewId, productId, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_REVIEW_REQUEST });

    const config =
      reviewData instanceof FormData
        ? {}
        : { headers: { "Content-Type": "application/json" } };


    const payload =
      reviewData instanceof FormData
        ? reviewData
        : { reviewId, productId, ...reviewData };

  // backend route expects POST /api/v1/review/new (same endpoint for create/update)
  const { data } = await axios.post(`/api/v1/review/new`, payload, config);

    dispatch({ type: EDIT_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: EDIT_REVIEW_FAIL, payload: error?.response?.data?.message || error.message });
  }
};

// Like/Dislike review
export const likeDislikeReview = (reviewId, action) => async (dispatch, getState) => {
  // Check if user is logged in
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    toast.info("Please login first");
    return;
  }
  try {
    dispatch({ type: LIKE_REVIEW_REQUEST });
    await axios.post(`/api/v1/review/like-dislike`, { reviewId, action });
    // Get productId from the review in Redux (or pass as argument)
    const { getAllReview } = getState();
    const review = getAllReview.reviews.find(r => r._id === reviewId);
    if (review) {
      dispatch(getAllreviews(review.product));
    }
    dispatch({ type: LIKE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({ type: LIKE_REVIEW_FAIL, payload: error.message });
  }
};
 
// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

/*
  Testing notes (Postman / curl)

  Endpoint used by frontend:
    PUT /api/v1/review/new

  Postman (recommended):
    - Method: PUT
    - URL: http://localhost:5000/api/v1/review/new
    - Authorization: Add Bearer token if your API requires auth (Headers -> Authorization: Bearer <token>)
    - Body -> form-data:
        * title       (Text) e.g. "Great product"
        * comment     (Text) e.g. "Worked well"
        * ratings     (Text/Number) e.g. "4.5"
        * recommend   (Text) "true" or "false"
        * productId   (Text) <product id>
        * images      (File) choose an image file (optional)
        * reviewId    (Text) include when editing an existing review

    - Important: DO NOT set Content-Type header manually. Postman will add multipart/form-data with boundary automatically.

  curl example (with file):
    curl -X PUT "http://localhost:5000/api/v1/review/new" \
      -H "Authorization: Bearer <token>" \
      -F "title=My Title" \
      -F "comment=My comment" \
      -F "ratings=4.5" \
      -F "recommend=true" \
      -F "productId=<productId>" \
      -F "images=@/path/to/image.jpg"

  What to check:
    - HTTP status and response JSON (success, saved review, image URL(s))
    - Backend logs for errors
    - DB/document to ensure review record saved and image URL/path present
    - If using cloud storage, check storage bucket for uploaded file

  Note: The action creator already handles FormData properly by not forcing Content-Type when reviewData is a FormData instance.
*/

