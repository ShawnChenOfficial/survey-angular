import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';
import { SurveyPauseCommand } from '../../models/survey-pause';
import { AnswerType, SurveyQuestionForm } from '../../models/survey-question';
import { SurveyPauseResumeHttpService } from '../../services/survey-pause-resume.http.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})
export class SurveyQuestionComponent implements OnInit {

  @Input()
  isResumed!: boolean;

  question?: SurveyQuestionForm;

  showReview = false;

  constructor(private surveyService: SurveyService, private pauseResumeHttpService: SurveyPauseResumeHttpService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    if (this.isResumed)
      this.question = this.surveyService.lastAnswered;
    else
      this.question = this.surveyService.firstOrDefault;
  }

  get hasNext() {
    return this.surveyService.hasNext;
  }

  get hasPrevious() {
    return this.surveyService.hasPrevious;
  }

  get currentQuestionHasAnswer() {
    return this.question!.selectOptions!.filter(f => f.selected).length > 0;
  }

  // current question number
  get currentQuestionNumber() {
    return this.surveyService.currentIndex + 1;
  }

  // total questions
  get totalQuestions() {
    return this.surveyService.totalCount;
  }

  get isMultiSelect() {
    return this.question?.answerType == AnswerType.ImageMultiSelection || this.question?.answerType == AnswerType.StringMultiSelection;
  }

  get isSingleSelect() {
    return this.question?.answerType == AnswerType.ImageSelection || this.question?.answerType == AnswerType.StringSelection;
  }

  next() {
    this.question = this.surveyService.next;
  }

  previous() {
    this.question = this.surveyService.previous;
  }

  pause() {
    this.pauseResumeHttpService.pause(new SurveyPauseCommand(this.surveyService.getSurveyId, this.surveyService.all, this.surveyService.getSurveyResultId)).subscribe({
      next: response => {
        // navigate to other page and display the survey result ID which is resume Id;
        this.router.navigate(['/survey-paused'], { queryParams: { resumeId: response } });
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  review() {
    this.showReview = true;
  }
}
