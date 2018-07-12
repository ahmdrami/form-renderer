import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, ComponentRef, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormModel, Field } from '../form-renderer/form-model';
import { FormButtonComponent, FormInputComponent, FormSelectComponent } from '../';

const components: {[ type: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent
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
    const component = components[this.config.type];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
