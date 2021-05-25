import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  fade,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Title from "./Title";
import TransactionForm from "./TransactionForm";
import { fetchChart, fetchCoins } from "../actions";
import { RootState } from "../reducers/combineReducer";

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
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
  const isMarketLoading = useSelector(
    (state: RootState) => state.market.loading
  );
  const coins = useSelector((state: RootState) => state.market.coins);
  const [search, setSearch] = useState("");

  const handleClick = (e: any) => {
    dispatch(fetchChart(e.target.id));
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  if (isMarketLoading || coins === 0) {
    return <CircularProgress disableShrink className={classes.loader} />;
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.title}>
          <Title>Market Table</Title>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

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
          {coins
            .filter((val: ICoin) => {
              if (search === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((coin: any, idx: any) => (
              <TableRow key={idx}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell className={classes.coin}>
                  <img
                    src={coin.image}
                    className={classes.logo}
                    alt={coin.name}
                  ></img>{" "}
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
    </React.Fragment>
  );
};

export default MarketList;
