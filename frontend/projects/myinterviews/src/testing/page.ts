import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class Page<T> {
  constructor(protected component: T, protected debugEl: DebugElement) {}

  queryByAll() {
    return this.debugEl.query(By.all());
  }

  queryByCss(selector: string) {
    return this.debugEl.query(By.css(selector));
  }

  queryAllByCss(selector: string) {
    return this.debugEl.queryAll(By.css(selector));
  }

  queryByDirective(directive: any) {
    return this.debugEl.query(By.directive(directive));
  }

  queryAllByDirective(directive: any) {
    return this.debugEl.query(By.directive(directive));
  }

  spyOnMethod(method: string) {
    spyOn(this.component, method as any);
  }

  spyOnMethodAndCallThrough(method: string) {
    spyOn(this.component, method as any).and.callThrough();
  }
}
