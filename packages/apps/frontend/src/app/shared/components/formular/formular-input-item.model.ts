export interface FormularInputItem {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea';
  // | 'checkbox'
  // | 'radio'
  // | 'select'
  // | 'date';
  name: string;
  placeholder?: string;
  value?: string | number | boolean;
  options?: { label: string; value: string | number }[]; // For select, radio
  rows?: number; // For textarea
  cols?: number; // For textarea
  required?: boolean;
  disabled?: boolean;
}
