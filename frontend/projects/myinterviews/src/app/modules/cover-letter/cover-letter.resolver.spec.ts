import { Router, convertToParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { CoverLetterResolver } from './cover-letter.resolver';
import { CoverLetterService } from './cover-letter.service';

describe('CoverLetterResolver', () => {
  const coverLetterId = 1;
  const route = {
    paramMap: convertToParamMap({ id: `${coverLetterId}` }),
  } as ActivatedRouteSnapshot;

  const coverLetter = {
    id: coverLetterId,
    title: 'Cover letter title',
    description: 'cover letter description',
  };

  let resolver: CoverLetterResolver;
  let coverLetterServiceSpy: jasmine.SpyObj<CoverLetterService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    coverLetterServiceSpy = jasmine.createSpyObj('CoverLetterServiceSpy', ['findById']);
    routerSpy = jasmine.createSpyObj('RouterSpy', ['navigateByUrl']);

    resolver = new CoverLetterResolver(coverLetterServiceSpy, routerSpy);
  });

  describe('when sucessfully resolve', () => {
    beforeEach(() => {
      coverLetterServiceSpy.findById.and.returnValue(of(coverLetter));
    });

    it('should contain cover letter description', () => {
      resolver.resolve(route).subscribe((resolved) => expect(resolved).toEqual(coverLetter));
      expect(coverLetterServiceSpy.findById).toHaveBeenCalledWith(coverLetterId);
    });
  });

  describe('when service returns 404 status', () => {
    beforeEach(() => {
      const httpResponseErro = new HttpErrorResponse({ status: 404 });
      coverLetterServiceSpy.findById.and.returnValue(throwError(httpResponseErro));
    });

    it('should redirect to page /not-found', () => {
      resolver.resolve(route).subscribe(() => fail('it should not get here'));

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/not-found');
    });
  });

  describe('when service throws other error rather http', () => {
    const genericError = new Error('oops!');

    beforeEach(() => {
      coverLetterServiceSpy.findById.and.returnValue(throwError(genericError));
    });

    it('should bubble up the error', () => {
      resolver.resolve(route).subscribe({
        next: () => fail('it should not get here'),
        error: (error) => expect(error).toEqual(genericError),
      });

      expect(routerSpy.navigateByUrl).not.toHaveBeenCalledWith('/not-found');
    });
  });
});
