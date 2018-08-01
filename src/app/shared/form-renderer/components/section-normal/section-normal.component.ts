import { Component, HostBinding, OnInit } from '@angular/core';
import { ComponentConfig, FieldModel, SectionModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
   selector: 'z-section-normal',
   template: `
      <h3 
         *ngIf="!config.config.collapsible, else accordion">  
         {{ config.config?.title }} 
      </h3>
      <ng-template #accordion> 
         <button class="accordion--button" (click)="handleToggle()">{{ config.config?.title }} 
            <z-chevron [height]="24" [width]="24" [collapsed]="toggle"></z-chevron>
         </button>  
      </ng-template>

      <section 
         [hidden]="config.config.collapsible && !toggle" 
         [@toggleState]="toggleStatee"
         class="accordion--content"  
         [style.grid-template-columns]="config?.config?.cols">
         <ng-template *ngFor="let field of config.fields" zDynamicField [config]="field" [group]="group"></ng-template>
      </section>
  `,
   styleUrls: ['./section-normal.component.scss'],
   animations: [
      trigger('toggleState', [
        state('inactive', style({
          height: 0
        })),
        state('active',   style({
          height: '*'
        })),
        transition('inactive <=> active', animate('.25s ease-in')),
      ])
    ]
})
export class SectionNormalComponent implements ComponentConfig, OnInit {
   group: FormGroup;
   config: SectionModel;
   toggle = false;
   toggleStatee = 'inactive';
   @HostBinding('style.background-color') bgColor: string;

   ngOnInit() {
      this.config.config.cols = this.config ? `1fr `.repeat(+this.config.config.cols) : '1fr';
      this.bgColor = this.config ? this.config.config.bgColor : 'transparent';
   }

   handleToggle(): void {
      this.toggle = !this.toggle;
      this.toggleStatee = 'inactive' ? 'active' : 'inactive';
   }
}
