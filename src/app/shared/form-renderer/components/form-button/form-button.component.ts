import { Component } from '@angular/core';
import { FieldModel, ComponentConfig } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-form-button',
   template: `

  <ng-container [ngSwitch]="config.type">
    <button *ngSwitchCase="'submit'" class="btn btn-primary" [type]="config.type"> {{ config.label }} </button>
    <button *ngSwitchCase="'cancel'" (click)="goBack($event)" class="btn btn-default">Cancel</button>
     
  </ng-container>
  `,
   host: {
      ['class']: 'form-button'
   }
})
export class FormButtonComponent implements ComponentConfig {
   group: FormGroup;
   config: FieldModel;

   goBack($event: Event): void {
     $event.preventDefault();
     console.log('Back pressed');
   }
}
