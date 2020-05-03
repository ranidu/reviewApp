import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { changeReview } from "../../actions/form";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    paddingBottom: "10px"
  },
});


class ReviewBody extends React.Component {
  _handleChangeReview = (e) => {
    if(e.target.value){
      this.props.changeReview(e.target.value)
    }
  }
  render() {
    const { classes, error } = this.props;
    return (

      <form className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          label="Write your review here"
          onChange={this._handleChangeReview}
          value={this.props.review}
          error={error}
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeReview: (review) => {
      dispatch(changeReview(review));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    review: state.formReducer.review,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReviewBody));
