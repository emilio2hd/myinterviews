import { TestBed } from '@angular/core/testing';

import { JobApplicationApiService } from './job-application.api.service';

xdescribe('JobApplicationService', () => {
  let service: JobApplicationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
