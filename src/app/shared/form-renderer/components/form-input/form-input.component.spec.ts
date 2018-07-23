import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent } from './form-input.component';
import { FormModel } from '../../form-renderer/form-schema';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormInputComponent', () => {
   let component: FormInputComponent;
   let fixture: ComponentFixture<FormInputComponent>;
   let config: FormModel;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormInputComponent],
         schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(FormInputComponent);
      component = fixture.componentInstance;

      config = {
         id: 'name',
         type: 'text',
         control: 'input',
         label: 'First Name',
         placeholder: ''
      };
   }));

   it('should create an input field with type text', () => {
      component.group = new FormGroup({
         name: new FormControl()
      });
      component.config = config;
      fixture.detectChanges();
      const inputType = fixture.debugElement.query(By.css('input')).nativeElement.attributes as NamedNodeMap;
      expect(inputType.getNamedItem('type').value).toEqual('text');
   });

   
   it('should create an input field with type email', () => {
      component.group = new FormGroup({
         email: new FormControl()
      });
      const newConfig = {
         id: 'email',
         type: 'email'
      };
      component.config = { ...config, ...newConfig};
      fixture.detectChanges();
      const inputType = fixture.debugElement.query(By.css('input')).nativeElement.attributes as NamedNodeMap;
      expect(inputType.getNamedItem('type').value).toEqual('email');
   });
});
