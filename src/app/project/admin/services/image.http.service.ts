import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'auth';
import { map, Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastEventType } from '../../toast/models/toast';
import { ToastService } from '../../toast/services/toast.service';
import { SurveyQuestionAdminImagesRollbackCommand } from '../models/survey-question-admin';

@Injectable()
export class ImageHttpService {

  constructor(private http: HttpService) { }

  uploadImage(file: any) {
    let form = new FormData();
    form.append('image', file);
    return this.http.authHeader().post(`${environment.baseEndPoint}${environment.imageEndPoint}`, form, { responseType: 'text' });
  }

  rollbackUploads(command: SurveyQuestionAdminImagesRollbackCommand) {
    return this.http.authHeader().post<boolean>(`${environment.baseEndPoint}${environment.imageEndPoint}rollback/uploads`, command);
  }
}
