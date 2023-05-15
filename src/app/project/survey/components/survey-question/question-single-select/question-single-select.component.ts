import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { AnswerType, SelectionOptionQuery, SurveyQuestionForm } from '../../../models/survey-question';
import { EditQuestionModelComponent } from '../edit-question-model/edit-question-model.component';

@Component({
  selector: 'app-question-single-select',
  templateUrl: './question-single-select.component.html',
  styleUrls: ['./question-single-select.component.scss']
})
export class QuestionSingleSelectComponent implements OnInit {

  @Input('question')
  question!: SurveyQuestionForm;

  @Input('confirmOnEdit')
  confirmOnEdit: boolean = false;

  @Input()
  disabled = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  whenUpdateValue(selectedOption: SelectionOptionQuery, $event: any) {
    if(this.confirmOnEdit){
      this.modalService.open(EditQuestionModelComponent).subscribe({
        next: response => {
          if (response) {
            this.updateValue(selectedOption, $event.target.checked);
          }
          else{
            $event.target.checked = !$event.target.checked;
          }
        }
      })
    }
    else{
      this.updateValue(selectedOption, $event.target.checked);
    }
  }

  updateValue(selectedOption: SelectionOptionQuery, checked: boolean){
    this.question!.selectOptions?.forEach(f => {
      f.selected = false
    });
    selectedOption.selected = checked;
  }
}
