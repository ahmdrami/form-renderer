import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioComponent } from './form-radio.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormModel } from '../../form-renderer/form-schema';
import { By } from '@angular/platform-browser';

describe('FormRadioComponent', () => {
   let component: FormRadioComponent;
   let fixture: ComponentFixture<FormRadioComponent>;
   let config: FormModel;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormRadioComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FormRadioComponent);
      component = fixture.componentInstance;

      config = {
         id: 'gender',
         type: 'radio',
         control: 'radio',
         label: 'Gender',
         placeholder: '',
         options: [{ id: 1, value: 'male' }, { id: 2, value: 'female' }]
      };

      component.config = config;
      component.group = new FormGroup({
         gender: new FormControl()
      });

      fixture.detectChanges();
   });

   it('should create two radio fields', () => {
      const radioEls = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
      expect(radioEls.length).toBe(2);
   });
});
