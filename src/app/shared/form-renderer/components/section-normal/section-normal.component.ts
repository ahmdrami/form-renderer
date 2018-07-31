import { Component, HostBinding, OnInit } from '@angular/core';
import { ComponentConfig, FieldModel, SectionModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-section-normal',
   template: `
    <h3> {{ config.config?.title }} </h3>
    <section class="section" [style.grid-template-columns]="config?.config?.cols">
      <ng-template *ngFor="let field of config.fields" zDynamicField [config]="field" [group]="group">
        
      </ng-template>
    </section>
  `,
   styles: [
      `  
         :host {
            display: block;
            padding: 1em;
            border-radius: 5px;
         }

         .section {
            display: grid;
            grid-gap: 1em;
         }

         h3 {
            margin-bottom: 1em;
         }
      `
   ]
})
export class SectionNormalComponent implements ComponentConfig, OnInit {
   group: FormGroup;
   config: SectionModel;
   
   @HostBinding('style.background-color') bgColor: string;

   ngOnInit() {
      this.config.config.cols = this.config ? `1fr `.repeat(+this.config.config.cols) : '1fr';
      this.bgColor = this.config ? this.config.config.bgColor : 'transparent';
   }
}
