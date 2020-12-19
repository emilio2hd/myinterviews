import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { LayoutModule } from '../@layout/layout.module';

@NgModule({
  declarations: [],
  exports: [CommonModule, LayoutModule, DemoNgZorroAntdModule],
})
export class SharedModule {}
