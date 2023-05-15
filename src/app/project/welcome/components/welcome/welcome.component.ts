import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SurveyProviderService } from 'src/app/project/survey/services/survey-provider.service';
import { SurveyService } from 'src/app/project/survey/services/survey.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  sub?: Subscription;
  provider?: string;

  constructor(private router: Router, private activeRouter: ActivatedRoute, private providerService: SurveyProviderService) {
    this.provider = this.activeRouter.snapshot.queryParamMap.get('provider')?.toString();
    this.providerService.setProvider(this.provider);
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sub = interval(3500)
      .subscribe(() => {
        this.toSurvey();
      });
  }

  toSurvey() {
    this.router.navigate(['surveys'], {queryParams:{provider: this.provider}});
  }
}
