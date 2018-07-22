import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../form-renderer/form-schema';
import { FormButtonComponent, FormInputComponent, FormSelectComponent } from '../';
import { FormTextareaComponent } from '../components/form-textarea/form-textarea.component';
import { FormCheckboxComponent } from '../components/form-checkbox/form-checkbox.component';

const components: {[ type: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  textarea: FormTextareaComponent,
  checkbox: FormCheckboxComponent
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
