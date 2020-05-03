import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { changeRate } from "../../actions/form";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  rating: {
    paddingTop: "10px",
  }
};

class ReviewStarRating extends React.Component {
  onStarClick = (event, rate) => {
    this.props.changeRate(rate);
  };

  render() {
    const { rate, rating, classes } = this.props;
    return (
      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.rating}>
        <Rating
          name="simple-controlled"
          value={this.props.readOnly ? rating : rate}
          onChange={this.onStarClick}
          size="large"
          readOnly={this.props.readOnly}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rate: state.formReducer.rate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeRate: (rating) => {
      dispatch(changeRate(rating));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReviewStarRating));
