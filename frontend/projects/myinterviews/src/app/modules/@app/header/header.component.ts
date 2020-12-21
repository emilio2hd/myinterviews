import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private collapsedValue = false;

  @Output() collapsed = new EventEmitter<boolean>();

  set isCollapsed(value: boolean) {
    this.collapsedValue = value;
    this.collapsed.emit(this.collapsedValue);
  }

  get isCollapsed(): boolean {
    return this.collapsedValue;
  }

  constructor() {}

  ngOnInit(): void {}
}
