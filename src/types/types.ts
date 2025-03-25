export interface IFormField {
  type: 'input' | 'select' | 'checkbox' | 'textarea';
  label: string;
  attributes?: Record<string, any>;
  options?: { value: any; label: string }[];
}

export interface IFormProps {
  [fieldName: string]: IFormField;
}

export interface IFormValues {
  [fieldName: string]: any;
}
