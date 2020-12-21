import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  styleUrls: ['./side-bar.component.scss'],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  @Input() isCollapsed: boolean;

  constructor() {}

  ngOnInit(): void {}
}
