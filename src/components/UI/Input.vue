<template>
  <div class="relative">
    <div class="flex items-center">
      <input
        type="number"
        id="phone"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        :placeholder="props.placeholder"
      />
      <span
        v-if="!props.currency"
        class="absolute right-3 text-gray-500 dark:text-gray-400"
      >
        {{ currency }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped></style>
