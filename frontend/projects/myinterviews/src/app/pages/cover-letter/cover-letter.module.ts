import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

import { CoverLetterRoutingModule } from './cover-letter-routing.module';
import { CoverLetterListComponent } from './list/list.component';
import { CoverLetterService } from './cover-letter.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CoverLetterRoutingModule, DemoNgZorroAntdModule],
  declarations: [CoverLetterListComponent],
  providers: [CoverLetterService],
})
export class CoverLetterModule {}
