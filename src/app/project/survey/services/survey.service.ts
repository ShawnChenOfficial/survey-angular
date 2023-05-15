import { Injectable } from '@angular/core';
import { SurveyGetter } from '../interfaces/survey-getter';
import { SurveySetter } from '../interfaces/survey-setter';
import { SurveyQuestionForm } from '../models/survey-question';
import { SurveyResumedQuery } from '../models/survey-resume';

@Injectable({
  providedIn: 'root'
})
export class SurveyService implements SurveySetter, SurveyGetter {

  private index = 0;
  private surveyQuestions = new Array<SurveyQuestionForm>();

  private surveyId?: number;
  private surveyResultId?: number;

  set(surveyId: number, surveyQuestions: Array<SurveyQuestionForm>) {
    this.surveyQuestions = surveyQuestions;
    this.index = 0;
    this.surveyId = surveyId;
    this.surveyResultId = undefined;
  }

  setByResume(resumeQuery: SurveyResumedQuery) {
    this.surveyQuestions = resumeQuery.questions;
    this.index = 0;
    this.surveyId = resumeQuery.surveyId;
    this.surveyResultId = resumeQuery.surveyResultId;
  }

  get getSurveyResultId() {
    return this.surveyResultId;
  }

  get getSurveyId() {
    return this.surveyId!;
  }

  get totalCount(): number {
    return this.surveyQuestions.length;
  }

  get currentIndex(): number {
    return this.index;
  }

  get all(): SurveyQuestionForm[] {
    return this.surveyQuestions;
  }

  get firstOrDefault() {
    if (this.surveyQuestions.length > 0) {
      return this.surveyQuestions[0];
    }
    return undefined;
  }

  get lastAnswered() {
    if (this.surveyQuestions.length > 0) {
      let answeredQuestions = this.surveyQuestions.filter(f => f.selectOptions.filter(ff => ff.selected).length > 0);
      if (answeredQuestions.length == 0) {
        this.index = 0;
        return this.surveyQuestions[0];
      }
      let lastAnsweredQuestion = answeredQuestions[answeredQuestions.length - 1]
      this.index = this.surveyQuestions.indexOf(lastAnsweredQuestion);
      return lastAnsweredQuestion;
    }
    return undefined;
  }

  get next() {
    if (this.hasNext) {
      this.index++;
      let result = this.surveyQuestions[this.index];
      return result;
    }
    return undefined;
  }

  get previous() {
    if (this.hasPrevious) {
      this.index--;
      let result = this.surveyQuestions[this.index];
      return result;
    }
    return undefined;
  }

  get hasNext() {
    return this.surveyQuestions.length > this.index + 1;
  }

  get hasPrevious() {
    return this.index > 0;
  }
}
