import { FormGroup, ValidatorFn } from '@angular/forms';

export interface FormModel {
  disabled?: boolean;
  control: string;
  type: string;
  label: string;
  id: string;
  placeholder?: string;
  validations?: ValidatorFn[];
  options?: any[];
}

export interface Field {
  group: FormGroup;
  config: FormModel;
}
