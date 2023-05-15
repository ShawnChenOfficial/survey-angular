import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveySummaryQuery } from '../../admin/models/survey-admin';
import { SurveyQuery} from '../models/survey';
import { SubmitSurveyResultCommand } from '../models/survey-result';

@Injectable()
export class SurveyHttpService {

  constructor(private http: HttpService) { }

  submitResult(command: SubmitSurveyResultCommand){
    return this.http.post(`${environment.baseEndPoint}/api/survey/submit`, command).pipe(map(m => m));
  }

  getSurveys(provider?: string) {
    return this.http.get<Array<SurveyQuery>>(`${environment.baseEndPoint}/api/survey/${provider ? provider : '-'}`).pipe(map(m => m.map(r => new SurveySummaryQuery(r))));
  }
}