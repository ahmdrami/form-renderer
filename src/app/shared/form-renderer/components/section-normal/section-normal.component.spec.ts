import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNormalComponent } from './section-normal.component';

describe('SectionNormalComponent', () => {
  let component: SectionNormalComponent;
  let fixture: ComponentFixture<SectionNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
