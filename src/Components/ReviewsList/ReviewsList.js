import React from "react";
import Review from "./Review";
import Grid from "@material-ui/core/Grid";
import { getReviews } from "../../actions/review";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = {
  wrapper: {
    marginTop: "20px",
  },
  skelton: {
    width: "300px"
  },
  subTitle: {
    padding: "0px 0 30px",
    fontSize: "14px"
  }
};

class ReviewsList extends React.Component {
  _handleNextPage = (e, page) => {
    this.props.getReviews(page);
  };
  componentDidUpdate = (prevProps, prevState) => {
    if ((prevProps.deleted !== this.props.deleted) && !this.props.loading){
      this.props.getReviews(1);
    }
  };
  componentDidMount = () => {
      this.props.getReviews(1);
  };
  render() {
    const { reviews, count, classes, error, waiting } = this.props;
    return (
      <Grid className={classes.wrapper}>
      <Typography variant="h6" className={classes.subTitle}>{"Review List."}</Typography>
        {(!error && !waiting) ? (
          <Grid item md={12}>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => {
                return <Review review={review} key={review.id} />;
              })
            ) : (
              <Typography variant="h6">{"No reviews found."}</Typography>
            )}
            {process.env.REACT_APP_PER_PAGE &&
            Number(process.env.REACT_APP_PER_PAGE) < count ? (
              <Pagination
                count={Math.ceil(count / process.env.REACT_APP_PER_PAGE)}
                variant="outlined"
                onChange={() =>this._handleNextPage()}
              />
            ) : (
              ""
            )}
          </Grid>
        ) : (
          <div className={classes.skelton}>
            <Skeleton />
            <Skeleton animation="wave" /><br />
            <Skeleton />
            <Skeleton animation="wave" /><br />
            <Skeleton />
            <Skeleton animation="wave" /><br />
          </div>
        )} 
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewReducer.reviews,
    loading: state.reviewReducer.loading,
    error: state.reviewReducer.error,
    count: state.reviewReducer.count,
    waiting: state.formReducer.waiting,
    deleted: state.reviewReducer.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: (page) => {
      dispatch(getReviews(page));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReviewsList));
