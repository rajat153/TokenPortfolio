import { createSlice } from "@reduxjs/toolkit";

const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const dataSlice = createSlice({
  name: "tokenData",
  initialState: {
    tokenData: null,
    watchlist: savedWatchlist,
  },
  reducers: {
    getData: (state, action) => {
      const newData = action.payload;
      state.tokenData = newData.map((t) => {
        const existing = state.watchlist?.find((x) => x.id === t.id);

        if (existing) {
          return {
            ...t,
            holdings: existing.holdings,
            value: existing.holdings * t.current_price,
            checked: existing.checked,
          };
        } else {
          return {
            ...t,
            holdings: 0,
            value: 0,
            checked: false,
          };
        }
      });

      state.watchlist = state.watchlist.map((item) => {
        const token = state.tokenData.find((t) => t.id === item.id);
        if (token) {
          const holdings = item.holdings || 0;
          return {
            ...item,
            value: holdings * token.current_price,
            last_updated: token.last_updated,
          };
        }
      });
    },
    addToWatchlist: (state) => {
      const checkedTokens = state.tokenData.filter((t) => t.checked);
      checkedTokens.forEach((token) => {
        const exists = state.watchlist.find((w) => w.id === token.id);

        if (!exists) {
          state.watchlist.push({
            ...token,
          });
        }
      });
      state.watchlist = state.watchlist.filter((w) =>
        checkedTokens.some((t) => t.id === w.id)
      );
    },

    setChecked: (state, action) => {
      const { id, checked } = action.payload;
      const token = state.tokenData.find((t) => t.id === id);
      if (token) {
        token.checked = checked;
      }
    },

    setHolding: (state, action) => {
      const { id, holdings } = action.payload;
      const tokenIndex = state.watchlist.findIndex((t) => t.id === id);
      if (tokenIndex !== -1) {
        const token = state.watchlist[tokenIndex];

        state.watchlist[tokenIndex] = {
          ...token,
          holdings,
          value: holdings * token.current_price,
        };
      }
    },

    loadWatchlist: (state, action) => {
      state.watchlist = action.payload || [];
    },
  },
});

export const {
  getData,
  addToWatchlist,
  setHolding,
  loadWatchlist,
  setChecked,
} = dataSlice.actions;
export default dataSlice.reducer;
