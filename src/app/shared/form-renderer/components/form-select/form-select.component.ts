import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field, OptionsModel, DynamicOptionModel } from '../../form-renderer/form-schema';
import { FormService } from '../../../form.service';
import { take } from 'rxjs/operators';
@Component({
   selector: '[z-form-select]',
   template: `
    <div [formGroup]="group" class="form-group">
      <label>{{ config.label }}</label>
      <select
         class="form-control"
         [formControlName]="config.id">
         <option value=""> {{ config.placeholder }}</option>
         <option *ngFor="let option of config.options" [value]="option.value"> {{ option.value }}</option>
      </select>
      {{ group.controls[config.id].valid }}
      </div>
  `,
   styles: []
})
export class FormSelectComponent implements Field, OnInit {
   config: FormModel;
   group: FormGroup;

   constructor(private formSvc: FormService) {}
   ngOnInit() {
     if (this.config.change && this.config.change.length > 0) {
      const id = this.config.change[0];
      const ctrl = this.group.get(id);
      ctrl.valueChanges.subscribe(value =>  
         this.formSvc.getOptionsData(`city?id=${value}`)
            .pipe(take(1))
            .subscribe((config: DynamicOptionModel) =>  this.config.options = config.options)
      );
     }
   }
}
