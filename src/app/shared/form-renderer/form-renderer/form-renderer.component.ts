import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormModel } from './form-model';
@Component({
  selector: 'z-form-renderer',
  template: `
    <form [formGroup]="form" (ngSubmit)="printValues()">
      <ng-container *ngFor="let field of config" zDynamicField [config]="field" [group]="form">
      </ng-container>
    </form>
  `,
  styles: []
})
export class FormRendererComponent implements OnInit {
  @Input() config: FormModel[] = [];
  private form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  private createGroup(): FormGroup {
    const group = this.fb.group({});
    this.config
    .filter(({ type }) => type !== 'button')
    .forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  private createControl(config: FormModel): FormControl {
    const { disabled, validations, value } = config;
    return this.fb.control({ disabled, value }, validations);
  }

  printValues(): void {
    console.log(this.form.value);
  }
}
