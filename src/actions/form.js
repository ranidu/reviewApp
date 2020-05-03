import axios from "axios";

export const changeRate = (rate) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_RATE_STARTED" });
    dispatch({ type: "CHANGE_RATE_COMPLETED", rate: rate });
  };
};

export const changeReview = (review) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_REVIEW_STARTED" });
    dispatch({ type: "CHANGE_REVIEW_COMPLETED", review: review });
  };
};

export const setWaiting = (state) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_WAITING_STARTED" });
    dispatch({ type: "CHANGE_WAITING_COMPLETED", state: state });
  };
}

export const submitReview = (review, rate) => {
  return (dispatch) => {
    dispatch({ type: "CREATE_REVIEW_STARTED" });
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/reviews/`, { body: review, rating: rate })
      .then((review) => {
        dispatch({ type: "CREATE_REVIEW_COMPLETED", review: review });
      })
      .catch((e) => {
        dispatch({ type: "CREATE_REVIEW_FAILED", error: e });
      });
  };
};
