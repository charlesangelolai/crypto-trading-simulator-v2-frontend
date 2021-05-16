import React from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";
import Title from "./Title";

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  accountContext: {
    flex: 1,
  },
});

const AccountInfo = ({ user }: { user: any }) => {
  const classes = useStyles();

  const calculateWalletValue = () => {
    return user.positions.reduce(
      (prevVal: any, currentVal: any) => {
        return {
          cost: parseFloat(prevVal.cost) + parseFloat(currentVal.cost),
        };
      },
      { cost: 0.0 }
    );
  };

  return (
    <React.Fragment>
      <Title>Account Info</Title>
      <Typography component="p" variant="h5">
        $
        {user.positions &&
          calculateWalletValue().cost.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
      </Typography>
      <Typography color="textSecondary" className={classes.accountContext}>
        Wallet Value
      </Typography>
      <Typography component="p" variant="h5">
        $
        {parseFloat(user.balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
      <Typography color="textSecondary" className={classes.accountContext}>
        Buying Power
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Withdraw
        </Link>
        {" | "}
        <Link color="primary" href="#" onClick={preventDefault}>
          Deposit
        </Link>
      </div> */}
    </React.Fragment>
  );
};

export default AccountInfo;