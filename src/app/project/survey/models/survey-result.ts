import { SurveyQuestionForm } from "./survey-question";

export class SubmitSurveyResultCommand {
    surveyId: number;
    surveyResultId?: number;
    answers: Array<SubmitSurveyAnswerCommand>;

    constructor(surveyId: number, form: Array<SurveyQuestionForm>, surveyResultId?: number) {
        this.surveyId = surveyId;
        this.surveyResultId = surveyResultId;
        this.answers = form.map(m => new SubmitSurveyAnswerCommand(m));
    }
}

export class SubmitSurveyAnswerCommand {
    surveyQuestionId: number;
    surveyQuestionSelectedAnswerIds: Array<number>;

    constructor(form: SurveyQuestionForm) {
        this.surveyQuestionId = form.id;
        this.surveyQuestionSelectedAnswerIds = form.selectOptions.filter(f => f.selected).map(m => m.id);
    }
}