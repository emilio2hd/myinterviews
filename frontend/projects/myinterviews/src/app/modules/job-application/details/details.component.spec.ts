import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationDetailsComponent } from './details.component';

xdescribe('JobApplicationDetailsComponent', () => {
  let component: JobApplicationDetailsComponent;
  let fixture: ComponentFixture<JobApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplicationDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
