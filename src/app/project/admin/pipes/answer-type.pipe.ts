import { Pipe, PipeTransform } from '@angular/core';
import { AnswerType } from '../../survey/models/survey-question';

@Pipe({
  name: 'answerType'
})
export class AnswerTypePipe implements PipeTransform {

  transform(value: AnswerType): string {
    switch (value) {
      case AnswerType.ImageMultiSelection:
        return 'Multi-select Image';
      case AnswerType.StringMultiSelection:
        return 'Multi-select Text';
      case AnswerType.ImageSelection:
        return 'Single-select Image';
      case AnswerType.StringSelection:
        return 'Single-select Text';
      default:
        throw Error('Unknow Answer Type');
    }
  }

}
