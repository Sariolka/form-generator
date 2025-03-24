<script setup lang="ts">
import { formFields1, initialFormValues1 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { onMounted, ref } from 'vue';

const initialFormValues = ref<IFormValues>(initialFormValues1);
const formFields = ref(formFields1);

let initialValuesCopy: IFormValues;

onMounted(() => {
  initialValuesCopy = JSON.parse(JSON.stringify(initialFormValues.value));
});
const submitForm = (formValues: IFormValues) => {
  console.log('submit:', formValues);
};

const cancelForm = () => {
  initialFormValues.value = JSON.parse(JSON.stringify(initialValuesCopy));
  console.log('cancel');
};
</script>

<template>
  <section class="page">
    <FormGenerator
      :fields="formFields"
      v-model="initialFormValues"
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
  </section>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
