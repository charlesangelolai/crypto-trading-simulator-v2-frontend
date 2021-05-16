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
  const user = useSelector((state: any) => state.user.userData);
  const coins = useSelector((state: any) => state.market.coins);

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
        (position: any) => position.id === parseInt(e.target.qty.id)
      );
      const currentCoinData = coins.find(
        (coin: any) => coin.id === positionData.coin_id
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
