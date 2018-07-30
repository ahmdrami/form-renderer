import { FormGroup, ValidatorFn } from '@angular/forms';
import { HostBinding } from '@angular/core';


export interface FormModel {
  readonly?: boolean;
  control: string;
  type: string;
  label: string;
  id: string;
  placeholder?: string;
  validations?: string[];
  validatorFns?: ValidatorFn;
  options?: OptionsModel[];
  bind?: string;
  bindUrl?: string;
  fields?: FormModel[];
  cols?: number;
  config?: { [key: string]: string };
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
