import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveyQuestionSelectionPercentageQuery } from '../models/survey-question-selection-admin';

@Injectable()
export class SurveyQuestionsSelectionsHttpService {

  constructor(private http: HttpService) { }

  getSelectionPercentage(questionId: number){
    return this.http.authHeader().get(`${environment.baseEndPoint}/api/question/answer/percent/${questionId}`).pipe(map(m => (m as Array<any>).map(r => new SurveyQuestionSelectionPercentageQuery(r))))
  }
}
