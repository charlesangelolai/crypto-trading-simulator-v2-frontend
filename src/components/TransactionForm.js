import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { buyCoin } from "../actions";

const TransactionForm = ({ coin_id, coin_name }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const coins = useSelector((state) => state.market.coins);
  console.log(coins);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coinData = coins.find((coin) => coin.id === e.target.qty.id);

    dispatch(buyCoin(user, coinData, e.target.qty.value));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Buy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Buy {coin_name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id={coin_id}
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
              Buy
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
