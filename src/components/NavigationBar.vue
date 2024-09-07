<template>
  <div
    class="w-full bg-blue-700 text-white min-h-12 flex items-center justify-between"
  >
    <div class="ml-5 p-3 flex items-center">
      <Icon name="coins" />
      <span class="text-2xl ml-1">Currency Exchange Pro</span>
    </div>
    <div class="p-3 flex gap-7 items-center font-bold">
      <div
        :class="[
          'cursor-pointer rounded-2xl p-3',
          isActive('/')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-blue-400 text-gray-300',
        ]"
      >
        <router-link to="/">Home</router-link>
      </div>
      <div
        :class="[
          'cursor-pointer rounded-2xl p-3',
          isActive('/convert')
            ? 'bg-blue-500 text-white'
            : 'hover:bg-blue-400 text-gray-300',
        ]"
      >
        <router-link to="/convert">Convert</router-link>
      </div>
    </div>
    <div class="ml-5 p-3 flex items-center font-bold">
      <span class="text-md mb-1 mr-4">Choose Main Currency</span>

      <Dropdown
        :options="dropdownOptions"
        :selectedCurrency="selectedCurrency"
        @currencyChanged="currencyChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Icon from "../components/UI/Icon.vue";
import Dropdown from "./UI/Dropdown.vue";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const dropdownOptions = ["RUB", "USD", "EUR"];

const selectedCurrency = computed(() => store.getters.getSelectedCurrency);

const currencyChange = (option) => {
  store.dispatch("A_fetchExchangeRates", option);
  store.dispatch("A_setSelectedCurrency", option);
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped></style>
