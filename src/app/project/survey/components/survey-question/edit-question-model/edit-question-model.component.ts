import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/project/modal/services/modal.service';

@Component({
  selector: 'app-edit-question-model',
  templateUrl: './edit-question-model.component.html',
  styleUrls: ['./edit-question-model.component.scss']
})
export class EditQuestionModelComponent implements OnInit {

  title: string;
  isLoading = false;

  constructor(private modalService: ModalService) {
    this.title = 'Update result';
  }

  ngOnInit(): void {
  }

  save() {
    this.modalService.complete(true);
  }

  close() {
    this.modalService.complete(false);
  }

}
