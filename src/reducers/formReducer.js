const initState = {
  review: "",
  rate: 0,
  error: false,
  loading: false,
  success: false,
  waiting: false
};

const formReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_RATE_STARTED":
      return { ...state, loading: true };
    case "CHANGE_RATE_COMPLETED":
      return {
        ...state,
        error: false,
        loading: false,
        rate: action.rate,
      };
    case "CHANGE_WAITING_STARTED":
      return { ...state, loading: true };
    case "CHANGE_WAITING_COMPLETED":
      return {
        ...state,
        error: false,
        loading: false,
        waiting: action.state,
      };
    case "CHANGE_REVIEW_STARTED":
      return { ...state, loading: true };
    case "CHANGE_REVIEW_COMPLETED":
      return {
        ...state,
        error: false,
        loading: false,
        review: action.review,
      };
    case "CREATE_REVIEW_STARTED":
      return { ...state, success: false };
    case "CREATE_REVIEW_COMPLETED":
      return {
        ...state,
        error: false,
        success: true,
      };
    case "CREATE_REVIEW_FAILED":
      return {
        ...state,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};

export default formReducer;
