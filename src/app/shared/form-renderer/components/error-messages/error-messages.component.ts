import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FormModel } from '../../form-renderer/form-schema';

@Component({
   selector: 'z-error-messages',
   template: `
    <div class="error" *ngIf="group.get(config.id).invalid && (group.get(config.id).dirty || group.get(config.id).touched)">
      <div *ngIf="group.get(config.id).errors.required">
         is required.
      </div>
   </div>`
})
export class ErrorMessagesComponent implements OnInit {
   @Input() group: FormGroup;
   @Input() config: FormModel;

   constructor() {}

   ngOnInit() {}
}
