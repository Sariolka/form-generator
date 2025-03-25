<script setup lang="ts">
import { formFields3, initialFormValues3 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { onMounted, ref } from 'vue';

const initialFormValues = ref<IFormValues>(initialFormValues3);
const formFields = ref(formFields3);

let initialValuesCopy: IFormValues;

onMounted(() => {
  initialValuesCopy = JSON.parse(JSON.stringify(initialFormValues.value));
});

const submitForm = (formValues: IFormValues) => {
  console.log('submit:', formValues);
  cancelForm();
};

const cancelForm = () => {
  initialFormValues.value = JSON.parse(JSON.stringify(initialValuesCopy));
  console.log('cancel');
};
</script>

<template>
  <section class="page-2">
    <router-link class="link" to="/">⬅&#32;Назад</router-link>
    <div class="page-2__container">
      <FormGenerator
        class="page-2__form"
        :fields="formFields"
        v-model="initialFormValues"
        @submit="submitForm"
        @cancel="cancelForm"
      >
      </FormGenerator>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-2 {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: start;
  align-items: center;

  &__form {
    width: 100%;
  }

  &__container {
    width: 500px;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #292929;
  }
}
</style>
