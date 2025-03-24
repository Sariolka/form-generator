<script setup lang="ts">
import type { IFormProps, IFormValues } from '@/types/types.ts';

const props = defineProps<{
  fields: IFormProps;
  modelValue: IFormValues;
}>();

const emit = defineEmits(['submit', 'cancel', 'update:modelValue']);

const getType = (type: string) => {
  switch (type) {
    case 'input':
      return 'input';
    case 'select':
      return 'select';
    case 'checkbox':
      return 'input';
    case 'textarea':
      return 'textarea';
    default:
      return 'input';
  }
};

const handleSubmit = () => {
  emit('submit', props.modelValue);
  console.log('Данные формы:', props.modelValue);
};

const handleCancel = () => {
  emit('cancel');
  console.log('Отмена');
};

const updateValue = (key: string, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>

<template>
  <form class="form-generator" @submit.prevent="handleSubmit" novalidate>
    <div
      v-for="[key, value] in Object.entries(props.fields)"
      :key="key"
      class="form-generator__field"
      :class="{ 'form-generator__field_type-checkbox': value.type === 'checkbox' }"
    >
      <slot :name="`${key}-label`">
        <label class="form-generator__label" :for="key">{{ value.label }}</label></slot
      >
      <slot :name="key" :field="value" :value="modelValue[key]" />
      <template v-if="value.type !== 'select'">
        <component
          class="form-generator__base-input"
          :is="getType(value.type)"
          :id="key"
          :value="props.modelValue[key]"
          :checked="value.type === 'checkbox' ? props.modelValue[key] : ''"
          @input="
            (event) =>
              updateValue(
                key,
                value.type === 'checkbox' ? event.target.checked : event.target.value,
              )
          "
          v-bind="value.attributes"
          :type="value.type"
      /></template>
      <template v-else>
        <div class="form-generator__select-wrapper">
          <component
            class="form-generator__base-input"
            :is="getType(value.type)"
            :id="key"
            :value="props.modelValue[key]"
            @input="
              (event) =>
                updateValue(
                  key,
                  value.type === 'checkbox' ? event.target.checked : event.target.value,
                )
            "
            v-bind="value.attributes"
          >
            <option v-for="option in value.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </component>
          <!--          <template v-if="value.type === 'select'">-->
        </div>
      </template>
    </div>
    <div class="form-generator__actions">
      <button type="button" @click="handleCancel">Отмена</button>
      <button type="submit">Сохранить</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
  max-width: 500px;
  width: max-content;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 1.5rem;

    &_type-checkbox {
      flex-direction: row;
      align-items: center;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: end;
    margin-top: 2.5rem;
  }

  &__base-input {
    width: 100%;
    border: 1px solid #2c3e50;
    outline: transparent;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    padding: 9px 8px 8px;
    border-radius: 4px;
  }

  &__label {
    color: #020617;
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
  }

  &__select-wrapper {
    position: relative;
    border: 1px solid #2c3e50;
    border-radius: 4px;

    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 3px);
      right: 15px;
      width: 18px;
      height: 8px;
      background-image: url('@/assets/icons/icon-dropdown.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }

    & select {
      width: 100%;
      height: 100%;
      background: transparent;
      border: 0;
      appearance: none; /* remove arrow        */
      -webkit-appearance: none; /* remove arrow Chrome */
      -moz-appearance: none; /* remove arrow FF     */
    }
    & select::-ms-expand {
      display: none; /* remove arrow IE     */
    }
  }
}
</style>
