import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'z-section-normal',
   template: `
   <section>
      <ng-template *ngFor="let field of config" zDynamicField [config]="field" [group]="form"></ng-template>
   </section>
  `,
   styles: []
})
export class SectionNormalComponent implements OnInit {
   config;
   form;
   constructor() {}

   ngOnInit() {}
}
