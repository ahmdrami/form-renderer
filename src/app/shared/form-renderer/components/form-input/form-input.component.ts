import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../../form-renderer/form-model';

@Component({
  selector: '[z-form-input]',
  template: `
    <div [formGroup]="group">
      <label> {{ config.label }} </label>
      <input
        type="text"
        [placeholder]="config.placeholder"
        [formControlName]="config.name"
        />
    </div>
  `,
  styles: []
})
export class FormInputComponent implements Field {
  @Input() group: FormGroup;
  config: FormModel;
}
