import axios from "axios";

// User Actions
export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const userParams = {
    user: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    },
  };

  return async (dispatch: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(userParams);
    try {
      const resp = await axios.post("/users", body, config);

      dispatch({
        type: "SET_USER",
        payload: resp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userParams = {
    user: {
      email: email,
      password: password,
    },
  };

  return async (dispatch: any) => {
    try {
      const resp = await axios.post("/login", userParams, {
        withCredentials: true,
      });

      dispatch({
        type: "SET_USER",
        payload: resp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = ({
  id,
  firstName,
  lastName,
  email,
}: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const userParams = {
    user: {
      first_name: firstName,
      last_name: lastName,
      email: email,
    },
  };

  return async (dispatch: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(userParams);
    try {
      const resp = await axios.patch(`/users/${id}`, body, config);

      dispatch({
        type: "UPDATE_USER",
        payload: resp.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Chart Actions
export const fetchChart = (coinID = "bitcoin") => {
  return async (dispatch: any) => {
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
export const getUserPositions = (userID: number) => {
  return async (dispatch: any) => {
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

export const sellCoin = (user: any, coin: any, position: any, qty: number) => {
  // check for max qty
  qty = position.qty - qty > 0 ? qty : qty + (position.qty - qty);
  // calculate return
  let cost = coin.current_price * qty;
  // calculate new qty
  let newQty = position.qty - qty;
  // calculate new user balance
  let newBalance = parseFloat(user.balance) + cost;
  debugger;

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
  debugger;

  return async (dispatch: any) => {
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
            (position: any) => position.id !== positionResp.data.id
          )
        );
        debugger;

        dispatch({
          type: "PATCH_POSITIONS",
          payload: positionPayload,
        });
      } else {
        // delete
        await axios.delete(`/positions/${position.id}`);

        dispatch({
          type: "DELETE_POSITION",
          payload: user.positions.filter((p: any) => p.id !== position.id),
        });
      }

      const userResp = await axios.patch(`/users/${user.id}`, userBody, config);

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
  return async (dispatch: any) => {
    const resp = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    dispatch({
      type: "FETCH_COINS",
      payload: resp.data,
    });
  };
};

export const buyCoin = (user: any, coin: any, qty: number) => {
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

  return async (dispatch: any) => {
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
