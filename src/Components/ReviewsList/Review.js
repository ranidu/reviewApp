import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { getReviews, deleteReview } from "../../actions/review";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ReviewStarRating from "../../Components/ReviewForm/ReviewStarRating";

const styles = {
  review: {
    fontStyle: "italic",
    fontSize: "14px",
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  icon: {
    fontSize: "40px",
  },
};

class Review extends React.Component {
  constructor() {
    super();

    this.state = {
      confirmboxOpen: false,
      deleteId: "",
    };
  }
  _handleConfirmationBoxOpen = (id) => {
    this.setState({ deleteId: id, confirmboxOpen: true });
  };
  _handleConfirmationBoxClose = () => {
    this.setState({ deleteId: "", confirmboxOpen: false });
  };
  _handleDelete = () => {
    this.props.deleteReview(this.state.deleteId);
    this.setState({ deleteId: "", confirmboxOpen: false });
  };
  render() {
    const { review, classes } = this.props;
    return (
      <Grid item md={12}>
        <Grid container>
          <Grid item md={2}>
            <Avatar className={classes.green} size="small">
              <AccountCircle className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item md={9}>
            <Typography variant="h5" className={classes.review}>
              {review.body}
            </Typography>
            <ReviewStarRating rating={review.rating} readOnly={true} />
          </Grid>
          <Grid item md={1}>
            <IconButton
              aria-label="delete"
              onClick={() => this._handleConfirmationBoxOpen(review.id)}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.confirmboxOpen}
          onClose={this._handleConfirmationBoxClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
          <DialogActions>
            <Button onClick={this._handleConfirmationBoxClose} size="small">
              No
            </Button>
            <Button
              onClick={this._handleDelete}
              color="primary"
              size="small"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReview: (id) => {
      dispatch(deleteReview(id));
    },
    getReviews: (page) => {
      dispatch(getReviews(page));
    },
  };
};

export default connect(
  '',
  mapDispatchToProps
)(withStyles(styles)(Review));
