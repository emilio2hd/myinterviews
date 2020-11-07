import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CoverLetter } from '../../cover-letter';

@Component({
  selector: 'app-cover-letter-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CoverLetterFormComponent implements OnInit {
  Editor = ClassicEditor;
  coverLetterForm = this.formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  @Input() set coverLetter(coverLetter: CoverLetter) {
    if (coverLetter) {
      this.coverLetterForm.patchValue(coverLetter);
    }
  }

  @Output() formSubmit = new EventEmitter<CoverLetter>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  submitForm() {
    if (!this.coverLetterForm.valid) {
      return;
    }

    const coverLetter = this.coverLetterForm.value as CoverLetter;

    this.formSubmit.emit(coverLetter);
  }
}
