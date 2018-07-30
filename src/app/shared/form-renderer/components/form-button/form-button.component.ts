import { Component, Input } from '@angular/core';
import { FormModel, Field } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'z-form-button',
  template: `
    <div [formGroup]="group" class="form-field">
      <button class="btn btn-primary" type="submit"> {{ config.label }}</button>
    </div>
  `,
  host: {
    ['class']: 'form-field'
  }
})
export class FormButtonComponent implements Field {
  @Input() group: FormGroup;
  config: FormModel;

}
