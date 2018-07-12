import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';

const components = [FormInputComponent, FormSelectComponent, FormButtonComponent];
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormRendererComponent, ...components, DynamicFieldDirective],
  exports: [FormRendererComponent, ...components, DynamicFieldDirective],
  entryComponents: [...components]
})
export class FormRendererModule {}
