import React from 'react';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ReviewsList from './Components/ReviewsList/ReviewsList';
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const styles = {
    root: {
        marginTop: '20px'
    }
}

const theme = createMuiTheme({
    body: {
        fontFamily: "'Bitter', serif",
        fontSize: "15px"
    },
    typography: {
      fontFamily: [
        "'Bitter', serif"
      ].join(","),
    },
    label: {
      fontSize: "22px"
    },
    textField: {
      fontFamily: "'Bitter', serif",
      fontSize: "15px",
    },
    overrides: {
      MuiInputBase: {
        input: {
          fontFamily: "'Bitter', serif",
          fontSize: "12px"
        },
      },
      fieldset: {
        fontFamily: "'Bitter', serif",
        fontSize: "12px"
      },
      span: {
        fontFamily: "'Bitter', serif"
    },
    },
  });

class App extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
            <Container className={classes.root}>
                <Grid container>
                    <Grid item md={4}>
                        <ReviewForm />
                        <ReviewsList />
                    </Grid>
                </Grid>
            </Container>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles)(App)
