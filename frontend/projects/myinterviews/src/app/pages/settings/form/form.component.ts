import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Settings } from '../settings';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  private readonly onlyNumberRegex = '[0-9]*';
  private subscriptions = new Subscription();

  private getSettingsFromRouterData = pipe(
    map((routerData: Data) => (routerData.settings || {}) as Settings)
  );

  settingsForm: FormGroup;
  enableStartTtlsAuto = new FormControl(false);
  passwordVisible = false;

  settings$ = this.getSettingsFromRouterData(this.route.data);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      replyTo: [''],
      userName: [''],
      password: [''],
      domain: [''],
      address: ['', [Validators.required]],
      port: ['', [Validators.required, Validators.pattern(this.onlyNumberRegex)]],
      authentication: [''],
      enableStarttlsAuto: [''],
    });

    this.subscriptions.add(
      this.enableStartTtlsAuto.valueChanges
        .pipe(tap((value) => this.settingsForm.get('enableStarttlsAuto').setValue(value ? 1 : 0)))
        .subscribe()
    );

    this.subscriptions.add(
      this.settings$.subscribe((settings) => {
        const { enableStarttlsAuto, ...restSettings } = settings;

        this.enableStartTtlsAuto.setValue(enableStarttlsAuto === 1);
        this.settingsForm.patchValue(restSettings);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  log(value) {
    console.log('onCheckboxChanged: ', value);
  }

  submitForm() {
    if (!this.settingsForm.valid) {
      return;
    }

    const settings = this.settingsForm.value as Settings;

    this.subscriptions.add(
      this.settingsService.update(settings).subscribe({
        next: () => {
          this.notificationService.create('success', 'Settings', 'successfully updated');
          this.settingsForm.get('password').setValue('');
        },
        error: () => {
          this.notificationService.create(
            'error',
            'Settings',
            `Uh-oh! Something wrong has happened. Unable to update settings.`
          );
        },
      })
    );
  }
}
