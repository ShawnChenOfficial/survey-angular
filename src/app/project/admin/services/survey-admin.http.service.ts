import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveyCommand, SurveySummaryQuery } from '../models/survey-admin';

@Injectable()
export class SurveyAdminHttpService {

  constructor(private http: HttpService) { }
  
  getSurveysSummary() {
    return this.http.authHeader().get<Array<SurveySummaryQuery>>(`${environment.baseEndPoint}/api/survey`).pipe(map(m => m.map(r => new SurveySummaryQuery(r))));
  }

  createOrUpdateSurvey(command: SurveyCommand){
    if(command.id){
      return this.http.authHeader().patch(`${environment.baseEndPoint}/api/survey`, command).pipe(map(m => m));
    }
    else{
      return this.http.authHeader().post(`${environment.baseEndPoint}/api/survey`, command).pipe(map(m => m));
    }
  }

  removeSurvey(id: number){
    return this.http.authHeader().delete(`${environment.baseEndPoint}/api/survey/${id}`).pipe(map(m => m));
  }

  generateReport(id: number){
    return this.http.authHeader().get(`${environment.baseEndPoint}/api/survey/report/${id}`, {responseType: 'blob'}).pipe(map(m => m));
  }
}
