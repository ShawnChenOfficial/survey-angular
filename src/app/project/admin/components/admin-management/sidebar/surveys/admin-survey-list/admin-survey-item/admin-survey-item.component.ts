import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { SurveyQuestionQuery } from 'src/app/project/survey/models/survey-question';
import { SurveyItemFormModalComponent } from './survey-item-form-modal/survey-item-form-modal.component';
import { SurveyItemDetailModalComponent } from './survey-item-detail-modal/survey-item-detail-modal.component';
import { SurveyItemRemoveModalComponent } from './survey-item-remove-modal/survey-item-remove-modal.component';
import { ToastService } from 'src/app/project/toast/services/toast.service';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { SurveyQuestionsAdminHttpService } from 'src/app/project/admin/services/survey-questions-admin.http.service';
import { SurveyQuestionAdminForm } from 'src/app/project/admin/models/survey-question-admin';
import { SurveySummaryQuery } from 'src/app/project/admin/models/survey-admin';
import { Tooltip } from 'bootstrap';
import { SurveyAdminHttpService } from 'src/app/project/admin/services/survey-admin.http.service';


@Component({
  selector: 'app-admin-survey-item',
  templateUrl: './admin-survey-item.component.html',
  styleUrls: ['./admin-survey-item.component.scss']
})
export class AdminSurveyItemComponent implements OnInit {

  @Input()
  survey!: SurveySummaryQuery;

  @Output()
  refreshSurveys = new EventEmitter<any>();

  questions?: Array<SurveyQuestionQuery>;

  isLoading = true;

  isExporting = false;

  constructor(private surveyAdminHttpService: SurveyAdminHttpService, private questionsAdminHttpService: SurveyQuestionsAdminHttpService, private modalService: ModalService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.load();
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(tooltipNode => new Tooltip(tooltipNode))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['survey']) {
      this.load();
    }
  }

  load() {
    this.isLoading = true;
    this.questionsAdminHttpService.getAdminSurveyQuestions(this.survey.id).subscribe({
      next: (response) => {
        this.questions = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Error', error, ToastEventType.Error);
        this.isLoading = false;
      }
    })
  }

  get canEdit() {
    return this.survey.complete == 0;
  }

  details(question: SurveyQuestionQuery) {
    this.modalService.open(SurveyItemDetailModalComponent, question).subscribe({
      next: response => {

      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  create() {
    if (this.survey.complete != 0) return;

    const form = new SurveyQuestionAdminForm(this.survey.id);

    this.modalService.open(SurveyItemFormModalComponent, form).subscribe({
      next: response => {
        this.load();
        this.refreshSurveys.emit();
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  generateReport() {
    this.isExporting = true;
    this.surveyAdminHttpService.generateReport(this.survey.id).subscribe({
      next: data => {
        const blob = new Blob([data], { type: 'text/csv' });
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        this.isExporting = false;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
        this.isExporting = false;
      }
    });
  }

  update(event: any, question: SurveyQuestionQuery) {
    event.stopPropagation();

    if (this.survey.complete != 0) return;

    const form = new SurveyQuestionAdminForm(this.survey.id, question);

    this.modalService.open(SurveyItemFormModalComponent, form).subscribe({
      next: response => {
        this.load();
        this.refreshSurveys.emit();
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  remove(event: any, question: SurveyQuestionQuery) {
    event.stopPropagation();
    if (this.survey.complete != 0) return;
    this.modalService.open(SurveyItemRemoveModalComponent, question.id).subscribe({
      next: response => {
        if (response) {
          this.load();
          this.refreshSurveys.emit();
        }
      }
    })
  }
}
