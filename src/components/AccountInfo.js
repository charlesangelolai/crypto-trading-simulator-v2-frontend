import React from "react";
import { useSelector } from "react-redux";
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

const AccountInfo = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user.userData);

  return (
    <React.Fragment>
      <Title>Account Info</Title>
      <Typography component="p" variant="h5">
        $0.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Wallet Value
      </Typography>
      <Typography component="p" variant="h5">
        $
        {parseFloat(user.balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
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
};

export default AccountInfo;
