import { Component } from '@angular/core';
import { FormModel } from './shared/form-renderer/form-renderer/form-model';

@Component({
  selector: 'z-root',
  template: `
  <z-form-renderer [config]="config"></z-form-renderer>
  <router-outlet></router-outlet>`
})
export class AppComponent {
  config: FormModel[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      value: 'Rami'
    },
    {
      disabled: true,
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];
}
