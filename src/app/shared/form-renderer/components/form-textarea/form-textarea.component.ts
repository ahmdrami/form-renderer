import { Component, OnInit } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';

@Component({
   selector: 'z-form-textarea',
   template: `
      <div [formGroup]="group" class="form-group">
         <textarea
            class="form-control"
            [formControlName]="config.id">
         </textarea>
      </div>
  `
})
export class FormTextareaComponent implements Field {
   group: FormGroup;
   config: FormModel;
}
