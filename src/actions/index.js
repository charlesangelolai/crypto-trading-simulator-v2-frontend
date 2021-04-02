import Axios from "axios";

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
