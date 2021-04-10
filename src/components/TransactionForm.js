import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { buyCoin, sellCoin } from "../actions";

const TransactionForm = ({ transaction_type, id, name }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const coins = useSelector((state) => state.market.coins);
  // const positions = useSelector((state) => state.positions.positions);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.id === "Buy") {
      const coinData = coins.find((coin) => coin.id === e.target.qty.id);

      dispatch(buyCoin(user, coinData, e.target.qty.value));
    }

    if (e.target.id === "Sell") {
      const positionData = user.positions.find(
        (position) => position.id === parseInt(e.target.qty.id)
      );
      const currentCoinData = coins.find(
        (coin) => coin.id === positionData.coin_id
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
