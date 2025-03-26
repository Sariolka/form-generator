import type { IFormProps } from '@/types/types.ts';
import { ref } from 'vue';

export const formFields1 = ref<IFormProps>({
  name: {
    type: 'input',
    label: 'Имя',
    attributes: {
      type: 'text',
    },
  },
  email: {
    type: 'input',
    label: 'Email',
    attributes: {
      type: 'email',
    },
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
  subscribe: {
    type: 'input',
    label: 'Подписаться на рассылку',
    attributes: {
      type: 'checkbox',
    },
  },
});

export const initialFormValues1 = {
  name: 'Peter',
  email: 'parker@mail.ru',
  select: 'male',
  subscribe: true,
};

export const formFields2 = ref<IFormProps>({
  name: {
    type: 'input',
    label: 'Ваше имя',
    attributes: {
      type: 'text',
    },
  },
  phone: {
    type: 'input',
    label: 'Контактный номер',
    attributes: {
      type: 'tel',
      placeholder: '+7(999)999-99-99',
    },
  },
  select: {
    type: 'select',
    label: 'Выберите категорию ошибки',
    options: [
      { value: 'server', label: 'Ошибка сервера' },
      { value: 'not_found', label: 'Не найдено' },
      { value: 'timeout', label: 'Тайм-аут' },
      { value: 'permission', label: 'Ошибка доступа' },
      { value: 'unknown', label: 'Неизвестная ошибка' },
    ],
  },
  help: {
    type: 'textarea',
    label: 'Опишите проблему',
    attributes: {
      type: 'textarea',
      rows: 7,
      maxlength: 400,
    },
  },
  subscribe: {
    type: 'input',
    label: 'Согласен с обработкой данных',
    attributes: {
      type: 'checkbox',
    },
  },
});

export const initialFormValues2 = {
  name: '!',
  phone: '',
  help: '!!',
  subscribe: false,
  select: 'unknown',
};

export const formFields3 = ref<IFormProps>({
  firstName: {
    type: 'input',
    label: 'Имя',
    attributes: {
      type: 'text',
      placeholder: 'Введите ваше имя',
    },
  },
  lastName: {
    type: 'input',
    label: 'Фамилия',
    attributes: {
      type: 'text',
      placeholder: 'Введите вашу фамилию',
    },
  },
  email: {
    type: 'input',
    label: 'Ваш Email',
    attributes: {
      type: 'email',
      placeholder: 'example@domain.com',
    },
  },
  phone: {
    type: 'input',
    label: 'Телефон',
    attributes: {
      type: 'tel',
      placeholder: '+7 (999) 999-99-99',
    },
  },
  address: {
    type: 'input',
    label: 'Адрес',
    attributes: {
      type: 'text',
      placeholder: 'Улица, дом, квартира',
    },
  },
  country: {
    type: 'select',
    label: 'Страна проживания',
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'by', label: 'Беларусь' },
      { value: 'kz', label: 'Казахстан' },
      { value: 'ua', label: 'Украина' },
      { value: 'us', label: 'США' },
      { value: 'de', label: 'Германия' },
      { value: 'fr', label: 'Франция' },
      { value: 'cn', label: 'Китай' },
    ],
    attributes: {
      required: true,
    },
  },
  terms: {
    type: 'input',
    label: 'Согласен с условиями использования',
    attributes: {
      type: 'checkbox',
    },
  },
});
export const initialFormValues3 = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  country: 'fr',
  terms: false,
};
