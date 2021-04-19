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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import Title from "./Title";
import TransactionForm from "./TransactionForm";
import { fetchChart, getUserPositions } from "../actions";

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
  const [search, setSearch] = useState("");

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
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.coin_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((position, idx) => (
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
