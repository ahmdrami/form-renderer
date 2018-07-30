import { Component, OnInit } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-form-textarea',
   template: `
      <div [formGroup]="group" class="form-field">
        <label> {{ config.label }}</label>
         <textarea
            [placeholder]="config.placeholder"
            class="form-control"
            [formControlName]="config.id">
         </textarea>
      </div>
  `,
   host: {
      ['class']: 'form-field'
   }
})
export class FormTextareaComponent implements Field {
   group: FormGroup;
   config: FormModel;
}
