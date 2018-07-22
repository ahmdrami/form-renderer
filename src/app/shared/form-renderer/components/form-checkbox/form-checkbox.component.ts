import { Component, OnInit } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';

@Component({
   selector: 'z-form-checkbox',
   template: `
   <div class="form-group" [formGroup]="group">
      <div class="custom-control custom-checkbox" 
         *ngFor="let option of group.controls[config.id].controls; let i = index">
         <input type="checkbox" class="custom-control-input" [id]="config.id + i" [formControl]="option">
         <label class="custom-control-label" [for]="config.id + i"> {{ config.options[i].value }}</label>
      </div>
   </div>
  `
})
export class FormCheckboxComponent implements Field {
   group: FormGroup;
   config: FormModel;


}
