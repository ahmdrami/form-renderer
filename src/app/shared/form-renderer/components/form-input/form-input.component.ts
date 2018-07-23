import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../../form-renderer/form-schema';

@Component({
   selector: '[z-form-input]',
   template: `
   <div [formGroup]="group" class="form-group">
      <label> {{ config.label }} </label>
      <input
         class="form-control"
         [type]="config.type"
         [placeholder]="config.placeholder"
         [formControlName]="config.id"
         [readOnly]="config.readonly"
         />
      <z-error-messages [group]="group" [config]="config"></z-error-messages>
   </div>
  `,
   styles: []
})
export class FormInputComponent implements Field {
   @Input() group: FormGroup;
   config: FormModel;
}
