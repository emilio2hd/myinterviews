import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';

import { IconsProviderModule } from '@app/icons-provider.module';

import { SingleColumnLayoutComponent } from './single-column-layout/single-column-layout.component';

@NgModule({
  imports: [CommonModule, NzSpaceModule, NzPageHeaderModule, NzCardModule, IconsProviderModule],
  declarations: [SingleColumnLayoutComponent],
  exports: [SingleColumnLayoutComponent],
})
export class LayoutModule {}
