import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';
import { AnswerType, SurveyQuestionForm } from '../../models/survey-question';
import { SubmitSurveyResultCommand } from '../../models/survey-result';
import { SurveyHttpService } from '../../services/survey.http.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-review',
  templateUrl: './survey-review.component.html',
  styleUrls: ['./survey-review.component.scss']
})
export class SurveyReviewComponent implements OnInit {

  questions!: Array<SurveyQuestionForm>;

  AnswerType = AnswerType;

  isLoading = false;

  constructor(private surveyService: SurveyService, private router: Router, private surveyHttpService: SurveyHttpService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.questions = this.surveyService.all;
  }

  isMultiSelect(question: SurveyQuestionForm) {
    return question.answerType == AnswerType.ImageMultiSelection || question.answerType == AnswerType.StringMultiSelection;
  }

  isSingleSelect(question: SurveyQuestionForm) {
    return question.answerType == AnswerType.ImageSelection || question.answerType == AnswerType.StringSelection;
  }

  complete() {
    this.isLoading = true;

    let questionsHasNoAnswers = this.surveyService.all.filter(f => f.selectOptions.filter(ff => ff.selected).length == 0);

    if(questionsHasNoAnswers.length > 0){
      questionsHasNoAnswers.forEach(f => {
        let index = this.surveyService.all.findIndex(x => x.id == f.id) + 1;
        this.toastService.show('Warning', `Question ${index} missing answer`, ToastEventType.Error);
      })

      this.isLoading = false;
      return;
    }

    this.surveyHttpService.submitResult(new SubmitSurveyResultCommand(this.surveyService.getSurveyId, this.questions, this.surveyService.getSurveyResultId)).subscribe({
      next: response => {
        if (response) {
          this.router.navigate(['./survey-complete']);
          this.isLoading = false;
        }
        else {
          this.toastService.show('Warning', 'Failed to submit result', ToastEventType.Error);
          this.isLoading = false;
        }
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
        this.isLoading = false;
      }
    })
  }
}
