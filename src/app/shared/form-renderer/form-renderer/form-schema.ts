import { FormGroup, ValidatorFn } from '@angular/forms';

export interface FormModel {
  readonly?: boolean;
  control: string;
  type: string;
  label: string;
  id: string;
  placeholder?: string;
  validations?: ValidatorFn;
  options?: OptionsModel[];
  bind?: string;
  bindUrl?: string;
}

export interface Field {
  group: FormGroup;
  config: FormModel;
}

export interface OptionsModel {
  id: number;
  value: string;
  checked?: boolean;
}

export interface DynamicOptionModel {
  id?: string;
  options: OptionsModel[];
}
