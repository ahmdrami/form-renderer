import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { ErrorService } from './components/error-messages/error.service';
import { SectionNormalComponent } from './components/section-normal/section-normal.component';
import { FormDatepickerComponent } from './components/form-datepicker/form-datepicker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HtmlContentComponent } from './components/html-content/html-content.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ChevronComponent } from '../components/chevron/chevron.component';

const components = [
   FormInputComponent,
   FormSelectComponent,
   FormButtonComponent,
   FormTextareaComponent,
   FormCheckboxComponent,
   FormRadioComponent,
   SectionNormalComponent,
   FormDatepickerComponent,
   HtmlContentComponent
];
@NgModule({
   imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule.forRoot()],
   declarations: [FormRendererComponent, ...components, DynamicFieldDirective, ErrorMessagesComponent, SanitizePipe, ChevronComponent ],
   exports: [FormRendererComponent, ...components, DynamicFieldDirective],
   providers: [ErrorService],
   entryComponents: [...components]
})
export class FormRendererModule {}
