import { Component, HostBinding, OnInit } from '@angular/core';
import { Field, FormModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

let incr = 0;
@Component({
  selector: 'z-section-normal',
  template: `
    <ng-template *ngFor="let field of config.fields" zDynamicField [config]="field" [group]="group">
    </ng-template>
  `,
  styles: [`
    :host {
      display: grid;
      grid-gap: 1em;
    }
  `]
})
export class SectionNormalComponent implements Field, OnInit {
  group: FormGroup;
  config: FormModel;
  sectionNumber = incr++;
  @HostBinding('style.grid-template-columns') gridCols;
  
  
  ngOnInit() {
    this.gridCols = this.config ? `1fr `.repeat(this.config.cols) : '1fr';
  }
}
