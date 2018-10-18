import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FormModel } from './form-schema';
@Component({
   selector: 'z-form-renderer',
   template: `
    <div class="container mt-5">
         <form [formGroup]="form" (ngSubmit)="printValues()">
            <ng-template *ngFor="let field of config" zDynamicField [config]="field" [group]="form">
         </ng-template>
      </form>
    </div>
  `,
   styles: []
})
export class FormRendererComponent implements OnInit {
   @Input() config: FormModel[] = [];
   @Input() formData: any;
   form: FormGroup;
   constructor(private fb: FormBuilder) {}

   ngOnInit() {
      console.log(this.config);
      this.form = this.createGroup();
   }

   private createGroup(): FormGroup {
      const group = this.fb.group({});
      this.config.filter(({ control }) => control !== 'button')
         .forEach(control => group.addControl(control.id, this.createControl(control)));
      return group;
   }

   private createControl(config: FormModel): FormControl | FormArray {
      return (config.type === 'checkbox') ? this.multiControl(config) : this.singleControl(config);
   }
   private singleControl(config: FormModel): FormControl {
      console.log(this.formData[config.id]);
      return this.fb.control(this.formData[config.id], config.validatorFns);
   }

   private multiControl(config: FormModel): FormArray {
      const savedOptions: string[] = this.formData[config.id];
      const arr = config.options.map(option => { 
         option.checked = savedOptions.indexOf(option.value) > -1 ? true : false; 
         return this.fb.control(option.checked); 
      });
      return this.fb.array(arr, config.validatorFns);
   }

   printValues(): void {
      console.log(this.form.controls);
   }
}
