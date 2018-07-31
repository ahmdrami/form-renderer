import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormButtonComponent } from './form-button.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FieldModel } from '../../form-renderer/form-schema';
import { By } from '@angular/platform-browser';

describe('Form Button Component', () => {
   let config: FieldModel;
   let component: FormButtonComponent;
   let fixture: ComponentFixture<FormButtonComponent>;
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [ReactiveFormsModule],
         declarations: [FormButtonComponent]
      });

      config = {
         id: 'submit',
         type: 'submit',
         control: 'button',
         label: 'Submit'
      };


      fixture = TestBed.createComponent(FormButtonComponent);
      component = fixture.componentInstance;
      
   });

   it('should create a component with a button', () => {
      component.group = new FormGroup({});
      component.config = config;

      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button'));
      expect(btn.nativeElement.textContent).toContain(config.label);
   });
});
