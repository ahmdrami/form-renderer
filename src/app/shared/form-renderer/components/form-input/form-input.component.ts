import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel, ComponentConfig } from '../../form-renderer/form-schema';

@Component({
   selector: 'z-form-input',
   template: `
   <div [formGroup]="group" class="form-field">
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
   host: {
      ['class']: 'form-field'
   }
})
export class FormInputComponent implements ComponentConfig, OnInit {
   group: FormGroup;
   config: FieldModel;

   ngOnInit(): void {

      
   }
}
