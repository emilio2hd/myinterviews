import { TestBed } from '@angular/core/testing';

import { InterviewApiService } from './interview.api.service';

xdescribe('InterviewService', () => {
  let service: InterviewApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
