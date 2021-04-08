import axios from "axios";

// Market Actions
export const fetchCoins = () => {
  return async (dispatch, getState) => {
    const resp = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    dispatch({
      type: "FETCH_COINS",
      payload: resp.data,
    });
  };
};

// Chart Actions
export const fetchChart = (coinID = "bitcoin") => {
  return async (dispatch, getState) => {
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

// Trade Actions
export const buyCoin = (user, coin, qty) => {
  // calculate cost
  let cost = coin.current_price * qty;
  // update user balance
  let newBalance = parseFloat(user.balance) - cost;

  debugger;

  let tradeParams = {
    trade: {
      coin_id: coin.id,
      logo: coin.image,
      sym: coin.symbol,
      transaction_type: "BUY",
      qty: qty,
      cost: cost,
      user_id: user.id,
    },
  };

  let positionParams = {
    position: {
      coin_id: coin.id,
      logo: coin.image,
      sym: coin.symbol,
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
        payload: userResp.payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Wallet Actions
