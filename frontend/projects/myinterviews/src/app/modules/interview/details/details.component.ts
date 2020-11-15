import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { InterviewService } from '../interview.service';
import { Interview, InterviewTypeMapping } from '../interview.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class InterviewDetailsComponent implements OnInit {
  private getinterviewFromRouterData = pipe(map((routerData: Data) => routerData.interview));
  interview$ = this.getinterviewFromRouterData(this.route.data);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {}

  onConfirmDelete(interview: Interview) {
    this.interviewService.delete(interview.id).subscribe({
      next: () => {
        this.notificationService.success(
          'Interview',
          `Interview with "${interview.interviewerName}" successfully deleted`
        );
        this.goToRecipesList();
      },
      error: () =>
        this.notificationService.error(
          'Interview',
          `Uh-oh! Something wrong has happened. Unable to save interview with "${interview.interviewerName}"`
        ),
    });
  }

  goToRecipesList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getTypeOfText(typeOf: string) {
    return InterviewTypeMapping[typeOf];
  }
}
