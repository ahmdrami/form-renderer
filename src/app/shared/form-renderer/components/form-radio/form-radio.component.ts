import { Component, OnInit } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-form-radio',
   template: `
   <div class="form-group" [formGroup]="group">
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
   styles: []
})
export class FormRadioComponent implements Field {
   group: FormGroup;
   config: FormModel;

}
