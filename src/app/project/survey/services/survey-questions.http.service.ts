import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveyQuestionQuery } from '../models/survey-question';

@Injectable()
export class SurveyQuestionsHttpService {

  constructor(private http: HttpService) { }
  
  getSurveyQuestions(surveyId: number) {
    return this.http.get<Array<SurveyQuestionQuery>>(`${environment.baseEndPoint}/api/question/${surveyId}`).pipe(map(m => m.map(r => new SurveyQuestionQuery(r))));
  }
}
