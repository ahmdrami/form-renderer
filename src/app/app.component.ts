import { Component, OnInit } from '@angular/core';
import { FormModel } from './shared/form-renderer/form-renderer/form-schema';
import { FormService } from './shared/form.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
@Component({
   selector: 'z-root',
   template: `
  <z-jumbotron></z-jumbotron>
  <z-form-renderer *ngIf="config && formData" [config]="config" [formData]="formData"></z-form-renderer>
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
   config: FormModel[];
   formData: any;
   httpCalls;

   constructor(private formSvc: FormService) {}

   ngOnInit() {
      this.httpCalls = combineLatest(this.formSvc.getConfig(), this.formSvc.getFormData()).subscribe(([config, formData]) => {
         this.config = config;
         this.formData = formData;
      });
   }
}
