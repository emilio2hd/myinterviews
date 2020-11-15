import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDrawerComponent } from './editor-drawer.component';

describe('EditorDrawerComponent', () => {
  let component: EditorDrawerComponent;
  let fixture: ComponentFixture<EditorDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
