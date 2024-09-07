<template>
  <div class="relative inline-block text-left min-w-24">
    <button
      @click="toggleDropdown"
      class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blue-400 hover:text-black focus:ring-offset-gray-100 outline-none"
    >
      {{ selectedCurrency || "Main Currency" }}
      <Icon name="arrowDown" />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow max-h-60 overflow-y-auto min-w-fit-content"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li v-for="(option, index) in options" :key="index">
          <a
            @click="selectOption(option)"
            href="#"
            class="block px-4 py-2 rounded hover:bg-blue-400 hover:text-white"
          >
            {{ option }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Icon from "../UI/Icon.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  options: {
    type: [Array, Object],
    required: true,
  },
  selectedCurrency: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["currency-changed"]);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("currency-changed", option);
  isOpen.value = false;
};
</script>

<style scoped>
.min-w-fit-content {
  min-width: fit-content;
}
</style>
