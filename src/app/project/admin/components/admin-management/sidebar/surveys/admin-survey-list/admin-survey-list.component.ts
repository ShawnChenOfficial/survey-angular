import { Component, OnInit } from '@angular/core';
import { SurveyForm, SurveySummaryQuery } from 'src/app/project/admin/models/survey-admin';
import { SurveyAdminHttpService } from 'src/app/project/admin/services/survey-admin.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';
import { SurveyModalComponent } from './survey-modal/survey-modal.component';
import { SurveyRemoveModalComponent } from './survey-remove-modal/survey-remove-modal.component';

@Component({
  selector: 'app-admin-survey-list',
  templateUrl: './admin-survey-list.component.html',
  styleUrls: ['./admin-survey-list.component.scss']
})
export class AdminSurveyListComponent implements OnInit {

  surveys?: Array<SurveySummaryQuery>;

  selectedSurvey?: SurveySummaryQuery;

  isLoading = true;

  constructor(private surveyAdminHttpService: SurveyAdminHttpService, private modalService: ModalService, private toastService: ToastService) {
   }

  ngOnInit(): void {
    this.load();
  }

  select(survey: SurveySummaryQuery) {
    this.selectedSurvey = survey;
  }

  load() {
    this.isLoading = true;
    this.surveyAdminHttpService.getSurveysSummary().subscribe({
      next: (response) => {
        this.surveys = response;
        this.isLoading = false;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
        this.isLoading = false;
      }
    })
  }

  create() {
    this.modalService.open(SurveyModalComponent).subscribe({
      next: response => {
        if (response) {
          this.load();
        }
      }
    })
  }

  update(event: any, survey: SurveySummaryQuery) {
    event.stopPropagation();

    if (survey.complete != 0) return;

    const form = new SurveyForm(survey);

    this.modalService.open(SurveyModalComponent, form).subscribe({
      next: response => {
        if (response) {
          this.load();
        }
      }
    })
  }

  remove(event: any, survey: SurveySummaryQuery) {
    event.stopPropagation();

    if (survey.complete != 0) return;

    this.modalService.open(SurveyRemoveModalComponent, survey.id).subscribe({
      next: response => {
        if (response) {
          this.load();
          this.selectedSurvey = undefined;
        }
      }
    })
  }


}
