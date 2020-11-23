import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { toSnakeCase } from '@lib/util';
import { CoverLetter } from '@core/models';
import { ApiService } from '@app/@core/services';

@Injectable()
export class CoverLetterApiService extends ApiService<CoverLetter> {
  baseUrl = '/api/cover_letters';

  constructor(protected http: HttpClient) {
    super(http);
  }

  sendEmail(coverLetterId: number, emailForm: any): Observable<any> {
    const snakeEmailForm = toSnakeCase(emailForm);
    const formData = new FormData();

    for (const key of Object.keys(snakeEmailForm)) {
      const value = snakeEmailForm[key];
      formData.append(`cover_letter_email_form[${key}]`, value);
    }

    return this.http.post<any>(this.apiUrl(`/${coverLetterId}/send_email`), formData);
  }

  protected beforeSendRequest(coverLetter: CoverLetter): any {
    return { coverLetter: super.beforeSendRequest(coverLetter) };
  }
}
