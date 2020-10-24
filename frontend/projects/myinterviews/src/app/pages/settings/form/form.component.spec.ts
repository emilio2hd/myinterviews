import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormComponent } from './form.component';

describe('SettingsFormComponent', () => {
  let component: SettingsFormComponent;
  let fixture: ComponentFixture<SettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
