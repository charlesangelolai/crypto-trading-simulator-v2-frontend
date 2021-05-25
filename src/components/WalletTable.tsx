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
  IconButton,
  InputBase,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Title from "./Title";
import TransactionForm from "./TransactionForm";
import { fetchChart, getUserPositions } from "../actions";
import { RootState } from "../reducers/combineReducer";

// interface ICoin {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap: number;
//   market_cap_rank: number;
//   fully_diluted_valuation: number;
//   total_volume: number;
//   high_24h: number;
//   low_24h: number;
//   price_change_24h: number;
//   price_change_percentage_24h: number;
//   market_cap_change_24h: number;
//   market_cap_change_percentage_24h: number;
//   circulating_supply: number;
//   total_supply: number;
//   max_supply: number;
//   ath: number;
//   ath_change_percentage: number;
//   ath_date: string;
//   atl: number;
//   atl_change_percentage: number;
//   atl_date: string;
//   roi: any;
//   last_updated: string;
// }

interface IPosition {
  id: number;
  coin_id: string;
  coin_name: string;
  logo: string;
  symbol: string;
  qty: number;
  cost: string | number;
  user_id: number;
  created_at: string;
  updated_at: string;
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
  loader: {
    margin: "auto",
    display: "flex",
    position: "relative",
    justiftContent: "center",
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

const WalletList = ({ coins }: { coins: any }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const positions = useSelector(
    (state: RootState) => state.positions.positions
  );
  const user = useSelector((state: RootState) => state.user.userData);
  const isLoading = useSelector((state: RootState) => state.market.loading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUserPositions(user.id));
  }, [dispatch, user.id]);

  const handleClick = (e: any) => {
    dispatch(fetchChart(e.target.id));
  };

  const calculateMarketValue = (id: number, qty: any) => {
    return coins.find((c: any): any => c.id === id).current_price * qty;
  };

  if (isLoading) {
    return <CircularProgress disableShrink className={classes.loader} />;
  } else {
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.title}>
            <Title>CTS Wallet</Title>
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
            {positions
              .filter((val: IPosition) => {
                if (search === "") {
                  return val;
                } else if (
                  val.coin_name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((position: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className={classes.coin}>
                    <img
                      src={position.logo}
                      className={classes.logo}
                      alt={position.coin_id}
                    ></img>{" "}
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
  }
};

export default WalletList;
