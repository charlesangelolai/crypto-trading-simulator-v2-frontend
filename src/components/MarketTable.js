import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Title from "./Title";
import TransactionForm from "./TransactionForm";
import { fetchChart, fetchCoins } from "../actions";

const useStyles = makeStyles((theme) => ({
  loader: {
    margin: "auto",
    display: "flex",
    position: "relative",
    justiftContent: "center",
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

// const CounterButton = () => {
//   const [count, setCount] = useState(0);
//   return <Button onClick={() => setCount(count + 1)}>{count}</Button>;
// };

const MarketList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMarketLoading = useSelector((state) => state.market.loading);
  const coins = useSelector((state) => state.market.coins);

  const handleClick = (e) => {
    dispatch(fetchChart(e.target.id));
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  if (isMarketLoading) {
    return <CircularProgress disableShrink className={classes.loader} />;
  }

  return (
    <React.Fragment>
      <Title>Market Table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Change (24h)</TableCell>
            <TableCell>High (24h)</TableCell>
            <TableCell>Low (24h)</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin, idx) => (
            <TableRow key={idx}>
              <TableCell>{coin.market_cap_rank}</TableCell>
              <TableCell className={classes.coin}>
                <img src={coin.image} className={classes.logo}></img>{" "}
                {coin.name}
                <IconButton id={coin.id} onClick={handleClick}>
                  <ShowChartIcon id={coin.id} />
                </IconButton>
              </TableCell>
              <TableCell>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell>
                $
                {coin.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                <span
                  className={
                    coin.market_cap_change_percentage_24h > 0.0
                      ? classes.green
                      : classes.red
                  }
                >
                  {coin.market_cap_change_percentage_24h.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell>
                $
                {coin.high_24h.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                $
                {coin.low_24h.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell align="right">
                <TransactionForm
                  transaction_type={"Buy"}
                  id={coin.id}
                  name={coin.name}
                />
                {/* <CounterButton /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default MarketList;
