import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../actions";
import TransactionForm from "./TransactionForm";
import CircularProgress from "@material-ui/core/CircularProgress";

function preventDefault(event) {
  event.preventDefault();
}

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
}));

const CoinsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.market.coins);
  const isLoading = useSelector((state) => state.market.loading);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  if (isLoading) {
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
            <TableCell>Change (1h)</TableCell>
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
              </TableCell>
              <TableCell>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell>${coin.current_price.toFixed(2)}</TableCell>
              <TableCell>
                {coin.market_cap_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.high_24h.toFixed(2)}</TableCell>
              <TableCell>${coin.low_24h.toFixed(2)}</TableCell>
              <TableCell align="right">
                <TransactionForm coin_id={coin.id} coin_name={coin.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default CoinsList;