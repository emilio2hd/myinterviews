import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-column-layout',
  templateUrl: './single-column-layout.component.html',
  styleUrls: ['./single-column-layout.component.scss'],
})
export class SingleColumnLayoutComponent implements OnInit {
  @Input() title: string;

  @Input() backgroundTransparent = false;
  @Input() subtitle: string | null = null;
  @Input() displayBack = false;

  get backIcon() {
    return this.displayBack ? 'arrow-left' : null;
  }

  constructor() {}

  ngOnInit(): void {}
}
