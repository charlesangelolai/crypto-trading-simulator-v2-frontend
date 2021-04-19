import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Title from "./Title";
import TransactionForm from "./TransactionForm";
import { fetchChart, getUserPositions } from "../actions";

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
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
}));

const WalletList = ({ coins }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.positions.positions);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(getUserPositions(user.id));
  }, []);

  const handleClick = (e) => {
    dispatch(fetchChart(e.target.id));
  };

  const calculateMarketValue = (id, qty) => {
    return coins.find((c) => c.id === id).current_price * qty;
  };

  return (
    <React.Fragment>
      <Title>CTS Wallet</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Total Investment</TableCell>
            <TableCell>Market Value</TableCell>
            <TableCell>Return</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position, idx) => (
            <TableRow key={idx}>
              <TableCell className={classes.coin}>
                <img src={position.logo} className={classes.logo}></img>{" "}
                {position.coin_name}
                <IconButton id={position.coin_id} onClick={handleClick}>
                  <ShowChartIcon id={position.coin_id} />
                </IconButton>
              </TableCell>
              <TableCell>{position.symbol.toUpperCase()}</TableCell>
              <TableCell>{position.qty}</TableCell>
              <TableCell>
                $
                {parseFloat(position.cost).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                $
                {calculateMarketValue(
                  position.coin_id,
                  position.qty
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                <span
                  className={
                    calculateMarketValue(position.coin_id, position.qty) -
                      position.cost >
                    0.0
                      ? classes.green
                      : classes.red
                  }
                >
                  $
                  {(
                    calculateMarketValue(position.coin_id, position.qty) -
                    position.cost
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </TableCell>
              <TableCell align="right">
                <TransactionForm
                  transaction_type={"Sell"}
                  id={position.id}
                  name={position.coin_name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default WalletList;
