import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, ComponentRef, Type, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../form-renderer/form-schema';
import { FormButtonComponent, FormInputComponent, FormSelectComponent } from '../';
import { FormTextareaComponent } from '../components/form-textarea/form-textarea.component';
import { FormCheckboxComponent } from '../components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../components/form-radio/form-radio.component';
import { SectionNormalComponent } from '../components/section-normal/section-normal.component';
import { FormDatepickerComponent } from '../components/form-datepicker/form-datepicker.component';

const components: {[ type: string]: Type<Field>} = {
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
  @Input() config: FormModel;
  @Input() group: FormGroup;

  component: ComponentRef<any>;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnInit() {
    const component = components[this.config.control];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
