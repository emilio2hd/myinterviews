import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFormComponent } from './form.component';

describe('InterviewFormComponent', () => {
  let component: InterviewFormComponent;
  let fixture: ComponentFixture<InterviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
