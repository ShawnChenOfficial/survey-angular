import { Component, Inject, OnInit } from '@angular/core';
import { SurveyQuestionsAdminHttpService } from 'src/app/project/admin/services/survey-questions-admin.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-item-remove-modal',
  templateUrl: './survey-item-remove-modal.component.html',
  styleUrls: ['./survey-item-remove-modal.component.scss']
})
export class SurveyItemRemoveModalComponent implements OnInit {

  title = 'Remove Survey Question';

  constructor(private modalService: ModalService, @Inject(INJECT_DATA) private data: number, private questionsAdminHttpService: SurveyQuestionsAdminHttpService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.data)
    this.questionsAdminHttpService.removeSurveyQuestion(this.data).subscribe({
      next: response => {
        if (response) {
          this.modalService.complete(true);
        }
        else{
          this.toastService.show('Error', 'Failed to remove question', ToastEventType.Error);
        }
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
      }
    })
  }

  close() {
    this.modalService.close();
  }

}
