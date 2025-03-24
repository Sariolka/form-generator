<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormProps, IFormValues } from '@/types/types.ts';
import { onMounted, ref } from 'vue';

const formFields = ref<IFormProps>({
  name: {
    type: 'input',
    label: 'Имя',
    attributes: {
      type: 'text',
      required: true,
    },
  },
  email: {
    type: 'input',
    label: 'Email',
    attributes: {
      type: 'email',
      required: true,
    },
  },
  subscribe: {
    type: 'checkbox',
    label: 'Подписаться на рассылку',
  },
  select: {
    type: 'select',
    label: 'Пол',
    options: [
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
      { value: 'other', label: 'Другой' },
    ],
    attributes: {
      required: true,
    },
  },
});

const initialFormValues = {
  name: '555',
  email: '454545',
  select: 'female',
  subscribe: true,
};

const formValues = ref<IFormValues>(initialFormValues);
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
  <section class="page">
    <FormGenerator
      :fields="formFields"
      v-model="formValues"
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
.transform {
  border-color: red;
}
</style>
