import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveyQuestionQuery } from '../../survey/models/survey-question';
import { SurveyQuestionAdminCommand } from '../models/survey-question-admin';

@Injectable()
export class SurveyQuestionsAdminHttpService {

  constructor(private http: HttpService) { }
  
  getAdminSurveyQuestions(surveyId: number){
    return this.http.authHeader().get<Array<SurveyQuestionQuery>>(`${environment.baseEndPoint}/api/question/admin/${surveyId}`).pipe(map(m => m.map(r => new SurveyQuestionQuery(r))));
  }
  
  createOrUpdateSurveyQuestion(command: SurveyQuestionAdminCommand){
    if(command.id){
      return this.http.authHeader().patch(`${environment.baseEndPoint}/api/question`, command).pipe(map(m => m));
    }
    else{
      return this.http.authHeader().post(`${environment.baseEndPoint}/api/question`, command).pipe(map(m => m));
    }
  }

  removeSurveyQuestion(id: number){
    return this.http.authHeader().delete(`${environment.baseEndPoint}/api/question/${id}`).pipe(map(m => m));
  }
}
