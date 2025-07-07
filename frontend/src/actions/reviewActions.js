import axios from "axios";
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

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/review/new`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.message });
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
export const editReview = (reviewId, productId, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/review/new`,
      { reviewId, productId, ...reviewData },
      config
    );

    dispatch({ type: EDIT_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: EDIT_REVIEW_FAIL, payload: error.message });
  }
};


// Like/Dislike review
export const likeDislikeReview = (reviewId, action) => async (dispatch, getState) => {
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
