import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoverLetterService } from './cover-letter.service';
import { CoverLetter } from './cover-letter';
import { PaginatedResult } from '@lib/pagination';

describe('CoverLetterService', () => {
  let service: CoverLetterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoverLetterService],
    });

    service = TestBed.inject(CoverLetterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    it('should get all cover letters', () => {
      const resultData: any[] = [
        { id: 1, title: 'CL 1', description: 'description cl 1' },
        { id: 2, title: 'CL 2', description: 'description cl 2' },
        { id: 3, title: 'CL 3', description: 'description cl 3' },
      ];

      const parseHttpResponseData: PaginatedResult<CoverLetter> = {
        data: resultData,
        pageSize: 15,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        totalCount: 10,
        isEmpty: false,
      };

      service.getAll(1).subscribe((data) => {
        expect(data).toEqual(parseHttpResponseData);
      });

      const req = httpMock.expectOne('/api/cover_letters.json?page=1');
      expect(req.request.method).toEqual('GET');

      req.flush(parseHttpResponseData);
      httpMock.verify();
    });
  });

  describe('#create', () => {
    it('should be able to create cover letter', () => {
      const newCoverLetter: CoverLetter = {
        title: 'new cover letter',
        content: 'some cover letter description',
      };

      const savedCoverLetter: CoverLetter = { ...newCoverLetter, id: 1 };

      service.create(newCoverLetter).subscribe((coverLetter) => {
        expect(coverLetter.id).not.toBeNull();
      });

      const req = httpMock.expectOne('/api/cover_letters.json');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ cover_letter: newCoverLetter });

      req.flush(savedCoverLetter);
      httpMock.verify();
    });
  });
});
