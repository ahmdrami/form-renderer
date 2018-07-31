import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldModel, ComponentConfig } from '../form-renderer/form-schema';
import { FormButtonComponent, FormInputComponent, FormSelectComponent } from '../';
import { FormTextareaComponent } from '../components/form-textarea/form-textarea.component';
import { FormCheckboxComponent } from '../components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../components/form-radio/form-radio.component';
import { SectionNormalComponent } from '../components/section-normal/section-normal.component';
import { FormDatepickerComponent } from '../components/form-datepicker/form-datepicker.component';

const components: { [type: string]: Type<ComponentConfig> } = {
   button: FormButtonComponent,
   input: FormInputComponent,
   select: FormSelectComponent,
   textarea: FormTextareaComponent,
   checkbox: FormCheckboxComponent,
   radio: FormRadioComponent,
   section: SectionNormalComponent,
   datepicker: FormDatepickerComponent
};

@Directive({
   selector: '[zDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
   @Input() config: FieldModel;
   @Input() group: FormGroup;

   component: ComponentRef<any>;
   constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

   ngOnInit() {
      // config.control = fields
      // config.type = sections
      const component = components[ this.config.control ? this.config.control : this.config.type ];
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
   }
}
