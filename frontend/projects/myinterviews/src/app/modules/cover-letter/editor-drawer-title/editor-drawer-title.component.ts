import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { BehaviorSubject } from 'rxjs';
import { CoverLetter } from '../cover-letter';
import { EditorDrawerComponent } from '../editor-drawer/editor-drawer.component';

@Component({
  selector: 'app-editor-drawer-title',
  templateUrl: './editor-drawer-title.component.html',
  styleUrls: ['./editor-drawer-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDrawerTitleComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _drawerRef: NzDrawerRef<EditorDrawerComponent, CoverLetter>;

  formValidSubject = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSubject.asObservable();

  @Input() coverLetterOnFocus: CoverLetter;
  @Input() set drawerRef(drawerRef: NzDrawerRef<EditorDrawerComponent, CoverLetter>) {
    this._drawerRef = drawerRef;

    if (this._drawerRef) {
      this.drawerRef.afterOpen.subscribe(() => {
        this.drawerRef
          .getContentComponent()
          .formValid.subscribe((valid: boolean) => this.formValidSubject.next(valid));
      });
    }
  }
  get drawerRef() {
    return this._drawerRef;
  }

  @Output() deleteClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getTitle() {
    return this.coverLetterOnFocus.title || 'New cover letter';
  }

  isNew() {
    return !this.coverLetterOnFocus?.id;
  }

  onSaveAsCopyClick() {
    this.drawerRef.getContentComponent().saveAsCopy();
  }

  onSaveClick() {
    this.drawerRef.getContentComponent().submitForm();
  }

  onSendEmailClick() {
    this.drawerRef.getContentComponent().sendEmail();
  }

  onCloseClick() {
    this.drawerRef.close();
  }
}
