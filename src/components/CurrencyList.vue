<template>
  <div class="flex flex-wrap gap-4 p-3 w-[80%] justify-between m-auto">
    <div
      v-for="(value, currency) in props.currencies"
      :key="currency"
      class="flex-shrink-0"
    >
      <CurrencyCard :rateValue="value" :currency="currency" />
    </div>
  </div>
</template>

<script setup>
import CurrencyCard from "../components/currencyCard.vue";

const props = defineProps({
  currencies: {
    type: [Object, null],
    required: true,
  },
});
</script>

<style scoped></style>
