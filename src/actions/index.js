import Axios from "axios";

// Market Actions
export const fetchCoins = () => {
  return async (dispatch, getState) => {
    const resp = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    console.log(resp.data);

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

    const coinData = await Axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    const chartData = await Axios.get(
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

// Trade Actions

// Wallet Actions

// User Actions
