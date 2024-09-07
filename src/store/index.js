import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      exchangeRates: null,
      loading: false,
      error: null,
      selectedCurrency: "RUB",
      firstInputCurrency: "RUB",
      secondInputCurrency: "USD",
    };
  },
  actions: {
    async A_fetchExchangeRates({ commit }, currency) {
      commit("M_setLoading", true);
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/11d925531edc7ac18aca3bf3/latest/${currency}`
        );
        commit("M_setExchangeRates", response.data.conversion_rates);
      } catch (error) {
        commit("M_setError", error);
      } finally {
        commit("M_setLoading", false);
      }
    },
    A_setSelectedCurrency({ commit }, currency) {
      commit("M_setSelectedCurrency", currency);
    },
    A_setFirstInputValue({ commit }, currency) {
      commit("M_setFirstInputValue", currency);
    },
    A_setSecondInputValue({ commit }, currency) {
      commit("M_setSecondInputValue", currency);
    },
  },
  mutations: {
    M_setExchangeRates(state, rates) {
      state.exchangeRates = rates;
    },
    M_setLoading(state, loading) {
      state.loading = loading;
    },
    M_setError(state, error) {
      state.error = error;
    },
    M_setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency;
    },
    M_setFirstInputValue(state, currency) {
      state.firstInputCurrency = currency;
    },
    M_setSecondInputValue(state, currency) {
      state.secondInputCurrency = currency;
    },
  },
  getters: {
    getExchangeRates: (state) => state.exchangeRates,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getSelectedCurrency: (state) => state.selectedCurrency,
    getFirstInputValue: (state) => state.firstInputCurrency,
    getSecondInputValue: (state) => state.secondInputCurrency,
  },
});

export default store;
