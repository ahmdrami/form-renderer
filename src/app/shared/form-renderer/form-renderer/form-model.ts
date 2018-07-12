import { FormGroup, ValidatorFn } from '@angular/forms';

export interface FormModel {
  disabled?: boolean;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  validations?: ValidatorFn[];
  options?: any[];
  value?: string;
}

export interface Field {
  group: FormGroup;
  config: FormModel;
}
