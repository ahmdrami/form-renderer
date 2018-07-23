import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxComponent } from './form-checkbox.component';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { FormModel } from '../../form-renderer/form-schema';
import { By } from '@angular/platform-browser';

function multiControl(config: FormModel): FormArray {
   const savedOptions = ['Blue'];
   const arr = config.options.map(option => {
      option.checked = savedOptions.indexOf(option.value) > -1 ? true : false;
      return new FormControl(option.checked);
   });
   return new FormArray(arr, config.validations);
}

describe('FormCheckboxComponent', () => {
   let component: FormCheckboxComponent;
   let fixture: ComponentFixture<FormCheckboxComponent>;
   let config: FormModel;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormCheckboxComponent]
      });

      config = {
         id: 'colour',
         type: 'checkbox',
         control: 'checkbox',
         label: 'Favourite colour?',
         placeholder: '',
         options: [{ id: 1, value: 'Blue' }, { id: 2, value: 'Purple' }, { id: 3, value: 'Red' }]
      };

      fixture = TestBed.createComponent(FormCheckboxComponent);

      component = fixture.componentInstance;
      component.group = new FormGroup({
         colour: multiControl(config)
      });
      component.config = config;

      fixture.detectChanges();
   }));

   it('should create three checkboxes', () => {
      const inputEls = fixture.debugElement.queryAll(By.css('input'));
      expect(inputEls.length).toEqual(3);
   });

   it('should check the checkbox with Blue value to be checked', () => {
      const checkedInput = fixture.debugElement.query(By.css('label[for="colour0"]'));
      expect(checkedInput.nativeElement.textContent).toContain('Blue');
   });
});
