import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyProviderService } from '../../services/survey-provider.service';

@Component({
  selector: 'app-survey-paused',
  templateUrl: './survey-paused.component.html',
  styleUrls: ['./survey-paused.component.scss']
})
export class SurveyPausedComponent implements OnInit {

  resumeId: number
  provider: string | null | undefined;

  constructor(private surveyProviderService: SurveyProviderService, private route: ActivatedRoute, private router: Router) {
    this.resumeId = Number(this.route.snapshot.queryParamMap.get('resumeId'));
  }

  ngOnInit(): void {
    this.provider = this.surveyProviderService.getProvider();
  }

  startNext() {
    this.router.navigate(['surveys'], { queryParams: { provider: this.provider } });
  }
}
