<script setup lang="ts">
import { formFields1, initialFormValues1 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { onMounted, ref } from 'vue';

const formValues = ref<IFormValues>(initialFormValues1);
let initialValuesCopy: IFormValues;

onMounted(() => {
  initialValuesCopy = JSON.parse(JSON.stringify(formValues.value));
});
const submitForm = (formValues: IFormValues) => {
  console.log('submit:', formValues);
};

const cancelForm = () => {
  formValues.value = JSON.parse(JSON.stringify(initialValuesCopy));
  console.log('cancel');
};
</script>

<template>
  <FormGenerator
    :fields="formFields1"
    v-model="initialFormValues1"
    @submit="submitForm"
    @cancel="cancelForm"
  >
    <!--      <template #email="{ field }">-->
    <!--        <input-->
    <!--          v-model="formValues.email"-->
    <!--          :type="field.attributes.type"-->
    <!--          class="transform"-->
    <!--        />-->
    <!--      </template>-->
  </FormGenerator>
</template>

<style scoped lang="scss"></style>
