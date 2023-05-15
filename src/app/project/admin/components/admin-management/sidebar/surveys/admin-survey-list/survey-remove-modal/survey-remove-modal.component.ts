import { Component, Inject, OnInit } from '@angular/core';
import { SurveyAdminHttpService } from 'src/app/project/admin/services/survey-admin.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-remove-modal',
  templateUrl: './survey-remove-modal.component.html',
  styleUrls: ['./survey-remove-modal.component.scss']
})
export class SurveyRemoveModalComponent implements OnInit {

  title = 'Remove Survey';
  isLoading = false;

  constructor(@Inject(INJECT_DATA)private data: number, private toastService: ToastService, private modalService: ModalService, private surveyAdminHttpService: SurveyAdminHttpService) { }

  ngOnInit(): void {
  }

  save() {
    this.isLoading = true;
    this.surveyAdminHttpService.removeSurvey(this.data).subscribe({
      next: response => {
        if (response) {
          this.modalService.complete(true);
          this.isLoading = false;
        }
        else{
          this.toastService.show('Error', 'Failed to remove survey', ToastEventType.Error);
          this.isLoading = false;
        }
      },
      error: err => {
        this.toastService.show('Error', err, ToastEventType.Error);
        this.isLoading = false;
      }
    })
  }

  close() {
    this.modalService.close();
  }

}
