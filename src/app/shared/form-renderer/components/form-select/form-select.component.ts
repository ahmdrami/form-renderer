import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../../form-renderer/form-model';

@Component({
  selector: '[z-form-select]',
  template: `
    <div [formGroup]="group">
      <label></label>
      <select [formControlName]="config.name">
        <option value=""> {{ config.placeholder }}</option>
        <option *ngFor="let option of config.options"> {{ option }}</option>
      </select>
      </div>
  `,
  styles: []
})
export class FormSelectComponent implements Field {
  config: FormModel;
  group: FormGroup;
}
