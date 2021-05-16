import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "background.default",
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
  img: {
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        // spacing
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "85vh" }}
      >
        <Box className={classes.box}>
          <Container maxWidth="md">
            <Typography align="center" color="textPrimary" variant="h4">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Box className={classes.box}>
              <img
                className={classes.img}
                alt="Under development"
                src={process.env.PUBLIC_URL + "/undraw_page_not_found_su7k.svg"}
              />
            </Box>
          </Container>
        </Box>
      </Grid>
    </div>
  );
};

export default NotFound;
