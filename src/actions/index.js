import axios from "axios";

// User Actions
export const signUp = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
      const resp = await axios.post("/users", body, config);

      dispatch({
        type: "SIGN_UP",
        payload: resp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Chart Actions
export const fetchChart = (coinID = "bitcoin") => {
  return async (dispatch) => {
    dispatch({
      type: "LOADING",
    });

    const coinData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    const chartData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=30&interval=daily`
    );

    dispatch({
      type: "FETCH_COIN_DATA",
      payload: coinData.data[0],
    });

    dispatch({
      type: "FETCH_CHART_DATA",
      payload: chartData.data.prices,
    });
  };
};

// Wallet Table Actions
export const getUserPositions = (userID) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.get(`/users/${userID}`);

      dispatch({
        type: "GET_USER_POSITIONS",
        payload: resp.data.positions,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const sellCoin = (user, coin, position, qty) => {
  // check for max qty
  qty = position.qty - qty > 0 ? position.qty - qty : qty + position.qty - qty;
  // calculate price per coin
  let pricePerCoin = parseFloat(position.cost) / position.qty;
  // calculate new cost
  let cost = position.cost - pricePerCoin * qty;
  // calculate new qty
  let newQty = position.qty - qty;
  // calculate new user balance
  let newBalance = parseFloat(user.balance) + coin.current_price * qty;

  let tradeParams = {
    trade: {
      coin_id: coin.id,
      coin_name: coin.name,
      logo: coin.image,
      symbol: coin.symbol,
      transaction_type: "SELL",
      qty: qty,
      cost: cost,
      user_id: user.id,
    },
  };

  let positionParams = {
    position: {
      qty: newQty,
      cost: cost,
    },
  };

  let userParams = {
    user: {
      balance: newBalance,
    },
  };

  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tradeBody = JSON.stringify(tradeParams);
    const positionBody = JSON.stringify(positionParams);
    const userBody = JSON.stringify(userParams);

    try {
      const tradeResp = await axios.post("/trades", tradeBody, config);
      console.log(tradeResp.data);

      dispatch({
        type: "BUY_COIN",
        payload: tradeResp.data,
      });

      if (newQty > 0) {
        // patch
        const positionResp = await axios.patch(
          `/positions/${position.id}`,
          positionBody,
          config
        );
        const positionPayload = [positionResp.data].concat(
          user.positions.filter(
            (position) => position.id !== positionResp.data.id
          )
        );

        dispatch({
          type: "PATCH_POSITIONS",
          payload: positionPayload,
        });
      } else {
        // delete
        await axios.delete(`/positions/${position.id}`);

        dispatch({
          type: "DELETE_POSITION",
          payload: user.positions.filter((p) => p.id !== position.id),
        });
      }

      const userResp = await axios.patch(`/users/${user.id}`, userBody, config);
      console.log(userResp.data);

      dispatch({
        type: "UPDATE_USER",
        payload: userResp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Market Table Actions
export const fetchCoins = () => {
  return async (dispatch) => {
    const resp = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    dispatch({
      type: "FETCH_COINS",
      payload: resp.data,
    });
  };
};

export const buyCoin = (user, coin, qty) => {
  // calculate cost
  let cost = coin.current_price * qty;
  // update user balance
  let newBalance = parseFloat(user.balance) - cost;

  let tradeParams = {
    trade: {
      coin_id: coin.id,
      coin_name: coin.name,
      logo: coin.image,
      symbol: coin.symbol,
      transaction_type: "BUY",
      qty: qty,
      cost: cost,
      user_id: user.id,
    },
  };

  let positionParams = {
    position: {
      coin_id: coin.id,
      coin_name: coin.name,
      logo: coin.image,
      symbol: coin.symbol,
      qty: qty,
      cost: cost,
      user_id: user.id,
    },
  };

  let userParams = {
    user: {
      balance: newBalance,
    },
  };

  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tradeBody = JSON.stringify(tradeParams);
    const positionBody = JSON.stringify(positionParams);
    const userBody = JSON.stringify(userParams);

    try {
      const tradeResp = await axios.post("/trades", tradeBody, config);
      console.log(tradeResp.data);

      const positionResp = await axios.post("/positions", positionBody, config);
      console.log(positionResp.data);

      const userResp = await axios.patch(`/users/${user.id}`, userBody, config);
      console.log(userResp.data);

      dispatch({
        type: "BUY_COIN",
        payload: tradeResp.data,
      });

      dispatch({
        type: "POST_POSITION",
        payload: positionResp.data,
      });

      dispatch({
        type: "UPDATE_USER",
        payload: userResp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
