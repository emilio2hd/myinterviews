import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDrawerTitleComponent } from './editor-drawer-title.component';

xdescribe('EditorDrawerTitleComponent', () => {
  let component: EditorDrawerTitleComponent;
  let fixture: ComponentFixture<EditorDrawerTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDrawerTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDrawerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
