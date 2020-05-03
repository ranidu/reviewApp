const initState = {
  review: [],
  reviews: [],
  count: 0,
  error: false,
  loading: false,
  success: false,
  deleted: false
};

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case "RETRIEVE_REVIEWS_STARTED":
      return { ...state, loading: true };
    case "RETRIEVE_REVIEWS_COMPLETED":
      return {
        ...state,
        error: false,
        loading: false,
        reviews: action.reviews.data,
        count: action.reviews.headers["x-total-count"],
      };
    case "RETRIEVE_REVIEWS_FAILED":
      return { ...state, error: true, loading: false, reviews: action.error };
    case "DELETE_REVIEW_STARTED":
      return { ...state, loading: true, deleted: false };
    case "DELETE_REVIEW_COMPLETED":
      return {
        ...state,
        error: false,
        loading: false,
        deleted: true
      };
    case "DELETE_REVIEW_FAILED":
      return { ...state, error: true, loading: false, reviews: action.error };
    default:
      return state;
  }
};

export default reviewReducer;
