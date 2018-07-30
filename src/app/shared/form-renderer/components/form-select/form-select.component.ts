import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field, OptionsModel, DynamicOptionModel } from '../../form-renderer/form-schema';
import { FormService } from '../../../form.service';
import { take } from 'rxjs/operators';
@Component({
   selector: 'z-form-select',
   template: `
    <div [formGroup]="group" class="form-field">
      <label>{{ config.label }}</label>
      <select
         class="form-control"
         [formControlName]="config.id">
         <option value=""> {{ config.placeholder }}</option>
         <option *ngFor="let option of config.options" [value]="option.value"> {{ option.value }}</option>
      </select>
      <z-error-messages [group]="group" [config]="config"></z-error-messages>
      </div>
  `,
   host: {
      ['class']: 'form-field'
   }
})
export class FormSelectComponent implements Field, OnInit {
   config: FormModel;
   group: FormGroup;

   constructor(private formSvc: FormService) {}
   ngOnInit() {
      if (this.config.bind) {
         const id = this.config.bind;
         const ctrl = this.group.get(id);
         ctrl.valueChanges.subscribe(value => {
            if (value) {
               this.formSvc
                  .getOptionsData(`${this.config.bindUrl}?id=${value}`)
                  .pipe(take(1))
                  .subscribe((config: DynamicOptionModel) => (this.config.options = config.options));
            }
            this.config.options = [];
         });
      }
   }
}
