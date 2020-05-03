import React from "react";
import Grid from "@material-ui/core/Grid";
import ReviewStarRating from "./ReviewStarRating";
import ReviewBody from "./ReviewBody";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import { submitReview, changeReview, changeRate, setWaiting } from "../../actions/form";
import { getReviews } from "../../actions/review";

const styles = {
  wrapper: {
    paddingBottom: "20px",
    borderBottom: "1px solid grey",
  },
  submit: {
    fontSize: "12px",
  },
  alert: {
    fontSize: "12px",
  }
};

class ReviewForm extends React.Component {
  constructor(){
    super()
    this.state = {
      setNotificationOpen: false,
      submitted: false,
      error: false
    };
  }
  componentDidUpdate = () => {
    if (this.props.success && this.state.submitted) {
      this.setState({ setNotificationOpen: true });
      this.setState({ submitted: false });
      this.props.getReviews(1);
    }
  };
  _handleSubmit = () => {
    const { review, rate } = this.props;
    if (review) {
      this.props.setWaiting(true);
      this.props.submitReview(review, rate);
      this.props.changeRate(0);
      this.props.changeReview('');
      this.setState({ submitted: true, error: false  });
      setTimeout(() => {
        this.props.setWaiting(false);
      }, 3000); //fake loading for 3seconds
    } else {
      this.setState({ error: true })
    }
  };
  _handleNotification = () => {
    this.setState({ setNotificationOpen: false });
  };
  render() {
    const { classes, error } = this.props;
    return (
      <Grid className={classes.wrapper}>
        <Grid item md={12}>
          <Typography variant="h5">Review*</Typography>
          <ReviewBody error={this.state.error}/>
          <Typography variant="h5">Rating</Typography>
          <ReviewStarRating />
          <Button
            variant="contained"
            color="primary"
            onClick={this._handleSubmit}
            className={classes.submit}
            disabled={this.props.waiting}
          >
            Save review
          </Button>
        </Grid>
        <Snackbar
          open={this.state.setNotificationOpen}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={6000}
          onClose={this._handleNotification}
        >
        <Alert onClose={this._handleNotification} severity="success" className={classes.alert}>
          Review has been added successfully.
        </Alert>
        </Snackbar>
                <Snackbar
          open={error}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={6000}
          onClose={this._handleNotification}
        >
        <Alert onClose={this._handleNotification} severity="error" className={classes.alert}>
          Server Error !
        </Alert>
        </Snackbar>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rate: state.formReducer.rate,
    review: state.formReducer.review,
    loading: state.formReducer.loading,
    success: state.formReducer.success,
    waiting: state.formReducer.waiting,
    error: state.formReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitReview: (review, rate) => {
      dispatch(submitReview(review, rate));
    },
    getReviews: (page) => {
      dispatch(getReviews(page));
    },
    changeReview: (review) => {
      dispatch(changeReview(review));
    },
    changeRate: (rating) => {
      dispatch(changeRate(rating));
    },
    setWaiting: (state) => {
      dispatch(setWaiting(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReviewForm));
