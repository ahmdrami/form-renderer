import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FormModel } from '../../form-renderer/form-schema';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Component({
   selector: 'z-error-messages',
   template: `
    <div class="error" *ngIf="group.get(config.id).invalid && (group.get(config.id).dirty || group.get(config.id).touched)">
      <div *ngFor="let error of errors">
         {{ error }}
      </div>
   </div>`,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessagesComponent implements OnInit, OnDestroy {
   @Input() group: FormGroup;
   @Input() config: FormModel;
   subscriber: Subscription;
   errors: string[];
   constructor(private errorSvc: ErrorService, private cd: ChangeDetectorRef) {}

   ngOnInit() {
      if (this.config.validations) {
         const control = this.group.controls[this.config.id];
         this.subscriber = control.valueChanges.pipe(debounceTime(300)).subscribe(() => {
            this.errors = this.errorSvc.mapErrors(control.errors, this.config.validations);
            this.cd.detectChanges();
         });
      }
   }
   ngOnDestroy() {
      this.subscriber.unsubscribe();
   }
}
