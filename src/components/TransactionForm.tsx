import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { buyCoin, sellCoin } from "../actions";
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

const TransactionForm = ({
  transaction_type,
  id,
  name,
}: {
  transaction_type: string;
  id: number;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);
  const coins = useSelector((state: RootState) => state.market.coins);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (e.target.id === "Buy") {
      const coinData = coins.find((coin: any) => coin.id === e.target.qty.id);

      dispatch(buyCoin(user, coinData, e.target.qty.value));
    }

    if (e.target.id === "Sell") {
      const positionData = user.positions.find(
        (position: IPosition) => position.id === parseInt(e.target.qty.id)
      );
      const currentCoinData = coins.find(
        (coin: ICoin) => coin.id === positionData.coin_id
      );

      dispatch(
        sellCoin(
          user,
          currentCoinData,
          positionData,
          parseInt(e.target.qty.value)
        )
      );
    }

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {transaction_type}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form id={transaction_type} onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            {transaction_type} {name}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id={id.toString()}
              name="qty"
              label="Enter Amount: "
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {transaction_type}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
