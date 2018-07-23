import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextareaComponent } from './form-textarea.component';
import { FormModel } from '../../form-renderer/form-schema';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormTextareaComponent', () => {
   let component: FormTextareaComponent;
   let fixture: ComponentFixture<FormTextareaComponent>;
   let config: FormModel;
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormTextareaComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FormTextareaComponent);
      component = fixture.componentInstance;

      config = {
         id: 'message',
         type: 'text',
         control: 'textarea',
         label: 'Message',
         placeholder: '',
      };

      component.config = config;
      component.group = new FormGroup({
         message: new FormControl()
      });
      fixture.detectChanges();
   });

   it('should create a textarea element', () => {
      const textareaEl = fixture.debugElement.query(By.css('textara'));
      expect(textareaEl).toBeDefined();
   });
});
