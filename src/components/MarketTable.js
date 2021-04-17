import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import IconButton from "@material-ui/core/IconButton";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchChart, fetchCoins } from "../actions";
import TransactionForm from "./TransactionForm";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Pagination from "@material-ui/lab/Pagination";

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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination count={10} /> */}
    </React.Fragment>
  );
};

export default MarketList;
