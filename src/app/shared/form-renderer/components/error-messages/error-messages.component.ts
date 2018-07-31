import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FieldModel } from '../../form-renderer/form-schema';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Component({
   selector: 'z-error-messages',
   template: `
    <div class="error" *ngIf="group.get(config.id).invalid && (group.get(config.id).dirty || group.get(config.id).touched)">
      <small *ngFor="let error of errors" class="form-text">
         {{ error }}
      </small>
   </div>`,
   changeDetection: ChangeDetectionStrategy.OnPush,
   styles: [ 
    `
      .error {
        color: #F44336;
      }
    ` 
   ]
})
export class ErrorMessagesComponent implements OnInit, OnDestroy {
   @Input() group: FormGroup;
   @Input() config: FieldModel;
   subscriber: Subscription;
   errors: string[];
   constructor(private errorSvc: ErrorService, private cd: ChangeDetectorRef) {}

   ngOnInit() {
      if (this.config.validations) {
         const control = this.group.controls[this.config.id];
         this.subscriber = control.valueChanges.pipe(debounceTime(500)).subscribe(() => {
            this.errors = this.errorSvc.mapErrors(control.errors, this.config.validations);
            this.cd.detectChanges();
         });
      }
   }
   ngOnDestroy() {
      this.subscriber.unsubscribe();
   }
}
