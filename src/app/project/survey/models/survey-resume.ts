import { SelectionOptionQuery, SurveyQuestionQuery } from "./survey-question";

export class SurveyResumedQuery {
    surveyId: number;
    surveyResultId: number;
    questions: Array<SurveyQuestionQuery>;

    constructor(json: any) {
        this.surveyId = json.surveyId;
        this.surveyResultId = json.surveyResultId;
        this.questions = (json.questions as Array<any>).map(m => new SurveyQuestionQuery(m));
    }
}