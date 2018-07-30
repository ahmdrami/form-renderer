import { Component, HostBinding } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-form-checkbox',
   template: `
   <div class="form-field" [formGroup]="group">
      <label> {{ config.label }} </label>
      <div class="custom-control custom-checkbox" 
         *ngFor="let option of group.controls[config.id].controls; let i = index">
         <input 
            type="checkbox" 
            class="custom-control-input" 
            [id]="config.id + i" 
            [formControl]="option"
            [checked]="config.options[i].checked"
            >
         <label class="custom-control-label" [for]="config.id + i"> {{ config.options[i].value }}</label>
      </div>
   </div>
  `,
  host: {
    ['class']: 'form-field'
  }
})
export class FormCheckboxComponent implements Field {
   group: FormGroup;
   config: FormModel;
   @HostBinding('class') fieldClass = 'form-field';


}
