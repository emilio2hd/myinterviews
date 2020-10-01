import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CoverLetterService } from '../cover-letter.service';
import { CoverLetter } from '../cover-letter';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class CoverLetterDetailsComponent implements OnInit {
  private getCoverLetterFromRouterData = pipe(map((routerData: Data) => routerData.coverLetter));
  coverLetter$ = this.getCoverLetterFromRouterData(this.route.data);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coverLetterService: CoverLetterService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {}

  onConfirmDelete(coverLetter: CoverLetter) {
    this.coverLetterService.delete(coverLetter.id).subscribe({
      next: () => {
        this.notificationService.success(
          'Cover Letter',
          `"${coverLetter.title}" successfully deleted`
        );
        this.goToRecipesList();
      },
      error: () =>
        this.notificationService.error(
          'Cover Letter',
          `Uh-oh! Something wrong has happened. Unable to save "${coverLetter.title}"`
        ),
    });
  }

  goToRecipesList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
