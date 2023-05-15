import { SurveyQuestionForm } from "./survey-question";

export class SurveyPauseCommand {
    surveyId: number;
    surveyResultId?: number;
    answers: Array<SurveyPauseAnswerCommand>;

    constructor(surveyId: number, forms: Array<SurveyQuestionForm>, surveyResultId?: number) {
        this.surveyId = surveyId;
        this.surveyResultId = surveyResultId;
        this.answers = forms.filter(f => f.selectOptions.filter(ff => ff.selected).length > 0).map(m => new SurveyPauseAnswerCommand(m));
    }
}

export class SurveyPauseAnswerCommand {
    surveyQuestionId: number;
    surveyQuestionSelectedAnswerIds: Array<number>;

    constructor(form: SurveyQuestionForm) {
        this.surveyQuestionId = form.id;
        this.surveyQuestionSelectedAnswerIds = form.selectOptions.filter(f => f.selected).map(m => m.id);
    }
}