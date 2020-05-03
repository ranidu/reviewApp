import axios from "axios";

export const getReviews = (page) => {
    return (dispatch) => {
      dispatch({ type: "RETRIEVE_REVIEWS_STARTED" });
      axios
        .get(
          `${process.env.REACT_APP_ENDPOINT}/reviews?_limit=${process.env.REACT_APP_PER_PAGE}&_page=${page}`
        )
        .then((reviews) => {
          dispatch({ type: "RETRIEVE_REVIEWS_COMPLETED", reviews: reviews });
        })
        .catch((e) => {
          dispatch({ type: "RETRIEVE_REVIEWS_FAILED", error: e.response.data });
        });
    };
  };

  export const deleteReview = (id) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_REVIEW_STARTED" });
      axios
        .delete(`${process.env.REACT_APP_ENDPOINT}/reviews/${id}`)
        .then((review) => {
          dispatch({ type: "DELETE_REVIEW_COMPLETED", review: review });
        })
        .catch((e) => {
          dispatch({ type: "DELETE_REVIEW_FAILED", error: e.response.data });
        });
    };
  };