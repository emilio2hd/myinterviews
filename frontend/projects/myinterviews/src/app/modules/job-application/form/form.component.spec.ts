import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationFormComponent } from './form.component';

describe('JobApplicationFormComponent', () => {
  let component: JobApplicationFormComponent;
  let fixture: ComponentFixture<JobApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplicationFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
