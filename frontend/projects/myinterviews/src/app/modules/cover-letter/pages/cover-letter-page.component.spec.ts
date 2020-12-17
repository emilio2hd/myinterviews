import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { DemoNgZorroAntdModule } from '@shared/ng-zorro-antd.module';
import { PaginatedResult } from '@lib/pagination';
import { CoverLetter } from '@core/models';

import { CoverLetterPageComponent } from './cover-letter-page.component';
import { CoverLetterApiService } from '../services';

xdescribe('ListComponent', () => {
  const resultData: any[] = [
    { id: 1, title: 'CL 1', description: 'description cl 1' },
    { id: 2, title: 'CL 2', description: 'description cl 2' },
    { id: 3, title: 'CL 3', description: 'description cl 3' },
    { id: 4, title: 'CL 4', description: 'description cl 4' },
  ];

  const coverLetters: PaginatedResult<CoverLetter> = {
    data: resultData,
    pageSize: 15,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalCount: resultData.length,
    isEmpty: false,
  };

  let component: CoverLetterPageComponent;
  let fixture: ComponentFixture<CoverLetterPageComponent>;
  let coverLetterServiceSpy: jasmine.SpyObj<CoverLetterApiService>;

  beforeEach(async(() => {
    coverLetterServiceSpy = jasmine.createSpyObj('CoverLetterService', ['getAll']);

    TestBed.configureTestingModule({
      imports: [DemoNgZorroAntdModule, RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      declarations: [CoverLetterPageComponent],
      providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: CoverLetterApiService, useValue: coverLetterServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    coverLetterServiceSpy.getPaginatedResults.and.returnValue(of(coverLetters));

    fixture = TestBed.createComponent(CoverLetterPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all cover letter', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const tableRows = bannerElement.querySelectorAll('tbody .ant-table-row');
    expect(tableRows.length).toEqual(resultData.length);
  });
});
