import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconsProviderModule } from '@app/icons-provider.module';

import { getAllClasses, getInnerText, Page } from '@testing';

import { SingleColumnLayoutComponent } from './single-column-layout.component';
import { By } from '@angular/platform-browser';

describe('SingleColumnLayoutComponent', () => {
  describe('with no content projected', () => {
    const pageHeaderTitle = 'Some Title';
    const pageHeaderSubtitle = 'Some subtitle';

    let componentPage: SingleColumnLayoutComponentPage;
    let component: SingleColumnLayoutComponent;
    let fixture: ComponentFixture<SingleColumnLayoutComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzSpaceModule, NzPageHeaderModule, NzCardModule, IconsProviderModule],
        declarations: [SingleColumnLayoutComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleColumnLayoutComponent);
      component = fixture.componentInstance;
      component.title = pageHeaderTitle;
      component.subtitle = pageHeaderSubtitle;
      componentPage = new SingleColumnLayoutComponentPage(component, fixture.debugElement);
      fixture.detectChanges();
    });

    it('should create layout component', () => {
      expect(component).toBeTruthy();
    });

    it('should not display background transparent', () => {
      expect(componentPage.getPageHeaderClasses()).not.toContain('ant-page-header-ghost');
    });

    it('should not display back button', () => {
      expect(componentPage.hasBackButton()).toBeFalsy();
    });

    it(`should display "${pageHeaderTitle}" as page header title`, () => {
      expect(componentPage.pageHeaderTitleText()).toContain(pageHeaderTitle);
    });

    it(`should display "${pageHeaderSubtitle}" as page header subtitle`, () => {
      expect(componentPage.pageHeaderSubtitleText()).toContain(pageHeaderSubtitle);
    });

    describe('when set to display back button', () => {
      beforeEach(() => {
        component.displayBack = true;
        fixture.detectChanges();
      });

      it('should display header with back button', () => {
        expect(componentPage.hasBackButton()).toBeTruthy();
      });
    });

    describe('when set to display background transparent', () => {
      beforeEach(() => {
        component.backgroundTransparent = true;
        fixture.detectChanges();
      });

      it('should display header with background transparent', () => {
        expect(componentPage.getPageHeaderClasses()).toContain('ant-page-header-ghost');
      });
    });
  });

  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'test',
    template: `
      <app-single-column-layout title="Interview">
        <nz-page-header-extra data-testid="pageHeaderExtra">
          <button data-testid="saveButton">Save</button>
        </nz-page-header-extra>

        <nz-page-header-content data-testid="pageHeaderContent">
          <p>Here it's the header content</p>
        </nz-page-header-content>

        <p>Content projected in the card</p>
      </app-single-column-layout>
    `,
  })
  class SingleColumnHeaderExtraComponent {}

  describe('with projected content', () => {
    let wrapperComponent: SingleColumnHeaderExtraComponent;
    let wrapperComponentFixture: ComponentFixture<SingleColumnHeaderExtraComponent>;
    let layoutComponentPage: SingleColumnLayoutComponentPage;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzSpaceModule, NzPageHeaderModule, NzCardModule, IconsProviderModule],
        declarations: [SingleColumnLayoutComponent, SingleColumnHeaderExtraComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      wrapperComponentFixture = TestBed.createComponent(SingleColumnHeaderExtraComponent);
      wrapperComponent = wrapperComponentFixture.componentInstance;
      const layoutComponent = wrapperComponentFixture.debugElement.query(
        By.directive(SingleColumnLayoutComponent)
      );
      layoutComponentPage = new SingleColumnLayoutComponentPage(
        layoutComponent.componentInstance,
        layoutComponent
      );
      wrapperComponentFixture.detectChanges();
    });

    const pageHeaderExtra = () => layoutComponentPage.queryByCss('[data-testid="pageHeaderExtra"]');
    const pageHeaderContent = () =>
      layoutComponentPage.queryByCss('[data-testid="pageHeaderContent"');
    const mainContent = () => layoutComponentPage.mainContent().query(By.css('p'));
    const headerExtraButtonSave = () =>
      pageHeaderExtra().query(By.css('[data-testid="saveButton"]'));

    it('should create wrapper component', () => {
      expect(wrapperComponent).toBeTruthy();
    });

    it('should display "Interview" as page header title', () => {
      expect(layoutComponentPage.pageHeaderTitleText()).toContain('Interview');
    });

    it('should display "Save button" in the page header extra area', () => {
      expect(pageHeaderExtra()).not.toBeNull();
      expect(headerExtraButtonSave()).not.toBeNull();
    });

    it('should display page header content in the page header content area', () => {
      expect(pageHeaderContent()).not.toBeNull();
      expect(getInnerText(pageHeaderContent())).toContain("Here it's the header content");
    });

    it('should display text in the main content', () => {
      expect(mainContent()).not.toBeNull();
      expect(getInnerText(mainContent())).toContain('Content projected in the card');
    });
  });
});

class SingleColumnLayoutComponentPage extends Page<SingleColumnLayoutComponent> {
  constructor(protected component: SingleColumnLayoutComponent, protected debugEl: DebugElement) {
    super(component, debugEl);
  }

  pageHeader() {
    return this.queryByCss('[data-testid="pageHeader"]');
  }

  mainContent() {
    return this.queryByCss('[data-testid="layoutMainContent"]');
  }

  pageHeaderTitleText() {
    return getInnerText(this.queryByCss('[data-testid="pageHeaderTitle"]'));
  }

  pageHeaderSubtitleText() {
    return getInnerText(this.queryByCss('[data-testid="pageHeaderSubtitle"]'));
  }

  getPageHeaderClasses() {
    return getAllClasses(this.pageHeader().nativeElement);
  }

  hasBackButton() {
    return !!this.pageHeader().query(By.css('.ant-page-header-back'));
  }
}
