import { Component, Inject, OnInit } from '@angular/core';
import { SurveyQuestionSelectionPercentageQuery } from 'src/app/project/admin/models/survey-question-selection-admin';
import { SurveyQuestionsSelectionsHttpService } from 'src/app/project/admin/services/survey-questions-selections.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { AnswerType, SurveyQuestionQuery } from 'src/app/project/survey/models/survey-question';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-item-detail-modal',
  templateUrl: './survey-item-detail-modal.component.html',
  styleUrls: ['./survey-item-detail-modal.component.scss']
})
export class SurveyItemDetailModalComponent implements OnInit {

  title = 'Question Detail';
  question: SurveyQuestionQuery;
  percentages?: Array<SurveyQuestionSelectionPercentageQuery>;

  constructor(private modalService: ModalService,
    private surveyQuestionsSelectionsHttpService: SurveyQuestionsSelectionsHttpService,
    private toastService: ToastService,
    @Inject(INJECT_DATA) private data: SurveyQuestionQuery) {
    this.question = data;
  }

  ngOnInit(): void {
    this.surveyQuestionsSelectionsHttpService.getSelectionPercentage(this.question.id).subscribe({
      next: response => {
        this.percentages = response;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  getPercentage(selectionId: number) {
    if (this.percentages)
      return this.percentages.filter(f => f.surveyQuestionSelectionId == selectionId)[0].percentage;
    else
      return 0;
  }

  close() {
    this.modalService.close();
  }

  save() {
    this.modalService.complete(true);
  }

  get isMulti() {
    return this.question.answerType == AnswerType.ImageMultiSelection || this.question.answerType == AnswerType.StringMultiSelection;
  }
}
