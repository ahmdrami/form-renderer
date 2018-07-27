import { Component } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'z-section-normal',
  template: `
    <section>
      <ng-template *ngFor="let field of config.fields" zDynamicField [config]="field" [group]="group">
      </ng-template>
    </section>
  `,
  styles: []
})
export class SectionNormalComponent implements Field {
  group: FormGroup;
  config: FormModel;

  constructor() { }


}
