import type { IFormValues } from '@/types/types.ts';

export const submitForm = (formValues: IFormValues) => {
  console.log('submit:', formValues);
};

export const cancelForm = (initialFormValues: IFormValues, initialValuesCopy: IFormValues) => {
  initialFormValues.value = JSON.parse(JSON.stringify(initialValuesCopy));
  console.log('cancel');
};
