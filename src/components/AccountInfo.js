import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AccountInfo() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Account Info</Title>
      <Typography component="p" variant="h5">
        $13,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Wallet Value
      </Typography>
      <Typography component="p" variant="h5">
        $3,037.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Buying Power
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Withdraw
        </Link>
        {" | "}
        <Link color="primary" href="#" onClick={preventDefault}>
          Deposit
        </Link>
      </div>
    </React.Fragment>
  );
}
