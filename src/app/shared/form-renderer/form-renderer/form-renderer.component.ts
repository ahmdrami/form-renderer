import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FormModel } from './form-schema';
@Component({
   selector: 'z-form-renderer',
   template: `
    <div class="container mt-5">
         <form [formGroup]="form" (ngSubmit)="printValues()">
            <ng-container *ngFor="let field of config" zDynamicField [config]="field" [group]="form">
         </ng-container>
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
      const { disabled, validations } = config;
      console.log(this.formData[config.id]);
      return this.fb.control(this.formData[config.id], config.validations);
      // return this.fb.control({ disabled, '' }, validations);
   }

   private multiControl(config: FormModel): FormArray {
      const savedOptions: string[] = this.formData[config.id];
      const arr = config.options.map(option => { 
         option.checked = savedOptions.indexOf(option.value) > -1 ? true : false; 
         return this.fb.control(option.checked, config.validations); 
      });
      return this.fb.array(arr);
   }

   printValues(): void {
      console.log(this.form.controls);
   }
}