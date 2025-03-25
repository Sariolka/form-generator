<script setup lang="ts">
import type { IFormProps, IFormValues } from '@/types/types.ts';
import { useSlots } from 'vue';
import { getType } from '@/helpers/getType.ts';
const slots = useSlots();

const props = defineProps<{
  fields: IFormProps;
  modelValue: IFormValues;
}>();

const emit = defineEmits(['submit', 'cancel', 'update:modelValue']);

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
      :class="{ 'form-generator__field_type-checkbox': value.attributes?.type === 'checkbox' }"
    >
      <slot :name="`${key}-label`">
        <label class="form-generator__label" :for="key">{{ value.label }}</label>
      </slot>
      <slot :name="key" :field="value" :value="modelValue[key]" />
      <template v-if="value.type !== 'select'">
        <component
          v-if="!slots[key]"
          class="form-generator__base-input"
          :class="{
            'form-generator__base-input_type-checkbox': value.attributes?.type === 'checkbox',
          }"
          :is="getType(value.type)"
          :id="key"
          :value="props.modelValue[key]"
          :checked="value.attributes?.type === 'checkbox' ? props.modelValue[key] : ''"
          @input="
            (event: any) =>
              updateValue(
                key,
                value.attributes?.type === 'checkbox' ? event.target.checked : event.target.value,
              )
          "
          v-bind="value.attributes"
          :type="value.attributes?.type"
      /></template>
      <template v-else>
        <div class="select-wrapper" v-if="!slots[key]">
          <component
            class="form-generator__base-input"
            :is="getType(value.type)"
            :id="key"
            :value="props.modelValue[key]"
            @input="(event: any) => updateValue(key, event.target.value)"
            v-bind="value.attributes"
          >
            <option v-for="option in value.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </component>
        </div>
      </template>
    </div>
    <div class="form-generator__actions">
      <button
        type="button"
        @click="handleCancel"
        class="form-generator__btn form-generator__btn_type-cancel"
      >
        Отмена
      </button>
      <button type="submit" class="form-generator__btn">Сохранить</button>
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
      gap: 1rem;
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

    &_type-checkbox {
      padding: 0;
      width: 20px;
    }
  }

  &__label {
    color: #020617;
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    white-space: nowrap;
  }

  &__btn {
    padding: 8px 24px;
    gap: 6px;
    border: none;
    border-radius: 3px;
    background-color: #296db1;
    color: rgba(255, 255, 255, 1);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.3s ease;
    width: 100%;

    &_type-cancel {
      background-color: #5f6c78;
    }

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
