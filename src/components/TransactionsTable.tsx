import React, { useEffect, useState } from "react";
import {
  makeStyles,
  fade,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
// import { getUserTrades } from "../actions";

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
  coin: {
    alignItems: "center",
    display: "flex",
  },
}));

const TransactionsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trades = useSelector((state: any) => state.trades.trades);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   dispatch(getUserTrades(user.id));
  // }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.title}>
          <Title>Transactions Table</Title>
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
            <TableCell>Transaction Type</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades
            .filter((val: any) => {
              if (search === "") {
                return val;
              } else if (
                val.coin_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((trade: any, idx: number) => (
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
