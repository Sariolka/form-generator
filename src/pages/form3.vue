<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formFields2, initialFormValues2 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { cancelForm, submitForm } from '@/helpers/formHandlers.ts'

const initialFormValues = ref<IFormValues>(initialFormValues2);
const formFields = ref(formFields2);

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
  <section class="page-3">
    <router-link class="link" to="/">⬅&#32;Назад</router-link>
    <div class="page-3__form">
      <h1 class="page-3__title">Cообщить о проблеме</h1>
      <FormGenerator
        :fields="formFields"
        v-model="initialFormValues"
        @submit="handleSubmit"
        @cancel="handleCancel"
      >
        <template #name-label="{ field }">
          <label class="page-3__label">{{field.label}}</label>
        </template>
        <template #name="{ field }">
          <input
            v-model="initialFormValues.name"
            :type="field.attributes?.type"
            class="page-3__input"
          />
        </template>
        <template #phone-label="{ field }">
          <label class="page-3__label">{{field.label}}</label>
        </template>
        <template #phone="{ field }">
          <input
            v-model="initialFormValues.phone"
            :type="field.attributes?.phone"
            class="page-3__input"
            :placeholder="field.attributes?.placeholder"
          />
        </template>
        <template #help-label="{ field }">
          <label class="page-3__label">{{field.label}}</label>
        </template>
        <template #help="{ field }">
          <textarea
            v-model="initialFormValues.help"
            class="page-3__input page-3__input_type-textarea"
            :rows="field.attributes?.rows"
            :maxlength="field.attributes?.maxlength"
          />
        </template>
        <template #select-label="{ field }">
          <label class="page-3__label">{{field.label}}</label>
        </template>
        <template #select="{ field }">
          <div class="select-wrapper">
            <select v-model="initialFormValues.select" class="page-3__input">
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </template>
        <template #subscribe-label="{ field }">
          <label class="page-3__label">{{field.label}}</label>
        </template>
      </FormGenerator>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-3 {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #153042;
    width: 450px;
    padding: 50px 50px 30px 50px;
    border-radius: 10px;
  }

  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 40px;
    color: #f5f5f5;
  }

  &__input {
    padding: 7px 30px 7px 10px;
    border-radius: 6px;
    align-items: center;
    border: 1px solid #f1f8ff;
    background-color: #f1f8ff;
    outline: transparent;

    &_type-textarea {
      resize: none;
    }
  }

  &__label {
    color: #f5f5f5;
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    white-space: nowrap;
  }

  :deep(.form-generator__btn) {
    background-color: #f1f8ff;
    color: #020617;
  }
}
</style>
