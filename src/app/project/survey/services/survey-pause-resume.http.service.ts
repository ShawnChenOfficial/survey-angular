import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SurveyPauseCommand } from '../models/survey-pause';
import { SurveyResumedQuery } from '../models/survey-resume';

@Injectable()
export class SurveyPauseResumeHttpService {

  constructor(private http: HttpService) { }

  pause(comand: SurveyPauseCommand) {
    return this.http.post<number>(`${environment.baseEndPoint}/api/survey/pause`, comand);
  }

  resume(resumeNumber: number){
    return this.http.get(`${environment.baseEndPoint}/api/survey/resume/${resumeNumber}`).pipe(map(m => new SurveyResumedQuery(m)));
  }
}
