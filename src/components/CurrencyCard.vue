<template>
  <div
    class="bg-blue-200 text-black flex items-center p-1 w-[200px] m-auto justify-center font-bold rounded"
  >
    <div class="flex items-center space-x-1">
      <span class="text-base">{{ selectedCurrency }}</span>
      <span class="text-base">=</span>
      <span class="text-base">{{ props.rateValue }}</span>

      <span class="text-base">{{ props.currency }}</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const props = defineProps({
  currency: {
    type: String,
    required: true,
  },
  rateValue: {
    type: [String, Number],
    required: true,
  },
});

const store = useStore();
const selectedCurrency = computed(() => store.getters.getSelectedCurrency);
</script>

<style scoped>
.bg-blue-200 {
  padding: 1rem;
}

.text-base {
  font-size: 1rem;
}
</style>
