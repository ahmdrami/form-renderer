import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel } from './form-schema';
import { FormService } from '../../form.service';
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

   constructor(private formService: FormService) {}

   ngOnInit() {
      this.form = this.formService.createGroup(this.config, this.formData);
      console.log(this.config);
      console.log(this.form);
   }

   printValues(): void {
      console.log(this.form.value);
   }
}
