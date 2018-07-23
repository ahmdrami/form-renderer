import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FormModel } from '../../form-renderer/form-schema';
import { By } from '@angular/platform-browser';
import { FormSelectComponent } from './form-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormService } from '../../../form.service';

describe('FormSelectComponent', () => {
   const mockFormService = jasmine.createSpyObj(['getOptionsData']);
   let component: FormSelectComponent;
   let fixture: ComponentFixture<FormSelectComponent>;
   let config: FormModel;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormSelectComponent],
         providers: [
            {provide: FormService, useValue: mockFormService}
         ],
         schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FormSelectComponent);
      component = fixture.componentInstance;

      config = {
         id: 'country',
         type: 'text',
         control: 'select',
         label: 'Country',
         placeholder: 'Please select a country',
         options: [{ id: 1, value: 'England' }, { id: 2, value: 'Finland' }, { id: 3, value: 'Iceland' }]
      };

      component.config = config;
      component.group = new FormGroup({
         country: new FormControl()
      });

      fixture.detectChanges();
   });

   it('should create two radio fields', () => {
      const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;
      // 4 + the placeholder
      expect(selectEl.options.length).toBe(4);
   });
});
