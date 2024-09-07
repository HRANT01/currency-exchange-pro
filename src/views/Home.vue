<template>
  <DefaultLayout>
    <div class="overflow-hidden">
      <CurrencyList :currencies="rates" />
    </div>
    <div></div>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import CurrencyList from "../components/currencyList.vue";

const store = useStore();

const selectedCurrency = computed(() => store.getters.getSelectedCurrency);
const rates = computed(() => store.getters.getExchangeRates);

onMounted(async () => {
  await store.dispatch("A_fetchExchangeRates", selectedCurrency.value);
});
</script>

<style scoped></style>
