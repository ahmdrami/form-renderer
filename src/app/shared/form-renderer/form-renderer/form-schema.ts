import { FormGroup, ValidatorFn } from '@angular/forms';


export interface SectionModel {
  id: string;
  fields: FieldModel[];
  config: SectionConfigModel;
  type: string;
}

interface SectionConfigModel {
  collapsible?: boolean;
  cols: string;
  title: string;
  bgColor?: string;
}

export interface FieldModel {
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
  config?: FieldConfigModel;
}


export interface ComponentConfig {
  group: FormGroup;
  config: FieldModel | SectionModel;
}

// 
interface FieldConfigModel {
  maxDate: string;
  minDate: string;
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
