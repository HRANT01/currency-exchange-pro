<template>
  <DefaultLayout>
    <div class="flex items-center justify-center h-full">
      <div
        class="flex flex-col w-[40%] h-auto p-6 bg-blue-500 mt-20 rounded-lg justify-center"
      >
        <span class="text-center mb-5 text-3xl font-bold text-white">
          Select Currencies To Convert
        </span>
        <div
          class="flex h-fit mb-11 items-center min-w-[80%] mx-auto justify-between gap-5 mt-5"
        >
          <Input
            class="w-[70%] m-auto"
            v-model="firstInputAmount"
            @input="handleFirstInput"
          />
          <Dropdown
            :options="currencyOptions"
            @currencyChanged="firstInputValueChanged"
            :selectedCurrency="firstInputValue"
          />
        </div>
        <div
          class="flex h-fit items-center min-w-[80%] mx-auto justify-between gap-5 pb-6"
        >
          <Input
            class="w-[70%] m-auto"
            v-model="secondInputAmount"
            @input="handleSecondInput"
          />
          <Dropdown
            :options="currencyOptions"
            @currencyChanged="secondInputValueChanged"
            :selectedCurrency="secondInputValue"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Input from "../components/UI/Input.vue";
import Dropdown from "../components/UI/Dropdown.vue";
import { useStore } from "vuex";

const store = useStore();

const currencyOptions = computed(() => {
  const exchangeRates = store.getters.getExchangeRates;
  return exchangeRates ? Object.keys(exchangeRates) : [];
});

const firstInputAmount = ref("");
const secondInputAmount = ref("");

const firstInputValue = computed(() => store.getters.getFirstInputValue);
const secondInputValue = computed(() => store.getters.getSecondInputValue);

const allRates = computed(() => store.getters.getExchangeRates);

const firstRate = computed(() => allRates.value[firstInputValue.value] || 1);
const secondRate = computed(() => allRates.value[secondInputValue.value] || 1);

const convertFromFirstInput = () => {
  if (firstRate.value && secondRate.value && firstInputAmount.value !== "") {
    const convertedAmount =
      (parseFloat(firstInputAmount.value) * secondRate.value) / firstRate.value;
    secondInputAmount.value = convertedAmount.toFixed(2);
  } else {
    secondInputAmount.value = "";
  }
};

const convertFromSecondInput = () => {
  if (firstRate.value && secondRate.value && secondInputAmount.value !== "") {
    const convertedAmount =
      (parseFloat(secondInputAmount.value) * firstRate.value) /
      secondRate.value;
    firstInputAmount.value = convertedAmount.toFixed(2);
  } else {
    firstInputAmount.value = "";
  }
};

const firstInputValueChanged = (option) => {
  store.dispatch("A_setFirstInputValue", option);
  firstInputAmount.value = "";
  secondInputAmount.value = "";
};

const secondInputValueChanged = (option) => {
  store.dispatch("A_setSecondInputValue", option);
  firstInputAmount.value = "";
  secondInputAmount.value = "";
};

const handleFirstInput = () => {
  if (firstInputAmount.value !== "" && !isNaN(firstInputAmount.value)) {
    convertFromFirstInput();
  } else {
    secondInputAmount.value = "";
  }
};

const handleSecondInput = () => {
  if (secondInputAmount.value !== "" && !isNaN(secondInputAmount.value)) {
    convertFromSecondInput();
  } else {
    firstInputAmount.value = "";
  }
};

const selectedCurrency = computed(() => store.getters.getSelectedCurrency);

onMounted(async () => {
  await store.dispatch("A_fetchExchangeRates", selectedCurrency.value);
});
</script>

<style scoped></style>
