<script setup lang="ts">
import { formFields1, initialFormValues1 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { onMounted, ref } from 'vue';
import { cancelForm, submitForm } from '@/helpers/formHandlers.ts'

const initialFormValues = ref<IFormValues>(initialFormValues1);
const formFields = ref(formFields1);

let initialValuesCopy: IFormValues;

onMounted(() => {
  initialValuesCopy = JSON.parse(JSON.stringify(initialFormValues.value));
});

const handleSubmit = (formValues: IFormValues) => {
  submitForm(formValues);
};

const handleCancel = () => {
  cancelForm(initialFormValues, initialValuesCopy);
};
</script>

<template>
  <section class="page">
    <router-link class="link" to="/">⬅&#32;Назад</router-link>
    <FormGenerator
      :fields="formFields"
      v-model="initialFormValues"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #subscribe-label>
        <label class="page__label">Подписаться на рассылку</label>
      </template>
      <template #subscribe="{ field }">
        <input
          v-model="initialFormValues.subscribe"
          :type="field.attributes?.type"
          class="page__custom-checkbox"
        />
      </template>
    </FormGenerator>
  </section>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: start;
  align-items: center;

  &__custom-checkbox {
    appearance: none;
    position: relative;
    width: 32px;
    height: 32px;
    background: #296db1;
    box-shadow: inset 0 0 5px rgb(0 0 0 / 0.2);
    border-radius: 3px;
    border: 1px solid #ffffff;
    transition: 500ms;
    display: flex;

    &::after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      font-size: 32px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30' viewBox='0 -960 960 960' width='30' stroke='%23FFFFFF' stroke-width='30' fill='%23FFFFFF'%3E%3Cpath d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      transition: 500ms;
    }

    &:checked::after {
      width: 32px;
      height: 32px;
      transition: 500ms;
    }
  }

  &__label {
    font-weight: 500;
    font-size: 20px;
    line-height: normal;
    color: #020617;
    margin-top: 5px;
    margin-right: 60px;
  }
}
</style>
