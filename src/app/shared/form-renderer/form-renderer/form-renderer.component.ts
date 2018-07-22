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
      return config.options ? this.multiControl(config) : this.singleControl(config);
   }
   private singleControl(config: FormModel): FormControl {
      const { disabled, validations } = config;
      return this.fb.control(this.formData[config.id]);
      // return this.fb.control({ disabled, '' }, validations);
   }

   private multiControl(config: FormModel): FormArray {
      const arr = config.options.map(option => (this.fb.control('')));
      // const { disabled, validations } = config;
      return this.fb.array(arr);
      // return this.fb.control({ disabled, '' }, validations);
   }

   printValues(): void {
      console.log(this.form.value);
   }
}
