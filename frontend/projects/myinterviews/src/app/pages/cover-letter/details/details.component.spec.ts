import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { IconsProviderModule } from '../../../icons-provider.module';

import { CoverLetterDetailsComponent } from './details.component';
import { ActivatedRouteStub, click, Page } from '../../../../testing';
import { CoverLetterService } from '../cover-letter.service';
import { CoverLetter } from '../cover-letter';

class CoverLetterDetailsPage extends Page<CoverLetterDetailsComponent> {
  get deleteButton() {
    return this.queryByCss('[data-testid="btnDelete"]')?.nativeElement as HTMLButtonElement;
  }

  get title() {
    return this.queryByCss('[data-testid="coverLetterTitle"]')?.nativeElement as HTMLElement;
  }

  get description() {
    return this.queryByCss('[data-testid="coverLetterDescription"]')?.nativeElement as HTMLElement;
  }

  constructor(protected component: CoverLetterDetailsComponent, protected debugEl: DebugElement) {
    super(component, debugEl);
  }
}

class PopConfirmComponent {
  get popoverContainer() {
    return this.fixture.debugElement.query(By.css('.ant-popover-inner'));
  }

  get OkButton() {
    return this.popoverContainer.query(By.css('button.ant-btn-primary'));
  }

  constructor(private fixture: ComponentFixture<CoverLetterDetailsComponent>) {}
}

describe('CoverLetterDetailsComponent', () => {
  const coverLetter: CoverLetter = {
    id: 1,
    title: 'Cover letter title',
    description: `
    <h1>Cover Letter Head</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae malesuada nunc. Sed porttitor, ante et pellentesque pretium, metus ipsum rutrum erat, congue imperdiet nulla erat eget elit.</p>
    `,
  };

  let component: CoverLetterDetailsComponent;
  let fixture: ComponentFixture<CoverLetterDetailsComponent>;
  let coverLetterServiceSpy: jasmine.SpyObj<CoverLetterService>;
  let notificationServiceSpy: jasmine.SpyObj<NzNotificationService>;
  let router: Router;
  let routeStub: ActivatedRouteStub;
  let page: CoverLetterDetailsPage;

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub({
      initialSnapshot: {
        paramMap: convertToParamMap({ id: 1 }),
        data: { coverLetter },
      },
    });

    coverLetterServiceSpy = jasmine.createSpyObj('CoverLetterServiceSpy', ['delete']);
    notificationServiceSpy = jasmine.createSpyObj('NzNotificationServiceSpy', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DemoNgZorroAntdModule,
        IconsProviderModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [CoverLetterDetailsComponent],
      providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: CoverLetterService, useValue: coverLetterServiceSpy },
        { provide: NzNotificationService, useValue: notificationServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CoverLetterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new CoverLetterDetailsPage(component, fixture.debugElement);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cover letter title', () => {
    expect(page.title.textContent).toContain(coverLetter.title);
  });

  it('should contain cover letter description', () => {
    expect(page.description.textContent).toContain('Cover Letter Head');
  });

  describe('when click on delete', () => {
    let popConfirm: PopConfirmComponent;
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      popConfirm = new PopConfirmComponent(fixture);
      coverLetterServiceSpy.delete.and.returnValue(of({}));
      navigateSpy = spyOn(router, 'navigate');

      click(page.deleteButton);
      click(popConfirm.OkButton);
    });

    it('should contain cover letter description', () => {
      expect(coverLetterServiceSpy.delete).toHaveBeenCalledWith(coverLetter.id);
    });

    it('should display success notification', () => {
      expect(notificationServiceSpy.success).toHaveBeenCalledWith(
        'Cover Letter',
        `"${coverLetter.title}" successfully deleted`
      );
    });

    it('should retirect to list', () => {
      expect(navigateSpy).toHaveBeenCalledWith(['..'], { relativeTo: routeStub });
    });
  });
});
