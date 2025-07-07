import {
  
  CLEAR_ERRORS,
  
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,

  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  EDIT_REVIEW_RESET,
  EDIT_REVIEW_REQUEST, EDIT_REVIEW_SUCCESS, EDIT_REVIEW_FAIL,
  LIKE_REVIEW_REQUEST, LIKE_REVIEW_SUCCESS, LIKE_REVIEW_FAIL,
} from "../constants/reviewConstants";


// new Review Reducer
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// get all review Reducer =>

export const getALLReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// delete review reducer  =>

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// like dislike review reducer =>
// export const likeDislikeReviewReducer = (state = {}, action) => {
// Edit review reducer
export const editReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_REVIEW_REQUEST:
      return { ...state, loading: true };
    case EDIT_REVIEW_SUCCESS:
      return { ...state, loading: false, isEdited: true };
    case EDIT_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_REVIEW_RESET:
      return { ...state, isEdited: false };
    default:
      return state;
  }
};

// Like/Dislike review reducer
export const likeReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case LIKE_REVIEW_SUCCESS:
      return { ...state, loading: false, likes: action.payload };
    case LIKE_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};