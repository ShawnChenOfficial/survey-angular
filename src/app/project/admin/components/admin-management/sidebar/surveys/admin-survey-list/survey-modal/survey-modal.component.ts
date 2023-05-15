import { Component, Inject, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SurveyCommand, SurveyForm } from 'src/app/project/admin/models/survey-admin';
import { SurveyAdminHttpService } from 'src/app/project/admin/services/survey-admin.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.scss']
})
export class SurveyModalComponent implements OnInit {

  title: string;
  form: SurveyForm;
  isLoading = false;

  constructor(@Inject(INJECT_DATA) public data: SurveyForm, private modalService: ModalService, private surveyAdminHttpService: SurveyAdminHttpService, private toastService: ToastService) {
    this.title = data ? 'Update Survey' : 'Create Survey';
    this.form = data ? data : new SurveyForm();
  }

  ngOnInit(): void {
  }

  save() {
    this.isLoading = true;
    this.surveyAdminHttpService.createOrUpdateSurvey(new SurveyCommand(this.form))
      .subscribe({
        next: response => {
          this.modalService.complete(response);
          this.isLoading = false;
        },
        error: error => {
          this.toastService.show('Error', error, ToastEventType.Error);
          this.isLoading = false;
        }
      })
  }

  close() {
    this.modalService.close();
  }
}
