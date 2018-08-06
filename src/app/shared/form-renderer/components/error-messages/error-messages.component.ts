import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FieldModel } from '../../form-renderer/form-schema';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { CustomValidatorService } from '../../validators/custom-validator.service';
import { mapAsyncValidators } from '../../validators/set.validator';

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
   constructor(private errorSvc: ErrorService, private cd: ChangeDetectorRef, private customValidService: CustomValidatorService) {}

   ngOnInit() {
      if (this.config.validations) {

        const asyncValidators = this.config.validations.filter( ({ type }) => type === 'async');
        if (asyncValidators) {
          this.group.controls[this.config.id].setAsyncValidators(mapAsyncValidators(asyncValidators, this.customValidService));
        }
         const control = this.group.controls[this.config.id];
         this.subscriber = control.valueChanges.pipe(
          debounceTime(500),
          ).subscribe(() => {
            this.errors = this.errorSvc.mapErrors(control.errors, this.config.validations);
            this.cd.detectChanges();
         });
      }
   }
   ngOnDestroy() {
      this.subscriber.unsubscribe();
   }
}
