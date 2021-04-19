import React, { useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { getUserTrades } from "../actions";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  logo: {
    width: 30,
    height: 30,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  coin: {
    alignItems: "center",
    display: "flex",
  },
}));

const TransactionsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);

  // useEffect(() => {
  //   dispatch(getUserTrades(user.id));
  // }, []);

  return (
    <React.Fragment>
      <Title>Transactions Table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, idx) => (
            <TableRow key={idx}>
              <TableCell className={classes.coin}>
                <img src={trade.logo} className={classes.logo}></img>{" "}
                {trade.coin_name}
              </TableCell>
              <TableCell>{trade.symbol.toUpperCase()}</TableCell>
              <TableCell>{trade.transaction_type}</TableCell>
              <TableCell>{trade.qty}</TableCell>
              <TableCell>
                $
                {parseFloat(trade.cost).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default TransactionsList;
