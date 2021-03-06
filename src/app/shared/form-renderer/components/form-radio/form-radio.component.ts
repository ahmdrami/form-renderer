import { Component, OnInit } from '@angular/core';
import { ComponentConfig, FieldModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-form-radio',
   template: `
   <div class="form-field" [formGroup]="group">
      <label>{{ config.label }}</label>
      <div class="custom-control custom-radio" 
         *ngFor="let option of config.options; let i = index">
         <input 
            type="radio" 
            class="custom-control-input" 
            [id]="config.id + i" 
            [formControlName]="config.id"
            [value]="config.options[i].value"
            >
         <label class="custom-control-label" [for]="config.id + i"> {{ config.options[i].value }}</label>
      </div>
   </div>
  `,
   host: {
      ['class']: 'form-field'
   }
})
export class FormRadioComponent implements ComponentConfig {
   fieldClass: string;
   group: FormGroup;
   config: FieldModel;
}
