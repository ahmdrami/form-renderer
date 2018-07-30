import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAccordionComponent } from './section-accordion.component';

describe('SectionAccordionComponent', () => {
  let component: SectionAccordionComponent;
  let fixture: ComponentFixture<SectionAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
