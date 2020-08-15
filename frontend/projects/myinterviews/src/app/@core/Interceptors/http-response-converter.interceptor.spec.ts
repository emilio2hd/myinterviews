import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Data } from '@angular/router';
import { HttpResponseConverterInterceptor } from './http-response-converter.interceptor';

describe('HttpResponseConverterInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseConverterInterceptor, multi: true },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('on GET request', () => {
    it('should convert to camel case', () => {
      const testUrl = '/api/v1/some-endpoint';
      const originalBody: Data = { client_name: 'Test Data' };
      const expectedBody: Data = { clientName: 'Test Data' };

      httpClient.get<Data>(testUrl).subscribe((data) => {
        expect(data).toEqual(expectedBody);
      });

      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(originalBody);

      httpTestingController.verify();
    });
  });

  describe('on GET request and has header to keep original body', () => {
    it('should not convert to camel case', () => {
      const httpOptions = {
        headers: new HttpHeaders({ 'x-keep-original-body': '' }),
      };

      const testUrl = '/api/v1/some-endpoint';
      const originalBody: Data = { client_name: 'Test Data' };

      httpClient.get<Data>(testUrl, httpOptions).subscribe((data) => {
        expect(data).toEqual(originalBody);
      });

      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(originalBody);

      httpTestingController.verify();
    });
  });
});
