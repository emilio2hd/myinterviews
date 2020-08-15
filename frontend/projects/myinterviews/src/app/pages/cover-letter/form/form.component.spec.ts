import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { CKEditorModule } from 'ckeditor4-angular';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { IconsProviderModule } from '../../../icons-provider.module';

import { CoverLetterFormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { CoverLetterService } from '../cover-letter.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CoverLetterFormComponent', () => {
  const coverLetter = {
    title: 'Cover letter title',
    content: 'Cover letter description',
  };

  let component: CoverLetterFormComponent;
  let fixture: ComponentFixture<CoverLetterFormComponent>;
  let coverLetterServiceSpy: jasmine.SpyObj<CoverLetterService>;
  let notificationServiceSpy: jasmine.SpyObj<NzNotificationService>;
  let router: Router;
  let routeStub: ActivatedRouteStub;

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();
    coverLetterServiceSpy = jasmine.createSpyObj('CoverLetterServiceSpy', ['create']);
    notificationServiceSpy = jasmine.createSpyObj('NzNotificationServiceSpy', ['create']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        IconsProviderModule,
        CKEditorModule,
        DemoNgZorroAntdModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: CoverLetterService, useValue: coverLetterServiceSpy },
        { provide: NzNotificationService, useValue: notificationServiceSpy },
      ],
      declarations: [CoverLetterFormComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverLetterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with submit a valid form', () => {
    let saveButton: DebugElement;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      component.coverLetterForm.patchValue(coverLetter);

      fixture.detectChanges();

      saveButton = fixture.debugElement.query(By.css('[data-test-id="saveButton"]'));
      coverLetterServiceSpy.create.and.returnValue(of({ ...coverLetter, id: 1 }));
      navigateSpy = spyOn(router, 'navigate');

      saveButton.nativeElement.click();
    });

    it('should save cover letter', () => {
      expect(coverLetterServiceSpy.create).toHaveBeenCalledWith(coverLetter);
    });

    it('should display success notification', () => {
      expect(notificationServiceSpy.create).toHaveBeenCalledWith(
        'success',
        'Cover Letter',
        `"${coverLetter.title}" successfully created`
      );
    });

    it('should retirect to list', () => {
      expect(navigateSpy).toHaveBeenCalledWith(['..'], { relativeTo: routeStub });
    });
  });

  describe('with submit and gets an error', () => {
    let saveButton: DebugElement;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      component.coverLetterForm.patchValue(coverLetter);

      fixture.detectChanges();

      saveButton = fixture.debugElement.query(By.css('[data-test-id="saveButton"]'));
      coverLetterServiceSpy.create.and.returnValue(throwError(new Error('oops!')));
      navigateSpy = spyOn(router, 'navigate');

      saveButton.nativeElement.click();
    });

    it('should display error notification and should not redirect', () => {
      expect(notificationServiceSpy.create).toHaveBeenCalledWith(
        'error',
        'Cover Letter',
        `Uh-oh! Something wrong has happened. Unable to save "${coverLetter.title}"`
      );

      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
