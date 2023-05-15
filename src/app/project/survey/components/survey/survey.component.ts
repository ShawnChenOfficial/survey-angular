import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';
import { SurveyQuery } from '../../models/survey';
import { SurveyQuestionForm } from '../../models/survey-question';
import { SurveyPauseResumeHttpService } from '../../services/survey-pause-resume.http.service';
import { SurveyProviderService } from '../../services/survey-provider.service';
import { SurveyQuestionsHttpService } from '../../services/survey-questions.http.service';
import { SurveyHttpService } from '../../services/survey.http.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  surveys = new Array<SurveyQuery>;
  selectedSurvey?: SurveyQuery;
  surveySub?: Subscription;
  surveyQuestionsSub?: Subscription;

  // survey provider
  provider?: string;

  started = false;

  isResume = false;
  resumed = false;
  resumeNumber?: number;

  constructor(
    private surveyHttpService: SurveyHttpService,
    private questionHttpService: SurveyQuestionsHttpService,
    private surveyService: SurveyService,
    private surveyPauseResumeHttpService: SurveyPauseResumeHttpService,
    private router: ActivatedRoute,
    private toastService: ToastService,
    private providerService: SurveyProviderService) {
    this.provider = this.router.snapshot.queryParamMap.get('provider')?.toString();
    this.providerService.setProvider(this.provider);
  }

  ngOnInit(): void {
    this.surveySub = this.surveyHttpService.getSurveys(this.provider).subscribe({
      next: response => {
        this.surveys = response;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    });
  }

  get hasSelectedSurvey() {
    return this.selectedSurvey && this.selectedSurvey != undefined;
  }

  start() {
    if (!this.selectedSurvey) {
      return;
    }

    this.surveyQuestionsSub = this.questionHttpService.getSurveyQuestions(this.selectedSurvey.id).subscribe({
      next: response => {
        this.surveyService.set(this.selectedSurvey!.id, response.map(m => new SurveyQuestionForm(m)));
        this.started = true;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    });
  }

  resume() {
    if (this.resumeNumber) {
      this.surveyPauseResumeHttpService.resume(this.resumeNumber).subscribe({
        next: response => {
          this.surveyService.setByResume(response);
          this.resumed = true;
        },
        error: error => {          
          this.toastService.show('Error', error, ToastEventType.Error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this.surveyQuestionsSub) {
      this.surveyQuestionsSub.unsubscribe();
    }
  }
}
