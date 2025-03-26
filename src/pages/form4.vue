<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formFields2, initialFormValues2 } from '@/data/data.ts';
import FormGenerator from '@/components/FormGenerator.vue';
import type { IFormValues } from '@/types/types.ts';
import { getType } from '@/helpers/getType.ts';
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

const updateValue = (key: string, value: any) => {
  initialFormValues.value = { ...initialFormValues.value, [key]: value };
};

</script>

//попытка сделать динамический рендер
<template>
  <section class="page-3">
    <router-link class="link" to="/">⬅&#32;Назад</router-link>
    <div class="page-3__form">
      <h1 class="page-3__title">Cообщить о проблеме повторно</h1>
      <FormGenerator
        :fields="formFields"
        v-model="initialFormValues"
        @submit="handleSubmit"
        @cancel="handleCancel"
      >
        <template v-for="(field, key) in formFields" :key="key" #[key]>
          <!-- Можно стилизовать селект, тогда тоже делать условие и обертку -->
          <component
            :is="getType(field.type)"

            :placeholder="field.attributes?.placeholder"
            class="page-3__input"
            v-bind="field.attributes"
            :rows="field.attributes?.rows || undefined"
            :maxlength="field.attributes?.maxlength || undefined"
            :class="{'page-3__input_type-textarea': field.type === 'textarea'}"
            :type="field.attributes?.type"
            :value="initialFormValues[key]"
            :checked="field.attributes?.type === 'checkbox' ? initialFormValues[key] : undefined"
            @input="
            (event: any) =>
              updateValue(
                key + '',
                field.attributes?.type === 'checkbox' ? event.target.checked : event.target.value,
              )
          "
          >
            <template v-if="field.type === 'select'">
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </template>
          </component>
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
    background-color: #fff;
    padding: 50px;
    width: 470px;
    border: 1px solid #292929;
  }

  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 40px;
    text-align: center;
    color: #000;
  }

  &__input {
    padding: 7px 2px;
    border-radius: 6px;
    align-items: center;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    outline: transparent;
    width: 100%;

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
    background-color: #000;
    color: #fff;
  }
  :deep(.form-generator__btn_type-cancel) {
    background-color: #f5f5f5;
    color: #000;
  }
}
</style>
