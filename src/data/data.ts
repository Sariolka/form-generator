import type { IFormProps } from '@/types/types.ts';
import { ref } from 'vue';

export const formFields1 = ref<IFormProps>({
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
    ],
    attributes: {
      required: true,
    },
  },
});

export const initialFormValues1 = {
  name: 'Peter',
  email: 'Parker',
  select: 'male',
  subscribe: true,
};
